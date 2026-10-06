import type {
  GeneratedPaper,
  GeneratedQuestionSlot,
  PersonalRecord,
  QuestionCandidate,
  SpecGrid,
  SpecSectionId,
  SubjectId,
} from './types';
import { getGrid, gridTotalMarks } from '../data/specGrids';
import { predict, type RankMode } from './predictor';

export interface GeneratePaperOptions {
  subject: SubjectId;
  gridId: string;
  chapterIds?: string[];
  weights?: Record<string, number>;
  personal?: Record<string, PersonalRecord>;
  rankBy?: RankMode;
  seed?: number;
}

/** Small deterministic PRNG (mulberry32) so a generated paper can be reproduced. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Bucket-shuffle: keeps the evidence ranking dominant (candidates are grouped by
 * score band) while letting different seeds produce different but equally
 * defensible papers.
 */
function rankOrdered<T>(items: T[], score: (t: T) => number, rng: () => number, band = 5): T[] {
  const buckets = new Map<number, T[]>();
  for (const item of items) {
    const key = Math.floor(score(item) / band);
    const arr = buckets.get(key);
    if (arr) arr.push(item);
    else buckets.set(key, [item]);
  }
  const out: T[] = [];
  for (const key of [...buckets.keys()].sort((a, b) => b - a)) {
    const arr = buckets.get(key)!;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    out.push(...arr);
  }
  return out;
}

export function generatePaper(options: GeneratePaperOptions): GeneratedPaper {
  const grid = getGrid(options.gridId);
  if (!grid) throw new Error(`Unknown spec grid: ${options.gridId}`);
  if (grid.subject !== options.subject) {
    throw new Error(`Grid ${grid.id} belongs to ${grid.subject}, not ${options.subject}`);
  }

  const seed = options.seed ?? Math.floor(Math.random() * 2 ** 31);
  const rng = mulberry32(seed);
  const warnings: string[] = [];

  if (grid.verification === 'derived') {
    warnings.push(
      `DERIVED grid: "${grid.title}" is a school-terminal adaptation, NOT an official NEB specification.`,
    );
  }
  if (options.chapterIds && options.chapterIds.length > 0) {
    warnings.push(`Limited to ${options.chapterIds.length} selected chapter(s).`);
  }

  const scored = predict({
    subject: options.subject,
    grid,
    chapterIds: options.chapterIds,
    weights: options.weights,
    personal: options.personal,
    rankBy: options.rankBy ?? 'evidence',
  });
  const scoreOf = new Map(scored.map((s) => [s.candidate.id, s.score + (s.personalBoost || 0)]));
  const value = (c: QuestionCandidate): number => scoreOf.get(c.id) ?? 0;

  const orderedAll = rankOrdered(scored.map((s) => s.candidate), value, rng);

  const slots: GeneratedQuestionSlot[] = [];
  const usedFamilies = new Set<string>();
  const usedCandidates = new Set<string>();
  let runningNumber = 0;
  let actualTotal = 0;

  for (const section of grid.sections) {
    const pool = orderedAll.filter(
      (c) => c.specSection === section.id && c.marks === section.marksPerQuestion,
    );
    const mains: QuestionCandidate[] = [];

    for (const cand of pool) {
      if (mains.length >= section.count) break;
      if (usedCandidates.has(cand.id)) continue;
      if (usedFamilies.has(cand.familyId)) continue;
      mains.push(cand);
    }
    // Relax the family-diversity rule only if the section would otherwise be short.
    if (mains.length < section.count) {
      for (const cand of pool) {
        if (mains.length >= section.count) break;
        if (usedCandidates.has(cand.id)) continue;
        if (mains.some((m) => m.id === cand.id)) continue;
        mains.push(cand);
      }
    }
    if (mains.length < section.count) {
      warnings.push(
        `Section ${section.id}: only ${mains.length} of ${section.count} question(s) available ` +
          `(${section.count - mains.length} slot(s) could not be filled — add more chapters or accept fewer questions).`,
      );
    }

    const alts: (QuestionCandidate | undefined)[] = new Array(mains.length).fill(undefined);
    if (section.choiceSlots > 0) {
      const leftover = pool.filter((c) => !mains.some((m) => m.id === c.id) && !usedCandidates.has(c.id));
      let assigned = 0;
      let reusedElsewhere = 0;
      for (let i = 0; i < alts.length && assigned < section.choiceSlots; i++) {
        // Preferred: a concept that appears nowhere else in this paper.
        let alt = leftover.find(
          (c) =>
            !usedFamilies.has(c.familyId) &&
            !mains.some((m) => m.familyId === c.familyId) &&
            !alts.some((a) => a?.familyId === c.familyId),
        );
        // Fallback: concept used in an earlier section, but never the same slot.
        if (!alt) {
          alt = leftover.find(
            (c) =>
              !mains.some((m) => m.familyId === c.familyId) &&
              !alts.some((a) => a?.familyId === c.familyId),
          );
          if (alt) reusedElsewhere += 1;
        }
        if (alt) {
          alts[i] = alt;
          assigned += 1;
        }
      }
      if (assigned < section.choiceSlots) {
        warnings.push(
          `Section ${section.id}: only ${assigned} of ${section.choiceSlots} intended "OR" alternatives could be set from the available pool.`,
        );
      }
      if (reusedElsewhere > 0) {
        warnings.push(
          `Section ${section.id}: ${reusedElsewhere} "OR" alternative(s) reuse a concept that already appears elsewhere in this paper (candidate pool limit).`,
        );
      }
    }

    for (let i = 0; i < mains.length; i++) {
      const main = mains[i];
      const alt = alts[i];
      runningNumber += 1;
      actualTotal += section.marksPerQuestion;
      slots.push({
        number: String(runningNumber),
        marks: section.marksPerQuestion,
        question: main,
        alternative: alt,
        section: section.id as SpecSectionId,
      });
      usedCandidates.add(main.id);
      usedFamilies.add(main.familyId);
      if (alt) {
        usedCandidates.add(alt.id);
        usedFamilies.add(alt.familyId);
      }
    }
  }

  const expected = gridTotalMarks(grid);
  if (actualTotal !== expected) {
    warnings.push(
      `Paper totals ${actualTotal} marks while the grid "${grid.id}" specifies ${expected} marks.`,
    );
  }

  return {
    id: `gen-${Date.now().toString(36)}-${seed.toString(36)}`,
    createdAt: new Date().toISOString(),
    subject: options.subject,
    chapterIds: options.chapterIds ?? [],
    gridId: grid.id,
    gridNote: grid.note,
    totalMarks: actualTotal,
    durationMinutes: grid.durationMinutes,
    slots,
    warnings,
    seed,
  };
}

/** Sections summary used by the generator UI. */
export function gridSummary(grid: SpecGrid): string {
  return grid.sections
    .map((s) => `${s.count} × ${s.marksPerQuestion} (${s.id})`)
    .join(' + ') + ` = ${grid.totalMarks} marks`;
}
