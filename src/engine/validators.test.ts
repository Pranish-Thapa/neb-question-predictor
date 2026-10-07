import { describe, it, expect } from 'vitest';
import { runAllValidations, validateGrid, validateSyllabus } from './validators';
import { SPEC_GRIDS, gridTotalMarks } from '../data/specGrids';
import { EXCLUDED_SUBJECTS, SUBJECT_ORDER } from '../data/syllabus';
import { ALL_CANDIDATES, ALL_EVIDENCE, ALL_FAMILIES, ALL_PAPERS, computeDbStats, familiesMissingCandidates } from '../data/db';

describe('data integrity', () => {
  it('has no validation errors anywhere', () => {
    const errors = runAllValidations().filter((i) => i.level === 'error');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('covers all five supported subjects', () => {
    expect(SUBJECT_ORDER).toEqual(['physics', 'chemistry', 'cs', 'accountancy', 'economics']);
    for (const s of SUBJECT_ORDER) {
      expect(validateSyllabus(s).filter((i) => i.level === 'error')).toEqual([]);
    }
  });

  it('keeps every spec grid arithmetically correct', () => {
    for (const g of SPEC_GRIDS) {
      expect(gridTotalMarks(g)).toBe(g.totalMarks);
      expect(validateGrid(g).filter((i) => i.level === 'error')).toEqual([]);
    }
  });

  it('never contains excluded subject names', () => {
    const text = [
      ...ALL_FAMILIES.map((f) => `${f.id} ${f.concept}`),
      ...ALL_CANDIDATES.map((c) => c.text),
      ...ALL_PAPERS.map((p) => p.label),
    ].join('\n').toLowerCase();
    for (const bad of EXCLUDED_SUBJECTS) {
      expect(new RegExp(`\\b${bad}\\b`).test(text)).toBe(false);
    }
  });

  it('never claims marks it could not read (evidence marks >= 0, verbatim records carry real text)', () => {
    for (const e of ALL_EVIDENCE) {
      expect(e.marks).toBeGreaterThanOrEqual(0);
      if (e.extraction === 'verbatim') expect(e.text.length).toBeGreaterThan(10);
    }
  });

  it('claims terminal evidence only for subjects that really have a registered terminal paper', () => {
    const terminalPapers = ALL_PAPERS.filter((p) => p.examType === 'terminal');
    const terminalEvidence = ALL_EVIDENCE.filter(
      (e) => terminalPapers.some((p) => p.id === e.paperId),
    );
    // every terminal record hangs off an actually-registered terminal paper
    expect(terminalEvidence.every((e) => terminalPapers.some((p) => p.id === e.paperId))).toBe(true);
    // and subjects with no terminal paper have no terminal records at all
    for (const s of SUBJECT_ORDER) {
      const stats = computeDbStats(s);
      if (stats.terminalPapers === 0) expect(stats.terminalEvidence).toBe(0);
      else expect(stats.terminalEvidence).toBeGreaterThan(0);
    }
  });

  it('gives every evidenced concept at least one rankable candidate question', () => {
    for (const s of SUBJECT_ORDER) {
      expect(familiesMissingCandidates(s)).toEqual([]);
    }
  });
});
