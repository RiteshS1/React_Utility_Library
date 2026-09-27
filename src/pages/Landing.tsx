import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Cpu,
  Heart,
  Layers,
  Play,
  Terminal,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import AuthModal from '../components/AuthModal';
import './Landing.css';

const STACK = ['React 19', 'TypeScript', 'AWS Cognito', 'Socket.IO', 'Vite'] as const;

const tracks = [
  {
    title: 'Browser & DOM Internals',
    badge: 'New',
    description:
      'CRP, mount/hydrate phases, and the Synthetic Event System — how React talks to the browser.',
    icon: <Layers size={20} />,
    path: '/learn/critical-rendering-path',
  },
  {
    title: 'Core Fundamentals & Lifecycle',
    badge: 'Core',
    description: 'JSX, props, events, conditionals, and lists — the mental model every SDE interview expects.',
    icon: <BookOpen size={20} />,
    path: '/learn/jsx-basics',
  },
  {
    title: 'Advanced Hooks & Custom Patterns',
    badge: 'Advanced',
    description: 'useMemo, useCallback, useRef, and production-grade custom hooks with live playgrounds.',
    icon: <Cpu size={20} />,
    path: '/learn/use-state',
  },
  {
    title: 'Master Interview Assessment',
    badge: 'SDE-1/2',
    description: '20 architectural questions with deep runtime explanations — score, review, and share.',
    icon: <Trophy size={20} />,
    path: '/learn/master-assessment',
  },
];

const terminalLines = [
  { t: 'fiber', text: '> Fiber: scheduleUpdateOnFiber(lane: Default)' },
  { t: 'render', text: '> Render phase: beginWork → completeWork (interruptible)' },
  { t: 'commit', text: '> Commit phase: mutation → layout → paint' },
  { t: 'concurrent', text: '> Concurrent: yield to input, resume reconciliation' },
  { t: 'done', text: '✓ UI committed — 1 paint, 0 layout thrash' },
];

const Landing: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const { onlineUsers, connected } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [lineIdx, setLineIdx] = useState(0);
  const [demoCount, setDemoCount] = useState(0);
  const [useFunctional, setUseFunctional] = useState(true);

  const redirectTo =
    (location.state as { from?: string } | null)?.from?.startsWith('/learn')
      ? (location.state as { from: string }).from
      : '/learn';

  useEffect(() => {
    const state = location.state as { openAuth?: boolean; authMode?: 'login' | 'register' } | null;
    if (state?.openAuth) {
      setAuthMode(state.authMode || 'login');
      setAuthOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const id = setInterval(() => {
      setLineIdx((i) => (i + 1) % (terminalLines.length + 1));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const openAuth = (mode: 'login' | 'register' = 'register') => {
    if (isAuthenticated) {
      navigate('/learn');
      return;
    }
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleTrackClick = (path: string) => {
    if (isAuthenticated) navigate(path);
    else openAuth('register');
  };

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>Loading React Mastery…</p>
      </div>
    );
  }

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="landing-brand">
          <span className="landing-brand-name">React Mastery</span>
          <span className="landing-brand-badge">Platform</span>
        </div>
        <div className="landing-nav-actions">
          {isAuthenticated ? (
            <button type="button" className="btn-primary" onClick={() => navigate('/learn')}>
              Resume Learning <ArrowRight size={16} />
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={() => openAuth('register')}>
              Get Started
            </button>
          )}
        </div>
      </header>

      <section className="landing-hero">
        <motion.div
          className="landing-hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="landing-pill">
            <Zap size={14} /> Interview-grade React runtime mastery
          </div>
          <h1>
            From Browser Internals to{' '}
            <span className="landing-accent-text">Advanced React Patterns</span>
          </h1>
          <p>
            An interactive platform that teaches how React actually works — Fiber, Concurrent
            rendering, hooks architecture — then tests you with SDE-1 &amp; SDE-2 assessments.
          </p>
          <div className="landing-cta-row">
            {isAuthenticated ? (
              <button type="button" className="btn-primary btn-lg" onClick={() => navigate('/learn')}>
                Resume Learning <Play size={18} />
              </button>
            ) : (
              <button type="button" className="btn-primary btn-lg" onClick={() => openAuth('register')}>
                Get Started <ArrowRight size={18} />
              </button>
            )}
            <a href="#tracks" className="btn-ghost btn-lg">
              Explore Tracks
            </a>
          </div>

          <div className="landing-stats">
            <div className="stat-badge">
              <Users size={16} />
              <div>
                <strong>{Math.max(onlineUsers, 10)}+</strong>
                <span>Active Users</span>
              </div>
            </div>
            <div className="stat-badge">
              <Code2 size={16} />
              <div>
                <strong>20+</strong>
                <span>Interactive Sandboxes</span>
              </div>
            </div>
            <div className="stat-badge">
              <Brain size={16} />
              <div>
                <strong>SDE-1/2</strong>
                <span>Quiz Ready</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="landing-terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <div className="terminal-chrome">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">
              <Terminal size={12} /> react-fiber.runtime
            </span>
          </div>
          <div className="terminal-body">
            {terminalLines.slice(0, Math.min(lineIdx, terminalLines.length)).map((line) => (
              <div key={line.t} className={`terminal-line ${line.t}`}>
                {line.text}
              </div>
            ))}
            <span className="terminal-cursor" />
          </div>
        </motion.div>
      </section>

      <section className="landing-tracks" id="tracks">
        <h2>Core Learning Tracks</h2>
        <p className="section-sub">Four paths. One mental model of React from pixels to Fiber.</p>
        <div className="tracks-grid">
          {tracks.map((track, i) => (
            <motion.button
              key={track.title}
              type="button"
              className="track-card"
              onClick={() => handleTrackClick(track.path)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
            >
              <div className="track-icon">{track.icon}</div>
              <span className="track-badge">{track.badge}</span>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <span className="track-cta">
                Enter track <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="landing-playground">
        <div className="playground-card">
          <div className="playground-header">
            <h2>Live Hook Playground</h2>
            <p>Feel automatic batching — three setState calls, one paint.</p>
          </div>
          <div className="playground-body">
            <div className="playground-controls">
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={useFunctional}
                  onChange={(e) => setUseFunctional(e.target.checked)}
                />
                <span>Functional updates (c ⇒ c + 1) × 3</span>
              </label>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (useFunctional) {
                    setDemoCount((c) => c + 1);
                    setDemoCount((c) => c + 1);
                    setDemoCount((c) => c + 1);
                  } else {
                    setDemoCount(demoCount + 1);
                    setDemoCount(demoCount + 1);
                    setDemoCount(demoCount + 1);
                  }
                }}
              >
                Click me (+3 intent)
              </button>
              <button type="button" className="btn-ghost" onClick={() => setDemoCount(0)}>
                Reset
              </button>
            </div>
            <div className="playground-result">
              <div className="count-display">{demoCount}</div>
              <p>
                {useFunctional
                  ? 'Functional updates stack → count grows by 3 per click.'
                  : 'Same closure value thrice → only +1. Classic interview trap.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-final-cta">
        <h2>Ready to go from tutorials to interview-ready?</h2>
        <p>Authenticate with Cognito and pick up exactly where you left off.</p>
        <button type="button" className="btn-primary btn-lg" onClick={() => openAuth('register')}>
          {isAuthenticated ? 'Continue to Dashboard' : 'Get Started'} <ArrowRight size={18} />
        </button>
      </section>

      <footer className="landing-studio-footer">
        <div className="studio-footer-inner">
          <div className="studio-watermark" aria-hidden>
            REACT MASTERY
          </div>

          <p className="studio-tagline">
            Built for engineers who want to understand React — not just use it.
          </p>

          <div className="studio-badges">
            {STACK.map((item) => (
              <span key={item} className="studio-badge">
                {item}
              </span>
            ))}
          </div>

          <div className={`studio-status ${connected ? 'online' : ''}`}>
            <span className="status-dot" />
            Systems Operational • Real-time Sync {connected ? 'Active' : 'Connecting…'}
          </div>

          <div className="studio-bottom">
            <p className="studio-signature">
              Made with <Heart size={12} className="heart" fill="currentColor" /> by{' '}
              <a
                href="https://www.riteshh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="studio-rs-link"
              >
                RS
              </a>
            </p>
            <p className="studio-copy">© 2026 React Mastery. Built for frontend engineers.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
        redirectTo={redirectTo}
      />
    </div>
  );
};

export default Landing;
