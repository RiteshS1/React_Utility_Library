import React, { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import {
  useCopyToClipboard,
  useCounter,
  useFetch,
  useInterval,
  useKeyPress,
  usePrevious,
  useToggle,
  useWindowSize,
} from '../../hooks/customHooks'
import './Toolkit.css'

const PACK_SOURCE = `// ── useFetch ──────────────────────────────────────────────
export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        setData(await res.json())
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Failed')
        }
      } finally {
        setLoading(false)
      }
    })()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// ── useToggle ─────────────────────────────────────────────
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue((v) => !v), [])
  return { value, toggle, setTrue: () => setValue(true), setFalse: () => setValue(false) }
}

// ── useCopyToClipboard ────────────────────────────────────
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), resetMs)
  }, [resetMs])
  return [copy, { copied }] as const
}

// ── useInterval ───────────────────────────────────────────
export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback)
  useEffect(() => { saved.current = callback }, [callback])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// ── useWindowSize / usePrevious / useCounter / useKeyPress ─
// See src/hooks/customHooks.ts in this repo for full typed implementations.`

const MoreUtilitiesToolkit: React.FC = () => {
  const { count, increment, reset } = useCounter(0)
  const { value: on, toggle } = useToggle(false)
  const [copy, { copied }] = useCopyToClipboard()
  const size = useWindowSize()
  const prevWidth = usePrevious(size.width)
  const spacePressed = useKeyPress(' ')
  const [tick, setTick] = useState(0)
  const [running, setRunning] = useState(true)
  useInterval(() => setTick((t) => t + 1), running ? 1000 : null)

  const { data, loading, error } = useFetch<{ id: number; title: string } | null>(
    'https://jsonplaceholder.typicode.com/todos/1'
  )

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">More Utilities Pack</h1>
        <p className="page-description">
          Everyday hooks — fetch, toggle, clipboard, interval, window size, previous value, and key press.
          Copy from the block below or import from <code>src/hooks/customHooks.ts</code>.
        </p>
      </div>

      <div className="toolkit-benefit">
        <strong>Why a pack?</strong> Most product UIs need the same 8–10 primitives. Keep them typed,
        tested once, and reuse across features instead of reinventing timers and clipboard glue.
      </div>

      <CodeBlock title="Copy-paste: essentials pack (abbreviated)" code={PACK_SOURCE} language="typescript" />

      <h3 className="concept-title" style={{ marginTop: '2rem' }}>Live playgrounds</h3>
      <div className="toolkit-grid">
        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useCounter</h4>
          <p style={{ margin: '0 0 0.75rem', fontSize: '1.75rem', fontWeight: 800, color: '#1e3c97' }}>{count}</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="toolkit-btn" onClick={increment}>+1</button>
            <button type="button" className="toolkit-btn ghost" onClick={reset}>Reset</button>
          </div>
        </div>

        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useToggle</h4>
          <p style={{ margin: '0 0 0.75rem', color: '#475569' }}>Power: <strong>{on ? 'ON' : 'OFF'}</strong></p>
          <button type="button" className="toolkit-btn" onClick={toggle}>Toggle</button>
        </div>

        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useCopyToClipboard</h4>
          <button
            type="button"
            className="toolkit-btn"
            onClick={() => copy('npm i your-favorite-utils')}
          >
            {copied ? 'Copied!' : 'Copy install snippet'}
          </button>
        </div>

        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useInterval</h4>
          <p style={{ margin: '0 0 0.75rem', color: '#475569' }}>Ticks: <strong>{tick}</strong></p>
          <button type="button" className="toolkit-btn ghost" onClick={() => setRunning((r) => !r)}>
            {running ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useWindowSize + usePrevious</h4>
          <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
            {size.width}×{size.height}px
            {prevWidth !== undefined && prevWidth !== size.width && (
              <> (was {prevWidth}px wide)</>
            )}
          </p>
        </div>

        <div className="toolkit-mini-card">
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useKeyPress (&quot; &quot;)</h4>
          <p style={{ margin: 0, color: '#475569' }}>
            Spacebar: <strong style={{ color: spacePressed ? '#1e3c97' : '#94a3b8' }}>
              {spacePressed ? 'Pressed' : 'Released'}
            </strong>
          </p>
        </div>

        <div className="toolkit-mini-card" style={{ gridColumn: '1 / -1' }}>
          <h4 style={{ margin: '0 0 0.75rem', color: '#19357f' }}>useFetch</h4>
          {loading && <p style={{ margin: 0, color: '#64748b' }}>Loading todo…</p>}
          {error && <p style={{ margin: 0, color: '#dc2626' }}>{error}</p>}
          {data && (
            <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
              #{data.id}: {data.title}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MoreUtilitiesToolkit
