import React, { useState } from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useDebounce } from '../../hooks/customHooks'

const CODE = `import { useState, useEffect } from 'react'

/**
 * useDebounce — wait until the value stops changing
 * before updating. Perfect for search inputs & resize.
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    // Cancel the pending update on every new keystroke
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

// Usage
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 400)
// Fetch / filter with debouncedQuery — not query`

const ITEMS = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Redux', 'Next.js', 'Vite', 'GraphQL']

const Demo = () => {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)
  const results = debounced
    ? ITEMS.filter((i) => i.toLowerCase().includes(debounced.toLowerCase()))
    : ITEMS

  return (
    <div>
      <label htmlFor="debounce-search">Search (400ms debounce)</label>
      <input
        id="debounce-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type quickly…"
      />
      <div className="toolkit-meta">
        <span>
          Live: <strong>{query || '—'}</strong>
        </span>
        <span>
          Debounced: <strong>{debounced || '—'}</strong>
        </span>
      </div>
      <div className="toolkit-panel">
        <strong>Results:</strong> {results.join(', ') || 'None'}
      </div>
    </div>
  )
}

const UseDebounceToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useDebounce"
    tagline="Delay reacting to a rapidly changing value until the user pauses."
    benefit="Stops hammering APIs and expensive filters on every keystroke. One timer cleanup keeps renders intentional and cheap — a staple of production search UIs."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseDebounceToolkit
