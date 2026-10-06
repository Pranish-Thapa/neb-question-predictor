import { Link } from 'react-router-dom';
import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';
import { SubjectPicker, PriorityBadge } from '../components/shared';
import { chapterSummaries } from '../engine/scoring';
import { predict, subjectCoverage } from '../engine/predictor';
import { computeDbStats, sourceCountFor } from '../data/db';
import { SYLLABUS } from '../data/syllabus';
import { getGridsForSubject } from '../data/specGrids';
import type { Priority } from '../engine/types';

export default function Dashboard() {
  const { subject } = useSubject();
  const { state } = useApp();
  const stats = computeDbStats(subject);
  const allStats = computeDbStats();
  const syllabus = SYLLABUS[subject];
  const grids = getGridsForSubject(subject, state.settings.includeDerivedGrid);
  const grid = grids[0];
  const coverage = subjectCoverage(subject);

  const scored = predict({
    subject,
    grid,
    weights: state.settings.weights,
    personal: state.personal,
    rankBy: state.settings.rankBy,
  });
  const chapters = chapterSummaries(subject, scored);
  const dist = (['very-high', 'high', 'medium', 'low'] as Priority[]).map((p) => ({
    p,
    n: scored.filter((s) => s.priority === p).length,
  }));

  return (
    <>
      <div className="row">
        <div>
          <h2>Dashboard</h2>
          <p className="lede">
            {syllabus.name} · code {syllabus.subjectCode} · {syllabus.chapters.length} chapters ·{' '}
            {sourceCountFor(subject)} linked source records
          </p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      <div className="stats">
        <div className="stat">
          <div className="value">{stats.papers}</div>
          <div className="label">papers analyzed ({stats.boardPapers} board, {stats.modelPapers} model)</div>
        </div>
        <div className="stat">
          <div className="value">{stats.evidence}</div>
          <div className="label">
            question/concept records ({stats.verbatimEvidence} verbatim, {stats.conceptEvidence} concept)
          </div>
        </div>
        <div className="stat">
          <div className="value">{stats.families}</div>
          <div className="label">question families (concept clusters)</div>
        </div>
        <div className="stat">
          <div className="value">{stats.candidates}</div>
          <div className="label">
            rankable candidates ({stats.candidatesBySection.A}×1 · {stats.candidatesBySection.B}×5 ·{' '}
            {stats.candidatesBySection.C}×8)
          </div>
        </div>
        <div className="stat">
          <div className="value">
            {coverage.chaptersWithCandidates}/{coverage.chapters}
          </div>
          <div className="label">syllabus chapters with candidate questions</div>
        </div>
        <div className="stat">
          <div className="value">
            {coverage.familiesWithEvidence}/{coverage.families}
          </div>
          <div className="label">families with verified paper evidence</div>
        </div>
      </div>

      <div className="notice">
        <strong>Terminal-paper evidence: {allStats.terminalEvidence} records.</strong> No school
        terminal question text could be machine-read in this research session, so the terminal layer
        of the score reports “Insufficient verified data” instead of inventing appearances. Add
        terminal records to <span className="mono">src/data</span> and the layer activates by itself.
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Priority distribution ({scored.length} candidates)</h3>
          <table>
            <thead>
              <tr>
                <th>Priority label</th>
                <th>Questions</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {dist.map((d) => (
                <tr key={d.p}>
                  <td>
                    <PriorityBadge priority={d.p} />
                  </td>
                  <td className="mono">{d.n}</td>
                  <td className="muted small">
                    {d.p === 'very-high'
                      ? 'score ≥ 80 — appears repeatedly across evidence layers'
                      : d.p === 'high'
                        ? 'score 65–79 — solid multi-source evidence'
                        : d.p === 'medium'
                          ? 'score 45–64 — some evidence, still worth preparing'
                          : 'score < 45 — syllabus-covered but rarely seen in papers'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="q-meta mt">
            Labels are thresholds on a 100-point evidence score — never probabilities.{' '}
            <Link to="/analysis">See how the score is built →</Link>
          </p>
        </div>

        <div className="card">
          <h3>Chapter heat (average evidence score)</h3>
          {chapters.map((c) => (
            <div className="chapter-bar" key={c.chapterId}>
              <span className="name">
                {c.chapterId} · {c.name}
              </span>
              <span className="bar">
                <span style={{ width: `${c.averageScore}%` }} />
              </span>
              <span className="num">{c.averageScore}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Exam structure in use</h3>
        {grid ? (
          <p className="muted small">
            {grid.title} — {grid.sections.map((s) => `${s.count} × ${s.marksPerQuestion} (${s.id})`).join(' + ')} ={' '}
            <strong>{grid.totalMarks} marks</strong> in {grid.durationMinutes} minutes ·{' '}
            <span className={`badge ${grid.verification === 'verified' ? 'ok' : 'warn'}`}>
              {grid.verification === 'verified' ? 'verified' : 'DERIVED'}
            </span>
          </p>
        ) : (
          <p className="muted">No grid available for this subject.</p>
        )}
        <div className="row tight mt">
          <Link className="btn" to="/paper">
            Generate a paper
          </Link>
          <Link className="btn secondary" to="/predictor">
            Rank questions
          </Link>
          <Link className="btn secondary" to="/research">
            Research log &amp; sources
          </Link>
        </div>
      </div>

      <div className="card">
        <h3>Honesty checklist</h3>
        <ul className="muted small" style={{ margin: 0, paddingLeft: 18 }}>
          <li>Frequency counts are computed at runtime from the records in the database — none are hard-coded.</li>
          <li>
            <span className="mono">extraction: verbatim</span> means the wording was read from the
            source page; <span className="mono">concept</span> means only the topic-level analysis was readable.
          </li>
          <li>
            <span className="mono">marks = 0</span> in an evidence record means “mark value not
            readable from the source”, never a guessed zero.
          </li>
          <li>Mathematics, English, Nepali, Biology and Class-11 material are excluded by an automated test.</li>
          <li>
            The 75-mark Computer Science grid is a labelled <em>derived</em> school-terminal
            adaptation (enable it in <Link to="/settings">Settings</Link>).
          </li>
        </ul>
      </div>

    </>
  );
}
