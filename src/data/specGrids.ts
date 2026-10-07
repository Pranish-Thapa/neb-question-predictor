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
    id: 'acc-75-verified',
    subject: 'accountancy',
    title: 'NEB Grade XII Accountancy — Board written paper (verified)',
    totalMarks: 75,
    durationMinutes: 180,
    verification: 'verified',
    verifiedFromSourceIds: ['acc-spec-grid-cdc', 'acc-paper-2081', 'acc-paper-2082', 'acc-paper-2083'],
    lastVerified: '2026-10-07',
    note:
      'Verified twice over: the official CDC Grade-12 specification grid (Acc.104) prints 11×1 + 8×5 + 3×8 = 22 questions = 75 marks, and all three actual NEB board papers read in this research (2081, 2082, 2083) carry exactly that structure with "Attempt all the questions", Time 3 hrs, Full Marks 75. ' +
      'Choice: the official grid states the 8-mark long questions carry an "OR" in any one and the 5-mark short questions in any two; the three scans show the OR only inside Group C (Q20). This grid follows the papers (Group B without OR) and records the grid-versus-paper conflict here rather than hiding it. ' +
      'The 25-mark internal/project component of the official 100-mark scheme is school-assessed and outside this written paper.',
    sections: [
      { id: 'A', name: 'Group A — Very Short Answer Questions', questionType: 'short-answer', count: 11, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 8, marksPerQuestion: 5, internalChoice: 'none', choiceSlots: 0 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 3, marksPerQuestion: 8, internalChoice: 'some', choiceSlots: 1 },
    ],
  },
  {
    id: 'eco-75-verified',
    subject: 'economics',
    title: 'NEB Grade XII Economics — Board written paper (verified)',
    totalMarks: 75,
    durationMinutes: 180,
    verification: 'verified',
    verifiedFromSourceIds: ['eco-paper-2079', 'eco-paper-2079gi', 'eco-paper-2080', 'eco-paper-2081', 'eco-paper-2082', 'eco-paper-2083', 'eco-model-2079', 'eco-terminal-2082'],
    lastVerified: '2026-10-07',
    note:
      'Structure read identically from every Economics paper in this research: 2079 (regular + grade-increment), 2080, 2081, 2082, 2083, the official 2079 model question and the 2082 school terminal paper — Group A 11 very-short × 1, Group B 8 short × 5 with two "OR" alternatives, Group C 3 long × 8 with one "OR" = 22 items / 75 marks, Time 3 Hrs. ' +
      'The number of OR alternatives varies a little year to year (2082 carries more than 2080/2083), so choiceSlots records the observed typical pattern, not a guarantee for a future paper. ' +
      'The unit-wise marks table exists only in syllabus reproductions (secondary) and is not used to force chapter selection.',
    sections: [
      { id: 'A', name: 'Group A — Very Short Answer Questions', questionType: 'short-answer', count: 11, marksPerQuestion: 1, internalChoice: 'none', choiceSlots: 0 },
      { id: 'B', name: 'Group B — Short Answer Questions', questionType: 'short-answer', count: 8, marksPerQuestion: 5, internalChoice: 'some', choiceSlots: 2 },
      { id: 'C', name: 'Group C — Long Answer Questions', questionType: 'long-answer', count: 3, marksPerQuestion: 8, internalChoice: 'some', choiceSlots: 1 },
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
