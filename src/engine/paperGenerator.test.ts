import { describe, it, expect } from 'vitest';
import { generatePaper, gridSummary, mulberry32 } from './paperGenerator';
import { SPEC_GRIDS, getGrid, gridTotalMarks } from '../data/specGrids';
import { SUBJECT_ORDER } from '../data/syllabus';

describe('paper generator', () => {
  it('reproduces each verified grid exactly (marks, slot count and numbering)', () => {
    for (const grid of SPEC_GRIDS.filter((g) => g.verification === 'verified')) {
      const paper = generatePaper({ subject: grid.subject, gridId: grid.id, seed: 42 });

      expect(paper.totalMarks).toBe(grid.totalMarks);
      expect(paper.slots).toHaveLength(grid.sections.reduce((t, s) => t + s.count, 0));
      expect(paper.slots.map((s) => s.number)).toEqual(
        Array.from({ length: paper.slots.length }, (_, i) => String(i + 1)),
      );

      let expectedMarks = 0;
      for (const slot of paper.slots) {
        const section = grid.sections.find((s) => s.id === slot.section)!;
        expect(section).toBeDefined();
        expect(slot.marks).toBe(section.marksPerQuestion);
        expectedMarks += slot.marks;
        expect(slot.question.subject).toBe(grid.subject);
        expect(slot.question.marks).toBe(section.marksPerQuestion);
        if (slot.alternative) {
          expect(slot.alternative.familyId).not.toBe(slot.question.familyId);
          expect(slot.alternative.marks).toBe(section.marksPerQuestion);
        }
      }
      expect(expectedMarks).toBe(grid.totalMarks);

      const mainIds = paper.slots.map((s) => s.question.id);
      expect(new Set(mainIds).size).toBe(mainIds.length);

      const ids = paper.slots.flatMap((s) =>
        s.alternative ? [s.question.id, s.alternative.id] : [s.question.id],
      );
      expect(new Set(ids).size).toBe(ids.length);

      const mainFamilies = paper.slots.map((s) => s.question.familyId);
      expect(new Set(mainFamilies).size).toBe(mainFamilies.length);

      expect(paper.warnings.some((w) => w.includes('could not be filled'))).toBe(false);
      expect(paper.warnings.some((w) => w.includes('while the grid'))).toBe(false);
      expect(paper.warnings.some((w) => w.includes('intended "OR" alternatives could be set'))).toBe(false);
      expect(gridTotalMarks(grid)).toBe(grid.totalMarks);
    }
  });

  it('works for every supported subject', () => {
    for (const subject of SUBJECT_ORDER) {
      const grid = SPEC_GRIDS.find((g) => g.subject === subject && g.verification === 'verified')!;
      const paper = generatePaper({ subject, gridId: grid.id, seed: 7 });
      expect(paper.subject).toBe(subject);
      expect(paper.totalMarks).toBe(grid.totalMarks);
      expect(paper.durationMinutes).toBe(grid.durationMinutes);
    }
  });

  it('labels the derived CS grid as not official', () => {
    const grid = getGrid('cs-75-derived')!;
    const paper = generatePaper({ subject: 'cs', gridId: 'cs-75-derived', seed: 3 });
    expect(paper.totalMarks).toBe(75);
    expect(paper.warnings.join(' ')).toContain('DERIVED');
    expect(grid.verification).toBe('derived');
    expect(gridSummary(grid)).toContain('= 75 marks');
  });

  it('is reproducible for a given seed and varies across seeds', () => {
    const a = generatePaper({ subject: 'physics', gridId: 'phy-75-verified', seed: 11 });
    const b = generatePaper({ subject: 'physics', gridId: 'phy-75-verified', seed: 11 });
    const c = generatePaper({ subject: 'physics', gridId: 'phy-75-verified', seed: 99 });

    expect(a.slots.map((s) => s.question.id)).toEqual(b.slots.map((s) => s.question.id));
    expect(a.slots.map((s) => s.alternative?.id)).toEqual(b.slots.map((s) => s.alternative?.id));
    expect(a.slots.map((s) => s.question.id)).not.toEqual(c.slots.map((s) => s.question.id));
    expect(c.totalMarks).toBe(75);
  });

  it('fills OR (alternative) slots up to the grid allowance when the pool allows', () => {
    const grid = getGrid('chm-75-verified')!;
    const paper = generatePaper({ subject: 'chemistry', gridId: grid.id, seed: 5 });
    const wanted = grid.sections.reduce((t, s) => t + s.choiceSlots, 0);
    const got = paper.slots.filter((s) => s.alternative).length;
    expect(got).toBe(wanted);
  });

  it('warns instead of lying when a chapter filter leaves slots unfilled', () => {
    const paper = generatePaper({
      subject: 'physics',
      gridId: 'phy-75-verified',
      chapterIds: ['phy-01'],
      seed: 4,
    });
    expect(paper.totalMarks).toBeLessThan(75);
    expect(paper.warnings.length).toBeGreaterThan(0);
    expect(paper.warnings.join(' ')).toContain('could not be filled');
    expect(paper.warnings.join(' ')).toContain('while the grid');
  });

  it('rejects a grid that belongs to another subject', () => {
    expect(() => generatePaper({ subject: 'physics', gridId: 'cs-50-verified' })).toThrow();
    expect(() => generatePaper({ subject: 'cs', gridId: 'does-not-exist' })).toThrow();
  });

  it('exposes a deterministic PRNG', () => {
    const r1 = mulberry32(123);
    const r2 = mulberry32(123);
    expect([r1(), r1(), r1()]).toEqual([r2(), r2(), r2()]);
  });
});
