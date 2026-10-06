import type { SubjectId, SyllabusChapter, SyllabusSubject, SyllabusTopic } from '../../engine/types';

/** Compact chapter literal used while authoring the syllabus database. */
export interface ChapterLiteral {
  n: number;
  area: string;
  name: string;
  hours: number;
  /** [topic name, subtopics[]] */
  topics: [string, string[]][];
  /** 1-based topic indexes flagged as core/fundamental concepts. */
  core: number[];
}

export interface SubjectLiteral {
  id: SubjectId;
  name: string;
  shortName: string;
  subjectCode: string;
  gradeLabel: string;
  areas: string[];
  chapters: ChapterLiteral[];
  sourceNote: string;
  sourceIds: string[];
  prefix: string;
}

export function buildSubject(l: SubjectLiteral): SyllabusSubject {
  const chapters: SyllabusChapter[] = l.chapters.map((c) => {
    const chapterId = `${l.prefix}-${String(c.n).padStart(2, '0')}`;
    const topics: SyllabusTopic[] = c.topics.map((t, i) => ({
      id: `${chapterId}-t${i + 1}`,
      name: t[0],
      subtopics: t[1],
    }));
    return {
      id: chapterId,
      number: c.n,
      name: c.name,
      area: c.area,
      teachingHours: c.hours,
      topics,
      coreTopicIds: c.core.map((i) => `${chapterId}-t${i}`),
    };
  });

  return {
    id: l.id,
    name: l.name,
    shortName: l.shortName,
    subjectCode: l.subjectCode,
    gradeLabel: l.gradeLabel,
    areas: l.areas,
    chapters,
    sourceNote: l.sourceNote,
    sourceIds: l.sourceIds,
  };
}
