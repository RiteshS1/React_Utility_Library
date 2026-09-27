import React from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useWindowSize } from '../../hooks/customHooks'

const CODE = `import { useState, useEffect } from 'react'

/**
 * useWindowSize — track viewport width/height for
 * charts, canvas, and layout math that CSS alone can't do.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

// Usage
const { width, height } = useWindowSize()`

const Demo = () => {
  const { width, height } = useWindowSize()
  const aspect = width && height ? (width / height).toFixed(2) : '—'

  return (
    <div>
      <p style={{ margin: '0 0 0.75rem', color: '#475569', fontSize: '0.9rem' }}>
        Resize your browser — numbers update live.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '0.75rem',
        }}
      >
        {[
          { label: 'Width', value: `${width}px` },
          { label: 'Height', value: `${height}px` },
          { label: 'Aspect', value: aspect },
        ].map((card) => (
          <div key={card.label} className="toolkit-panel" style={{ marginTop: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{card.label}</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e3c97', marginTop: 4 }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const UseWindowSizeToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useWindowSize"
    tagline="Subscribe to viewport dimensions for canvas, charts, and JS-driven layouts."
    benefit="Gives components numeric access to the viewport without ad-hoc listeners. Pair with debounce in heavy UIs, or prefer useMediaQuery when you only need breakpoints."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseWindowSizeToolkit
