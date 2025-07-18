import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const ClickDemo = () => {
  const [clickCount, setClickCount] = useState(0)
  const [message, setMessage] = useState('Click a button!')

  const handleClick = (buttonName: string) => {
    setClickCount(prev => prev + 1)
    setMessage(`You clicked ${buttonName}!`)
  }

  const handleReset = () => {
    setClickCount(0)
    setMessage('Reset! Click a button!')
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>{message}</p>
        <p style={{ margin: 0, color: '#6b7280' }}>Total clicks: {clickCount}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => handleClick('Button A')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Button A
        </button>
        <button 
          onClick={() => handleClick('Button B')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Button B
        </button>
        <button 
          onClick={() => handleClick('Button C')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Button C
        </button>
        <button 
          onClick={handleReset}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

const FormDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Message:
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
            placeholder="Enter your message"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
            id="subscribe"
          />
          <label htmlFor="subscribe">Subscribe to newsletter</label>
        </div>

        <button
          type="submit"
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#007acc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: '#22c55e', 
          color: 'white', 
          borderRadius: '4px' 
        }}>
          Form submitted successfully!
        </div>
      )}

      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Current Form Data:</h4>
        <pre style={{ margin: 0, fontSize: '0.875rem' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

const KeyboardDemo = () => {
  const [keys, setKeys] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const newKey = `${e.key} (${e.type})`
    setKeys(prev => [newKey, ...prev.slice(0, 9)]) // Keep last 10 events
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const newKey = `${e.key} (${e.type})`
    setKeys(prev => [newKey, ...prev.slice(0, 9)]) // Keep last 10 events
  }

  const clearKeys = () => setKeys([])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Type in this input to see keyboard events:
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          placeholder="Type here..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0 }}>Keyboard Events (Last 10):</h4>
        <button
          onClick={clearKeys}
          style={{ 
            padding: '0.25rem 0.5rem', 
            backgroundColor: '#6b7280', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ 
        minHeight: '120px', 
        padding: '0.5rem', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '4px',
        fontSize: '0.875rem'
      }}>
        {keys.length === 0 ? (
          <p style={{ margin: 0, color: '#6b7280', fontStyle: 'italic' }}>
            No keyboard events yet. Start typing!
          </p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {keys.map((key, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const MouseDemo = () => {
  const [mouseInfo, setMouseInfo] = useState({
    x: 0,
    y: 0,
    isHovering: false,
    clickCount: 0,
    lastEvent: 'None'
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseInfo(prev => ({
      ...prev,
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
      lastEvent: 'mousemove'
    }))
  }

  const handleMouseEnter = () => {
    setMouseInfo(prev => ({
      ...prev,
      isHovering: true,
      lastEvent: 'mouseenter'
    }))
  }

  const handleMouseLeave = () => {
    setMouseInfo(prev => ({
      ...prev,
      isHovering: false,
      lastEvent: 'mouseleave'
    }))
  }

  const handleClick = () => {
    setMouseInfo(prev => ({
      ...prev,
      clickCount: prev.clickCount + 1,
      lastEvent: 'click'
    }))
  }

  const handleDoubleClick = () => {
    setMouseInfo(prev => ({
      ...prev,
      lastEvent: 'doubleclick'
    }))
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{
          width: '100%',
          height: '200px',
          backgroundColor: mouseInfo.isHovering ? '#e0f2fe' : '#f3f4f6',
          border: '2px dashed #007acc',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '1rem'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>
            Mouse Tracking Area
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Move, click, or double-click here
          </p>
        </div>
      </div>

      <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Mouse Information:</h4>
        <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem' }}>
          <li>Position: ({mouseInfo.x}, {mouseInfo.y})</li>
          <li>Hovering: {mouseInfo.isHovering ? 'Yes' : 'No'}</li>
          <li>Click Count: {mouseInfo.clickCount}</li>
          <li>Last Event: {mouseInfo.lastEvent}</li>
        </ul>
      </div>
    </div>
  )
}

const EventHandling: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Event Handling</h1>
        <p className="page-description">
          Master React event handling and synthetic events.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">React Synthetic Events</h2>
        <p className="concept-description">
          React wraps native DOM events in SyntheticEvent objects that provide a consistent API across different browsers. 
          Synthetic events have the same interface as native events, including preventDefault() and stopPropagation(), 
          but work consistently across all browsers.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic Click Events</h2>
        <p className="concept-description">
          The most common events are click events. You can handle them with the onClick prop:
        </p>
        <CodeBlock
          title="Click Event Handling"
          code={`function ClickDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState('Click a button!');

  const handleClick = (buttonName: string) => {
    setClickCount(prev => prev + 1);
    setMessage(\`You clicked \${buttonName}!\`);
  };

  const handleReset = () => {
    setClickCount(0);
    setMessage('Reset! Click a button!');
  };

  return (
    <div>
      <p>{message}</p>
      <p>Total clicks: {clickCount}</p>
      
      <button onClick={() => handleClick('Button A')}>Button A</button>
      <button onClick={() => handleClick('Button B')}>Button B</button>
      <button onClick={() => handleClick('Button C')}>Button C</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<ClickDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Form Events</h2>
        <p className="concept-description">
          Form events are essential for handling user input. Common form events include onChange, onSubmit, and onFocus:
        </p>
        <CodeBlock
          title="Form Event Handling"
          code={`function FormDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      
      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}`}
          showDemo={true}
          demoComponent={<FormDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Keyboard Events</h2>
        <p className="concept-description">
          Keyboard events let you respond to key presses. Common keyboard events include onKeyDown, onKeyUp, and onKeyPress:
        </p>
        <CodeBlock
          title="Keyboard Event Handling"
          code={`function KeyboardDemo() {
  const [keys, setKeys] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const newKey = \`\${e.key} (keydown)\`;
    setKeys(prev => [newKey, ...prev.slice(0, 9)]); // Keep last 10 events
    
    // Handle special keys
    if (e.key === 'Enter') {
      console.log('Enter key pressed!');
    }
    if (e.key === 'Escape') {
      setInputValue('');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    const newKey = \`\${e.key} (keyup)\`;
    setKeys(prev => [newKey, ...prev.slice(0, 9)]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Type here..."
      />
      
      <div>
        <h4>Recent Key Events:</h4>
        <ul>
          {keys.map((key, index) => (
            <li key={index}>{key}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<KeyboardDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Mouse Events</h2>
        <p className="concept-description">
          Mouse events provide detailed information about mouse interactions:
        </p>
        <CodeBlock
          title="Mouse Event Handling"
          code={`function MouseDemo() {
  const [mouseInfo, setMouseInfo] = useState({
    x: 0, y: 0,
    isHovering: false,
    clickCount: 0,
    lastEvent: 'None'
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseInfo(prev => ({
      ...prev,
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
      lastEvent: 'mousemove'
    }));
  };

  const handleMouseEnter = () => {
    setMouseInfo(prev => ({ ...prev, isHovering: true, lastEvent: 'mouseenter' }));
  };

  const handleMouseLeave = () => {
    setMouseInfo(prev => ({ ...prev, isHovering: false, lastEvent: 'mouseleave' }));
  };

  const handleClick = () => {
    setMouseInfo(prev => ({ 
      ...prev, 
      clickCount: prev.clickCount + 1, 
      lastEvent: 'click' 
    }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        width: '300px',
        height: '200px',
        backgroundColor: mouseInfo.isHovering ? '#e0f2fe' : '#f3f4f6',
        border: '2px dashed #007acc',
        cursor: 'pointer'
      }}
    >
      <p>Position: ({mouseInfo.x}, {mouseInfo.y})</p>
      <p>Hovering: {mouseInfo.isHovering ? 'Yes' : 'No'}</p>
      <p>Clicks: {mouseInfo.clickCount}</p>
      <p>Last Event: {mouseInfo.lastEvent}</p>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<MouseDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Event Object Properties</h2>
        <p className="concept-description">
          React synthetic events provide useful properties and methods:
        </p>
        <CodeBlock
          title="Common Event Properties"
          code={`function handleEvent(e: React.SyntheticEvent) {
  // Prevent default browser behavior
  e.preventDefault();
  
  // Stop event from bubbling up
  e.stopPropagation();
  
  // Access the target element
  const target = e.target as HTMLElement;
  console.log('Target:', target);
  
  // Access current target (element with event listener)
  const currentTarget = e.currentTarget as HTMLElement;
  console.log('Current target:', currentTarget);
  
  // Get event type
  console.log('Event type:', e.type);
  
  // For keyboard events
  if (e.type === 'keydown') {
    const keyboardEvent = e as React.KeyboardEvent;
    console.log('Key:', keyboardEvent.key);
    console.log('Key code:', keyboardEvent.keyCode);
    console.log('Ctrl pressed:', keyboardEvent.ctrlKey);
    console.log('Shift pressed:', keyboardEvent.shiftKey);
  }
  
  // For mouse events
  if (e.type === 'click') {
    const mouseEvent = e as React.MouseEvent;
    console.log('Click position:', mouseEvent.clientX, mouseEvent.clientY);
    console.log('Button:', mouseEvent.button);
  }
}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Use Arrow Functions:</strong> Use arrow functions in JSX to avoid binding issues</li>
            <li><strong>Prevent Default:</strong> Use <code>e.preventDefault()</code> to prevent default browser behavior</li>
            <li><strong>Type Events:</strong> Use proper TypeScript types for event handlers</li>
            <li><strong>Avoid Inline Handlers:</strong> Extract complex event handlers to separate functions</li>
            <li><strong>Debounce Expensive Operations:</strong> Use debouncing for search inputs or API calls</li>
            <li><strong>Clean Up:</strong> Remove event listeners in cleanup functions when needed</li>
            <li><strong>Accessibility:</strong> Ensure keyboard navigation works for interactive elements</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventHandling
