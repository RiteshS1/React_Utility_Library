import React, { useCallback, useRef, useState } from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useOnClickOutside } from '../../hooks/customHooks'

const CODE = `import { useEffect, type RefObject } from 'react'

/**
 * useOnClickOutside — close menus / modals when the
 * user clicks anywhere outside the target element.
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) return
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

// Usage
const ref = useRef<HTMLDivElement>(null)
useOnClickOutside(ref, () => setOpen(false))`

const Demo = () => {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState('Pick an option')
  const ref = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  useOnClickOutside(ref, close)

  return (
    <div>
      <p style={{ margin: '0 0 0.75rem', color: '#475569', fontSize: '0.9rem' }}>
        Open the menu, then click outside — it closes automatically.
      </p>
      <div className="toolkit-dropdown" ref={ref}>
        <button type="button" className="toolkit-btn" onClick={() => setOpen((o) => !o)}>
          {picked} ▾
        </button>
        {open && (
          <div className="toolkit-dropdown-menu">
            {['Dashboard', 'Settings', 'Billing', 'Logout'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPicked(item)
                  setOpen(false)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="toolkit-panel">
        Menu is{' '}
        <span className={`toolkit-badge ${open ? 'on' : 'off'}`}>{open ? 'OPEN' : 'CLOSED'}</span>
      </div>
    </div>
  )
}

const UseOnClickOutsideToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useOnClickOutside"
    tagline="Detect pointer events outside a ref — the foundation of dropdowns and popovers."
    benefit="Keeps dismiss logic in one reusable place instead of scattering document listeners. Proper cleanup prevents leaks when the component unmounts."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseOnClickOutsideToolkit
