import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showDemo?: boolean
  demoComponent?: React.ReactNode
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'jsx', 
  title,
  showDemo = false,
  demoComponent 
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="code-section">
      <div className="code-section-header">
        {title && <h3 className="code-section-title">{title}</h3>}
        <button 
          onClick={handleCopy}
          className="copy-button"
          aria-label={isCopied ? 'Copied!' : 'Copy code'}
        >
          {isCopied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="code-content">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
      {showDemo && demoComponent && (
        <div className="demo-section">
          <h4 className="demo-title">Live Demo:</h4>
          <div className="demo-content">
            {demoComponent}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
