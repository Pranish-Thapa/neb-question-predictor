import type {
  EvidenceRecord,
  PaperRecord,
  QuestionCandidate,
  QuestionFamily,
  SubjectId,
} from '../../engine/types';
import { PHYSICS_CANDIDATES, PHYSICS_EVIDENCE, PHYSICS_FAMILIES, PHYSICS_PAPERS } from './physics';
import { CHEM_CANDIDATES, CHEM_EVIDENCE, CHEM_FAMILIES, CHEM_PAPERS } from './chemistry';
import { CS_CANDIDATES, CS_EVIDENCE, CS_FAMILIES, CS_PAPERS } from './computerScience';
import {
  ACCOUNTANCY_CANDIDATES,
  ACCOUNTANCY_EVIDENCE,
  ACCOUNTANCY_FAMILIES,
  ACCOUNTANCY_PAPERS,
} from './accountancy';
import {
  ECONOMICS_CANDIDATES,
  ECONOMICS_EVIDENCE,
  ECONOMICS_FAMILIES,
  ECONOMICS_PAPERS,
} from './economics';

export interface SubjectDb {
  papers: PaperRecord[];
  families: QuestionFamily[];
  evidence: EvidenceRecord[];
  candidates: QuestionCandidate[];
}

export const DB: Record<SubjectId, SubjectDb> = {
  physics: {
    papers: PHYSICS_PAPERS,
    families: PHYSICS_FAMILIES,
    evidence: PHYSICS_EVIDENCE,
    candidates: PHYSICS_CANDIDATES,
  },
  chemistry: {
    papers: CHEM_PAPERS,
    families: CHEM_FAMILIES,
    evidence: CHEM_EVIDENCE,
    candidates: CHEM_CANDIDATES,
  },
  cs: {
    papers: CS_PAPERS,
    families: CS_FAMILIES,
    evidence: CS_EVIDENCE,
    candidates: CS_CANDIDATES,
  },
  accountancy: {
    papers: ACCOUNTANCY_PAPERS,
    families: ACCOUNTANCY_FAMILIES,
    evidence: ACCOUNTANCY_EVIDENCE,
    candidates: ACCOUNTANCY_CANDIDATES,
  },
  economics: {
    papers: ECONOMICS_PAPERS,
    families: ECONOMICS_FAMILIES,
    evidence: ECONOMICS_EVIDENCE,
    candidates: ECONOMICS_CANDIDATES,
  },
};

export const ALL_PAPERS: PaperRecord[] = Object.values(DB).flatMap((d) => d.papers);
export const ALL_FAMILIES: QuestionFamily[] = Object.values(DB).flatMap((d) => d.families);
export const ALL_EVIDENCE: EvidenceRecord[] = Object.values(DB).flatMap((d) => d.evidence);
export const ALL_CANDIDATES: QuestionCandidate[] = Object.values(DB).flatMap((d) => d.candidates);

export function evidenceForFamily(familyId: string): EvidenceRecord[] {
  return ALL_EVIDENCE.filter((e) => e.familyId === familyId);
}

export function evidenceForPaper(paperId: string): EvidenceRecord[] {
  return ALL_EVIDENCE.filter((e) => e.paperId === paperId);
}

export interface DbStats {
  papers: number;
  boardPapers: number;
  modelPapers: number;
  terminalPapers: number;
  papersWithEvidence: number;
  families: number;
  evidence: number;
  verbatimEvidence: number;
  conceptEvidence: number;
  terminalEvidence: number;
  candidates: number;
  candidatesBySection: Record<'A' | 'B' | 'C', number>;
}

export function computeDbStats(subject?: SubjectId): DbStats {
  const d = subject ? [DB[subject]] : Object.values(DB);
  const papers = d.flatMap((x) => x.papers);
  const evidence = d.flatMap((x) => x.evidence);
  const candidates = d.flatMap((x) => x.candidates);
  const papersWithEvidence = new Set(evidence.map((e) => e.paperId));
  const terminalEvidence = evidence.filter((e) => {
    const p = papers.find((x) => x.id === e.paperId);
    return p?.examType === 'terminal';
  });
  return {
    papers: papers.length,
    boardPapers: papers.filter((p) => p.examType === 'neb-board').length,
    modelPapers: papers.filter((p) => p.examType === 'neb-model').length,
    terminalPapers: papers.filter((p) => p.examType === 'terminal').length,
    papersWithEvidence: papersWithEvidence.size,
    families: d.flatMap((x) => x.families).length,
    evidence: evidence.length,
    verbatimEvidence: evidence.filter((e) => e.extraction === 'verbatim').length,
    conceptEvidence: evidence.filter((e) => e.extraction === 'concept').length,
    terminalEvidence: terminalEvidence.length,
    candidates: candidates.length,
    candidatesBySection: {
      A: candidates.filter((c) => c.specSection === 'A').length,
      B: candidates.filter((c) => c.specSection === 'B').length,
      C: candidates.filter((c) => c.specSection === 'C').length,
    },
  };
}

/** Families that have paper evidence but no rankable candidate (should stay empty). */
export function familiesMissingCandidates(subject: SubjectId): string[] {
  const d = DB[subject];
  const withCandidates = new Set(d.candidates.map((c) => c.familyId));
  const withEvidence = new Set(d.evidence.map((e) => e.familyId));
  return [...withEvidence].filter((f) => !withCandidates.has(f));
}

/** Distinct registry sources actually used by one subject's papers. */
export function sourceCountFor(subject: SubjectId): number {
  const ids = new Set(DB[subject].papers.map((p) => p.sourceId));
  for (const e of DB[subject].evidence) if (e.sourceId) ids.add(e.sourceId);
  return ids.size;
}
