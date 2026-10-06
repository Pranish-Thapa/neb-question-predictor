import { describe, it, expect } from 'vitest';
import { predict, subjectCoverage, sortScored } from './predictor';
import { buildIndex, priorityOf, scoreCandidate, PERSONAL_BOOSTS } from './scoring';
import { ALL_CANDIDATES } from '../data/db';
import { getGrid } from '../data/specGrids';

describe('scoring engine', () => {
  const index = buildIndex();
  const grid = getGrid('phy-75-verified');

  it('keeps every score inside 0–100 and picks the documented priority label', () => {
    const all = predict({ subject: 'physics', grid });
    expect(all.length).toBeGreaterThan(30);
    for (const s of all) {
      expect(s.score).toBeGreaterThanOrEqual(0);
      expect(s.score).toBeLessThanOrEqual(100);
      expect(s.priority).toBe(priorityOf(s.score));
    }
    expect(priorityOf(80)).toBe('very-high');
    expect(priorityOf(65)).toBe('high');
    expect(priorityOf(45)).toBe('medium');
    expect(priorityOf(0)).toBe('low');
  });

  it('weights sum to 100 so the score is explainable', () => {
    const sample = ALL_CANDIDATES.find((c) => c.subject === 'physics')!;
    const s = scoreCandidate(sample, index, { subject: 'physics', grid });
    const weightSum = s.components.reduce((t, c) => t + c.weight, 0);
    expect(weightSum).toBe(100);
    expect(s.components.map((c) => c.points).reduce((t, p) => t + p, 0)).toBeCloseTo(s.score, 5);
  });

  it('gives more board-paper points to concepts that actually appeared in board papers', () => {
    const withEvidence = ALL_CANDIDATES.find((c) => c.familyId === 'phy-bohr')!;
    const withoutEvidence = ALL_CANDIDATES.find((c) => c.familyId === 'phy-poiseuille')!;
    const a = scoreCandidate(withEvidence, index, { subject: 'physics', grid });
    const b = scoreCandidate(withoutEvidence, index, { subject: 'physics', grid });
    const board = (s: typeof a) => s.components.find((c) => c.key === 'board')!.points;
    expect(board(a)).toBeGreaterThan(board(b));
    expect(a.boardAppearances).toBeGreaterThan(0);
    expect(b.boardAppearances).toBe(0);
    expect(a.evidenceLines.length).toBeGreaterThan(0);
    expect(b.evidenceLines.length).toBe(0);
  });

  it('reports terminal evidence honestly as insufficient instead of inventing it', () => {
    const s = scoreCandidate(ALL_CANDIDATES.find((c) => c.subject === 'chemistry')!, index, {
      subject: 'chemistry',
      grid: getGrid('chm-75-verified'),
    });
    const terminal = s.components.find((c) => c.key === 'terminal')!;
    expect(terminal.points).toBe(0);
    expect(terminal.detail).toContain('Insufficient verified data');
    expect(s.terminalAppearances).toBe(0);
  });

  it('keeps personal signals out of the evidence score and exposes them as a separate boost', () => {
    const candidate = ALL_CANDIDATES.find((c) => c.subject === 'cs')!;
    const plain = scoreCandidate(candidate, index, { subject: 'cs', grid: getGrid('cs-50-verified') });
    const flagged = scoreCandidate(candidate, index, {
      subject: 'cs',
      grid: getGrid('cs-50-verified'),
      personal: { flags: ['very-important'], updatedAt: '2026-10-06' },
    });
    expect(flagged.score).toBe(plain.score);
    expect(flagged.personalBoost).toBe(PERSONAL_BOOSTS['very-important']);
    expect(flagged.personalFlags).toContain('very-important');
  });

  it('ranks strictly by the chosen mode', () => {
    const evidenceRanked = predict({ subject: 'physics', topN: 10, rankBy: 'evidence' });
    expect(evidenceRanked).toHaveLength(10);
    for (let i = 1; i < evidenceRanked.length; i++) {
      expect(evidenceRanked[i - 1].score).toBeGreaterThanOrEqual(evidenceRanked[i].score);
    }

    const personalRanked = sortScored(evidenceRanked, 'evidence+personal');
    expect(personalRanked).toHaveLength(10);
  });

  it('filters by chapter, section, marks and search text', () => {
    const byChapter = predict({ subject: 'cs', chapterIds: ['csc-01'] });
    expect(byChapter.length).toBeGreaterThan(0);
    expect(byChapter.every((s) => s.candidate.chapterId === 'csc-01')).toBe(true);

    const byMarks = predict({ subject: 'cs', marks: 8 });
    expect(byMarks.every((s) => s.candidate.marks === 8)).toBe(true);

    const bySearch = predict({ subject: 'cs', search: 'normal' });
    expect(bySearch.length).toBeGreaterThan(0);

    const crossSubject = predict({ subject: 'cs', chapterIds: ['phy-01'] });
    expect(crossSubject).toHaveLength(0);
  });

  it('derives a question origin from real evidence instead of labelling everything by hand', () => {
    const all = predict({ subject: 'physics', grid });
    const evidenced = all.find((s) => s.evidenceLines.length > 0)!;
    const unevidenced = all.find((s) => s.evidenceLines.length === 0)!;
    expect(evidenced.candidate.origin).toBe('paper-derived');
    expect(unevidenced.candidate.origin).toBe('syllabus-derived');
  });

  it('reports syllabus coverage per subject', () => {
    const cov = subjectCoverage('physics');
    expect(cov.chapters).toBe(25);
    expect(cov.chaptersWithCandidates).toBeGreaterThan(15);
    expect(cov.candidates).toBeGreaterThan(50);
    const cs = subjectCoverage('cs');
    expect(cs.chapters).toBe(7);
    expect(cs.chaptersWithCandidates).toBe(7);
  });
});
