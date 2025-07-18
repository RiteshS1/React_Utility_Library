import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const CounterDemo = () => {
  const [count, setCount] = useState(0)
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <h3>Count: {count}</h3>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          +
        </button>
      </div>
    </div>
  )
}

const InputDemo = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Name:</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          placeholder="Enter your name"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          placeholder="Enter your email"
        />
      </div>
      <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px', marginTop: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Current Values:</h4>
        <p style={{ margin: '0' }}>Name: {name || 'Not entered'}</p>
        <p style={{ margin: '0' }}>Email: {email || 'Not entered'}</p>
      </div>
    </div>
  )
}

const ArrayStateDemo = () => {
  const [items, setItems] = useState(['React', 'JavaScript'])
  const [newItem, setNewItem] = useState('')
  
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }
  
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          placeholder="Add new item"
        />
        <button 
          onClick={addItem}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add
        </button>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, index) => (
          <li 
            key={index}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
              marginBottom: '0.5rem'
            }}
          >
            <span>{item}</span>
            <button 
              onClick={() => removeItem(index)}
              style={{ 
                padding: '0.25rem 0.5rem', 
                backgroundColor: '#ef4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const UseStateHook: React.FC = () => {
  const basicStateCode = `import React, { useState } from 'react'

function Counter() {
  // Declare state variable with initial value
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}`

  const inputStateCode = `import React, { useState } from 'react'

function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <form>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <p>Hello, {name}! Your email is {email}</p>
    </form>
  )
}`

  const arrayStateCode = `import React, { useState } from 'react'

function TodoList() {
  const [items, setItems] = useState(['Learn React', 'Build an app'])
  const [newItem, setNewItem] = useState('')
  
  const addItem = () => {
    if (newItem.trim()) {
      // Always create new array, don't mutate existing
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }
  
  const removeItem = (index) => {
    // Filter creates a new array
    setItems(items.filter((_, i) => i !== index))
  }
  
  return (
    <div>
      <input 
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addItem()}
      />
      <button onClick={addItem}>Add Item</button>
      
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`

  const objectStateCode = `import React, { useState } from 'react'

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  })
  
  const updateUser = (field, value) => {
    // Spread operator to create new object
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }))
  }
  
  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
      <input 
        type="number"
        value={user.age}
        onChange={(e) => updateUser('age', parseInt(e.target.value))}
        placeholder="Age"
      />
    </div>
  )
}`

  const stateUpdaterCode = `import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  // Functional state update - recommended for state based on previous state
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  
  // Multiple updates in one function
  const incrementTwice = () => {
    setCount(prevCount => prevCount + 1)
    setCount(prevCount => prevCount + 1)
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementTwice}>+2</button>
    </div>
  )
}`

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useState Hook</h1>
        <p className="page-description">
          The useState hook is the most fundamental React hook for managing component state. 
          Learn how to declare state variables, update them, and handle different data types 
          including primitives, objects, and arrays.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useState?</h2>
        <p className="concept-description">
          useState is a React Hook that lets you add state to functional components. It returns 
          an array with two elements: the current state value and a setter function to update it. 
          This hook replaced the need for class components in most cases.
        </p>
      </div>

      <CodeBlock
        title="Basic Counter with useState"
        code={basicStateCode}
        language="jsx"
        showDemo={true}
        demoComponent={<CounterDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">State with Input Fields</h2>
        <p className="concept-description">
          When working with form inputs, you'll often use useState to create controlled components. 
          The input value is controlled by React state, ensuring a single source of truth.
        </p>
      </div>

      <CodeBlock
        title="Controlled Input Components"
        code={inputStateCode}
        language="jsx"
        showDemo={true}
        demoComponent={<InputDemo />}
      />

      <div className="concept-card">
        <h2 className="concept-title">Managing Arrays in State</h2>
        <p className="concept-description">
          When updating arrays in state, always create a new array instead of mutating the existing one. 
          Use spread operator (...) or array methods like filter() that return new arrays.
        </p>
      </div>

      <CodeBlock
        title="Array State Management"
        code={arrayStateCode}
        language="jsx"
        showDemo={true}
        demoComponent={<ArrayStateDemo />}
      />

      <CodeBlock
        title="Object State Updates"
        code={objectStateCode}
        language="jsx"
      />

      <div className="concept-card">
        <h2 className="concept-title">Functional State Updates</h2>
        <p className="concept-description">
          When the new state depends on the previous state, use the functional form of setState. 
          This ensures you're working with the most current state value, especially important 
          when multiple updates might happen in quick succession.
        </p>
      </div>

      <CodeBlock
        title="Functional State Updates"
        code={stateUpdaterCode}
        language="jsx"
      />

      <div className="concept-card">
        <h2 className="concept-title">useState Best Practices</h2>
        <ul className="concept-description">
          <li><strong>Initialize with appropriate data type:</strong> Match initial state to expected data type</li>
          <li><strong>Use functional updates:</strong> When new state depends on previous state</li>
          <li><strong>Don't mutate state:</strong> Always create new objects/arrays for state updates</li>
          <li><strong>Separate concerns:</strong> Use multiple useState calls for unrelated state</li>
          <li><strong>Consider useReducer:</strong> For complex state logic with multiple sub-values</li>
          <li><strong>Keep state local:</strong> Don't lift state up unnecessarily</li>
        </ul>
      </div>
    </div>
  )
}

export default UseStateHook
