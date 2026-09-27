import React from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useMediaQuery } from '../../hooks/customHooks'
import './Toolkit.css'

const HOOK_CODE = `import { useState, useEffect } from 'react'

/**
 * useMediaQuery — subscribe to a CSS media query from JavaScript.
 * Enables conditional rendering (not just display:none) by breakpoint.
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
}`

const MediaPlayground = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <div className="toolkit-demo">
      <div className="toolkit-badge-row" style={{ marginTop: 0, marginBottom: '1rem' }}>
        <span className="toolkit-badge">
          Active breakpoint:{' '}
          <strong>{isDesktop ? 'Desktop (≥768px)' : 'Mobile (<768px)'}</strong>
        </span>
      </div>
      <div className={`toolkit-media-card ${isDesktop ? 'row' : 'stacked'}`}>
        <div className="toolkit-media-swatch" aria-hidden />
        <div>
          <h4 style={{ margin: '0 0 0.35rem', color: '#19357f' }}>
            {isDesktop ? 'Side-by-side layout' : 'Stacked layout'}
          </h4>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Resize your browser. This card switches layout in JS via{' '}
            <code>useMediaQuery(&apos;(min-width: 768px)&apos;)</code> — useful when you need
            different component trees, not just CSS.
          </p>
        </div>
      </div>
    </div>
  )
}

const ToolkitUseMediaQuery: React.FC = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">useMediaQuery</h1>
      <p className="page-description">
        Track viewport breakpoints in React so you can render different UI — not only hide it with CSS.
      </p>
    </div>

    <div className="concept-card">
      <h3 className="concept-title">Live playground</h3>
      <MediaPlayground />
      <div className="toolkit-benefit">
        <strong>Architectural benefit:</strong> Enables JS-level conditional rendering based on CSS
        breakpoints (swap components, skip heavy trees on mobile) instead of shipping everything and
        using <code>display: none</code>.
      </div>
    </div>

    <CodeBlock title="Copy-paste: useMediaQuery.ts" code={HOOK_CODE} language="typescript" />
  </div>
)

export default ToolkitUseMediaQuery
