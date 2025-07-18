import React, { useState, useCallback, useMemo, useRef } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const Counter = React.memo(({ count, onIncrement, onDecrement }: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  console.log('🔄 Counter component re-rendered')
  return (
    <div style={{
      padding: '1rem',
      border: '2px solid #22c55e',
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      <h4 style={{ margin: '0 0 1rem 0' }}>Memoized Counter</h4>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: '#22c55e' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button
          onClick={onDecrement}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          -1
        </button>
        <button
          onClick={onIncrement}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          +1
        </button>
      </div>
      <small style={{ display: 'block', marginTop: '0.5rem', color: '#6b7280' }}>
        Check console for re-render logs
      </small>
    </div>
  )
})

const CallbackComparisonDemo = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('John')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // ❌ Without useCallback - creates new function on every render
  const incrementWithoutCallback = () => {
    setCount(c => c + 1)
  }

  const decrementWithoutCallback = () => {
    setCount(c => c - 1)
  }

  // ✅ With useCallback - only creates new function when dependencies change
  const incrementWithCallback = useCallback(() => {
    setCount(c => c + 1)
  }, []) // No dependencies, function never changes

  const decrementWithCallback = useCallback(() => {
    setCount(c => c - 1)
  }, []) // No dependencies, function never changes

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>useCallback Comparison</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#6b7280' }}>
            Typing here triggers parent re-render
          </small>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>
            Theme:
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #ef4444',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#b91c1c' }}>Without useCallback</h4>
          <Counter
            count={count}
            onIncrement={incrementWithoutCallback}
            onDecrement={decrementWithoutCallback}
          />
          <small style={{ color: '#b91c1c', display: 'block', marginTop: '0.5rem' }}>
            Re-renders when parent re-renders
          </small>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #22c55e',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#166534' }}>With useCallback</h4>
          <Counter
            count={count}
            onIncrement={incrementWithCallback}
            onDecrement={decrementWithCallback}
          />
          <small style={{ color: '#166534', display: 'block', marginTop: '0.5rem' }}>
            Only re-renders when count changes
          </small>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Current State:</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', fontFamily: 'monospace' }}>
          count: {count}, name: "{name}", theme: "{theme}"
        </p>
      </div>
    </div>
  )
}

const TodoItem = React.memo(({ todo, onToggle, onDelete }: {
  todo: { id: number; text: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  console.log(`🔄 TodoItem ${todo.id} re-rendered`)
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      backgroundColor: todo.completed ? '#f0f9ff' : '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      marginBottom: '0.5rem'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '0.5rem' }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#6b7280' : '#1f2937'
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.75rem'
        }}
      >
        Delete
      </button>
    </div>
  )
})

const TodoListDemo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Master useCallback', completed: false },
    { id: 3, text: 'Build awesome apps', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // ✅ Memoized event handlers
  const handleToggle = useCallback((id: number) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, []) // No dependencies because we use functional update

  const handleDelete = useCallback((id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, []) // No dependencies because we use functional update

  const handleAddTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos(todos => [...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }, [newTodo]) // Depends on newTodo

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }), [todos])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Todo List with useCallback</h3>
      
      <form onSubmit={handleAddTodo} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Add
          </button>
        </div>
      </form>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['all', 'active', 'completed'] as const).map(filterOption => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: filter === filterOption ? '#007acc' : '#f3f4f6',
              color: filter === filterOption ? 'white' : '#1f2937',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              textTransform: 'capitalize'
            }}
          >
            {filterOption}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280', fontStyle: 'italic', margin: '2rem 0' }}>
          No todos found.
        </p>
      )}

      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Statistics</h4>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#1e40af' }}>
          <span><strong>Total:</strong> {stats.total}</span>
          <span><strong>Active:</strong> {stats.active}</span>
          <span><strong>Completed:</strong> {stats.completed}</span>
        </div>
        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
          Open console to see TodoItem re-render logs
        </small>
      </div>
    </div>
  )
}

const SearchDemo = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Simulate API search function
  const searchAPI = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    console.log(`🔍 Searching for: "${query}"`)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock search results
    const mockData = [
      'React Hooks', 'React Router', 'React Context', 'React Testing',
      'JavaScript ES6', 'TypeScript Basics', 'CSS Grid', 'Flexbox',
      'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'
    ]
    
    const filtered = mockData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    )
    
    setResults(filtered)
    setIsLoading(false)
  }, []) // No dependencies

  // Debounced search function
  const timeoutRef = useRef<number | undefined>(undefined)
  
  const debouncedSearch = useCallback((query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => searchAPI(query), 300)
  }, [searchAPI])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }, [debouncedSearch])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setResults([])
  }, [])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Search with Debounced useCallback</h3>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for technologies..."
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={clearSearch}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Clear
        </button>
      </div>

      {isLoading && (
        <div style={{
          padding: '1rem',
          textAlign: 'center',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          Searching...
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #3b82f6',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>
            Results ({results.length})
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && searchTerm && results.length === 0 && (
        <div style={{
          padding: '1rem',
          textAlign: 'center',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          No results found for "{searchTerm}"
        </div>
      )}

      <small style={{ color: '#6b7280', display: 'block', marginTop: '1rem' }}>
        Search is debounced by 300ms. Check console for search logs.
      </small>
    </div>
  )
}

const UseCallbackHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useCallback Hook</h1>
        <p className="page-description">
          Optimize function memoization with the useCallback hook.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useCallback?</h2>
        <p className="concept-description">
          <code>useCallback</code> is a React Hook that memoizes a function between re-renders. 
          It returns a memoized version of the callback that only changes if one of the dependencies 
          has changed. This is useful for optimizing performance by preventing unnecessary re-renders 
          of child components.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic useCallback Syntax</h2>
        <CodeBlock
          title="useCallback Basic Usage"
          code={`import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - new function on every render
  const handleClick = () => {
    setCount(c => c + 1);
  };

  // With useCallback - memoized function
  const memoizedHandleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array means function never changes

  // useCallback with dependencies
  const handleNameChange = useCallback((newName: string) => {
    setName(newName);
    console.log('Name changed to:', newName);
  }, []); // No dependencies needed with functional updates

  // useCallback that depends on external values
  const handleCountIncrement = useCallback((amount: number) => {
    setCount(currentCount => currentCount + amount);
  }, []); // Still no dependencies with functional updates

  return (
    <div>
      <ChildComponent onClick={memoizedHandleClick} />
      <input onChange={(e) => handleNameChange(e.target.value)} />
    </div>
  );
}

// Child component wrapped with React.memo for optimization
const ChildComponent = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Performance Comparison</h2>
        <p className="concept-description">
          Here's a direct comparison showing how useCallback prevents unnecessary re-renders:
        </p>
        <CodeBlock
          title="useCallback vs Regular Function"
          code={`function ComparisonDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // ❌ Without useCallback - creates new function every render
  const incrementWithoutCallback = () => {
    setCount(c => c + 1);
  };

  // ✅ With useCallback - function stays the same between renders
  const incrementWithCallback = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps - function never changes

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Type to trigger re-renders"
      />
      
      {/* This will re-render when parent re-renders */}
      <Counter 
        count={count}
        onIncrement={incrementWithoutCallback}
        label="Without useCallback"
      />
      
      {/* This will NOT re-render when parent re-renders */}
      <Counter 
        count={count}
        onIncrement={incrementWithCallback}
        label="With useCallback"
      />
    </div>
  );
}

const Counter = React.memo(({ count, onIncrement, label }) => {
  console.log(\`🔄 \${label} component re-rendered\`);
  return (
    <div>
      <h4>{label}</h4>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+1</button>
    </div>
  );
});`}
          showDemo={true}
          demoComponent={<CallbackComparisonDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Real-World Example: Todo List</h2>
        <p className="concept-description">
          A practical example showing useCallback in a todo list application with optimized event handlers:
        </p>
        <CodeBlock
          title="Todo List with useCallback"
          code={`function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Master useCallback', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  // ✅ Memoized toggle function
  const handleToggle = useCallback((id: number) => {
    setTodos(todos => todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // No dependencies because we use functional update

  // ✅ Memoized delete function
  const handleDelete = useCallback((id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  // ✅ Memoized add function
  const handleAddTodo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos(todos => [...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo('');
    }
  }, [newTodo]); // Depends on newTodo

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log(\`🔄 TodoItem \${todo.id} re-rendered\`);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});`}
          showDemo={true}
          demoComponent={<TodoListDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Advanced Example: Debounced Search</h2>
        <p className="concept-description">
          A more complex example showing useCallback with debouncing for search functionality:
        </p>
        <CodeBlock
          title="Debounced Search with useCallback"
          code={`function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Memoized API search function
  const searchAPI = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch(\`/api/search?q=\${query}\`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies

  // ✅ Memoized debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: number;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => searchAPI(query), 300);
      };
    })(),
    [searchAPI] // Depends on searchAPI
  );

  // ✅ Memoized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      
      {isLoading && <div>Searching...</div>}
      
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<SearchDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Use useCallback</h2>
        <div className="concept-description">
          <p><strong>Use useCallback when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Passing functions to memoized child components (React.memo)</li>
            <li>Functions are dependencies of other hooks (useEffect, useMemo)</li>
            <li>Creating event handlers that are expensive to recreate</li>
            <li>Implementing debouncing or throttling</li>
            <li>Functions are passed to many child components</li>
          </ul>
          
          <p style={{ marginTop: '1rem' }}><strong>Don't use useCallback when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>The function is simple and cheap to recreate</li>
            <li>Child components are not memoized</li>
            <li>Dependencies change on every render anyway</li>
            <li>You're optimizing prematurely without measuring performance</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Use Functional Updates:</strong> Prefer functional updates to avoid dependencies</li>
            <li><strong>Combine with React.memo:</strong> useCallback is most effective with memoized components</li>
            <li><strong>ESLint Plugin:</strong> Use react-hooks/exhaustive-deps for dependency checking</li>
            <li><strong>Measure Performance:</strong> Profile before and after to ensure benefits</li>
            <li><strong>Stable References:</strong> Ensure callback identity remains stable when needed</li>
            <li><strong>Consider useEvent:</strong> For event handlers that don't need to be in dependencies</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="useCallback Common Use Cases"
          code={`// 1. Event handlers with no dependencies
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);

// 2. Event handlers with dependencies
const handleSubmit = useCallback((formData) => {
  onSubmit(formData, userId);
}, [onSubmit, userId]);

// 3. Debounced functions
const debouncedSave = useCallback(
  debounce((data) => saveToAPI(data), 500),
  [saveToAPI]
);

// 4. Memoized API calls
const fetchUserData = useCallback(async (id: string) => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}, []);

// 5. Complex event handlers
const handleItemClick = useCallback((item, index) => {
  onItemSelect(item);
  trackEvent('item_clicked', { item_id: item.id, position: index });
  setLastClickedIndex(index);
}, [onItemSelect, trackEvent]);

// 6. Conditional callbacks
const handleAction = useCallback((action) => {
  if (isAuthenticated) {
    performAction(action);
  } else {
    redirectToLogin();
  }
}, [isAuthenticated, performAction, redirectToLogin]);`}
        />
      </div>
    </div>
  )
}

export default UseCallbackHook
