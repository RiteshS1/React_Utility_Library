import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { useLocalStorage, useDebounce, useCounter, usePrevious, useToggle } from '../hooks/customHooks'

// Demo Components for Custom Hooks
const LocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('user-name', '')
  const [preferences, setPreferences] = useLocalStorage('user-preferences', { theme: 'light', notifications: true })

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Your Name (persisted in localStorage):
        </label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          placeholder="Enter your name"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Preferences:</h4>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input 
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
            style={{ marginRight: '0.5rem' }}
          />
          Enable notifications
        </label>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <select 
            value={preferences.theme}
            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            style={{ padding: '0.25rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </label>
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <p style={{ margin: 0 }}>Name: {name || 'Not set'}</p>
        <p style={{ margin: 0 }}>Theme: {preferences.theme}</p>
        <p style={{ margin: 0 }}>Notifications: {preferences.notifications ? 'Enabled' : 'Disabled'}</p>
        <small style={{ color: '#666' }}>Refresh the page - your data will persist!</small>
      </div>
    </div>
  )
}

const DebounceDemo = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  // Simulated search results
  const allItems = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Next.js']
  const filteredItems = debouncedSearchTerm 
    ? allItems.filter(item => item.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : allItems

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Search (debounced by 500ms):
        </label>
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          placeholder="Start typing to search..."
        />
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <strong>Current Input:</strong> "{searchTerm}"
        </div>
        <div>
          <strong>Debounced Value:</strong> "{debouncedSearchTerm}"
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Search Results:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {filteredItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.25rem' }}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const CounterDemo = () => {
  const { count, increment, decrement, reset, setValue } = useCounter(0)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Count: {count}</h3>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
        <button 
          onClick={decrement}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Decrement
        </button>
        <button 
          onClick={reset}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset
        </button>
        <button 
          onClick={increment}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Increment
        </button>
      </div>
      <div>
        <button 
          onClick={() => setValue(7)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Set to 7...thala for a reason!
        </button>
      </div>
    </div>
  )
}

const PreviousDemo = () => {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>Current count: {count}</p>
        <p style={{ margin: '0 0 0.5rem 0' }}>Previous count: {previousCount ?? 'None'}</p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          -1
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          +1
        </button>
      </div>
    </div>
  )
}

const ToggleDemo = () => {
  const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false)
  const { value: isEnabled, toggle: toggleEnabled } = useToggle(true)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Visibility Toggle:</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button 
            onClick={toggle}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Toggle
          </button>
          <button 
            onClick={setTrue}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Show
          </button>
          <button 
            onClick={setFalse}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Hide
          </button>
        </div>
        {isVisible && (
          <div style={{ padding: '1rem', backgroundColor: '#22c55e', color: 'white', borderRadius: '4px' }}>
            🎉 This content is visible!
          </div>
        )}
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Feature Toggle:</h4>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox"
            checked={isEnabled}
            onChange={toggleEnabled}
            style={{ marginRight: '0.5rem' }}
          />
          Feature is {isEnabled ? 'enabled' : 'disabled'}
        </label>
      </div>
    </div>
  )
}

const CustomHooks: React.FC = () => {
  const useLocalStorageCode = `import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error)
    }
  }

  return [storedValue, setValue] as const
}

// Usage
function UserProfile() {
  const [name, setName] = useLocalStorage('user-name', '')
  const [preferences, setPreferences] = useLocalStorage('preferences', { theme: 'light' })
  
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {/* Data persists across page reloads! */}
    </div>
  )
}`

  const useDebounceCode = `import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  // Only search when debounced value changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}`

  const useFetchCode = `import { useState, useEffect } from 'react'

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch<User[]>('/api/users')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}`

  const useCounterCode = `import { useState, useCallback } from 'react'

export const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const setValue = useCallback((value: number) => setCount(value), [])

  return { count, increment, decrement, reset, setValue }
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`

  const usePreviousCode = `import { useRef, useEffect } from 'react'

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}

// Usage
function Component() {
  const [count, setCount] = useState(0)
  const previousCount = usePrevious(count)
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}`

  const useToggleCode = `import { useState, useCallback } from 'react'

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(prev => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse, setValue }
}

// Usage
function Modal() {
  const { value: isOpen, toggle, setFalse } = useToggle(false)
  
  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </div>
  )
}`

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Custom Hooks</h1>
        <p className="page-description">
          Custom hooks are reusable functions that encapsulate stateful logic. They allow you to 
          extract component logic into reusable functions, promoting code reuse and separation of concerns. 
          Here are the essential custom hooks every React developer should know.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What are Custom Hooks?</h2>
        <p className="concept-description">
          Custom hooks are JavaScript functions whose names start with "use" and can call other hooks. 
          They enable you to share stateful logic between components without changing the component hierarchy. 
          Custom hooks are one of the most powerful patterns in React for code reuse.
        </p>
      </div>

      <CodeBlock
        title="useLocalStorage - Persist State to localStorage"
        code={useLocalStorageCode}
        language="tsx"
        showDemo={true}
        demoComponent={<LocalStorageDemo />}
      />

      <CodeBlock
        title="useDebounce - Debounce Value Changes"
        code={useDebounceCode}
        language="tsx"
        showDemo={true}
        demoComponent={<DebounceDemo />}
      />

      <CodeBlock
        title="useFetch - Generic Data Fetching Hook"
        code={useFetchCode}
        language="tsx"
      />

      <CodeBlock
        title="useCounter - Counter with Methods"
        code={useCounterCode}
        language="tsx"
        showDemo={true}
        demoComponent={<CounterDemo />}
      />

      <CodeBlock
        title="usePrevious - Track Previous Value"
        code={usePreviousCode}
        language="tsx"
        showDemo={true}
        demoComponent={<PreviousDemo />}
      />

      <CodeBlock
        title="useToggle - Boolean State Management"
        code={useToggleCode}
        language="tsx"
        showDemo={true}
        demoComponent={<ToggleDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">Custom Hook Best Practices</h2>
        <ul className="concept-description">
          <li><strong>Start with "use":</strong> Always prefix custom hook names with "use"</li>
          <li><strong>Single responsibility:</strong> Each hook should have one clear purpose</li>
          <li><strong>Return objects or arrays:</strong> Use objects for named returns, arrays for ordered returns</li>
          <li><strong>Handle edge cases:</strong> Include error handling and loading states</li>
          <li><strong>Use TypeScript:</strong> Add proper type definitions for better developer experience</li>
          <li><strong>Test thoroughly:</strong> Write tests for your custom hooks using React Testing Library</li>
          <li><strong>Document well:</strong> Provide clear documentation and usage examples</li>
        </ul>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Create Custom Hooks</h2>
        <ul className="concept-description">
          <li>When you have stateful logic that's repeated across components</li>
          <li>To encapsulate complex state management patterns</li>
          <li>When working with external APIs or browser APIs</li>
          <li>To create reusable form handling logic</li>
          <li>For managing side effects that occur in multiple components</li>
          <li>To abstract complex calculations or data transformations</li>
        </ul>
      </div>
    </div>
  )
}

export default CustomHooks
