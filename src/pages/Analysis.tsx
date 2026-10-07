import { useMemo, useState } from 'react';
import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';
import { PriorityBadge, ScoreBreakdown, SubjectPicker } from '../components/shared';
import { WEIGHT_LABELS, buildIndex, scoreCandidate } from '../engine/scoring';
import { predict } from '../engine/predictor';
import { getGridsForSubject } from '../data/specGrids';
import { SOURCES } from '../data/sources';
import type { ScoredQuestion } from '../engine/types';

const sourceById = new Map(SOURCES.map((s) => [s.id, s]));

export default function Analysis() {
  const { subject } = useSubject();
  const { state } = useApp();
  const index = buildIndex();

  const grids = getGridsForSubject(subject, state.settings.includeDerivedGrid);
  const grid = grids[0];

  const [search, setSearch] = useState('');
  const results = useMemo(
    () => predict({ subject, grid, search: search || undefined, weights: state.settings.weights, topN: 8 }),
    [subject, grid, search, state.settings.weights],
  );

  const [selected, setSelected] = useState<string | undefined>(undefined);
  const item: ScoredQuestion | undefined = useMemo(() => {
    const hit = results.find((r) => r.candidate.id === selected) ?? results[0];
    if (!hit) return undefined;
    return scoreCandidate(hit.candidate, index, {
      subject,
      grid,
      weights: state.settings.weights,
      personal: state.personal[hit.candidate.familyId],
    });
  }, [results, selected, index, subject, grid, state.settings.weights, state.personal]);

  const evidence = item ? index.evidenceByFamily.get(item.candidate.familyId) ?? [] : [];

  return (
    <>
      <div className="row">
        <div>
          <h2>Why this rank?</h2>
          <p className="lede">
            The score is a transparent sum of ten components. Nothing is hidden: every point has a
            label, a maximum, and a plain-language reason.
          </p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      <div className="card">
        <h3>The ten components</h3>
        <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Max points</th>
              <th>How it earns points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{WEIGHT_LABELS.syllabus}</td>
              <td className="mono">{state.settings.weights.syllabus}</td>
              <td className="muted">chapter in syllabus (5) + topic in syllabus (5) + core concept (5)</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.spec}</td>
              <td className="mono">{state.settings.weights.spec}</td>
              <td className="muted">section exists in the selected grid (8) + marks match the section (7)</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.board}</td>
              <td className="mono">{state.settings.weights.board}</td>
              <td className="muted">scaled by verified board-paper appearances (full marks at 3+)</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.model}</td>
              <td className="mono">{state.settings.weights.model}</td>
              <td className="muted">scaled by official model-question appearances (full marks at 2+)</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.terminal}</td>
              <td className="mono">{state.settings.weights.terminal}</td>
              <td className="muted">scaled by terminal-paper appearances — subjects without terminal records report “Insufficient verified data”</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.recency}</td>
              <td className="mono">{state.settings.weights.recency}</td>
              <td className="muted">how recent the concept's latest verified appearance is</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.variation}</td>
              <td className="mono">{state.settings.weights.variation}</td>
              <td className="muted">number of distinct wordings recorded (full marks at 3+)</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.markPattern}</td>
              <td className="mono">{state.settings.weights.markPattern}</td>
              <td className="muted">was this concept ever seen at the same mark value?</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.conceptual}</td>
              <td className="mono">{state.settings.weights.conceptual}</td>
              <td className="muted">core (5) / standard (3) / supporting (1) classification</td>
            </tr>
            <tr>
              <td>{WEIGHT_LABELS.crossSource}</td>
              <td className="mono">{state.settings.weights.crossSource}</td>
              <td className="muted">independent sources corroborating the concept (full marks at 3+)</td>
            </tr>
          </tbody>
        </table>
        </div>

        <div className="grid-2 mt">
          <div className="notice">
            <strong>Priority thresholds:</strong> 🔥 Very high ≥ 80 · 🟠 High ≥ 65 · 🟡 Medium ≥ 45 ·
            ⚪ Low &lt; 45. These are labels on the score — not probabilities, and not a guarantee that
            a question will appear.
          </div>
          <div className="notice ok">
            <strong>Coverage</strong> = the share of evidence layers that actually have data for this
            concept (syllabus, spec grid, board, model, terminal, any dated record). A low coverage
            means “little evidence”, not “unimportant”.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="row">
          <label className="field" style={{ flex: 1, minWidth: 260 }}>
            Pick a question to audit
            <input
              type="search"
              placeholder="search a concept, chapter or wording…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected(undefined);
              }}
            />
          </label>
        </div>
        <div className="chips mt">
          {results.map((r) => (
            <button
              key={r.candidate.id}
              type="button"
              className={`chip ${item?.candidate.id === r.candidate.id ? 'on' : ''}`}
              onClick={() => setSelected(r.candidate.id)}
            >
              {r.score} · {r.candidate.text.slice(0, 46)}
              {r.candidate.text.length > 46 ? '…' : ''}
            </button>
          ))}
        </div>
        {results.length === 0 ? <p className="muted small mt">No matching question.</p> : null}
      </div>

      {item ? (
        <div className={`card q-card ${item.priority}`}>
          <div className="row">
            <PriorityBadge priority={item.priority} />
            <strong className="mono">{item.score}/100</strong>
            <span className="badge">Group {item.candidate.specSection} · {item.candidate.marks} marks</span>
            <span className="badge">{item.chapterName}</span>
            <span className="badge">{item.candidate.conceptual}</span>
          </div>
          <p className="q-text">{item.candidate.text}</p>
          <ScoreBreakdown item={item} />

          <h3>Evidence trail</h3>
          {evidence.length === 0 ? (
            <p className="muted small">
              This concept has no verified paper record yet — its score comes from syllabus and
              spec-grid fit only.
            </p>
          ) : (
            <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Paper</th>
                  <th>Slot</th>
                  <th>Marks</th>
                  <th>Extraction</th>
                  <th>Recorded wording / topic</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((ev) => {
                  const paper = index.paperById.get(ev.paperId);
                  const src = sourceById.get(ev.sourceId ?? paper?.sourceId ?? '');
                  return (
                    <tr key={ev.id}>
                      <td>{paper?.label ?? ev.paperId}</td>
                      <td className="mono small">{ev.slot ?? '—'}</td>
                      <td className="mono">{ev.marks > 0 ? ev.marks : 'not readable'}</td>
                      <td>
                        <span className={`badge ${ev.extraction === 'verbatim' ? 'ok' : ''}`}>
                          {ev.extraction}
                        </span>
                      </td>
                      <td className="small">
                        {ev.text}
                        {ev.note ? <div className="muted">{ev.note}</div> : null}
                      </td>
                      <td className="small">
                        {src ? (
                          <a href={src.url} target="_blank" rel="noreferrer">
                            {src.org}
                          </a>
                        ) : (
                          '—'
                        )}
                        {src ? <div className="muted">tier {src.tier} · {src.accessed}</div> : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
