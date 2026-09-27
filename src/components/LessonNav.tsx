import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAdjacentLessons } from '../constants/modules';
import './LessonNav.css';

const LessonNav: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname === '/learn') return null;

  const { prev, next, current } = getAdjacentLessons(pathname);
  if (!current && !next) return null;

  return (
    <nav className="lesson-nav" aria-label="Lesson navigation">
      {prev ? (
        <Link to={prev.path} className="lesson-nav-btn prev">
          <ArrowLeft size={18} />
          <span>
            <small>Previous</small>
            <strong>{prev.title}</strong>
          </span>
        </Link>
      ) : (
        <span className="lesson-nav-spacer" />
      )}

      {next ? (
        <Link to={next.path} className="lesson-nav-btn next">
          <span>
            <small>Next lesson</small>
            <strong>{next.title}</strong>
          </span>
          <ArrowRight size={18} />
        </Link>
      ) : (
        <Link to="/learn" className="lesson-nav-btn next">
          <span>
            <small>Done</small>
            <strong>Back to Dashboard</strong>
          </span>
          <ArrowRight size={18} />
        </Link>
      )}
    </nav>
  );
};

export default LessonNav;
