import React, { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useDebounce } from '../../hooks/customHooks'
import '../LessonExtras.css'
import './Toolkit.css'

const HOOK_CODE = `import { useState, useEffect } from 'react'

/**
 * useDebounce — delay updates until the value stops changing.
 * Perfect for search inputs so you don't hit the API on every keystroke.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Schedule an update after \`delay\` ms of quiet time
    const id = window.setTimeout(() => setDebouncedValue(value), delay)

    // If value changes again before the timer fires, cancel it
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debouncedValue
}`

const DebouncePlayground = () => {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 500)

  return (
    <div className="toolkit-demo">
      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
        Search input
      </label>
      <input
        className="toolkit-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type quickly — watch the badges…"
      />
      <div className="toolkit-badge-row">
        <span className="toolkit-badge">
          Real-time Input: <strong>{query || '—'}</strong>
        </span>
        <span className="toolkit-badge muted">
          Debounced Output: <strong>{debounced || '—'}</strong>
        </span>
      </div>
      <p style={{ margin: '0.85rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
        Debounced value updates 500ms after you stop typing.
      </p>
    </div>
  )
}

const ToolkitUseDebounce: React.FC = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">useDebounce</h1>
      <p className="page-description">
        Hold off on expensive work until the user pauses — the classic search-input utility.
      </p>
    </div>

    <div className="concept-card">
      <h3 className="concept-title">Live playground</h3>
      <DebouncePlayground />
      <div className="toolkit-benefit">
        <strong>Architectural benefit:</strong> Prevents API / filter spam by coalescing rapid
        state changes into a single update after inactivity — fewer network calls, less main-thread work.
      </div>
    </div>

    <CodeBlock title="Copy-paste: useDebounce.ts" code={HOOK_CODE} language="typescript" />
  </div>
)

export default ToolkitUseDebounce
