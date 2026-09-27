import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useLocalStorage } from '../../hooks/customHooks'
import './Toolkit.css'

const HOOK_CODE = `import { useState, useCallback } from 'react'

/**
 * useLocalStorage — useState that syncs to window.localStorage.
 * Survives refresh; great for theme, drafts, and preferences.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item != null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        window.localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key]
  )

  return [storedValue, setValue] as const
}`

const StoragePlayground = () => {
  const [note, setNote] = useLocalStorage('toolkit-note', '')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('toolkit-theme', 'light')

  return (
    <div className={`toolkit-theme-panel ${theme}`}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
        Sticky note (persisted)
      </label>
      <input
        className="toolkit-input"
        style={theme === 'dark' ? { background: '#0f172a', borderColor: '#334155', color: '#f8fafc' } : undefined}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type something, then refresh the page…"
      />
      <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button type="button" className="toolkit-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle theme ({theme})
        </button>
        <button
          type="button"
          className="toolkit-btn ghost"
          onClick={() => {
            setNote('')
            setTheme('light')
          }}
        >
          Reset
        </button>
      </div>
      <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
        Refresh this page — your note and theme should still be here (keys:{' '}
        <code>toolkit-note</code>, <code>toolkit-theme</code>).
      </p>
    </div>
  )
}

const ToolkitUseLocalStorage: React.FC = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">useLocalStorage</h1>
      <p className="page-description">
        Drop-in <code>useState</code> replacement that writes through to the browser&apos;s localStorage.
      </p>
    </div>

    <div className="concept-card">
      <h3 className="concept-title">Live playground</h3>
      <StoragePlayground />
      <div className="toolkit-benefit">
        <strong>Architectural benefit:</strong> Bypasses ephemeral React memory so preferences survive
        tabs and reloads — without bolting on a global store for simple key/value UI state.
      </div>
    </div>

    <CodeBlock title="Copy-paste: useLocalStorage.ts" code={HOOK_CODE} language="typescript" />
  </div>
)

export default ToolkitUseLocalStorage
