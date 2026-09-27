import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

/** Marks the current learn path as visited/completed for gamification progress. */
const ModuleTracker: React.FC = () => {
  const location = useLocation();
  const { markCurrentPath } = useProgress();

  useEffect(() => {
    markCurrentPath(location.pathname);
  }, [location.pathname, markCurrentPath]);

  return null;
};

export default ModuleTracker;
