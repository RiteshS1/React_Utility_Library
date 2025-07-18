import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const FocusInputDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const focusTextarea = () => {
    textareaRef.current?.focus()
  }

  const selectAllInInput = () => {
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  const clearTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.value = ''
      setTextareaValue('')
      textareaRef.current.focus()
    }
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>DOM Focus Management</h3>
      
      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Input Field:
          </label>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something here..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              onClick={focusInput}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Focus Input
            </button>
            <button
              onClick={selectAllInInput}
              disabled={!inputValue}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                opacity: !inputValue ? 0.5 : 1
              }}
            >
              Select All Text
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Textarea:
          </label>
          <textarea
            ref={textareaRef}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              onClick={focusTextarea}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Focus Textarea
            </button>
            <button
              onClick={clearTextarea}
              disabled={!textareaValue}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                opacity: !textareaValue ? 0.5 : 1
              }}
            >
              Clear & Focus
            </button>
          </div>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Current Values:</h4>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Input:</strong> "{inputValue}" ({inputValue.length} chars)
        </p>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Textarea:</strong> "{textareaValue}" ({textareaValue.length} chars)
        </p>
      </div>
    </div>
  )
}

const TimerDemo = () => {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true)
      startTimeRef.current = Date.now() - count * 1000
      intervalRef.current = window.setInterval(() => {
        setCount(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 100)
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }

  const resetTimer = () => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setCount(0)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Timer with useRef</h3>
      
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: isRunning ? '#22c55e' : '#6b7280',
          marginBottom: '1rem'
        }}>
          {formatTime(count)}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {!isRunning ? (
            <button
              onClick={startTimer}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Pause
            </button>
          )}
          
          <button
            onClick={resetTimer}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Timer Status:</h4>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>State:</strong> {isRunning ? '🟢 Running' : '🔴 Stopped'}
        </p>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Interval ID:</strong> {intervalRef.current || 'None'}
        </p>
        <small style={{ color: '#6b7280', display: 'block', marginTop: '0.5rem' }}>
          useRef stores interval ID without causing re-renders
        </small>
      </div>
    </div>
  )
}

const PreviousValueDemo = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('John')
  const prevCountRef = useRef<number | undefined>(undefined)
  const prevNameRef = useRef<string | undefined>(undefined)

  // Update previous values after render
  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  useEffect(() => {
    prevNameRef.current = name
  }, [name])

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(0)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Previous Value Tracking</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Counter:
          </label>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {count}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Previous: {prevCountRef.current ?? 'None'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={decrement}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              -1
            </button>
            <button
              onClick={increment}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              +1
            </button>
            <button
              onClick={reset}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Name:
          </label>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            marginBottom: '0.5rem'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              "{name}"
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Previous: "{prevNameRef.current ?? 'None'}"
            </div>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '4px'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>Value Changes:</h4>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#92400e' }}>
          <strong>Count:</strong> {prevCountRef.current ?? 'N/A'} → {count}
          {prevCountRef.current !== undefined && (
            <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>
              ({count > (prevCountRef.current ?? 0) ? '⬆️' : count < (prevCountRef.current ?? 0) ? '⬇️' : '➡️'})
            </span>
          )}
        </p>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#92400e' }}>
          <strong>Name:</strong> "{prevNameRef.current ?? 'N/A'}" → "{name}"
          {prevNameRef.current && prevNameRef.current !== name && (
            <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>🔄</span>
          )}
        </p>
      </div>
    </div>
  )
}

// Custom Input component using forwardRef
const CustomInput = forwardRef<HTMLInputElement, { 
  label: string; 
  placeholder?: string; 
  value: string; 
  onChange: (value: string) => void 
}>(({ label, placeholder, value, onChange }, ref) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
        {label}:
      </label>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '2px solid #e5e7eb',
          borderRadius: '4px',
          fontSize: '1rem',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#007acc'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e5e7eb'
        }}
      />
    </div>
  )
})

// Component with imperative handle
const FancyInput = forwardRef<{ focus: () => void; clear: () => void; getValue: () => string }, {
  label: string;
  initialValue?: string;
}>(({ label, initialValue = '' }, ref) => {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      setValue('')
      inputRef.current?.focus()
    },
    getValue: () => {
      return value
    }
  }))

  return (
    <div style={{
      padding: '1rem',
      border: '2px solid #22c55e',
      borderRadius: '4px',
      backgroundColor: '#f0f9ff'
    }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#166534' }}>
        {label}:
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '2px solid #22c55e',
          borderRadius: '4px',
          fontSize: '1rem'
        }}
      />
      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#166534' }}>
        Length: {value.length} characters
      </div>
    </div>
  )
})

const ForwardRefDemo = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const fancyInputRef = useRef<{ focus: () => void; clear: () => void; getValue: () => string }>(null)

  const focusFirstName = () => {
    firstNameRef.current?.focus()
  }

  const focusLastName = () => {
    lastNameRef.current?.focus()
  }

  const clearAll = () => {
    setFirstName('')
    setLastName('')
    fancyInputRef.current?.clear()
  }

  const showValues = () => {
    const fancyValue = fancyInputRef.current?.getValue() || ''
    alert(`First: "${firstName}"\nLast: "${lastName}"\nFancy: "${fancyValue}"`)
  }

  const focusFancy = () => {
    fancyInputRef.current?.focus()
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>forwardRef and useImperativeHandle</h3>
      
      <CustomInput
        ref={firstNameRef}
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        onChange={setFirstName}
      />

      <CustomInput
        ref={lastNameRef}
        label="Last Name"
        placeholder="Enter your last name"
        value={lastName}
        onChange={setLastName}
      />

      <FancyInput
        ref={fancyInputRef}
        label="Fancy Input with Custom Methods"
        initialValue="Hello World"
      />

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={focusFirstName}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Focus First Name
        </button>
        <button
          onClick={focusLastName}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Focus Last Name
        </button>
        <button
          onClick={focusFancy}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Focus Fancy Input
        </button>
        <button
          onClick={clearAll}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Clear All
        </button>
        <button
          onClick={showValues}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Show Values
        </button>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #3b82f6',
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Current Values:</h4>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>Full Name:</strong> {firstName} {lastName}
        </p>
        <small style={{ color: '#6b7280' }}>
          forwardRef allows parent components to access child component refs
        </small>
      </div>
    </div>
  )
}

const UseRefHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useRef Hook</h1>
        <p className="page-description">
          Access DOM elements and store mutable values with useRef.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useRef?</h2>
        <p className="concept-description">
          <code>useRef</code> is a React Hook that provides a way to access DOM elements directly 
          and store mutable values that persist across re-renders without triggering re-renders 
          when changed. It returns a mutable ref object with a <code>.current</code> property.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic useRef Syntax</h2>
        <CodeBlock
          title="useRef Basic Usage"
          code={`import { useRef, useEffect } from 'react';

function BasicRefExample() {
  // 1. DOM element reference
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 2. Mutable value that doesn't cause re-renders
  const countRef = useRef(0);
  
  // 3. Store previous state value
  const prevValueRef = useRef<string>();

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    // Access DOM element
    if (inputRef.current) {
      inputRef.current.value = 'Hello World!';
      inputRef.current.select();
    }
    
    // Update mutable value (no re-render)
    countRef.current += 1;
    console.log('Button clicked:', countRef.current, 'times');
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="I will be focused" />
      <button onClick={handleClick}>
        Click me (count stored in ref)
      </button>
    </div>
  );
}

// TypeScript types for common refs
const textInputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const anyValueRef = useRef<any>(initialValue);`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">DOM Element Access</h2>
        <p className="concept-description">
          The most common use of useRef is to access DOM elements for focus management, 
          scrolling, or measuring:
        </p>
        <CodeBlock
          title="DOM Focus Management"
          code={`function FocusExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const selectAllText = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const clearAndFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
      />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={selectAllText}>Select All</button>
      
      <textarea
        ref={textareaRef}
        placeholder="Write your thoughts..."
        rows={4}
      />
      <button onClick={clearAndFocus}>Clear & Focus</button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<FocusInputDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Storing Mutable Values</h2>
        <p className="concept-description">
          useRef is perfect for storing values that need to persist across renders 
          but shouldn't trigger re-renders when changed:
        </p>
        <CodeBlock
          title="Timer with useRef"
          code={`function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Store interval ID without causing re-renders
  const intervalRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - count * 1000;
      
      intervalRef.current = window.setInterval(() => {
        setCount(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 100);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setCount(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div>
      <div style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
        {formatTime(count)}
      </div>
      
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={pauseTimer} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<TimerDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Tracking Previous Values</h2>
        <p className="concept-description">
          useRef can be used to store previous values of state or props, 
          which is useful for comparisons and animations:
        </p>
        <CodeBlock
          title="Previous Value Tracking"
          code={`function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // Store previous values
  const prevCountRef = useRef<number>();
  const prevNameRef = useRef<string>();

  // Update previous values after render
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  useEffect(() => {
    prevNameRef.current = name;
  }, [name]);

  return (
    <div>
      <div>
        <h4>Counter: {count}</h4>
        <p>Previous count: {prevCountRef.current ?? 'None'}</p>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
        <button onClick={() => setCount(c => c - 1)}>-1</button>
      </div>
      
      <div>
        <h4>Name: "{name}"</h4>
        <p>Previous name: "{prevNameRef.current ?? 'None'}"</p>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      
      <div>
        <h4>Changes:</h4>
        <p>Count: {prevCountRef.current ?? 'N/A'} → {count}</p>
        <p>Name: "{prevNameRef.current ?? 'N/A'}" → "{name}"</p>
      </div>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<PreviousValueDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">forwardRef and useImperativeHandle</h2>
        <p className="concept-description">
          Advanced patterns for ref forwarding and exposing imperative methods to parent components:
        </p>
        <CodeBlock
          title="forwardRef and useImperativeHandle"
          code={`import { forwardRef, useImperativeHandle } from 'react';

// Basic forwardRef usage
const CustomInput = forwardRef<HTMLInputElement, {
  label: string;
  placeholder?: string;
}>(({ label, placeholder }, ref) => {
  return (
    <div>
      <label>{label}:</label>
      <input ref={ref} type="text" placeholder={placeholder} />
    </div>
  );
});

// Advanced useImperativeHandle
const FancyInput = forwardRef<
  { focus: () => void; clear: () => void; getValue: () => string },
  { label: string; initialValue?: string }
>(({ label, initialValue = '' }, ref) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
      inputRef.current?.focus();
    },
    getValue: () => {
      return value;
    }
  }));

  return (
    <div>
      <label>{label}:</label>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
});

// Usage in parent component
function ParentComponent() {
  const customInputRef = useRef<HTMLInputElement>(null);
  const fancyInputRef = useRef<{
    focus: () => void;
    clear: () => void;
    getValue: () => string;
  }>(null);

  const focusCustomInput = () => {
    customInputRef.current?.focus();
  };

  const clearFancyInput = () => {
    fancyInputRef.current?.clear();
  };

  const getFancyValue = () => {
    const value = fancyInputRef.current?.getValue();
    alert(\`Fancy input value: \${value}\`);
  };

  return (
    <div>
      <CustomInput
        ref={customInputRef}
        label="Custom Input"
        placeholder="Enter text"
      />
      <button onClick={focusCustomInput}>Focus Custom Input</button>
      
      <FancyInput
        ref={fancyInputRef}
        label="Fancy Input"
        initialValue="Hello"
      />
      <button onClick={clearFancyInput}>Clear Fancy Input</button>
      <button onClick={getFancyValue}>Get Fancy Value</button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<ForwardRefDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Use useRef</h2>
        <div className="concept-description">
          <p><strong>Use useRef when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Accessing DOM elements for focus, scrolling, or measurements</li>
            <li>Storing mutable values that shouldn't trigger re-renders</li>
            <li>Keeping references to intervals, timeouts, or subscriptions</li>
            <li>Tracking previous values of state or props</li>
            <li>Storing instance variables in functional components</li>
            <li>Implementing imperative APIs with useImperativeHandle</li>
          </ul>
          
          <p style={{ marginTop: '1rem' }}><strong>Don't use useRef when:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>You need the value change to trigger re-renders (use useState instead)</li>
            <li>You want to render the value in JSX (use state instead)</li>
            <li>You're trying to pass data between components (use props or context)</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Null Checks:</strong> Always check if ref.current exists before using it</li>
            <li><strong>TypeScript Types:</strong> Use proper generic types for better type safety</li>
            <li><strong>Cleanup:</strong> Clear intervals, timeouts, and subscriptions in useEffect cleanup</li>
            <li><strong>Initial Values:</strong> Provide appropriate initial values for useRef</li>
            <li><strong>Don't Read During Render:</strong> Reading ref.current during render can cause issues</li>
            <li><strong>Use forwardRef:</strong> When creating reusable components that need ref access</li>
            <li><strong>Minimal Imperative API:</strong> Keep useImperativeHandle APIs small and focused</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="useRef Common Use Cases"
          code={`// 1. DOM element access
const inputRef = useRef<HTMLInputElement>(null);
const focusInput = () => inputRef.current?.focus();

// 2. Storing interval/timeout IDs
const intervalRef = useRef<number>(0);
const startInterval = () => {
  intervalRef.current = window.setInterval(() => {
    // do something
  }, 1000);
};

// 3. Previous value tracking
const prevValueRef = useRef<string>();
useEffect(() => {
  prevValueRef.current = currentValue;
}, [currentValue]);

// 4. Instance variables
const instanceVarRef = useRef({ 
  clickCount: 0, 
  lastClickTime: 0 
});

// 5. Callback refs for dynamic elements
const callbackRef = useCallback((node: HTMLDivElement | null) => {
  if (node) {
    // Element is mounted
    node.scrollIntoView();
  }
}, []);

// 6. Storing functions that shouldn't trigger deps
const latestCallbackRef = useRef(callback);
latestCallbackRef.current = callback;

// 7. Animation and measurement
const elementRef = useRef<HTMLDivElement>(null);
const measureElement = () => {
  if (elementRef.current) {
    const rect = elementRef.current.getBoundingClientRect();
    console.log('Element dimensions:', rect);
  }
};`}
        />
      </div>
    </div>
  )
}

export default UseRefHook
