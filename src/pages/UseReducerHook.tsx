import React, { useReducer } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
interface CounterState {
  count: number
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    case 'set':
      return { count: action.payload }
    default:
      return state
  }
}

const CounterDemo = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <h3>Count: {state.count}</h3>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          onClick={() => dispatch({ type: 'decrement' })}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          -1
        </button>
        <button 
          onClick={() => dispatch({ type: 'reset' })}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset
        </button>
        <button 
          onClick={() => dispatch({ type: 'increment' })}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          +1
        </button>
        <button 
          onClick={() => dispatch({ type: 'set', payload: 10 })}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Set to 10
        </button>
      </div>
    </div>
  )
}

interface TodoState {
  todos: { id: number; text: string; completed: boolean }[]
  nextId: number
}

type TodoAction = 
  | { type: 'add'; payload: string }
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'clear_completed' }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, text: action.payload, completed: false }],
        nextId: state.nextId + 1
      }
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      }
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    default:
      return state
  }
}

const TodoDemo = () => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [], nextId: 1 })
  const [inputText, setInputText] = React.useState('')
  
  const handleAdd = () => {
    if (inputText.trim()) {
      dispatch({ type: 'add', payload: inputText.trim() })
      setInputText('')
    }
  }
  
  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          placeholder="Add new todo"
        />
        <button 
          onClick={handleAdd}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add
        </button>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        {state.todos.map(todo => (
          <div 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem',
              backgroundColor: todo.completed ? '#f3f4f6' : 'white',
              marginBottom: '0.25rem',
              borderRadius: '4px',
              border: '1px solid #e5e7eb'
            }}
          >
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
            />
            <span style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#6b7280' : 'inherit'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch({ type: 'remove', payload: todo.id })}
              style={{ 
                padding: '0.25rem 0.5rem', 
                backgroundColor: '#ef4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}
            >
              Remove
            </button>
          </div>
        ))}
        {state.todos.length === 0 && (
          <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>
            No todos yet. Add one above!
          </p>
        )}
      </div>
      
      {state.todos.some(todo => todo.completed) && (
        <button 
          onClick={() => dispatch({ type: 'clear_completed' })}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#f59e0b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          Clear Completed
        </button>
      )}
      
      <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <small>
          Total: {state.todos.length} | 
          Completed: {state.todos.filter(t => t.completed).length} | 
          Remaining: {state.todos.filter(t => !t.completed).length}
        </small>
      </div>
    </div>
  )
}

const UseReducerHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useReducer Hook</h1>
        <p className="page-description">
          Handle complex state logic with the useReducer hook.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useReducer?</h2>
        <p className="concept-description">
          <code>useReducer</code> is an alternative to <code>useState</code> for managing complex state logic. 
          It's especially useful when you have state that involves multiple sub-values or when the next state 
          depends on the previous one. It follows the Redux pattern with actions and reducers.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic Syntax</h2>
        <CodeBlock
          title="useReducer Syntax"
          code={`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* new state */ };
    default:
      return state;
  }
};`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Counter Example</h2>
        <p className="concept-description">
          A simple counter with multiple actions using useReducer:
        </p>
        <CodeBlock
          title="Counter with useReducer"
          code={`interface CounterState {
  count: number;
}

type CounterAction = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
};

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <h3>Count: {state.count}</h3>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'set', payload: 10 })}>Set to 10</button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<CounterDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Complex State Management</h2>
        <p className="concept-description">
          useReducer shines when managing complex state with multiple related values:
        </p>
        <CodeBlock
          title="Todo List with useReducer"
          code={`interface TodoState {
  todos: { id: number; text: string; completed: boolean }[];
  nextId: number;
}

type TodoAction = 
  | { type: 'add'; payload: string }
  | { type: 'toggle'; payload: number }
  | { type: 'remove'; payload: number }
  | { type: 'clear_completed' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, { 
          id: state.nextId, 
          text: action.payload, 
          completed: false 
        }],
        nextId: state.nextId + 1
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed } 
            : todo
        )
      };
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'clear_completed':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
};

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [], nextId: 1 });
  
  // Component implementation...
}`}
          showDemo={true}
          demoComponent={<TodoDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Use useReducer</h2>
        <div className="concept-description">
          <p>Choose <code>useReducer</code> over <code>useState</code> when:</p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>You have complex state logic with multiple sub-values</li>
            <li>The next state depends on the previous one</li>
            <li>You want to optimize performance by avoiding inline object creation</li>
            <li>You need to manage state transitions in a predictable way</li>
            <li>You're building a component similar to a mini-Redux store</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Pure Reducers:</strong> Always return new state objects, never mutate existing state</li>
            <li><strong>Action Types:</strong> Use descriptive action type constants to avoid typos</li>
            <li><strong>TypeScript:</strong> Use union types for actions to get better type safety</li>
            <li><strong>Default Case:</strong> Always include a default case in your reducer</li>
            <li><strong>Single Responsibility:</strong> Keep reducers focused on a single piece of state</li>
            <li><strong>Testing:</strong> Reducers are pure functions, making them easy to unit test</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UseReducerHook
