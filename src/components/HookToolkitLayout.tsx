import React from 'react'
import CodeBlock from './CodeBlock'
import './HookToolkit.css'

interface HookToolkitLayoutProps {
  name: string
  tagline: string
  benefit: string
  code: string
  demo: React.ReactNode
}

const HookToolkitLayout: React.FC<HookToolkitLayoutProps> = ({
  name,
  tagline,
  benefit,
  code,
  demo,
}) => (
  <div className="page toolkit-page">
    <div className="page-header">
      <p className="toolkit-eyebrow">Custom Hooks Toolkit</p>
      <h1 className="page-title">{name}</h1>
      <p className="page-description">{tagline}</p>
    </div>

    <div className="concept-card toolkit-benefit">
      <h3 className="concept-title">Why it matters</h3>
      <p className="concept-description">{benefit}</p>
    </div>

    <CodeBlock title={`${name} — copy-paste ready`} code={code} language="tsx" />

    <div className="concept-card toolkit-playground">
      <h3 className="concept-title">Live playground</h3>
      <p className="concept-description">Interact with the hook below — no setup required.</p>
      <div className="toolkit-demo">{demo}</div>
    </div>
  </div>
)

export default HookToolkitLayout
