import type { SpecGrid, SubjectId } from '../engine/types';
import { SYLLABUS, EXCLUDED_SUBJECTS, SUBJECT_ORDER } from '../data/syllabus';
import { SPEC_GRIDS, gridTotalMarks } from '../data/specGrids';
import { SOURCES } from '../data/sources';
import { ALL_CANDIDATES, ALL_EVIDENCE, ALL_FAMILIES, ALL_PAPERS } from '../data/db';

export interface Issue {
  level: 'error' | 'warning';
  code: string;
  message: string;
}

const sourceIds = new Set(SOURCES.map((s) => s.id));

/** Structural validation of the syllabus database for one subject. */
export function validateSyllabus(subject: SubjectId): Issue[] {
  const issues: Issue[] = [];
  const sub = SYLLABUS[subject];
  const chapterIds = new Set<string>();
  const topicIds = new Set<string>();

  for (const ch of sub.chapters) {
    if (chapterIds.has(ch.id)) issues.push({ level: 'error', code: 'dup-chapter', message: `${subject}: duplicate chapter id ${ch.id}` });
    chapterIds.add(ch.id);
    if (ch.teachingHours < 0) issues.push({ level: 'error', code: 'hours', message: `${subject}: negative teaching hours in ${ch.id}` });
    for (const t of ch.topics) {
      if (topicIds.has(t.id)) issues.push({ level: 'error', code: 'dup-topic', message: `${subject}: duplicate topic id ${t.id}` });
      topicIds.add(t.id);
      if (!t.id.startsWith(ch.id)) issues.push({ level: 'error', code: 'topic-prefix', message: `${subject}: topic ${t.id} does not belong to chapter ${ch.id}` });
    }
    for (const core of ch.coreTopicIds) {
      if (!topicIds.has(core) && !ch.topics.some((t) => t.id === core)) {
        issues.push({ level: 'error', code: 'core-topic', message: `${subject}: core topic ${core} missing from ${ch.id}` });
      }
    }
  }
  for (const sid of sub.sourceIds) {
    if (!sourceIds.has(sid)) issues.push({ level: 'error', code: 'syllabus-source', message: `${subject}: unknown source id ${sid}` });
  }
  return issues;
}

/** Grid arithmetic and structural checks. */
export function validateGrid(grid: SpecGrid): Issue[] {
  const issues: Issue[] = [];
  const computed = gridTotalMarks(grid);
  if (computed !== grid.totalMarks) {
    issues.push({ level: 'error', code: 'grid-total', message: `${grid.id}: sections add to ${computed} but totalMarks is ${grid.totalMarks}` });
  }
  const seen = new Set<string>();
  for (const s of grid.sections) {
    if (seen.has(s.id)) issues.push({ level: 'error', code: 'grid-dup-section', message: `${grid.id}: duplicate section ${s.id}` });
    seen.add(s.id);
    if (s.count <= 0 || s.marksPerQuestion <= 0) issues.push({ level: 'error', code: 'grid-count', message: `${grid.id}: non-positive count/marks in section ${s.id}` });
    if (s.choiceSlots > s.count) issues.push({ level: 'error', code: 'grid-choice', message: `${grid.id}: choiceSlots > count in section ${s.id}` });
    if (s.internalChoice === 'none' && s.choiceSlots > 0) issues.push({ level: 'error', code: 'grid-choice-none', message: `${grid.id}: section ${s.id} declares no internal choice but has choice slots` });
  }
  for (const sid of grid.verifiedFromSourceIds) {
    if (!sourceIds.has(sid)) issues.push({ level: 'error', code: 'grid-source', message: `${grid.id}: unknown source id ${sid}` });
  }
  return issues;
}

/** Cross-references between papers, evidence, families, candidates and the syllabus. */
export function validateData(): Issue[] {
  const issues: Issue[] = [];
  const paperById = new Map(ALL_PAPERS.map((p) => [p.id, p]));
  const familyById = new Map(ALL_FAMILIES.map((f) => [f.id, f]));
  const chapterIds: Record<SubjectId, Set<string>> = {
    physics: new Set(SYLLABUS.physics.chapters.map((c) => c.id)),
    chemistry: new Set(SYLLABUS.chemistry.chapters.map((c) => c.id)),
    cs: new Set(SYLLABUS.cs.chapters.map((c) => c.id)),
  };
  const topicIds: Record<SubjectId, Set<string>> = {
    physics: new Set(SYLLABUS.physics.chapters.flatMap((c) => c.topics.map((t) => t.id))),
    chemistry: new Set(SYLLABUS.chemistry.chapters.flatMap((c) => c.topics.map((t) => t.id))),
    cs: new Set(SYLLABUS.cs.chapters.flatMap((c) => c.topics.map((t) => t.id))),
  };

  const seenEvidence = new Set<string>();
  for (const ev of ALL_EVIDENCE) {
    if (seenEvidence.has(ev.id)) issues.push({ level: 'error', code: 'dup-evidence', message: `duplicate evidence id ${ev.id}` });
    seenEvidence.add(ev.id);
    const paper = paperById.get(ev.paperId);
    if (!paper) issues.push({ level: 'error', code: 'evidence-paper', message: `${ev.id}: unknown paper ${ev.paperId}` });
    if (ev.marks < 0) issues.push({ level: 'error', code: 'evidence-marks', message: `${ev.id}: negative marks` });
    if (ev.extraction === 'verbatim' && (!ev.text || ev.text.length < 10)) {
      issues.push({ level: 'error', code: 'evidence-verbatim', message: `${ev.id}: verbatim record without real text` });
    }
    const fam = familyById.get(ev.familyId);
    if (!fam) issues.push({ level: 'error', code: 'evidence-family', message: `${ev.id}: unknown family ${ev.familyId}` });
    else {
      if (fam.chapterId !== ev.chapterId) issues.push({ level: 'error', code: 'evidence-chapter', message: `${ev.id}: family ${ev.familyId} belongs to ${fam.chapterId}, record says ${ev.chapterId}` });
      if (paper && fam.subject !== paper.subject) issues.push({ level: 'error', code: 'evidence-subject', message: `${ev.id}: family subject ${fam.subject} != paper subject ${paper.subject}` });
    }
    const chapterSubject = fam?.subject ?? paper?.subject;
    if (chapterSubject && !chapterIds[chapterSubject].has(ev.chapterId)) {
      issues.push({ level: 'error', code: 'evidence-chapter-exists', message: `${ev.id}: chapter ${ev.chapterId} not in ${chapterSubject} syllabus` });
    }
    const srcOverride = ev.sourceId ?? paper?.sourceId;
    if (srcOverride && !sourceIds.has(srcOverride)) issues.push({ level: 'error', code: 'evidence-source', message: `${ev.id}: unknown source id ${srcOverride}` });
  }

  const seenFamilies = new Set<string>();
  for (const f of ALL_FAMILIES) {
    if (seenFamilies.has(f.id)) issues.push({ level: 'error', code: 'dup-family', message: `duplicate family id ${f.id}` });
    seenFamilies.add(f.id);
    if (!chapterIds[f.subject].has(f.chapterId)) issues.push({ level: 'error', code: 'family-chapter', message: `${f.id}: chapter ${f.chapterId} not in ${f.subject} syllabus` });
  }

  const seenCandidates = new Set<string>();
  const validSections = new Set<string>();
  for (const g of SPEC_GRIDS) for (const s of g.sections) validSections.add(`${g.subject}:${s.id}:${s.marksPerQuestion}`);
  for (const c of ALL_CANDIDATES) {
    if (seenCandidates.has(c.id)) issues.push({ level: 'error', code: 'dup-candidate', message: `duplicate candidate id ${c.id}` });
    seenCandidates.add(c.id);
    const fam = familyById.get(c.familyId);
    if (!fam) issues.push({ level: 'error', code: 'candidate-family', message: `${c.id}: unknown family ${c.familyId}` });
    else {
      if (fam.subject !== c.subject) issues.push({ level: 'error', code: 'candidate-subject', message: `${c.id}: family subject mismatch` });
      if (fam.chapterId !== c.chapterId) issues.push({ level: 'error', code: 'candidate-chapter', message: `${c.id}: family chapter ${fam.chapterId} != candidate chapter ${c.chapterId}` });
    }
    if (!chapterIds[c.subject].has(c.chapterId)) issues.push({ level: 'error', code: 'candidate-chapter-exists', message: `${c.id}: chapter ${c.chapterId} not in syllabus` });
    if (c.topicId && !topicIds[c.subject].has(c.topicId)) issues.push({ level: 'error', code: 'candidate-topic', message: `${c.id}: topic ${c.topicId} not in syllabus` });
    if (c.topicId && !c.topicId.startsWith(c.chapterId)) issues.push({ level: 'error', code: 'candidate-topic-chapter', message: `${c.id}: topic ${c.topicId} does not belong to ${c.chapterId}` });
    if (c.marks <= 0) issues.push({ level: 'error', code: 'candidate-marks', message: `${c.id}: marks must be > 0` });
    if (!validSections.has(`${c.subject}:${c.specSection}:${c.marks}`)) {
      issues.push({ level: 'warning', code: 'candidate-section-marks', message: `${c.id}: section ${c.specSection} with ${c.marks} marks has no matching spec-grid section` });
    }
    if (c.questionType === 'mcq') {
      if (!c.options || c.options.length < 2) issues.push({ level: 'error', code: 'mcq-options', message: `${c.id}: MCQ without options` });
      else if (c.answerIndex === undefined || c.answerIndex < 0 || c.answerIndex >= c.options.length) {
        issues.push({ level: 'error', code: 'mcq-answer', message: `${c.id}: MCQ with missing/invalid answerIndex` });
      }
    }
  }

  for (const p of ALL_PAPERS) {
    if (!sourceIds.has(p.sourceId)) issues.push({ level: 'error', code: 'paper-source', message: `${p.id}: unknown source ${p.sourceId}` });
    if (!SUBJECT_ORDER.includes(p.subject)) issues.push({ level: 'error', code: 'paper-subject', message: `${p.id}: subject ${p.subject} is not one of the supported subjects` });
  }

  // Hard exclusion list: rejected subject names must never appear in data identifiers/labels.
  const haystack = [
    ...ALL_FAMILIES.map((f) => f.id + f.concept),
    ...ALL_CANDIDATES.map((c) => c.id + c.text),
    ...ALL_PAPERS.map((p) => p.id + p.label),
    ...Object.values(SYLLABUS).map((s) => s.name + s.shortName),
  ].join(' ').toLowerCase();
  for (const bad of EXCLUDED_SUBJECTS) {
    if (new RegExp(`\\b${bad}\\b`).test(haystack)) {
      issues.push({ level: 'error', code: 'excluded-subject', message: `excluded subject name "${bad}" found in data` });
    }
  }
  if (!SUBJECT_ORDER.includes('physics') || !SUBJECT_ORDER.includes('chemistry') || !SUBJECT_ORDER.includes('cs')) {
    issues.push({ level: 'error', code: 'subject-order', message: 'SUBJECT_ORDER is missing a required subject' });
  }

  return issues;
}

/** Run every check. Used by tests and by the in-app Research Log page. */
export function runAllValidations(): Issue[] {
  const issues: Issue[] = [];
  for (const s of SUBJECT_ORDER) issues.push(...validateSyllabus(s));
  for (const g of SPEC_GRIDS) issues.push(...validateGrid(g));
  issues.push(...validateData());
  return issues;
}
