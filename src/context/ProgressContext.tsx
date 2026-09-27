import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LEARNING_MODULES, TOTAL_MODULES } from '../constants/modules';

const STORAGE_KEY = 'react-mastery-progress';
const QUIZ_KEY = 'react-mastery-quiz-best';

interface ProgressContextType {
  completedModules: Set<string>;
  markComplete: (moduleId: string) => void;
  isComplete: (moduleId: string) => boolean;
  completedCount: number;
  progressPercent: number;
  totalModules: number;
  quizBestScore: number | null;
  setQuizBestScore: (score: number) => void;
  markCurrentPath: (pathname: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function loadSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function loadQuizBest(): number | null {
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (raw === null) return null;
    return Number(raw);
  } catch {
    return null;
  }
}

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedModules, setCompletedModules] = useState<Set<string>>(() => loadSet());
  const [quizBestScore, setQuizBestScoreState] = useState<number | null>(() => loadQuizBest());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedModules]));
  }, [completedModules]);

  const markComplete = useCallback((moduleId: string) => {
    setCompletedModules((prev) => {
      if (prev.has(moduleId)) return prev;
      const next = new Set(prev);
      next.add(moduleId);
      return next;
    });
  }, []);

  const markCurrentPath = useCallback(
    (pathname: string) => {
      const mod = LEARNING_MODULES.find((m) => m.path === pathname);
      if (mod) markComplete(mod.id);
    },
    [markComplete]
  );

  const isComplete = useCallback(
    (moduleId: string) => completedModules.has(moduleId),
    [completedModules]
  );

  const setQuizBestScore = useCallback((score: number) => {
    setQuizBestScoreState((prev) => {
      const next = prev === null ? score : Math.max(prev, score);
      localStorage.setItem(QUIZ_KEY, String(next));
      return next;
    });
  }, []);

  const completedCount = completedModules.size;
  const progressPercent = Math.round((completedCount / TOTAL_MODULES) * 100);

  const value = useMemo(
    () => ({
      completedModules,
      markComplete,
      isComplete,
      completedCount,
      progressPercent,
      totalModules: TOTAL_MODULES,
      quizBestScore,
      setQuizBestScore,
      markCurrentPath,
    }),
    [
      completedModules,
      markComplete,
      isComplete,
      completedCount,
      progressPercent,
      quizBestScore,
      setQuizBestScore,
      markCurrentPath,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
