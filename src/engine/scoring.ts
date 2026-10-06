import type {
  EvidenceRecord,
  PaperRecord,
  PersonalRecord,
  Priority,
  QuestionCandidate,
  QuestionFamily,
  ScoreComponent,
  ScoredQuestion,
  SignalFlag,
  SpecGrid,
  SubjectId,
} from './types';
import { ALL_EVIDENCE, ALL_FAMILIES, ALL_PAPERS } from '../data/db';
import { SYLLABUS, getChapter, getTopic } from '../data/syllabus';

/** Default evidence weights. They always sum to 100. */
export const DEFAULT_WEIGHTS: Record<string, number> = {
  syllabus: 15,
  spec: 15,
  board: 20,
  model: 10,
  terminal: 10,
  recency: 10,
  variation: 5,
  markPattern: 5,
  conceptual: 5,
  crossSource: 5,
};

export const WEIGHT_LABELS: Record<string, string> = {
  syllabus: 'Syllabus fit',
  spec: 'Spec-grid fit',
  board: 'Board-paper appearances',
  model: 'Model-question appearances',
  terminal: 'Terminal-paper appearances',
  recency: 'Recency',
  variation: 'Wording variation across papers',
  markPattern: 'Mark-pattern match',
  conceptual: 'Conceptual importance',
  crossSource: 'Cross-source corroboration',
};

/** Documented personal-signal boosts (never part of the 100-point evidence score). */
export const PERSONAL_BOOSTS: Record<SignalFlag, number> = {
  'very-important': 12,
  important: 8,
  'teacher-emphasized': 8,
  'teacher-repeated': 6,
  'teacher-homework': 4,
  weak: 6,
  studied: 0,
};

export interface PredictorIndex {
  evidenceByFamily: Map<string, EvidenceRecord[]>;
  familyById: Map<string, QuestionFamily>;
  paperById: Map<string, PaperRecord>;
  latestYear: number;
  earliestYear: number;
  anyTerminalEvidence: boolean;
}

let cachedIndex: PredictorIndex | undefined;

export function buildIndex(): PredictorIndex {
  if (cachedIndex) return cachedIndex;
  const evidenceByFamily = new Map<string, EvidenceRecord[]>();
  for (const e of ALL_EVIDENCE) {
    const arr = evidenceByFamily.get(e.familyId);
    if (arr) arr.push(e);
    else evidenceByFamily.set(e.familyId, [e]);
  }
  const paperById = new Map(ALL_PAPERS.map((p) => [p.id, p]));
  const years = ALL_PAPERS.map((p) => p.adYear);
  cachedIndex = {
    evidenceByFamily,
    familyById: new Map(ALL_FAMILIES.map((f) => [f.id, f])),
    paperById,
    latestYear: years.length ? Math.max(...years) : 0,
    earliestYear: years.length ? Math.min(...years) : 0,
    anyTerminalEvidence: ALL_EVIDENCE.some((e) => paperById.get(e.paperId)?.examType === 'terminal'),
  };
  return cachedIndex;
}

/** Reset the memoised index (tests only). */
export function resetIndex(): void {
  cachedIndex = undefined;
}

export interface ScoreContext {
  subject: SubjectId;
  /** Spec grid used for the "spec fit" component (omit to skip that component). */
  grid?: SpecGrid;
  weights?: Record<string, number>;
  personal?: PersonalRecord;
}

export function priorityOf(score: number): Priority {
  if (score >= 80) return 'very-high';
  if (score >= 65) return 'high';
  if (score >= 45) return 'medium';
  return 'low';
}

export const PRIORITY_LABEL: Record<Priority, string> = {
  'very-high': '🔥 Very high',
  high: '🟠 High',
  medium: '🟡 Medium',
  low: '⚪ Low',
};

const round1 = (n: number): number => Math.round(n * 10) / 10;

function personalBoostOf(personal?: PersonalRecord): { boost: number; flags: SignalFlag[] } {
  if (!personal || personal.flags.length === 0) return { boost: 0, flags: [] };
  const boost = Math.min(
    15,
    personal.flags.reduce((sum, f) => sum + (PERSONAL_BOOSTS[f] ?? 0), 0),
  );
  return { boost, flags: personal.flags };
}

export function scoreCandidate(
  candidate: QuestionCandidate,
  index: PredictorIndex = buildIndex(),
  ctx: ScoreContext,
): ScoredQuestion {
  const weights = { ...DEFAULT_WEIGHTS, ...(ctx.weights ?? {}) };
  const family = index.familyById.get(candidate.familyId);
  const evidence = index.evidenceByFamily.get(candidate.familyId) ?? [];
  const chapter = getChapter(ctx.subject, candidate.chapterId);
  const topic = getTopic(ctx.subject, candidate.chapterId, candidate.topicId);
  const components: ScoreComponent[] = [];

  /* 1 — syllabus fit */
  {
    let pts = 0;
    const detail: string[] = [];
    if (chapter) {
      pts += 5;
      detail.push('chapter is in the official syllabus');
    }
    if (topic) {
      pts += 5;
      detail.push('topic is in the official syllabus');
    }
    const isCore = (topic && chapter?.coreTopicIds.includes(topic.id)) || candidate.conceptual === 'core';
    if (isCore) {
      pts += 5;
      detail.push('flagged as a core concept');
    }
    components.push({ key: 'syllabus', label: WEIGHT_LABELS.syllabus, weight: weights.syllabus, points: Math.min(pts, weights.syllabus), detail: detail.join('; ') || 'not matched against the syllabus' });
  }

  /* 2 — spec-grid fit */
  {
    const section = ctx.grid?.sections.find((s) => s.id === candidate.specSection);
    let pts = 0;
    let detail = 'no spec grid selected';
    if (section) {
      pts = 8;
      detail = `section ${section.id} exists in ${ctx.grid?.id}`;
      if (section.marksPerQuestion === candidate.marks) {
        pts += 7;
        detail += `; ${candidate.marks} marks matches the section (${section.count} × ${section.marksPerQuestion})`;
      } else {
        detail += `; marks ${candidate.marks} differs from the section's ${section.marksPerQuestion}`;
      }
    }
    components.push({ key: 'spec', label: WEIGHT_LABELS.spec, weight: weights.spec, points: Math.min(pts, weights.spec), detail });
  }

  const boardEv = evidence.filter((ev) => index.paperById.get(ev.paperId)?.examType === 'neb-board');
  const modelEv = evidence.filter((ev) => index.paperById.get(ev.paperId)?.examType === 'neb-model');
  const terminalEv = evidence.filter((ev) => index.paperById.get(ev.paperId)?.examType === 'terminal');

  /* 3 — board papers */
  components.push({
    key: 'board',
    label: WEIGHT_LABELS.board,
    weight: weights.board,
    points: round1(weights.board * Math.min(boardEv.length / 3, 1)),
    detail: boardEv.length
      ? `${boardEv.length} verified board-paper appearance${boardEv.length > 1 ? 's' : ''}`
      : 'no verified board-paper appearance',
  });

  /* 4 — model questions */
  components.push({
    key: 'model',
    label: WEIGHT_LABELS.model,
    weight: weights.model,
    points: round1(weights.model * Math.min(modelEv.length / 2, 1)),
    detail: modelEv.length
      ? `${modelEv.length} verified model-question appearance${modelEv.length > 1 ? 's' : ''}`
      : 'no verified model-question appearance',
  });

  /* 5 — terminal papers */
  components.push({
    key: 'terminal',
    label: WEIGHT_LABELS.terminal,
    weight: weights.terminal,
    points: round1(weights.terminal * Math.min(terminalEv.length / 2, 1)),
    detail: index.anyTerminalEvidence
      ? (terminalEv.length
        ? `${terminalEv.length} verified terminal-paper appearance${terminalEv.length > 1 ? 's' : ''}`
        : 'no verified terminal-paper appearance')
      : 'Insufficient verified data — no terminal-paper question records have been extracted yet',
  });

  /* 6 — recency */
  {
    const years = evidence
      .map((ev) => index.paperById.get(ev.paperId)?.adYear)
      .filter((y): y is number => typeof y === 'number');
    const span = index.latestYear - index.earliestYear;
    let points = 0;
    let detail = 'no dated evidence for this concept';
    if (years.length) {
      const latest = Math.max(...years);
      points = round1(weights.recency * (span > 0 ? (latest - index.earliestYear) / span : 1));
      detail = `latest verified appearance: ${latest}${latest === index.latestYear ? ' (most recent paper analysed)' : ''}`;
      components.push({ key: 'recency', label: WEIGHT_LABELS.recency, weight: weights.recency, points, detail });
    } else {
      components.push({ key: 'recency', label: WEIGHT_LABELS.recency, weight: weights.recency, points, detail });
    }
  }

  /* 7 — wording variation across papers */
  {
    const variants = new Set(evidence.map((ev) => ev.text)).size;
    components.push({
      key: 'variation',
      label: WEIGHT_LABELS.variation,
      weight: weights.variation,
      points: round1(weights.variation * Math.min(variants / 3, 1)),
      detail: variants
        ? `${variants} distinct wording${variants > 1 ? 's' : ''} recorded for this concept`
        : 'concept has no recorded wording variants yet',
    });
  }

  /* 8 — mark-pattern match */
  {
    const sameMarks = evidence.filter((ev) => ev.marks === candidate.marks && ev.marks > 0).length;
    const points = sameMarks > 0 ? weights.markPattern : evidence.length ? weights.markPattern * 0.4 : 0;
    components.push({
      key: 'markPattern',
      label: WEIGHT_LABELS.markPattern,
      weight: weights.markPattern,
      points: round1(points),
      detail: sameMarks > 0
        ? `seen at the same ${candidate.marks}-mark level ${sameMarks} time${sameMarks > 1 ? 's' : ''}`
        : evidence.length
          ? `seen in papers, but never at ${candidate.marks} marks`
          : 'no paper evidence to compare against',
    });
  }

  /* 9 — conceptual importance */
  {
    const points = candidate.conceptual === 'core' ? weights.conceptual
      : candidate.conceptual === 'standard' ? weights.conceptual * 0.6
        : weights.conceptual * 0.2;
    components.push({
      key: 'conceptual',
      label: WEIGHT_LABELS.conceptual,
      weight: weights.conceptual,
      points: round1(points),
      detail: `classified as ${candidate.conceptual} from syllabus depth and centrality`,
    });
  }

  /* 10 — cross-source corroboration */
  {
    const sources = new Set(
      evidence.map((ev) => ev.sourceId ?? index.paperById.get(ev.paperId)?.sourceId).filter(Boolean),
    );
    const points = sources.size >= 3 ? weights.crossSource
      : sources.size === 2 ? weights.crossSource * 0.7
        : sources.size === 1 ? weights.crossSource * 0.4
          : 0;
    components.push({
      key: 'crossSource',
      label: WEIGHT_LABELS.crossSource,
      weight: weights.crossSource,
      points: round1(points),
      detail: sources.size
        ? `${sources.size} independent source${sources.size > 1 ? 's' : ''} corroborate this concept`
        : 'no source corroboration yet',
    });
  }

  const score = round1(components.reduce((s, c) => s + c.points, 0));

  const layers = [
    Boolean(chapter && topic),
    Boolean(ctx.grid?.sections.some((s) => s.id === candidate.specSection)),
    boardEv.length > 0,
    modelEv.length > 0,
    terminalEv.length > 0,
    evidence.length > 0,
  ];
  const coverage = layers.filter(Boolean).length / layers.length;

  const evidenceLines: string[] = [];
  for (const ev of evidence) {
    const paper = index.paperById.get(ev.paperId);
    if (!paper) continue;
    const line = `${paper.label}${ev.slot ? ` [${ev.slot}]` : ''}`;
    if (!evidenceLines.includes(line)) evidenceLines.push(line);
  }

  const personal = personalBoostOf(ctx.personal);

  return {
    candidate,
    family,
    score,
    priority: priorityOf(score),
    components,
    evidenceLines,
    coverage: round1(coverage),
    boardAppearances: boardEv.length,
    modelAppearances: modelEv.length,
    terminalAppearances: terminalEv.length,
    distinctSources: new Set(
      evidence.map((ev) => ev.sourceId ?? index.paperById.get(ev.paperId)?.sourceId).filter(Boolean),
    ).size,
    latestYear: evidence
      .map((ev) => index.paperById.get(ev.paperId)?.adYear)
      .filter((y): y is number => typeof y === 'number')
      .reduce<number | undefined>((a, b) => (a === undefined || b > a ? b : a), undefined),
    chapterName: chapter?.name ?? candidate.chapterId,
    topicName: topic?.name,
    personalBoost: personal.boost,
    personalFlags: personal.flags,
  };
}

/** Aggregate score per syllabus chapter (used by the dashboard heatmap). */
export interface ChapterSummary {
  chapterId: string;
  name: string;
  area: string;
  candidateCount: number;
  averageScore: number;
  topScored: ScoredQuestion[];
}

export function chapterSummaries(
  subject: SubjectId,
  scored: ScoredQuestion[],
): ChapterSummary[] {
  const chapters = SYLLABUS[subject].chapters;
  return chapters.map((ch) => {
    const mine = scored.filter((s) => s.candidate.chapterId === ch.id);
    const top = [...mine].sort((a, b) => b.score - a.score).slice(0, 3);
    return {
      chapterId: ch.id,
      name: ch.name,
      area: ch.area,
      candidateCount: mine.length,
      averageScore: mine.length
        ? round1(mine.reduce((s, x) => s + x.score, 0) / mine.length)
        : 0,
      topScored: top,
    };
  });
}
