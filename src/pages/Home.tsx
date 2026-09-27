import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code, Zap, Target } from 'lucide-react'

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: 'Comprehensive Learning',
      description: 'Master React fundamentals from JSX to advanced hooks patterns'
    },
    {
      icon: <Code size={24} />,
      title: 'Interactive Code Examples',
      description: 'Live demos with copy-to-clipboard functionality for easy learning'
    },
    {
      icon: <Zap size={24} />,
      title: 'Performance Optimization',
      description: 'Learn useMemo, useCallback, and other performance techniques'
    },
    {
      icon: <Target size={24} />,
      title: 'Custom Hooks Mastery',
      description: 'Build reusable logic with custom hooks like useLocalStorage, useFetch'
    }
  ]

  const quickLinks = [
    { path: '/learn/critical-rendering-path', title: 'Browser & DOM Internals', description: 'CRP, mount phases, synthetic events' },
    { path: '/learn/jsx-basics', title: 'Start with JSX Basics', description: 'Learn the syntax that powers React' },
    { path: '/learn/use-state', title: 'Master useState', description: 'Manage component state effectively' },
    { path: '/learn/master-assessment', title: 'SDE-1 / SDE-2 Quiz', description: '20 interview questions with deep reviews' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Learning Dashboard</h1>
        <p className="page-description">
          Continue your path from browser internals through hooks mastery. Track progress
          in the sidebar, then finish with the Master SDE assessment.
        </p>
      </div>

      <div className="grid">
        {features.map((feature, index) => (
          <div key={index} className="concept-card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ color: '#007acc', marginRight: '0.75rem' }}>
                {feature.icon}
              </div>
              <h3 className="concept-title">{feature.title}</h3>
            </div>
            <p className="concept-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Quick Start Guide
        </h2>
        <div className="grid">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="quick-link-card">
              <div className="concept-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 className="concept-title" style={{ color: '#007acc' }}>
                      {link.title}
                    </h3>
                    <p className="concept-description">{link.description}</p>
                  </div>
                  <ArrowRight size={20} style={{ color: '#007acc', flexShrink: 0 }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '3rem', padding: '2rem', background: '#f0f9ff', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1e40af' }}>
          What You'll Learn
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>React Fundamentals</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>JSX syntax and expressions</li>
              <li>Component composition</li>
              <li>Event handling</li>
              <li>Conditional rendering</li>
              <li>Lists and keys</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>React Hooks</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>useState & useEffect</li>
              <li>useContext & useReducer</li>
              <li>useMemo & useCallback</li>
              <li>useRef & custom hooks</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Custom Hooks</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#666' }}>
              <li>useLocalStorage</li>
              <li>useDebounce</li>
              <li>useFetch</li>
              <li>useCounter & useToggle</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
