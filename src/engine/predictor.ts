import type {
  PersonalRecord,
  QuestionCandidate,
  ScoredQuestion,
  SpecGrid,
  SpecSectionId,
  SubjectId,
} from './types';
import { ALL_CANDIDATES } from '../data/db';
import { SYLLABUS } from '../data/syllabus';
import { buildIndex, scoreCandidate, type ScoreContext } from './scoring';

export type RankMode = 'evidence' | 'evidence+personal';

export interface PredictOptions {
  subject: SubjectId;
  grid?: SpecGrid;
  /** Limit to these syllabus chapters (empty/undefined = whole subject). */
  chapterIds?: string[];
  sections?: SpecSectionId[];
  marks?: number;
  search?: string;
  weights?: Record<string, number>;
  /** Personal flags keyed by family id (concept-level, applies to every wording of that concept). */
  personal?: Record<string, PersonalRecord>;
  rankBy?: RankMode;
  topN?: number;
}

const norm = (s: string): string => s.toLowerCase().replace(/\s+/g, ' ').trim();

export function predict(options: PredictOptions): ScoredQuestion[] {
  const index = buildIndex();
  const chapters = new Set(options.chapterIds ?? []);
  const sections = new Set(options.sections ?? []);
  const q = options.search ? norm(options.search) : '';

  const candidates = ALL_CANDIDATES.filter((c) => {
    if (c.subject !== options.subject) return false;
    if (chapters.size && !chapters.has(c.chapterId)) return false;
    if (sections.size && !sections.has(c.specSection)) return false;
    if (options.marks !== undefined && c.marks !== options.marks) return false;
    if (q) {
      const fam = index.familyById.get(c.familyId);
      const hay = norm(`${c.text} ${fam?.concept ?? ''} ${c.chapterId}`);
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const scored = candidates.map((c) => {
    // A candidate is "paper-derived" when its concept actually appeared in an analyzed paper;
    // otherwise it exists because it is in the syllabus (never because someone guessed a paper).
    const evidenced = (index.evidenceByFamily.get(c.familyId) ?? []).length > 0;
    const candidate = evidenced && c.origin !== 'paper-derived'
      ? { ...c, origin: 'paper-derived' as const }
      : c;
    const ctx: ScoreContext = {
      subject: options.subject,
      grid: options.grid,
      weights: options.weights,
      personal: options.personal?.[c.familyId],
    };
    return scoreCandidate(candidate, index, ctx);
  });

  return sortScored(scored, options.rankBy ?? 'evidence').slice(0, options.topN ?? scored.length);
}

export function sortScored(scored: ScoredQuestion[], mode: RankMode): ScoredQuestion[] {
  const value = (s: ScoredQuestion): number =>
    mode === 'evidence+personal' ? s.score + s.personalBoost : s.score;
  return [...scored].sort((a, b) => {
    const d = value(b) - value(a);
    if (d !== 0) return d;
    const s = b.score - a.score;
    if (s !== 0) return s;
    return a.candidate.text.localeCompare(b.candidate.text);
  });
}

/** Candidates available for one section/marks combination (used by the paper generator). */
export function sectionPool(
  subject: SubjectId,
  section: SpecSectionId,
  marks: number,
  chapterIds: string[] | undefined,
): QuestionCandidate[] {
  const chapters = new Set(chapterIds ?? []);
  return ALL_CANDIDATES.filter(
    (c) =>
      c.subject === subject &&
      c.specSection === section &&
      c.marks === marks &&
      (chapters.size === 0 || chapters.has(c.chapterId)),
  );
}

/** Coverage stats shown on the dashboard: how much of the syllabus is represented. */
export function subjectCoverage(subject: SubjectId): {
  chapters: number;
  chaptersWithCandidates: number;
  topics: number;
  topicsWithCandidates: number;
  families: number;
  familiesWithEvidence: number;
  candidates: number;
  topChapterName?: string;
} {
  const syllabus = SYLLABUS[subject];
  const candidates = ALL_CANDIDATES.filter((c) => c.subject === subject);
  const chapterIds = new Set(candidates.map((c) => c.chapterId));
  const topicIds = new Set(candidates.map((c) => c.topicId).filter(Boolean) as string[]);
  const allTopics = syllabus.chapters.flatMap((ch) => ch.topics.map((t) => t.id));
  const index = buildIndex();
  const families = [...index.familyById.values()].filter((f) => f.subject === subject);
  const withEvidence = families.filter((f) => (index.evidenceByFamily.get(f.id) ?? []).length > 0);
  const perChapter = syllabus.chapters.map((ch) => ({
    name: ch.name,
    n: candidates.filter((c) => c.chapterId === ch.id).length,
  }));
  const top = [...perChapter].sort((a, b) => b.n - a.n)[0];
  return {
    chapters: syllabus.chapters.length,
    chaptersWithCandidates: chapterIds.size,
    topics: allTopics.length,
    topicsWithCandidates: topicIds.size,
    families: families.length,
    familiesWithEvidence: withEvidence.length,
    candidates: candidates.length,
    topChapterName: top && top.n > 0 ? top.name : undefined,
  };
}
