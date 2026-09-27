import React, { useState } from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useInterval } from '../../hooks/customHooks'

const CODE = `import { useEffect, useRef } from 'react'

/**
 * useInterval — declarative setInterval that always
 * calls the *latest* callback (no stale closures).
 * Pass delay=null to pause.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback)

  useEffect(() => {
    saved.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => saved.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// Usage
const [running, setRunning] = useState(true)
useInterval(() => setCount((c) => c + 1), running ? 1000 : null)`

const Demo = () => {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(true)
  const [delay, setDelay] = useState(1000)

  useInterval(() => setCount((c) => c + 1), running ? delay : null)

  return (
    <div>
      <div className="toolkit-panel" style={{ fontSize: '2rem', fontWeight: 800, color: '#1e3c97' }}>
        {count}
      </div>
      <div className="toolkit-meta">
        <label htmlFor="interval-delay" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          Delay (ms)
          <input
            id="interval-delay"
            type="number"
            min={200}
            step={100}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value) || 1000)}
            style={{ width: 100, maxWidth: 100 }}
          />
        </label>
      </div>
      <button type="button" className="toolkit-btn" onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>
      <button type="button" className="toolkit-btn ghost" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  )
}

const UseIntervalToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useInterval"
    tagline="Dan Abramov’s classic — intervals that stay fresh and are easy to pause."
    benefit="Avoids the stale-closure trap of putting setInterval inside useEffect with []. Pausing is as simple as delay={null}. Essential for polls, clocks, and animations."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseIntervalToolkit
