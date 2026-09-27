import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
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

const FAQ_ITEMS = [
  {
    q: 'Who is this platform for?',
    a: 'Frontend engineers preparing for SDE-1 / SDE-2 interviews, and developers who want a deeper mental model of React beyond tutorials.',
  },
  {
    q: 'What will I learn after signing up?',
    a: 'Browser & DOM internals, React fundamentals, hooks, a copy-paste custom hooks toolkit, and a scored interview quiz with explanations.',
  },
  {
    q: 'Is it just another "docs" for React?',
    a: 'Nope! Every module includes live playgrounds and copyable code. You practice patterns, not only read about them.',
  },
  {
    q: 'How long does the curriculum take?',
    a: 'Most engineers finish the core tracks in a few focused sessions (2-3 hours). Progress is saved so you can resume anytime.',
  },
  {
    q: 'Is the assessment interview-realistic?',
    a: 'The Master Quiz covers batching, Fiber, hooks, and concurrency — the same themes that show up in strong frontend interviews.',
  },
  {
    q: 'How much do I need to pay?',
    a: 'Just your time and effort. This is a passion project built while I was learning React - hope it helps :) ',
  }
] as const;

const tracks = [
  {
    title: 'Browser & DOM Internals',
    badge: 'New',
    description: 'How the browser paints a page — and where React fits in the picture.',
    icon: <Layers size={20} />,
    path: '/learn/critical-rendering-path',
  },
  {
    title: 'Core Fundamentals & Lifecycle',
    badge: 'Core',
    description: 'JSX, props, events, and lists — the basics every interview expects.',
    icon: <BookOpen size={20} />,
    path: '/learn/jsx-basics',
  },
  {
    title: 'Advanced Hooks & Custom Patterns',
    badge: 'Advanced',
    description: 'Hooks mastery plus a production-ready custom hooks toolkit.',
    icon: <Cpu size={20} />,
    path: '/learn/use-state',
  },
  {
    title: 'Master Interview Assessment',
    badge: 'SDE-1/2',
    description: '20 questions with scored review and architectural explanations.',
    icon: <Trophy size={20} />,
    path: '/learn/master-assessment',
  },
];

const terminalLines = [
  { t: 'fiber', text: '> Bootstrapping React Mastery…' },
  { t: 'render', text: '> Loading interactive sandboxes' },
  { t: 'commit', text: '> Hooks toolkit ready' },
  { t: 'concurrent', text: '> Assessment engine online' },
  { t: 'done', text: '✓ Ready — start learning' },
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            <Zap size={14} /> Interview-grade React learning
          </div>
          <h1>
            From Browser Internals to{' '}
            <span className="landing-accent-text">Advanced React Patterns</span>
          </h1>
          <p>
            Learn React the way production teams think about it - interactive sandboxes, a custom
            hooks toolkit, and an SDE-ready assessment.
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
              <Terminal size={12} /> react-mastery
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
        <p className="section-sub">Four focused paths - from fundamentals to interview day.</p>
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
            <h2>Try a live demo</h2>
            <p>A quick taste of React state updates - no account required.</p>
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
                  ? 'Functional updates stack - count grows by 3 per click.'
                  : 'Same value thrice - only +1. A classic interview trap.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-faq" id="faq">
        <h2>Frequently asked questions</h2>
        <p className="section-sub">Quick answers before you dive in.</p>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q} className={`faq-item ${open ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  {item.q}
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="landing-final-cta">
        <h2>Ready to go from tutorials to interview-ready?</h2>
        <p>Create an account and pick up exactly where you left off.</p>
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
            Built for engineers who want to understand React - not just use it.
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
