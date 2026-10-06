import type { ScoredQuestion, SignalFlag, SubjectId } from '../engine/types';
import { PRIORITY_LABEL } from '../engine/scoring';
import { SYLLABUS, SUBJECT_ORDER } from '../data/syllabus';
import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';

export function SubjectPicker() {
  const { subject, setSubject } = useSubject();
  return (
    <label className="field">
      Subject
      <select value={subject} onChange={(e) => setSubject(e.target.value as SubjectId)}>
        {SUBJECT_ORDER.map((id) => (
          <option key={id} value={id}>
            {SYLLABUS[id].name} ({SYLLABUS[id].subjectCode})
          </option>
        ))}
      </select>
    </label>
  );
}

export function PriorityBadge({ priority }: { priority: ScoredQuestion['priority'] }) {
  return <span className={`badge ${priority}`}>{PRIORITY_LABEL[priority]}</span>;
}

export function ScoreBar({ score }: { score: number }) {
  return (
    <div className="row tight">
      <div className="score-bar" style={{ width: 110 }}>
        <span style={{ width: `${Math.max(2, Math.min(100, score))}%` }} />
      </div>
      <strong className="mono">{score}</strong>
    </div>
  );
}

const ALL_FLAGS: SignalFlag[] = [
  'very-important',
  'important',
  'teacher-emphasized',
  'teacher-repeated',
  'teacher-homework',
  'weak',
  'studied',
];

export function FlagButtons({ familyId }: { familyId: string }) {
  const { state, toggleFlag, clearPersonal } = useApp();
  const record = state.personal[familyId];
  const active = new Set(record?.flags ?? []);
  return (
    <div className="row tight" style={{ marginTop: 8 }}>
      <span className="q-meta">My signals:</span>
      {ALL_FLAGS.map((f) => (
        <button
          key={f}
          type="button"
          className={`chip ${active.has(f) ? 'on' : ''}`}
          onClick={() => toggleFlag(familyId, f)}
        >
          {f}
        </button>
      ))}
      {record ? (
        <button type="button" className="btn ghost small" onClick={() => clearPersonal(familyId)}>
          clear
        </button>
      ) : null}
    </div>
  );
}

export function ScoreBreakdown({ item }: { item: ScoredQuestion }) {
  return (
    <>
      <ul className="comp">
        {item.components.map((c) => (
          <li key={c.key}>
            <span className="k">
              {c.label} <span className="muted">(max {c.weight})</span>
            </span>
            <span className="p">{c.points}</span>
            <span className="muted small">{c.detail}</span>
          </li>
        ))}
      </ul>
      <div className="row tight mt small">
        <span className="badge">coverage {Math.round(item.coverage * 100)}%</span>
        <span className="badge">board ×{item.boardAppearances}</span>
        <span className="badge">model ×{item.modelAppearances}</span>
        <span className="badge">terminal ×{item.terminalAppearances}</span>
        <span className="badge">sources {item.distinctSources}</span>
        {item.latestYear ? <span className="badge">latest {item.latestYear}</span> : null}
        {item.personalBoost > 0 ? (
          <span className="badge warn">my signals +{item.personalBoost}</span>
        ) : null}
      </div>
      {item.evidenceLines.length > 0 ? (
        <ul className="evidence">
          {item.evidenceLines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : (
        <p className="q-meta mt">
          No verified paper appearance recorded for this concept yet — it is ranked on syllabus and
          spec-grid fit only.
        </p>
      )}
    </>
  );
}
