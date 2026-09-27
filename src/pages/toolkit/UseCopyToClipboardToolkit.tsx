import React, { useState } from 'react'
import HookToolkitLayout from '../../components/HookToolkitLayout'
import { useCopyToClipboard } from '../../hooks/customHooks'

const CODE = `import { useState, useCallback } from 'react'

/**
 * useCopyToClipboard — copy text and expose a short-lived
 * "copied" flag for UI feedback (toasts, button labels).
 */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        window.setTimeout(() => setCopied(false), resetMs)
        return true
      } catch {
        setError('Clipboard permission denied')
        setCopied(false)
        return false
      }
    },
    [resetMs]
  )

  return [copy, { copied, error }] as const
}

// Usage
const [copy, { copied }] = useCopyToClipboard()
<button onClick={() => copy(snippet)}>{copied ? 'Copied!' : 'Copy'}</button>`

const Demo = () => {
  const [text, setText] = useState('npm install framer-motion')
  const [copy, { copied, error }] = useCopyToClipboard(2000)

  return (
    <div>
      <label htmlFor="copy-text">Text to copy</label>
      <input id="copy-text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" className="toolkit-btn" onClick={() => copy(text)}>
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
      <div className="toolkit-panel">
        Status:{' '}
        <span className={`toolkit-badge ${copied ? 'on' : 'off'}`}>
          {copied ? 'COPIED' : 'IDLE'}
        </span>
        {error && <span style={{ color: '#b91c1c', marginLeft: 8 }}>{error}</span>}
      </div>
    </div>
  )
}

const UseCopyToClipboardToolkit: React.FC = () => (
  <HookToolkitLayout
    name="useCopyToClipboard"
    tagline="One-liner clipboard UX with automatic reset for button labels and toasts."
    benefit="Centralizes the Clipboard API, permission errors, and ephemeral UI state — every 'Copy code' button in a docs site should share this pattern."
    code={CODE}
    demo={<Demo />}
  />
)

export default UseCopyToClipboardToolkit
