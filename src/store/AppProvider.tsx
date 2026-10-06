import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppSettings, AppState, GeneratedPaper, PersonalRecord, SignalFlag } from '../engine/types';
import { DEFAULT_WEIGHTS } from '../engine/scoring';

const STORAGE_KEY = 'neb-qp-state-v1';

export const DEFAULT_SETTINGS: AppSettings = {
  defaultSubject: 'physics',
  defaultTopN: 25,
  includeDerivedGrid: false,
  rankBy: 'evidence',
  weights: { ...DEFAULT_WEIGHTS },
};

function loadState(): AppState {
  const fallback: AppState = { personal: {}, settings: DEFAULT_SETTINGS, savedPapers: [] };
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      personal: parsed.personal ?? {},
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      savedPapers: parsed.savedPapers ?? [],
    };
  } catch {
    return fallback;
  }
}

interface AppContextValue {
  state: AppState;
  /** In-memory paper handed from the generator to Exam Mode (not persisted). */
  draftPaper?: GeneratedPaper;
  setDraftPaper: (paper?: GeneratedPaper) => void;
  toggleFlag: (familyId: string, flag: SignalFlag) => void;
  setNote: (familyId: string, note: string) => void;
  clearPersonal: (familyId: string) => void;
  savePaper: (paper: GeneratedPaper) => void;
  deletePaper: (id: string) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());
  const [draftPaper, setDraftPaper] = useState<GeneratedPaper | undefined>();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — the app still works for this session */
    }
  }, [state]);

  const toggleFlag = useCallback((familyId: string, flag: SignalFlag) => {
    setState((prev) => {
      const existing: PersonalRecord = prev.personal[familyId] ?? { flags: [], updatedAt: '' };
      const flags = existing.flags.includes(flag)
        ? existing.flags.filter((f) => f !== flag)
        : [...existing.flags, flag];
      return {
        ...prev,
        personal: {
          ...prev.personal,
          [familyId]: { ...existing, flags, updatedAt: new Date().toISOString() },
        },
      };
    });
  }, []);

  const setNote = useCallback((familyId: string, note: string) => {
    setState((prev) => {
      const existing: PersonalRecord = prev.personal[familyId] ?? { flags: [], updatedAt: '' };
      return {
        ...prev,
        personal: {
          ...prev.personal,
          [familyId]: { ...existing, note, updatedAt: new Date().toISOString() },
        },
      };
    });
  }, []);

  const clearPersonal = useCallback((familyId: string) => {
    setState((prev) => {
      const next = { ...prev.personal };
      delete next[familyId];
      return { ...prev, personal: next };
    });
  }, []);

  const savePaper = useCallback((paper: GeneratedPaper) => {
    setState((prev) => ({
      ...prev,
      savedPapers: [paper, ...prev.savedPapers.filter((p) => p.id !== paper.id)].slice(0, 30),
    }));
  }, []);

  const deletePaper = useCallback((id: string) => {
    setState((prev) => ({ ...prev, savedPapers: prev.savedPapers.filter((p) => p.id !== id) }));
  }, []);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ personal: {}, settings: DEFAULT_SETTINGS, savedPapers: [] });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      draftPaper,
      setDraftPaper,
      toggleFlag,
      setNote,
      clearPersonal,
      savePaper,
      deletePaper,
      updateSettings,
      resetAll,
    }),
    [state, draftPaper, toggleFlag, setNote, clearPersonal, savePaper, deletePaper, updateSettings, resetAll],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
