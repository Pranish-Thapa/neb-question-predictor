import { useState } from 'react';
import { DEFAULT_WEIGHTS, WEIGHT_LABELS } from '../engine/scoring';
import { DEFAULT_SETTINGS, useApp } from '../store/AppProvider';
import { SYLLABUS, SUBJECT_GROUPS } from '../data/syllabus';
import type { SubjectId } from '../engine/types';

export default function SettingsPage() {
  const { state, updateSettings, resetAll } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const weights = state.settings.weights;
  const sum = Object.values(weights).reduce((t, v) => t + v, 0);

  const setWeight = (key: string, value: number) =>
    updateSettings({ weights: { ...weights, [key]: Number.isFinite(value) ? value : 0 } });

  return (
    <>
      <h2>Settings</h2>
      <p className="lede">
        Everything here is stored in this browser only (localStorage key{' '}
        <span className="mono">neb-qp-state-v1</span>). Nothing is uploaded anywhere.
      </p>

      <div className="card">
        <h3>Defaults</h3>
        <div className="row">
          <label className="field">
            Default subject
            <select
              value={state.settings.defaultSubject}
              onChange={(e) => updateSettings({ defaultSubject: e.target.value as SubjectId })}
            >
              {SUBJECT_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.subjects.map((id) => (
                    <option key={id} value={id}>
                      {SYLLABUS[id].name} ({SYLLABUS[id].subjectCode})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="field">
            Questions per page
            <input
              type="number"
              min={5}
              max={200}
              value={state.settings.defaultTopN}
              onChange={(e) => updateSettings({ defaultTopN: Math.max(1, Number(e.target.value) || 1) })}
            />
          </label>

          <label className="field">
            Ranking mode
            <select
              value={state.settings.rankBy}
              onChange={(e) => updateSettings({ rankBy: e.target.value as 'evidence' | 'evidence+personal' })}
            >
              <option value="evidence">Evidence only</option>
              <option value="evidence+personal">Evidence + my signals</option>
            </select>
          </label>
        </div>

        <div className="notice">
          <label className="row tight" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.settings.includeDerivedGrid}
              onChange={(e) => updateSettings({ includeDerivedGrid: e.target.checked })}
            />
            <span>
              <strong>Enable the derived 75-mark Computer Science grid</strong> — every paper made
              from it is labelled <em>DERIVED — not an official NEB grid</em>. Only turn this on if
              your school actually sets a 75-mark CS terminal.
            </span>
          </label>
        </div>
      </div>

      <div className="card">
        <h3>Score weights</h3>
        <p className="muted small">
          The evidence score is the weighted sum of ten components. Defaults sum to{' '}
          <strong>100</strong>; if your weights sum to something else the score simply scales with
          them (the app warns you below).
        </p>
        <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Weight</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(DEFAULT_WEIGHTS).map((key) => (
              <tr key={key}>
                <td>{WEIGHT_LABELS[key] ?? key}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={weights[key] ?? 0}
                    onChange={(e) => setWeight(key, Number(e.target.value))}
                    style={{ width: 90 }}
                  />
                </td>
                <td className="mono">{DEFAULT_WEIGHTS[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="row tight mt">
          <span className={`badge ${sum === 100 ? 'ok' : 'warn'}`}>total = {sum}</span>
          <button
            type="button"
            className="btn secondary small"
            onClick={() => updateSettings({ weights: { ...DEFAULT_WEIGHTS } })}
          >
            Restore default weights
          </button>
          <button
            type="button"
            className="btn ghost small"
            onClick={() => updateSettings({ weights: { ...DEFAULT_SETTINGS.weights } })}
          >
            Reset to factory settings
          </button>
        </div>
        {sum !== 100 ? (
          <div className="notice">
            Weights sum to {sum}, not 100 — scores will be out of {sum} instead of 100. Priority
            thresholds (80 / 65 / 45) are unchanged.
          </div>
        ) : null}
      </div>

      <div className="card">
        <h3>Local data</h3>
        <p className="muted small">
          {Object.keys(state.personal).length} concept(s) flagged · {state.savedPapers.length}{' '}
          saved paper(s).
        </p>
        <div className="row tight">
          {!confirmReset ? (
            <button type="button" className="btn secondary" onClick={() => setConfirmReset(true)}>
              Clear all local data…
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
              >
                Yes, delete my flags, settings and saved papers
              </button>
              <button type="button" className="btn ghost" onClick={() => setConfirmReset(false)}>
                cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <h3>About this build</h3>
        <ul className="muted small" style={{ paddingLeft: 18 }}>
          <li>React + TypeScript + Vite, runs entirely in your browser, no server calls.</li>
          <li>Data lives in <span className="mono">src/data</span>; scoring in <span className="mono">src/engine</span>.</li>
          <li>
            Re-run <span className="mono">npm test</span> after editing data — the tests check
            evidence integrity, grid arithmetic, excluded subjects and paper totals.
          </li>
        </ul>
      </div>
    </>
  );
}
