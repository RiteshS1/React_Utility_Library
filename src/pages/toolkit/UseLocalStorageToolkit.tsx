import React from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useLocalStorage } from '../../hooks/customHooks'

const CODE = `import { useState, useCallback } from 'react'

/**
 * useLocalStorage — sync React state with localStorage
 * so preferences survive a full page refresh.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const next = value instanceof Function ? value(storedValue) : value
      setStoredValue(next)
      window.localStorage.setItem(key, JSON.stringify(next))
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light')`

const Demo = () => {
  const [name, setName] = useLocalStorage('toolkit-user-name', '')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('toolkit-theme', 'light')

  return (
    <div>
      <label htmlFor="ls-name">Display name (persisted)</label>
      <input
        id="ls-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="ls-theme">Theme preference</label>
        <select
          id="ls-theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          style={{
            padding: '0.55rem 0.75rem',
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            background: '#fff',
          }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="toolkit-panel">
        Stored → name: <strong>{name || 'empty'}</strong>, theme: <strong>{theme}</strong>
        <br />
        <small style={{ color: '#64748b' }}>Refresh the page — values stay.</small>
      </div>
    </div>
  )
}

const UseLocalStorageToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useLocalStorage"
    tagline="Treat localStorage like React state — read once, write on every update."
    benefit="Eliminates boilerplate getItem/setItem and keeps UI preferences durable across sessions. Ideal for themes, drafts, and onboarding flags."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseLocalStorageToolkit
