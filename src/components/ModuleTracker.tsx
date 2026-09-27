import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useSocket } from '../context/SocketContext';

const STORAGE_KEY = 'react-mastery-npc-emitted-thresholds';
const PROGRESS_THRESHOLDS = [10, 20, 50, 80, 100] as const;

function loadEmitted(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function persistEmitted(set: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

/** Marks the current learn path as visited/completed for gamification progress. */
const ModuleTracker: React.FC = () => {
  const location = useLocation();
  const { markCurrentPath, progressPercent, totalModules } = useProgress();
  const { socket } = useSocket();

  useEffect(() => {
    markCurrentPath(location.pathname);
  }, [location.pathname, markCurrentPath]);

  // Emit progress_update when completion math recalculates.
  // Thresholds are deduped client-side via localStorage so the NPC only
  // announces each milestone once per browser session, even across reloads.
  useEffect(() => {
    if (!socket || totalModules <= 0) return;

    const emitted = loadEmitted();
    let changed = false;
    for (const threshold of PROGRESS_THRESHOLDS) {
      if (progressPercent >= threshold && !emitted.has(threshold)) {
        emitted.add(threshold);
        changed = true;
      }
    }

    if (changed) {
      persistEmitted(emitted);
      socket.emit('progress_update', { percentage: progressPercent });
    }
  }, [socket, progressPercent, totalModules]);

  return null;
};

export default ModuleTracker;