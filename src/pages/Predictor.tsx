import { useMemo, useState } from 'react';
import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';
import { FlagButtons, PriorityBadge, ScoreBar, ScoreBreakdown, SubjectPicker } from '../components/shared';
import { predict } from '../engine/predictor';
import { getGridsForSubject } from '../data/specGrids';
import { SYLLABUS } from '../data/syllabus';
import type { SpecSectionId } from '../engine/types';

const SECTIONS: SpecSectionId[] = ['A', 'B', 'C'];

export default function Predictor() {
  const { subject } = useSubject();
  const { state, updateSettings } = useApp();

  const grids = getGridsForSubject(subject, state.settings.includeDerivedGrid);
  const [gridId, setGridId] = useState<string>(grids[0]?.id ?? '');
  const grid = grids.find((g) => g.id === gridId) ?? grids[0];

  const [search, setSearch] = useState('');
  const [sections, setSections] = useState<SpecSectionId[]>([]);
  const [marks, setMarks] = useState<number | undefined>(undefined);
  const [chapterIds, setChapterIds] = useState<string[]>([]);
  const [topN, setTopN] = useState<number>(state.settings.defaultTopN);

  const scored = useMemo(
    () =>
      predict({
        subject,
        grid,
        search: search || undefined,
        sections: sections.length ? sections : undefined,
        marks,
        chapterIds: chapterIds.length ? chapterIds : undefined,
        weights: state.settings.weights,
        personal: state.personal,
        rankBy: state.settings.rankBy,
        topN,
      }),
    [subject, grid, search, sections, marks, chapterIds, state.settings, state.personal, topN],
  );

  const toggleSection = (s: SpecSectionId) =>
    setSections((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleChapter = (id: string) =>
    setChapterIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      <div className="row">
        <div>
          <h2>Question Predictor</h2>
          <p className="lede">
            Ranked by a 100-point evidence score (syllabus, spec grid, board papers, model papers,
            recency, variation, mark pattern, conceptual weight, cross-source corroboration).
          </p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      <div className="card">
        <div className="row">
          <label className="field">
            Specification grid
            <select value={grid?.id ?? ''} onChange={(e) => setGridId(e.target.value)}>
              {grids.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title} — {g.totalMarks} marks
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            Ranking mode
            <select
              value={state.settings.rankBy}
              onChange={(e) =>
                updateSettings({ rankBy: e.target.value as 'evidence' | 'evidence+personal' })
              }
            >
              <option value="evidence">Evidence only (default)</option>
              <option value="evidence+personal">Evidence + my signals</option>
            </select>
          </label>

          <label className="field">
            Show top
            <input
              type="number"
              min={5}
              max={200}
              value={topN}
              onChange={(e) => setTopN(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>

          <label className="field" style={{ flex: 1, minWidth: 220 }}>
            Search text / concept
            <input
              type="search"
              placeholder="e.g. Bernoulli, SQL, inheritance…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <label className="field">
            Marks
            <select
              value={marks ?? ''}
              onChange={(e) => setMarks(e.target.value === '' ? undefined : Number(e.target.value))}
            >
              <option value="">any</option>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
            </select>
          </label>
        </div>

        <div className="row mt">
          <span className="q-meta">Group:</span>
          <div className="row tight">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className={`chip ${sections.includes(s) ? 'on' : ''}`}
                onClick={() => toggleSection(s)}
              >
                Group {s}
              </button>
            ))}
          </div>
          <span className="q-meta">Chapters:</span>
          <div className="chips">
            {SYLLABUS[subject].chapters.map((ch) => (
              <button
                key={ch.id}
                type="button"
                className={`chip ${chapterIds.includes(ch.id) ? 'on' : ''}`}
                onClick={() => toggleChapter(ch.id)}
                title={ch.name}
              >
                {ch.number}. {ch.name}
              </button>
            ))}
            {chapterIds.length > 0 ? (
              <button type="button" className="btn ghost small" onClick={() => setChapterIds([])}>
                clear chapters
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="muted small">
        Showing <strong>{scored.length}</strong> question{scored.length === 1 ? '' : 's'} · ranking:{' '}
        {state.settings.rankBy === 'evidence'
          ? 'evidence score only'
          : 'evidence score + personal boost'}
      </p>

      {scored.map((item, i) => (
        <div className={`card q-card ${item.priority}`} key={item.candidate.id}>
          <div className="row">
            <strong className="mono">#{i + 1}</strong>
            <PriorityBadge priority={item.priority} />
            <ScoreBar score={item.score} />
            <span className="badge">Group {item.candidate.specSection} · {item.candidate.marks} marks</span>
            <span className="badge">{item.candidate.conceptual}</span>
            <span className="badge">{item.chapterName}</span>
            <span className="badge">
              {item.candidate.origin === 'paper-derived' ? 'paper-derived' : 'syllabus-derived'}
            </span>
            <div className="spacer" />
            <span className="q-meta">{item.family?.concept}</span>
          </div>

          <p className="q-text">{item.candidate.text}</p>
          {item.topicName ? <p className="q-meta">Topic: {item.topicName}</p> : null}

          <details>
            <summary>Why this rank — score breakdown</summary>
            <ScoreBreakdown item={item} />
            <FlagButtons familyId={item.candidate.familyId} />
          </details>
        </div>
      ))}

      {scored.length === 0 ? (
        <div className="notice info">
          No candidate matches these filters. Clear the search text or chapter selection.
        </div>
      ) : null}
    </>
  );
}
