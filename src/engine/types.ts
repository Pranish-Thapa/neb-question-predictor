export type SubjectId = 'physics' | 'chemistry' | 'cs' | 'accountancy' | 'economics';

export const SUBJECT_IDS: SubjectId[] = ['physics', 'chemistry', 'cs', 'accountancy', 'economics'];

/** A topic inside a chapter of the official Class 12 NEB syllabus. */
export interface SyllabusTopic {
  id: string;
  name: string;
  subtopics: string[];
}

/** A chapter/unit of the official Class 12 NEB syllabus. */
export interface SyllabusChapter {
  id: string;
  number: number;
  name: string;
  area: string;
  teachingHours: number;
  topics: SyllabusTopic[];
  /** Topic ids that are fundamental, high-value concepts (documented basis: syllabus depth + centrality). */
  coreTopicIds: string[];
}

export interface SyllabusSubject {
  id: SubjectId;
  name: string;
  shortName: string;
  subjectCode: string;
  gradeLabel: string;
  areas: string[];
  chapters: SyllabusChapter[];
  sourceNote: string;
  sourceIds: string[];
}

export type SourceTier = 1 | 2 | 3 | 4 | 5;

export type SourceKind =
  | 'curriculum'
  | 'spec-grid'
  | 'model-paper'
  | 'board-paper'
  | 'terminal-paper'
  | 'repository'
  | 'analysis';

export interface Source {
  id: string;
  title: string;
  org: string;
  url: string;
  tier: SourceTier;
  kind: SourceKind;
  accessed: string;
  notes?: string;
}

export type ExamType = 'neb-board' | 'neb-model' | 'terminal';

export type QuestionType =
  | 'mcq'
  | 'definition'
  | 'explanation'
  | 'derivation'
  | 'numerical'
  | 'reaction'
  | 'programming'
  | 'diagram'
  | 'comparison'
  | 'short-answer'
  | 'long-answer'
  | 'conversion'
  | 'identification'
  | 'fill-blank';

/** One analyzed question paper (board / model / terminal). */
export interface PaperRecord {
  id: string;
  subject: SubjectId;
  label: string;
  examType: ExamType;
  bsYear: number;
  adYear: number;
  sourceId: string;
  /** 'verbatim' = question text read directly; 'concept' = only topic-level analysis was readable. */
  extraction: 'verbatim' | 'concept';
}

/** One extracted question/concept appearance in a paper. This is the atomic evidence unit. */
export interface EvidenceRecord {
  id: string;
  paperId: string;
  familyId: string;
  chapterId: string;
  topicId?: string;
  text: string;
  marks: number;
  questionType: QuestionType;
  extraction: 'verbatim' | 'concept';
  slot?: string;
  note?: string;
  /** Override: the specific source that produced this wording (defaults to the paper's sourceId). */
  sourceId?: string;
}

/** A question family: the underlying concept that unifies differently-worded questions. */
export interface QuestionFamily {
  id: string;
  subject: SubjectId;
  chapterId: string;
  concept: string;
  /** Documented wording variants that belong to this family (variation test). */
  aliases: string[];
}

export type CandidateOrigin = 'paper-derived' | 'syllabus-derived';

export type SpecSectionId = 'A' | 'B' | 'C';

/** A candidate question the predictor can rank. */
export interface QuestionCandidate {
  id: string;
  subject: SubjectId;
  chapterId: string;
  topicId?: string;
  familyId: string;
  text: string;
  marks: number;
  questionType: QuestionType;
  origin: CandidateOrigin;
  specSection: SpecSectionId;
  /** Only for MCQ candidates. */
  options?: string[];
  answerIndex?: number;
  /** Short model answer hint shown only in review mode (author-written, not paper evidence). */
  answerHint?: string;
  /** core | standard | supporting — documented conceptual-importance classification. */
  conceptual: 'core' | 'standard' | 'supporting';
}

export interface SpecSection {
  id: SpecSectionId;
  name: string;
  questionType: QuestionType;
  count: number;
  marksPerQuestion: number;
  internalChoice: 'none' | 'most' | 'some';
  /** Number of slots in this section that carry an "OR" alternative. */
  choiceSlots: number;
}

export interface SpecGrid {
  subject: SubjectId;
  id: string;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  /** 'verified' = reproduced from actual NEB papers; 'derived' = school-terminal adaptation (NOT official). */
  verification: 'verified' | 'derived';
  verifiedFromSourceIds: string[];
  lastVerified: string;
  note: string;
  sections: SpecSection[];
}

export type Priority = 'very-high' | 'high' | 'medium' | 'low';

export interface ScoreComponent {
  key: string;
  label: string;
  weight: number;
  points: number;
  detail: string;
}

export interface ScoredQuestion {
  candidate: QuestionCandidate;
  family?: QuestionFamily;
  score: number;
  priority: Priority;
  components: ScoreComponent[];
  evidenceLines: string[];
  /** Fraction of evidence layers that have real data (0..1). */
  coverage: number;
  boardAppearances: number;
  modelAppearances: number;
  terminalAppearances: number;
  distinctSources: number;
  latestYear?: number;
  chapterName: string;
  topicName?: string;
  /**
   * Personal (student/teacher) signal boost. Kept OUT of `score` so the evidence
   * score stays 100% source-based; add it to `score` only when ranking with "my signals".
   */
  personalBoost: number;
  personalFlags: SignalFlag[];
}

export type SignalFlag =
  | 'important'
  | 'very-important'
  | 'studied'
  | 'weak'
  | 'teacher-emphasized'
  | 'teacher-homework'
  | 'teacher-repeated';

export interface PersonalRecord {
  flags: SignalFlag[];
  note?: string;
  updatedAt: string;
}

export interface GeneratedQuestionSlot {
  number: string;
  marks: number;
  question: QuestionCandidate;
  alternative?: QuestionCandidate;
  section: SpecSectionId;
}

export interface GeneratedPaper {
  id: string;
  createdAt: string;
  subject: SubjectId;
  chapterIds: string[];
  gridId: string;
  gridNote: string;
  totalMarks: number;
  durationMinutes: number;
  slots: GeneratedQuestionSlot[];
  warnings: string[];
  /** PRNG seed so a paper can be reproduced exactly. */
  seed: number;
}

export interface AppSettings {
  defaultSubject: SubjectId;
  defaultTopN: number;
  includeDerivedGrid: boolean;
  /** Ranking mode used on the Predictor page. */
  rankBy: 'evidence' | 'evidence+personal';
  weights: Record<string, number>;
}

export interface AppState {
  personal: Record<string, PersonalRecord>;
  settings: AppSettings;
  savedPapers: GeneratedPaper[];
}
