import { describe, it, expect } from 'vitest';
import { runAllValidations, validateGrid, validateSyllabus } from './validators';
import { SPEC_GRIDS, gridTotalMarks } from '../data/specGrids';
import { EXCLUDED_SUBJECTS, SUBJECT_ORDER } from '../data/syllabus';
import { ALL_CANDIDATES, ALL_EVIDENCE, ALL_FAMILIES, ALL_PAPERS, familiesMissingCandidates } from '../data/db';

describe('data integrity', () => {
  it('has no validation errors anywhere', () => {
    const errors = runAllValidations().filter((i) => i.level === 'error');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('covers all three required subjects', () => {
    expect(SUBJECT_ORDER).toEqual(['physics', 'chemistry', 'cs']);
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

  it('has no terminal evidence yet, and says so rather than inventing any', () => {
    const terminalPapers = ALL_PAPERS.filter((p) => p.examType === 'terminal');
    const terminalEvidence = ALL_EVIDENCE.filter(
      (e) => terminalPapers.some((p) => p.id === e.paperId),
    );
    expect(terminalEvidence.length).toBe(0);
    expect(terminalPapers.length).toBe(0);
  });

  it('gives every evidenced concept at least one rankable candidate question', () => {
    for (const s of SUBJECT_ORDER) {
      expect(familiesMissingCandidates(s)).toEqual([]);
    }
  });
});
