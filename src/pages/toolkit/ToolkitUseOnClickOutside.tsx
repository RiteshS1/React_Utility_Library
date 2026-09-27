import React, { useCallback, useRef, useState } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { useOnClickOutside } from '../../hooks/customHooks'
import './Toolkit.css'

const HOOK_CODE = `import { useEffect, type RefObject } from 'react'

/**
 * useOnClickOutside — close menus/modals when the user clicks away.
 * Listens on document for mousedown + touchstart (mobile).
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      // Ignore clicks inside the referenced element
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
}`

const OutsidePlayground = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  useOnClickOutside(ref, close)

  return (
    <div className="toolkit-demo">
      <div className="toolkit-popover-wrap" ref={ref}>
        <button type="button" className="toolkit-btn" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close menu' : 'Open menu'}
        </button>
        {open && (
          <div className="toolkit-popover" role="dialog" aria-label="Demo menu">
            <p style={{ margin: '0 0 0.75rem', fontWeight: 600, color: '#19357f' }}>Account menu</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Click anywhere outside this card — it closes automatically via{' '}
              <code>useOnClickOutside</code>.
            </p>
          </div>
        )}
      </div>
      <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
        Status: {open ? 'Popover open' : 'Popover closed'}
      </p>
    </div>
  )
}

const ToolkitUseOnClickOutside: React.FC = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">useOnClickOutside</h1>
      <p className="page-description">
        Detect clicks outside a node — the building block for dropdowns, popovers, and modals.
      </p>
    </div>

    <div className="concept-card">
      <h3 className="concept-title">Live playground</h3>
      <OutsidePlayground />
      <div className="toolkit-benefit">
        <strong>Architectural benefit:</strong> Keeps dismiss logic out of every parent. One ref + one
        document listener gives accessible “click away to close” behavior for overlays and menus.
      </div>
    </div>

    <CodeBlock title="Copy-paste: useOnClickOutside.ts" code={HOOK_CODE} language="typescript" />
  </div>
)

export default ToolkitUseOnClickOutside
