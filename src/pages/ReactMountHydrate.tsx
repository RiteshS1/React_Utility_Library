import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, GitBranch, Layers, HelpCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import './LessonExtras.css'

const phases = [
  {
    id: 'bootstrap',
    title: '1. Bootstrap — the empty parking spot',
    detail:
      'index.html loads. Inside it sits <div id="root"></div> — an empty container. No React UI yet. The browser has a DOM, but our app has not claimed that parking spot.',
    plain: 'You bought an empty lot downtown. The city (browser) knows the address. Nobody built the shop yet.',
  },
  {
    id: 'createRoot',
    title: '2. createRoot() — React takes the lot',
    detail:
      'createRoot(container) creates a FiberRoot, hooks up the event delegation system to #root (not document), and prepares the concurrent scheduler. Still nothing visible — we only prepared the machinery.',
    plain: 'You hire a construction foreman (React) and give them the keys to that empty lot.',
  },
  {
    id: 'render',
    title: '3. Render phase — blueprint work (safe to interrupt)',
    detail:
      'root.render(<App />) schedules work. In the render phase React walks components, calls your functions, builds/ diffs a Fiber tree in memory. This work must stay pure: no DOM writes, no ref mutations. Concurrent React can pause mid-tree to handle typing.',
    plain: 'Architects redraw blueprints on paper. They can put the pencil down if a customer walks in — the real building is untouched.',
  },
  {
    id: 'commit',
    title: '4. Commit phase — actually build (synchronous)',
    detail:
      'Once React decides the new tree, commit runs synchronously: insert/update/delete DOM nodes, run useLayoutEffect (still before paint), then the browser paints, then useEffect runs (after paint, so it does not block the first frame).',
    plain: 'Crews show up and swing hammers. You do not pause mid-hammer for a chat — finish the structural work, then hang decorations (effects).',
  },
]

const ReactMountHydrate: React.FC = () => {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    setPhase(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= phases.length) {
        clearInterval(id)
        setPlaying(false)
        return
      }
      setPhase(i)
    }, 1200)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">How React Mounts & Hydrates</h1>
        <p className="page-description">
          From an empty <code>#root</code> div to a living app — render vs commit, and what
          &quot;hydration&quot; means when HTML already exists.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={20} color="#1e3c97" /> Start from zero: what is &quot;mounting&quot;?
        </h3>
        <p className="concept-description">
          <strong>Mounting</strong> means React creates component instances (Fibers), runs them for
          the first time, and inserts their DOM nodes into the page. <strong>Updating</strong> is
          when state/props change and React re-renders. <strong>Unmounting</strong> is cleanup —
          removing nodes and running effect cleanups.
        </p>
        <div className="lesson-plain">
          Mount = first time the component appears on stage. Update = costume change. Unmount = exit stage left.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="#1e3c97" /> Watch the mount sequence
        </h3>
        <button
          type="button"
          onClick={play}
          disabled={playing}
          style={{
            padding: '0.6rem 1.2rem',
            background: playing ? '#94a3b8' : '#1e3c97',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: playing ? 'not-allowed' : 'pointer',
            marginBottom: '1.25rem',
          }}
        >
          {playing ? 'Playing…' : 'Play mount sequence'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {phases.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setPhase(i)}
              animate={{
                borderColor: phase === i ? '#1e3c97' : '#e2e8f0',
                background: phase === i ? '#eff6ff' : '#fff',
              }}
              style={{
                textAlign: 'left',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 700, color: '#1e3c97' }}>{p.title}</div>
              <AnimatePresence>
                {phase === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p style={{ margin: '0.5rem 0 0', color: '#475569', fontSize: '0.9rem' }}>{p.detail}</p>
                    <div className="lesson-plain">{p.plain}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid">
        <div className="concept-card">
          <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#1e3c97" /> Render phase
          </h3>
          <ul style={{ color: '#475569', paddingLeft: '1.25rem', margin: 0, lineHeight: 1.7 }}>
            <li>Must be <strong>pure</strong> — same props/state ⇒ same UI description</li>
            <li>No DOM writes, no <code>ref.current = …</code></li>
            <li>Can be <strong>interrupted</strong> (Concurrent features)</li>
            <li>Can be thrown away if a newer update supersedes it</li>
          </ul>
          <div className="lesson-plain">
            Sketching only. If the boss changes the brief, toss the sketch — the building is fine.
          </div>
        </div>
        <div className="concept-card">
          <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GitBranch size={18} color="#1e3c97" /> Commit phase
          </h3>
          <ul style={{ color: '#475569', paddingLeft: '1.25rem', margin: 0, lineHeight: 1.7 }}>
            <li><strong>Synchronous</strong> DOM mutations</li>
            <li><code>useLayoutEffect</code> → before the browser paints (measure/sync DOM)</li>
            <li>Browser paints pixels</li>
            <li><code>useEffect</code> → after paint (network, subscriptions, logging)</li>
          </ul>
          <div className="lesson-plain">
            useLayoutEffect = adjust the furniture before guests take a photo. useEffect = start the playlist after they already see the room.
          </div>
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">Hydration (SSR) — attaching brains to existing HTML</h3>
        <p className="concept-description">
          With server-side rendering, the server already sent finished HTML. The browser shows that
          HTML instantly (great for LCP). Then React runs <code>hydrateRoot</code>: it does <em>not</em>
          wipe <code>#root</code>. Instead it walks the existing DOM, attaches event listeners and
          Fiber state, and expects the client render output to match the server HTML.
        </p>
        <div className="lesson-callout">
          <strong>Mismatch warning:</strong> if the server rendered &quot;Good morning&quot; but the
          client first render says &quot;Good evening&quot; (e.g. random or <code>Date</code> without care),
          React complains and may redo work — hydration failed its job.
        </div>
        <div className="lesson-plain">
          SSR is like receiving a pre-built Lego set in the box photo. Hydration snaps the motors and
          remote control onto the set that is already assembled — it should not rebuild from brick one.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">Why this two-phase design beats old stack reconcilers</h3>
        <p className="concept-description">
          Old React (stack reconciler) could block the main thread for a long synchronous render —
          scrolling stuttered. Fiber splits work into units, lets React yield to input, and separates
          &quot;thinking&quot; (render) from &quot;mutating&quot; (commit). That is the foundation of
          Concurrent React, transitions, and Suspense.
        </p>
      </div>

      <CodeBlock
        title="index.html → createRoot().render()"
        code={`<!-- index.html -->
<div id="root"></div>

// main.tsx
import { createRoot } from 'react-dom/client';
import App from './App';

const el = document.getElementById('root')!;
const root = createRoot(el); // FiberRoot + events on #root
root.render(<App />);        // schedule → render → commit → paint

// SSR cousin:
// hydrateRoot(el, <App />); // reuse server HTML, attach listeners`}
      />
    </div>
  )
}

export default ReactMountHydrate
