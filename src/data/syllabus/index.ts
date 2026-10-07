import type { SubjectId, SyllabusChapter, SyllabusSubject, SyllabusTopic } from '../../engine/types';
import { PHYSICS } from './physics';
import { CHEMISTRY } from './chemistry';
import { COMPUTER_SCIENCE } from './computerScience';
import { ACCOUNTANCY } from './accountancy';
import { ECONOMICS } from './economics';

export { PHYSICS, CHEMISTRY, COMPUTER_SCIENCE, ACCOUNTANCY, ECONOMICS };

export const SYLLABUS: Record<SubjectId, SyllabusSubject> = {
  physics: PHYSICS,
  chemistry: CHEMISTRY,
  cs: COMPUTER_SCIENCE,
  accountancy: ACCOUNTANCY,
  economics: ECONOMICS,
};

export const SUBJECT_ORDER: SubjectId[] = ['physics', 'chemistry', 'cs', 'accountancy', 'economics'];

/** Stream grouping used by the subject picker (Science / Commerce). */
export const SUBJECT_GROUPS: { label: string; subjects: SubjectId[] }[] = [
  { label: 'Science', subjects: ['physics', 'chemistry', 'cs'] },
  { label: 'Commerce', subjects: ['accountancy', 'economics'] },
];

export function groupOf(subject: SubjectId): string {
  return SUBJECT_GROUPS.find((g) => g.subjects.includes(subject))?.label ?? 'Science';
}

/** Hard exclusion list — these subjects must never appear anywhere in this app. */
export const EXCLUDED_SUBJECTS = ['mathematics', 'math', 'english', 'nepali', 'biology'];

export function getChapter(subject: SubjectId, chapterId: string): SyllabusChapter | undefined {
  return SYLLABUS[subject].chapters.find((c) => c.id === chapterId);
}

export function getTopic(subject: SubjectId, chapterId: string, topicId?: string): SyllabusTopic | undefined {
  if (!topicId) return undefined;
  return getChapter(subject, chapterId)?.topics.find((t) => t.id === topicId);
}

export function chapterExists(subject: SubjectId, chapterId: string): boolean {
  return getChapter(subject, chapterId) !== undefined;
}

export function topicExists(subject: SubjectId, chapterId: string, topicId?: string): boolean {
  if (!topicId) return true;
  return getTopic(subject, chapterId, topicId) !== undefined;
}
