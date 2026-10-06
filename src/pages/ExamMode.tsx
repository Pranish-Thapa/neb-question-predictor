import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppProvider';
import { SubjectPicker } from '../components/shared';
import { ALL_FAMILIES } from '../data/db';
import type { GeneratedPaper } from '../engine/types';

const FAMILY_CONCEPT = new Map(ALL_FAMILIES.map((f) => [f.id, f.concept]));
const familyConcept = (id: string): string => FAMILY_CONCEPT.get(id) ?? id;

type Phase = 'setup' | 'running' | 'review';

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(h)}:${p(m)}:${p(s)}`;
}

export default function ExamMode() {
  const { state, draftPaper, setDraftPaper } = useApp();

  const [selectedId, setSelectedId] = useState<string>(draftPaper?.id ?? '');
  const papers = useMemo(() => {
    const list = [...state.savedPapers];
    if (draftPaper && !list.some((p) => p.id === draftPaper.id)) list.unshift(draftPaper);
    return list;
  }, [state.savedPapers, draftPaper]);

  const paper: GeneratedPaper | undefined =
    draftPaper && draftPaper.id === selectedId
      ? draftPaper
      : (papers.find((p) => p.id === selectedId) ?? draftPaper ?? papers[0]);

  const [phase, setPhase] = useState<Phase>('setup');
  const [remaining, setRemaining] = useState(0);
  const [mcq, setMcq] = useState<Record<string, number | undefined>>({});
  const [written, setWritten] = useState<Record<string, string>>({});
  const [selfMarks, setSelfMarks] = useState<Record<string, number>>({});

  useEffect(() => {
    if (phase !== 'running') return;
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === 'running' && remaining === 0) setPhase('review');
  }, [phase, remaining]);

  if (!paper) {
    return (
      <>
        <div className="row">
          <div>
            <h2>Exam Simulator</h2>
            <p className="lede">No paper available yet.</p>
          </div>
          <div className="spacer" />
          <SubjectPicker />
        </div>
        <div className="notice info">
          Generate a paper first in the <Link to="/paper">Paper Generator</Link> (or save one), then
          come back here to sit it under a timer.
        </div>
      </>
    );
  }

  const start = () => {
    setMcq({});
    setWritten({});
    setSelfMarks({});
    setRemaining(paper.durationMinutes * 60);
    setPhase('running');
  };

  const finish = () => setPhase('review');

  const graded = phase === 'review';
  const mcqMarks = paper.slots.reduce((sum, slot) => {
    if (slot.question.questionType !== 'mcq') return sum;
    const chosen = mcq[slot.number];
    const correct = slot.question.answerIndex;
    return sum + (chosen !== undefined && chosen === correct ? slot.marks : 0);
  }, 0);
  const writtenMarks = paper.slots.reduce((sum, slot) => {
    if (slot.question.questionType === 'mcq') return sum;
    return sum + Math.min(slot.marks, Math.max(0, selfMarks[slot.number] ?? 0));
  }, 0);
  const totalEarned = mcqMarks + writtenMarks;
  const percentage = paper.totalMarks ? Math.round((totalEarned / paper.totalMarks) * 100) : 0;

  return (
    <>
      <div className="row">
        <div>
          <h2>Exam Simulator</h2>
          <p className="lede">
            {paper.gridId} · {paper.totalMarks} marks · {paper.durationMinutes} minutes · seed{' '}
            {paper.seed}
          </p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      {paper.warnings.length > 0 && !graded ? (
        <div className="notice">
          <strong>Paper notes:</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
            {paper.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {phase === 'setup' ? (
        <div className="card">
          <div className="row">
            <label className="field" style={{ minWidth: 320 }}>
              Paper
              <select value={paper.id} onChange={(e) => setSelectedId(e.target.value)}>
                {papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.subject} · {p.gridId} · {p.totalMarks} marks · {new Date(p.createdAt).toLocaleString()}
                  </option>
                ))}
              </select>
            </label>
            <div className="spacer" />
            <button type="button" className="btn" onClick={start}>
              Start exam ({paper.durationMinutes} min)
            </button>
          </div>
          <ul className="muted small" style={{ paddingLeft: 18 }}>
            <li>Group A is auto-graded; written answers are self-marked in review mode.</li>
            <li>The clock stops automatically at 00:00 and the paper is submitted for review.</li>
            <li>Answer hints and the evidence behind each question appear only after submission.</li>
          </ul>
          {draftPaper ? (
            <button
              type="button"
              className="btn ghost small"
              onClick={() => {
                setDraftPaper(undefined);
                setSelectedId('');
              }}
            >
              clear temporary paper
            </button>
          ) : null}
        </div>
      ) : null}

      {phase === 'running' ? (
        <div className="card">
          <div className="row">
            <span className={`timer ${remaining < 300 ? 'warn' : ''}`}>{fmt(remaining)}</span>
            <span className="q-meta">remaining of {paper.durationMinutes} minutes</span>
            <div className="spacer" />
            <button type="button" className="btn secondary" onClick={finish}>
              Submit now
            </button>
          </div>
        </div>
      ) : null}

      {phase !== 'setup' ? (
        (['A', 'B', 'C'] as const).map((sec) => {
          const slots = paper.slots.filter((s) => s.section === sec);
          if (!slots.length) return null;
          return (
            <div className="card" key={sec}>
              <h3>Group {sec}</h3>
              {slots.map((slot) => {
                const isMcq = slot.question.questionType === 'mcq';
                const chosen = mcq[slot.number];
                const correct = slot.question.answerIndex;
                const isCorrect = chosen !== undefined && chosen === correct;
                return (
                  <div className="paper-q" key={slot.number}>
                    <div className="head">
                      <strong>Q{slot.number}</strong>
                      <span>{slot.marks} marks</span>
                      <span>{slot.question.questionType}</span>
                      {graded && isMcq ? (
                        <span className={`badge ${isCorrect ? 'ok' : 'warn'}`}>
                          {isCorrect ? `correct +${slot.marks}` : chosen === undefined ? 'not answered' : 'incorrect'}
                        </span>
                      ) : null}
                    </div>

                    <div className="body">{slot.question.text}</div>
                    {slot.alternative ? (
                      <div className="body">
                        <span className="or">OR</span> {slot.alternative.text}
                      </div>
                    ) : null}

                    {isMcq ? (
                      <div className="mcq-options">
                        {(slot.question.options ?? []).map((opt, idx) => {
                          const state_ =
                            graded && idx === correct
                              ? 'correct'
                              : graded && chosen === idx
                                ? 'wrong'
                                : '';
                          return (
                            <label key={opt + idx} className={state_}>
                              <input
                                type="radio"
                                name={`q-${slot.number}`}
                                disabled={graded}
                                checked={chosen === idx}
                                onChange={() => setMcq((prev) => ({ ...prev, [slot.number]: idx }))}
                              />
                              <span>
                                <strong>{String.fromCharCode(65 + idx)}.</strong> {opt}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt">
                        <textarea
                          placeholder="Your answer…"
                          value={written[slot.number] ?? ''}
                          disabled={graded}
                          onChange={(e) =>
                            setWritten((prev) => ({ ...prev, [slot.number]: e.target.value }))
                          }
                        />
                        {graded ? (
                          <div className="row tight mt">
                            <span className="q-meta">Self-mark (0–{slot.marks}):</span>
                            <input
                              type="number"
                              min={0}
                              max={slot.marks}
                              value={selfMarks[slot.number] ?? 0}
                              onChange={(e) =>
                                setSelfMarks((prev) => ({
                                  ...prev,
                                  [slot.number]: Math.max(
                                    0,
                                    Math.min(slot.marks, Number(e.target.value) || 0),
                                  ),
                                }))
                              }
                              style={{ width: 90 }}
                            />
                            <details style={{ borderTop: 'none', marginTop: 0 }}>
                              <summary>Model answer hint</summary>
                              <p className="small muted">
                                {slot.question.answerHint ??
                                  'Write the answer in your own words using the syllabus wording of this concept, then compare it with your textbook. Marks are yours to award — be strict with yourself.'}
                              </p>
                              <p className="small muted">
                                Concept: <strong>{familyConcept(slot.question.familyId)}</strong>
                                {slot.alternative ? ' (the OR option carries the same marks)' : ''}
                              </p>
                            </details>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : null}

      {graded ? (
        <div className="card">
          <h3>Result</h3>
          <div className="stats">
            <div className="stat">
              <div className="value">{mcqMarks}</div>
              <div className="label">Group A auto-graded marks</div>
            </div>
            <div className="stat">
              <div className="value">{writtenMarks}</div>
              <div className="label">written (self-marked)</div>
            </div>
            <div className="stat">
              <div className="value">
                {totalEarned}/{paper.totalMarks}
              </div>
              <div className="label">total</div>
            </div>
            <div className="stat">
              <div className="value">{percentage}%</div>
              <div className="label">percentage</div>
            </div>
          </div>
          <p className="q-meta mt">
            Written marks are whatever you awarded yourself — this simulator never claims an official
            pass mark. Re-run the same paper with seed {paper.seed} to compare attempts.
          </p>
          <div className="row tight">
            <button type="button" className="btn" onClick={start}>
              Retake
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setPhase('setup');
                setDraftPaper(undefined);
              }}
            >
              Choose another paper
            </button>
            <Link className="btn ghost" to="/paper">
              Generate a new paper
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
