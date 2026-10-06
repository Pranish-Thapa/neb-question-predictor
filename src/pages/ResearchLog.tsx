import { useMemo } from 'react';
import { ALL_EVIDENCE, ALL_PAPERS, computeDbStats } from '../data/db';
import { SOURCES } from '../data/sources';
import { SPEC_GRIDS, validateGridTotals } from '../data/specGrids';
import { runAllValidations } from '../engine/validators';

const TIER_MEANING: Record<number, string> = {
  1: 'official NEB/CDC document',
  2: 'faithful reproduction/analysis of an official paper or model question',
  3: 'authentic school/college examination paper',
  4: 'established educational repository (secondary)',
  5: 'unverified / SEO content (never used as evidence)',
};

export default function ResearchLog() {
  const stats = useMemo(() => computeDbStats(), []);
  const issues = useMemo(() => runAllValidations(), []);
  const gridChecks = useMemo(() => validateGridTotals(), []);
  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warning');

  return (
    <>
      <h2>Research Log</h2>
      <p className="lede">
        The full, source-by-source research diary lives next to the code in{' '}
        <span className="mono">research/RESEARCH_LOG.md</span>. This page shows the same content in
        the app, plus live figures computed from the database.
      </p>

      <div className="stats">
        <div className="stat">
          <div className="value">{stats.papers}</div>
          <div className="label">papers analyzed ({stats.boardPapers} board · {stats.modelPapers} model)</div>
        </div>
        <div className="stat">
          <div className="value">{stats.evidence}</div>
          <div className="label">question/concept records ({stats.verbatimEvidence} verbatim)</div>
        </div>
        <div className="stat">
          <div className="value">{SOURCES.length}</div>
          <div className="label">registered sources with URLs and access dates</div>
        </div>
        <div className="stat">
          <div className="value">{stats.terminalEvidence}</div>
          <div className="label">terminal-paper records (insufficient data)</div>
        </div>
      </div>

      <div className="card">
        <h3>Papers actually analyzed</h3>
        <table>
          <thead>
            <tr>
              <th>Paper</th>
              <th>Type</th>
              <th>Year</th>
              <th>Extraction</th>
              <th>Records</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {ALL_PAPERS.map((p) => {
              const src = SOURCES.find((s) => s.id === p.sourceId);
              const recordCount = ALL_EVIDENCE.filter((e) => e.paperId === p.id).length;
              return (
                <tr key={p.id}>
                  <td>{p.label}</td>
                  <td>{p.examType}</td>
                  <td className="mono">{p.bsYear} / {p.adYear}</td>
                  <td>
                    <span className={`badge ${p.extraction === 'verbatim' ? 'ok' : ''}`}>{p.extraction}</span>
                  </td>
                  <td className="mono">{recordCount}</td>
                  <td className="small">
                    {src ? (
                      <a href={src.url} target="_blank" rel="noreferrer">
                        {src.org}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted small mt">
          “Records” above is the number of question/concept entries extracted from that paper;
          <span className="mono"> concept</span> extraction means only the topic-level analysis was
          machine-readable, so no verbatim wording is claimed.
        </p>
      </div>

      <div className="card">
        <h3>Verified specification grids</h3>
        <table>
          <thead>
            <tr>
              <th>Grid</th>
              <th>Structure</th>
              <th>Total</th>
              <th>Verification</th>
              <th>Arithmetic check</th>
            </tr>
          </thead>
          <tbody>
            {SPEC_GRIDS.map((g) => {
              const check = gridChecks.find((c) => c.gridId === g.id);
              return (
                <tr key={g.id}>
                  <td className="mono small">{g.id}</td>
                  <td className="small">
                    {g.sections.map((s) => `${s.count}×${s.marksPerQuestion} (${s.id})`).join(' + ')}
                  </td>
                  <td className="mono">{g.totalMarks}</td>
                  <td>
                    <span className={`badge ${g.verification === 'verified' ? 'ok' : 'warn'}`}>
                      {g.verification}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${check?.ok ? 'ok' : 'warn'}`}>
                      {check?.ok ? 'sections sum to total' : 'MISMATCH'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="muted small mt">{SPEC_GRIDS.map((g) => `${g.id}: ${g.note}`).join(' ')}</p>
      </div>

      <div className="card">
        <h3>Automated integrity checks</h3>
        <div className="row tight">
          <span className={`badge ${errors.length === 0 ? 'ok' : 'warn'}`}>
            {errors.length} errors
          </span>
          <span className={`badge ${warnings.length === 0 ? 'ok' : 'warn'}`}>
            {warnings.length} warnings
          </span>
          <span className="badge">{issues.length - errors.length - warnings.length} passed checks</span>
        </div>
        {errors.length + warnings.length > 0 ? (
          <ul className="small" style={{ paddingLeft: 18 }}>
            {[...errors, ...warnings].map((i) => (
              <li key={i.code + i.message}>
                <span className={`badge ${i.level === 'error' ? 'warn' : ''}`}>{i.level}</span>{' '}
                <span className="mono">{i.code}</span> — {i.message}
              </li>
            ))}
          </ul>
        ) : (
          <div className="notice ok">
            All checks pass: every record points at a real paper, family and syllabus chapter; grid
            arithmetic matches; no excluded subject appears anywhere; no verbatim record was written
            without real source text.
          </div>
        )}
      </div>

      <div className="card">
        <h3>Source registry</h3>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Source</th>
              <th>Kind</th>
              <th>Accessed</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {SOURCES.map((s) => (
              <tr key={s.id}>
                <td className="mono">{s.tier}</td>
                <td className="small">
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title}
                  </a>
                  <div className="muted">{s.org}</div>
                </td>
                <td className="small">{s.kind}</td>
                <td className="mono small">{s.accessed}</td>
                <td className="muted small">{s.notes ?? TIER_MEANING[s.tier]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Data-quality commitments</h3>
        <ol className="muted small" style={{ paddingLeft: 18 }}>
          <li>No question, frequency count, source or grid cell was invented; every record points to a source ID with a URL and access date.</li>
          <li>Topic-level analyses are stored as concept evidence, never as verbatim questions.</li>
          <li>Frequency counts are computed at runtime from the records that exist.</li>
          <li>Excluded subjects appear nowhere in the data — an automated test enforces this.</li>
          <li>Priority labels (🔥/🟠/🟡/⚪) are thresholds, never probabilities.</li>
          <li>Terminal evidence is reported as “Insufficient verified data” until real terminal records are added.</li>
        </ol>
      </div>
    </>
  );
}
