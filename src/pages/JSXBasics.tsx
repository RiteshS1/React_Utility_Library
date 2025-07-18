import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components for JSX Examples
const NameDemo = () => {
  const name = 'React Developer'
  return <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
    Hello, {name}!
  </div>
}

const ExpressionDemo = () => {
  interface User {
    firstName: string
    lastName: string
  }
  
  const user: User = { firstName: 'John', lastName: 'Doe' }
  const formatName = (user: User) => `${user.firstName} ${user.lastName}`
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <p>Welcome, {formatName(user)}!</p>
      <p>Today is: {new Date().toLocaleDateString()}</p>
      <p>Random number: {Math.floor(Math.random() * 100)}</p>
    </div>
  )
}

const AttributeDemo = () => {
  const imageUrl = 'https://via.placeholder.com/150x100/007acc/ffffff?text=JSX+Demo'
  const imageAlt = 'JSX Demo Image'
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <img src={imageUrl} alt={imageAlt} style={{ borderRadius: '4px', marginBottom: '0.5rem' }} />
      <p>Dynamic attributes in action!</p>
    </div>
  )
}

const ClassNameDemo = () => {
  const [isActive, setIsActive] = useState(false)
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <button 
        onClick={() => setIsActive(!isActive)}
        style={{ 
          padding: '0.5rem 1rem',
          backgroundColor: isActive ? '#22c55e' : '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
      <p>Button state: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}

const JSXBasics: React.FC = () => {
  const basicJSXCode = `function Welcome() {
  return <h1>Hello, World!</h1>
}

// JSX must have one parent element
function App() {
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome to React!</p>
    </div>
  )
}`

  const expressionCode = `function Greeting() {
  const name = 'React Developer'
  const user = { firstName: 'John', lastName: 'Doe' }
  
  const formatName = (user) => {
    return user.firstName + ' ' + user.lastName
  }
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome, {formatName(user)}!</p>
      <p>Today is: {new Date().toLocaleDateString()}</p>
      <p>Random number: {Math.floor(Math.random() * 100)}</p>
    </div>
  )
}`

  const attributeCode = `function ImageComponent() {
  const imageUrl = 'https://example.com/image.jpg'
  const imageAlt = 'Description of image'
  const isDisabled = false
  
  return (
    <div>
      <img src={imageUrl} alt={imageAlt} />
      <button disabled={isDisabled}>
        Click me
      </button>
    </div>
  )
}`

  const classNameCode = `function Button() {
  const [isActive, setIsActive] = useState(false)
  
  // Note: Use className instead of class
  return (
    <button 
      className={isActive ? 'btn-active' : 'btn-inactive'}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  )
}`

  const fragmentCode = `// Using React.Fragment
function Component() {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Description</p>
    </React.Fragment>
  )
}

// Using shorthand syntax
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  )
}`

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">JSX Basics</h1>
        <p className="page-description">
          JSX is a syntax extension for JavaScript that lets you write HTML-like markup 
          inside a JavaScript file. Learn the fundamentals of JSX syntax and how to use 
          JavaScript expressions within your markup.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is JSX?</h2>
        <p className="concept-description">
          JSX stands for JavaScript XML. It allows you to write HTML-like syntax in your JavaScript code. 
          JSX makes React components more readable and expressive by combining the power of JavaScript 
          with the familiarity of HTML.
        </p>
      </div>

      <CodeBlock
        title="Basic JSX Syntax"
        code={basicJSXCode}
        language="jsx"
        showDemo={true}
        demoComponent={<NameDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">Key JSX Rules</h2>
        <ul className="concept-description">
          <li><strong>Single Parent Element:</strong> JSX expressions must have one parent element</li>
          <li><strong>Use className:</strong> Instead of HTML's "class", use "className"</li>
          <li><strong>Close All Tags:</strong> All tags must be closed, including self-closing tags like &lt;img /&gt;</li>
          <li><strong>camelCase Properties:</strong> HTML attributes become camelCase (onClick, onChange)</li>
        </ul>
      </div>

      <CodeBlock
        title="JavaScript Expressions in JSX"
        code={expressionCode}
        language="jsx"
        showDemo={true}
        demoComponent={<ExpressionDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">Dynamic Attributes</h2>
        <p className="concept-description">
          You can use JavaScript expressions to set attributes dynamically. This is powerful 
          for creating interactive components that respond to data and user input.
        </p>
      </div>

      <CodeBlock
        title="Dynamic Attributes Example"
        code={attributeCode}
        language="jsx"
        showDemo={true}
        demoComponent={<AttributeDemo />}
      />

      <CodeBlock
        title="Conditional Classes and Styles"
        code={classNameCode}
        language="jsx"
        showDemo={true}
        demoComponent={<ClassNameDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">React Fragments</h2>
        <p className="concept-description">
          When you need to return multiple elements without adding extra nodes to the DOM, 
          use React Fragments. This keeps your HTML clean and avoids unnecessary wrapper divs.
        </p>
      </div>

      <CodeBlock
        title="Using React Fragments"
        code={fragmentCode}
        language="jsx"
      />

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <ul className="concept-description">
          <li>Keep JSX expressions simple and readable</li>
          <li>Extract complex logic into functions or variables</li>
          <li>Use meaningful variable names for better code clarity</li>
          <li>Prefer React Fragments over unnecessary wrapper divs</li>
          <li>Use proper indentation and formatting for better readability</li>
        </ul>
      </div>
    </div>
  )
}

export default JSXBasics
