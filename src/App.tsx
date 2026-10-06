import { createContext, useContext, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import type { SubjectId } from './engine/types';
import { useApp } from './store/AppProvider';
import Dashboard from './pages/Dashboard';
import Predictor from './pages/Predictor';
import PaperGenerator from './pages/PaperGenerator';
import ExamMode from './pages/ExamMode';
import Analysis from './pages/Analysis';
import ResearchLog from './pages/ResearchLog';
import SyllabusPage from './pages/SyllabusPage';
import SettingsPage from './pages/SettingsPage';

interface SubjectContextValue {
  subject: SubjectId;
  setSubject: (s: SubjectId) => void;
}

const SubjectContext = createContext<SubjectContextValue | undefined>(undefined);

export function useSubject(): SubjectContextValue {
  const ctx = useContext(SubjectContext);
  if (!ctx) throw new Error('useSubject must be used inside <App>');
  return ctx;
}

const NAV = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/predictor', label: 'Question Predictor' },
  { to: '/paper', label: 'Paper Generator' },
  { to: '/exam', label: 'Exam Simulator' },
  { to: '/analysis', label: 'Why this rank?' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/research', label: 'Research Log' },
  { to: '/settings', label: 'Settings' },
];

export default function App() {
  const { state, updateSettings } = useApp();
  const [subject, setSubjectState] = useState<SubjectId>(state.settings.defaultSubject);

  const setSubject = (s: SubjectId) => {
    setSubjectState(s);
    updateSettings({ defaultSubject: s });
  };

  return (
    <SubjectContext.Provider value={{ subject, setSubject }}>
      <header className="app-header">
        <div className="brand">
          <h1>NEB Class 12 — Question Predictor &amp; Exam Simulator</h1>
          <span className="sub">
            Physics 1021 · Chemistry 3021 · Computer Science 4281 · evidence-based, local-first
          </span>
        </div>
        <nav className="nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/paper" element={<PaperGenerator />} />
          <Route path="/exam" element={<ExamMode />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/research" element={<ResearchLog />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        Every frequency, appearance count and priority label in this app is computed at runtime from
        the records in <span className="mono">src/data</span>. 🔥/🟠/🟡/⚪ are priority labels, not
        probabilities. No question text, count or mark was invented; unreadable values are stored as
        <span className="mono"> 0</span> and displayed as “not readable from source”.
      </footer>
    </SubjectContext.Provider>
  );
}
