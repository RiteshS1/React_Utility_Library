import React, { useEffect, useRef, useState } from 'react'
import { MousePointer2, Radio, AlertTriangle, HelpCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import './LessonExtras.css'

const SyntheticEventSystem: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([])
  const nativeParentRef = useRef<HTMLDivElement>(null)
  const nativeChildRef = useRef<HTMLButtonElement>(null)

  const push = (msg: string) =>
    setLogs((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 12))

  useEffect(() => {
    const parent = nativeParentRef.current
    const child = nativeChildRef.current
    if (!parent || !child) return

    const onParent = () => push('Native: parent bubble (DOM path)')
    const onChild = (e: MouseEvent) => {
      push('Native: child click')
      if ((e.target as HTMLElement).dataset.stop === 'true') {
        e.stopPropagation()
        push('Native: stopPropagation — parent will NOT fire')
      }
    }

    parent.addEventListener('click', onParent)
    child.addEventListener('click', onChild)
    return () => {
      parent.removeEventListener('click', onParent)
      child.removeEventListener('click', onChild)
    }
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">React Synthetic Event System</h1>
        <p className="page-description">
          How clicks actually reach your <code>onClick</code> — delegation at <code>#root</code>,
          SyntheticEvent vs native events, and why portals feel weird until you get this.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={20} color="#1e3c97" /> Browser events 101 (before React)
        </h3>
        <p className="concept-description">
          When you click a button, the browser fires a <strong>native event</strong>. It travels in
          three phases: <em>capture</em> (window → target), <em>target</em>, then <em>bubble</em>
          (target → window). You can listen with <code>element.addEventListener(&apos;click&apos;, fn)</code>.
        </p>
        <div className="lesson-plain">
          A click is a ripple in a pond. Capture is swimming toward the splash; bubble is the ripple
          spreading back out to the shore.
        </div>
        <p className="concept-description" style={{ marginTop: '1rem' }}>
          If every button registered its own listener, big apps would attach thousands of listeners.
          A common pattern is <strong>delegation</strong>: one listener on a parent, figure out which
          child was clicked via <code>event.target</code>.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio size={20} color="#1e3c97" /> What React does (React 17+)
        </h3>
        <p className="concept-description">
          You write <code>onClick={'{handler}'}</code> on JSX. React does <em>not</em> call{' '}
          <code>button.addEventListener</code> for each button. Instead it attaches listeners to the{' '}
          <strong>root container</strong> (<code>#root</code> from <code>createRoot</code>). When a
          native click happens, React maps it through the Fiber tree and calls your handler with a{' '}
          <strong>SyntheticEvent</strong> wrapper.
        </p>
        <div className="lesson-callout">
          <strong>Why move off document?</strong> Before React 17, delegation lived on{' '}
          <code>document</code>. Multiple React roots (micro-frontends) stepped on each other. Root
          container delegation keeps each tree&apos;s events isolated.
        </div>
        <div className="lesson-plain">
          React installs one receptionist at the building entrance (#root), not a doorbell on every
          office. The receptionist looks at the visitor badge (target) and routes the call.
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1.5rem',
            background: 'linear-gradient(180deg, #eff6ff, #f8fafc)',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
            marginTop: '1.25rem',
          }}
        >
          <div style={{ padding: '0.75rem 1.5rem', background: '#1e3c97', color: 'white', borderRadius: '8px', fontWeight: 700 }}>
            #root (delegation target)
          </div>
          <div style={{ color: '#64748b' }}>↓ SyntheticEvent dispatch along React tree</div>
          <div style={{ padding: '0.65rem 1.25rem', background: '#007acc', color: 'white', borderRadius: '8px' }}>
            Your components
          </div>
          <div style={{ color: '#64748b' }}>↓</div>
          <button
            type="button"
            onClick={(e) => {
              push('React: button onClick (SyntheticEvent)')
              push(`nativeEvent.type: ${e.nativeEvent.type}`)
            }}
            onClickCapture={() => push('React: capture phase on button')}
            style={{
              padding: '0.65rem 1.25rem',
              background: '#fbbf24',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Click — React path
          </button>
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">SyntheticEvent vs native event</h3>
        <div className="lesson-compare">
          <div className="lesson-compare-card">
            <h4>SyntheticEvent (e)</h4>
            <ul>
              <li>Cross-browser normalized API</li>
              <li>Same shape for click, change, etc.</li>
              <li><code>e.nativeEvent</code> is the real browser Event</li>
              <li>Pooling removed in React 17+ (no more e.persist() drama)</li>
            </ul>
          </div>
          <div className="lesson-compare-card">
            <h4>Native Event</h4>
            <ul>
              <li>What addEventListener gives you</li>
              <li>Bubbles through the real DOM tree</li>
              <li>Does not know about React portals&apos; logical parents</li>
            </ul>
          </div>
        </div>
        <div className="lesson-plain">
          SyntheticEvent is a translator. You talk to the translator; if you need the raw dialect,
          ask for <code>e.nativeEvent</code>.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MousePointer2 size={20} color="#1e3c97" /> stopPropagation: React tree ≠ DOM tree
        </h3>
        <p className="concept-description">
          <code>e.stopPropagation()</code> inside a React handler stops the event from continuing
          through <strong>React&apos;s component tree</strong>. Native listeners on DOM ancestors can
          still see the native event (and the reverse). Portals make this famous: a modal rendered
          under <code>document.body</code> still bubbles React events to React parents in JSX.
        </p>

        <div
          ref={nativeParentRef}
          style={{
            padding: '1.25rem',
            background: '#fef3c7',
            borderRadius: '10px',
            border: '1px solid #fcd34d',
            marginBottom: '1rem',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Native parent listener</div>
          <button
            ref={nativeChildRef}
            type="button"
            data-stop="true"
            style={{
              padding: '0.5rem 1rem',
              background: '#f59e0b',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'white',
            }}
          >
            Native child (stops native bubble)
          </button>
        </div>

        <div
          onClick={() => push('React: outer div bubble')}
          style={{
            padding: '1.25rem',
            background: '#eff6ff',
            borderRadius: '10px',
            border: '1px solid #93c5fd',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>React parent onClick</div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              push('React: inner click + stopPropagation — outer React handler skipped')
            }}
            style={{
              padding: '0.5rem 1rem',
              background: '#1e3c97',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'white',
            }}
          >
            React child (stops React bubble)
          </button>
        </div>
        <div className="lesson-plain">
          Stopping gossip in the React group chat does not stop people talking in the hallway (native DOM).
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={20} color="#b45309" /> Event pooling (history lesson)
        </h3>
        <p className="concept-description">
          Old React recycled SyntheticEvent objects for performance and nullified fields after the
          handler. Reading <code>e</code> inside <code>setTimeout</code> required{' '}
          <code>e.persist()</code>. Modern React keeps the fields — <code>persist()</code> is a no-op.
          Interviews still ask this; production code on React 17+ should not need it.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">Event log</h3>
        <button
          type="button"
          onClick={() => setLogs([])}
          style={{
            marginBottom: '0.75rem',
            padding: '0.35rem 0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.8rem',
            background: '#1a1a1a',
            color: '#86efac',
            padding: '1rem',
            borderRadius: '8px',
            minHeight: 120,
            maxHeight: 220,
            overflow: 'auto',
          }}
        >
          {logs.length === 0 ? (
            <span style={{ color: '#64748b' }}>Interact with demos above…</span>
          ) : (
            logs.map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>

      <CodeBlock
        title="Delegation & SyntheticEvent"
        code={`createRoot(document.getElementById('root')!).render(<App />);

function Button() {
  return (
    <button
      onClick={(e) => {
        // SyntheticEvent
        console.log(e.nativeEvent); // real browser Event
        e.stopPropagation();        // React tree only
      }}
    >
      Click
    </button>
  );
}

// Portal: DOM may live under document.body,
// but React events still bubble to JSX parents.`}
      />
    </div>
  )
}

export default SyntheticEventSystem
