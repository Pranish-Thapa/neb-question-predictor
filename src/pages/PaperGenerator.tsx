import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';
import { SubjectPicker } from '../components/shared';
import { generatePaper, gridSummary } from '../engine/paperGenerator';
import { getGridsForSubject } from '../data/specGrids';
import { SYLLABUS } from '../data/syllabus';
import type { GeneratedPaper } from '../engine/types';

export default function PaperGenerator() {
  const { subject } = useSubject();
  const { state, setDraftPaper, savePaper, deletePaper } = useApp();
  const navigate = useNavigate();

  const grids = getGridsForSubject(subject, state.settings.includeDerivedGrid);
  const [gridId, setGridId] = useState<string>(grids[0]?.id ?? '');
  const grid = grids.find((g) => g.id === gridId) ?? grids[0];
  const [chapterIds, setChapterIds] = useState<string[]>([]);
  const [seedText, setSeedText] = useState('');
  const [paper, setPaper] = useState<GeneratedPaper | undefined>();
  const [error, setError] = useState('');

  const toggleChapter = (id: string) =>
    setChapterIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const run = () => {
    setError('');
    try {
      const seed = seedText.trim() === '' ? undefined : Number(seedText);
      if (seed !== undefined && !Number.isFinite(seed)) throw new Error('Seed must be a number');
      const p = generatePaper({
        subject,
        gridId: grid?.id ?? '',
        chapterIds: chapterIds.length ? chapterIds : undefined,
        weights: state.settings.weights,
        personal: state.personal,
        rankBy: state.settings.rankBy,
        seed,
      });
      setPaper(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPaper(undefined);
    }
  };

  const startExam = (p: GeneratedPaper) => {
    setDraftPaper(p);
    navigate('/exam');
  };

  return (
    <>
      <div className="row">
        <div>
          <h2>Paper Generator</h2>
          <p className="lede">
            Builds a full paper from the selected specification grid: exact total marks, one concept
            per slot, and “OR” alternatives where the grid allows them.
          </p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      <div className="card">
        <div className="row">
          <label className="field" style={{ minWidth: 320 }}>
            Specification grid
            <select value={grid?.id ?? ''} onChange={(e) => setGridId(e.target.value)}>
              {grids.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title} — {g.totalMarks} marks ({g.verification})
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            Seed (optional, for reproducibility)
            <input
              type="text"
              placeholder="random"
              value={seedText}
              onChange={(e) => setSeedText(e.target.value)}
            />
          </label>

          <div className="spacer" />
          <button type="button" className="btn" onClick={run} disabled={!grid}>
            Generate paper
          </button>
        </div>

        {grid ? (
          <p className="muted small mt">
            {gridSummary(grid)} · {grid.durationMinutes} minutes ·{' '}
            <span className={`badge ${grid.verification === 'verified' ? 'ok' : 'warn'}`}>
              {grid.verification === 'verified' ? 'verified against real papers' : 'DERIVED — not official'}
            </span>
          </p>
        ) : null}

        <div className="row mt">
          <span className="q-meta">Limit to chapters (optional):</span>
          <div className="chips">
            {SYLLABUS[subject].chapters.map((ch) => (
              <button
                key={ch.id}
                type="button"
                className={`chip ${chapterIds.includes(ch.id) ? 'on' : ''}`}
                onClick={() => toggleChapter(ch.id)}
              >
                {ch.number}. {ch.name}
              </button>
            ))}
            {chapterIds.length > 0 ? (
              <button type="button" className="btn ghost small" onClick={() => setChapterIds([])}>
                clear
              </button>
            ) : null}
          </div>
        </div>

        {error ? <div className="notice">{error}</div> : null}
        {chapterIds.length > 0 && paper ? (
          <div className="notice info">
            Generated from {chapterIds.length} selected chapter(s) only — check the warnings below.
          </div>
        ) : null}
      </div>

      {paper ? (
        <div className="card">
          <div className="row">
            <h3 style={{ margin: 0 }}>Generated paper</h3>
            <div className="spacer" />
            <span className="badge">{paper.totalMarks} marks</span>
            <span className="badge">{paper.durationMinutes} min</span>
            <span className="badge">seed {paper.seed}</span>
            <button type="button" className="btn secondary small" onClick={() => savePaper(paper)}>
              Save
            </button>
            <button type="button" className="btn small" onClick={() => startExam(paper)}>
              Start exam
            </button>
          </div>

          {paper.warnings.length > 0 ? (
            <div className="notice">
              <strong>Generator notes:</strong>
              <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                {paper.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="notice ok">
              No warnings: every slot of the grid was filled, totals match exactly, and no concept
              repeats inside the paper.
            </div>
          )}

          <p className="q-meta">{paper.gridNote}</p>

          {(['A', 'B', 'C'] as const).map((sec) => {
            const slots = paper.slots.filter((s) => s.section === sec);
            if (!slots.length) return null;
            return (
              <div key={sec}>
                <h3>Group {sec}</h3>
                {slots.map((slot) => (
                  <div className="paper-q" key={slot.number}>
                    <div className="head">
                      <strong>Q{slot.number}</strong>
                      <span>{slot.marks} marks</span>
                      <span>{slot.question.questionType}</span>
                    </div>
                    <div className="body">{slot.question.text}</div>
                    {slot.alternative ? (
                      <div className="body">
                        <span className="or">OR</span> {slot.alternative.text}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="card">
        <h3>Saved papers</h3>
        {state.savedPapers.length === 0 ? (
          <p className="muted small">No saved papers yet. Generate one and press “Save”.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Subject</th>
                <th>Grid</th>
                <th>Marks</th>
                <th>Questions</th>
                <th>Warnings</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {state.savedPapers.map((p) => (
                <tr key={p.id}>
                  <td className="mono small">{new Date(p.createdAt).toLocaleString()}</td>
                  <td>{p.subject}</td>
                  <td className="mono small">{p.gridId}</td>
                  <td className="mono">{p.totalMarks}</td>
                  <td className="mono">{p.slots.length}</td>
                  <td className="small">{p.warnings.length}</td>
                  <td className="row tight">
                    <button
                      type="button"
                      className="btn small secondary"
                      onClick={() => startExam(p)}
                    >
                      Exam
                    </button>
                    <button
                      type="button"
                      className="btn small ghost"
                      onClick={() => deletePaper(p.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
