import { useSubject } from '../App';
import { useApp } from '../store/AppProvider';
import { SubjectPicker } from '../components/shared';
import { SYLLABUS } from '../data/syllabus';
import { DB } from '../data/db';

export default function SyllabusPage() {
  const { subject } = useSubject();
  const { state } = useApp();
  const syllabus = SYLLABUS[subject];
  const db = DB[subject];
  const flagged = new Set(
    Object.entries(state.personal)
      .filter(([, v]) => v.flags.length > 0)
      .map(([k]) => k),
  );

  const areas = syllabus.areas;
  const chaptersForArea = (area: string) => syllabus.chapters.filter((c) => c.area === area);

  return (
    <>
      <div className="row">
        <div>
          <h2>Syllabus</h2>
          <p className="lede">{syllabus.sourceNote}</p>
        </div>
        <div className="spacer" />
        <SubjectPicker />
      </div>

      <div className="stats">
        <div className="stat">
          <div className="value">{syllabus.chapters.length}</div>
          <div className="label">chapters / units</div>
        </div>
        <div className="stat">
          <div className="value">{syllabus.chapters.reduce((t, c) => t + c.topics.length, 0)}</div>
          <div className="label">topics</div>
        </div>
        <div className="stat">
          <div className="value">{areas.length}</div>
          <div className="label">content areas</div>
        </div>
        <div className="stat">
          <div className="value">{db.families.length}</div>
          <div className="label">question families mapped to the syllabus</div>
        </div>
      </div>

      {areas.map((area) => (
        <div className="card" key={area}>
          <h3>{area}</h3>
          {chaptersForArea(area).map((ch) => {
            const chaptersFamilies = db.families.filter((f) => f.chapterId === ch.id);
            const famIds = new Set(chaptersFamilies.map((f) => f.id));
            const chapterEvidence = db.evidence.filter((e) => famIds.has(e.familyId));
            const chapterCandidates = db.candidates.filter((c) => c.chapterId === ch.id);
            const flaggedCount = chaptersFamilies.filter((f) => flagged.has(f.id)).length;
            return (
              <div key={ch.id} style={{ borderTop: '1px solid var(--line)', padding: '8px 0' }}>
                <div className="row">
                  <strong>
                    {ch.number}. {ch.name}
                  </strong>
                  <span className="badge mono">{ch.id}</span>
                  {ch.teachingHours > 0 ? (
                    <span className="badge">{ch.teachingHours} teaching hours</span>
                  ) : (
                    <span className="badge warn">hours not verified</span>
                  )}
                  <span className="badge">{ch.topics.length} topics</span>
                  <span className="badge">{chaptersFamilies.length} families</span>
                  <span className="badge">{chapterEvidence.length} evidence records</span>
                  <span className="badge">{chapterCandidates.length} candidates</span>
                  {flaggedCount > 0 ? <span className="badge warn">my flags ×{flaggedCount}</span> : null}
                </div>
                <ul className="muted small" style={{ paddingLeft: 18, margin: '6px 0 0' }}>
                  {ch.topics.map((t) => {
                    const core = ch.coreTopicIds.includes(t.id);
                    const hasCandidate = db.candidates.some((c) => c.topicId === t.id);
                    return (
                      <li key={t.id}>
                        {core ? <strong style={{ color: 'var(--accent-2)' }}>core · </strong> : null}
                        {t.name}
                        {t.subtopics.length > 0 ? (
                          <span className="muted"> — {t.subtopics.join(', ')}</span>
                        ) : null}
                        {!hasCandidate ? <span className="muted"> · no candidate yet</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ))}

      <div className="notice info">
        Grade-11 topics, Mathematics, English, Nepali and Biology are excluded from this database by
        design; an automated test fails the build if they ever appear in the data.
      </div>
    </>
  );
}
