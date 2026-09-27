import React from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useMediaQuery } from '../../hooks/customHooks'

const CODE = `import { useState, useEffect } from 'react'

/**
 * useMediaQuery — subscribe to a CSS media query from JS.
 * Swap layouts, load heavier widgets only on desktop, etc.
 */
export function useMediaQuery(query: string): boolean {
  const getMatch = () =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false

  const [matches, setMatches] = useState(getMatch)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// Usage
const isDesktop = useMediaQuery('(min-width: 768px)')`

const Demo = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const isPortrait = useMediaQuery('(orientation: portrait)')

  return (
    <div>
      <p style={{ margin: '0 0 0.75rem', color: '#475569', fontSize: '0.9rem' }}>
        Resize the window or rotate your device to see live updates.
      </p>
      <div className="toolkit-panel">
        <div style={{ marginBottom: '0.5rem' }}>
          <code>(min-width: 768px)</code> →{' '}
          <span className={`toolkit-badge ${isDesktop ? 'on' : 'off'}`}>
            {isDesktop ? 'DESKTOP' : 'MOBILE'}
          </span>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <code>prefers-color-scheme: dark</code> →{' '}
          <span className={`toolkit-badge ${prefersDark ? 'on' : 'off'}`}>
            {prefersDark ? 'DARK' : 'LIGHT'}
          </span>
        </div>
        <div>
          <code>orientation: portrait</code> →{' '}
          <span className={`toolkit-badge ${isPortrait ? 'on' : 'off'}`}>
            {isPortrait ? 'PORTRAIT' : 'LANDSCAPE'}
          </span>
        </div>
      </div>
    </div>
  )
}

const UseMediaQueryToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useMediaQuery"
    tagline="Bridge CSS breakpoints into React so components can adapt without hacks."
    benefit="Enables responsive behavior in JS (conditional rendering, different data density) while staying in sync with the real viewport — no resize spam if you listen to matchMedia."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseMediaQueryToolkit
