import type { SpecGrid, SubjectId } from '../engine/types';

/**
 * Specification grids.
 *
 * Physics & Chemistry (75 marks, 3 hrs) and Computer Science (50 marks, 2 hrs)
 * were verified against actual NEB board papers from multiple years (see
 * `research/RESEARCH_LOG.md` and source registry for the exact papers).
 *
 * The Computer Science 75-mark grid is a DERIVED school-terminal adaptation —
 * it is clearly flagged as NOT an official NEB grid and is opt-in in Settings.
 */
export const SPEC_GRIDS: SpecGrid[] = [
  {
    id: 'phy-75-verified',
    subject: 'physics',
    title: 'NEB Grade XII Physics — Board/Terminal written paper (verified)',
    totalMarks: 75,
    durationMinutes: 180,
    verification: 'verified',
    verifiedFromSourceIds: ['paper-phy-2079', 'paper-phy-2080p', 'paper-phy-2081d', 'paper-phy-2082h', 'grid-physics-iswori', 'spec-chart-collegenp'],
    lastVerified: '2026-10-06',
    note:
      'Group A 11×1, Group B 8×5 with "OR" on most slots, Group C 3×8 with occasional "OR" — confirmed identical across the 2079, 2080, 2081 and 2082 board papers and the NEB model question. MCQs are distributed ~30 minutes after the exam starts. Exact number of OR slots varies year to year (analyses show most Group-B slots and some Group-C slots carry alternatives).',
    sections: [
      { id: 'A', name: 'Group A — Multiple Choice Questions', questionType: 'mcq', count: 11, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 8, marksPerQuestion: 5, internalChoice: 'most', choiceSlots: 6 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 3, marksPerQuestion: 8, internalChoice: 'some', choiceSlots: 2 },
    ],
  },
  {
    id: 'chm-75-verified',
    subject: 'chemistry',
    title: 'NEB Grade XII Chemistry — Board/Terminal written paper (verified)',
    totalMarks: 75,
    durationMinutes: 180,
    verification: 'verified',
    verifiedFromSourceIds: ['paper-chem-2081p', 'paper-chem-2081a', 'paper-chem-2082d', 'paper-chem-2081-sajha', 'grid-chemistry-iswori', 'spec-chart-collegenp'],
    lastVerified: '2026-10-06',
    note:
      'Group A 11×1 (distributed 30 minutes after start), Group B 8×5, Group C 3×8 = 75. "OR" alternatives observed in several Group-B slots and in all/most Group-C slots across the 2081 regular, 2081 supplementary and 2082 papers (e.g. 2082 Set D: Q13, Q15, Q20, Q21, Q22).',
    sections: [
      { id: 'A', name: 'Group A — Multiple Choice Questions', questionType: 'mcq', count: 11, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 8, marksPerQuestion: 5, internalChoice: 'some', choiceSlots: 3 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 3, marksPerQuestion: 8, internalChoice: 'most', choiceSlots: 3 },
    ],
  },
  {
    id: 'cs-50-verified',
    subject: 'cs',
    title: 'NEB Grade XII Computer Science — Board written paper (verified)',
    totalMarks: 50,
    durationMinutes: 120,
    verification: 'verified',
    verifiedFromSourceIds: ['paper-cs-2081', 'paper-cs-2083', 'grid-cs-ndds', 'grid-cs-nebexam', 'paper-cs-2081supp'],
    lastVerified: '2026-10-06',
    note:
      'Every actual NEB Computer Science paper examined (2081, 2083, and the 2081 supplementary copy) is a 50-mark, 2-hour paper: Group A 9×1, Group B 5×5 (several with "OR"), Group C 2×8 (one with "OR"). This contradicts one secondary page claiming "75 theory + 25 practical"; the actual papers (stronger evidence) win. Practical/internal evaluation (25 marks) is conducted by the school and is outside this written paper.',
    sections: [
      { id: 'A', name: 'Group A — Multiple Choice Questions', questionType: 'mcq', count: 9, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 5, marksPerQuestion: 5, internalChoice: 'some', choiceSlots: 2 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 2, marksPerQuestion: 8, internalChoice: 'some', choiceSlots: 1 },
    ],
  },
  {
    id: 'cs-75-derived',
    subject: 'cs',
    title: 'School-terminal 75-mark adaptation for Computer Science (DERIVED — not an official NEB grid)',
    totalMarks: 75,
    durationMinutes: 180,
    verification: 'derived',
    verifiedFromSourceIds: [],
    lastVerified: '2026-10-06',
    note:
      'NOT an official NEB specification. Some schools/colleges set Computer Science terminals at 75 marks by applying the common science pattern (11×1 + 8×5 + 3×8). Enable this in Settings only if your school actually follows a 75-mark CS terminal. The app labels every paper generated from this grid as DERIVED.',
    sections: [
      { id: 'A', name: 'Group A — Multiple Choice Questions', questionType: 'mcq', count: 11, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 8, marksPerQuestion: 5, internalChoice: 'most', choiceSlots: 4 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 3, marksPerQuestion: 8, internalChoice: 'some', choiceSlots: 2 },
    ],
  },
];

export function gridTotalMarks(grid: SpecGrid): number {
  return grid.sections.reduce((sum, s) => sum + s.count * s.marksPerQuestion, 0);
}

export function getGridsForSubject(subject: SubjectId, allowDerived: boolean): SpecGrid[] {
  return SPEC_GRIDS.filter((g) => g.subject === subject && (allowDerived || g.verification === 'verified'));
}

export function getGrid(gridId: string): SpecGrid | undefined {
  return SPEC_GRIDS.find((g) => g.id === gridId);
}

/** Structural self-check: a grid's declared total must equal its section arithmetic. */
export function validateGridTotals(): { gridId: string; declared: number; computed: number; ok: boolean }[] {
  return SPEC_GRIDS.map((g) => {
    const computed = gridTotalMarks(g);
    return { gridId: g.id, declared: g.totalMarks, computed, ok: computed === g.totalMarks };
  });
}
