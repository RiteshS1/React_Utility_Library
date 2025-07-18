import React, { useState, useEffect } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const BasicEffectDemo = () => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Component mounted!')

  // Effect runs after every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Effect runs only on mount
  useEffect(() => {
    console.log('Component mounted!')
    setMessage('Component mounted and ready!')
  }, [])

  // Effect runs when count changes
  useEffect(() => {
    if (count > 0) {
      setMessage(`You clicked ${count} time${count > 1 ? 's' : ''}!`)
    }
  }, [count])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Effect Hook Demo</h3>
      <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>{message}</p>
      <p style={{ margin: '0 0 1rem 0' }}>Count: <strong>{count}</strong></p>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
        Check the browser tab title - it updates with the count!
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

const TimerDemo = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: number | null = null

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Timer with Cleanup</h3>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        margin: '1rem 0', 
        color: isRunning ? '#22c55e' : '#6b7280',
        fontFamily: 'monospace'
      }}>
        {formatTime(seconds)}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: isRunning ? '#d1d5db' : '#22c55e',
            color: isRunning ? '#6b7280' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: !isRunning ? '#d1d5db' : '#ef4444',
            color: !isRunning ? '#6b7280' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

interface Post {
  id: number
  title: string
  body: string
}

const DataFetchingDemo = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Data Fetching Example</h3>
        <button
          onClick={fetchPosts}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: loading ? '#d1d5db' : '#007acc',
            color: loading ? '#6b7280' : 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #ef4444',
          borderRadius: '4px',
          marginBottom: '1rem',
          color: '#b91c1c'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #007acc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Loading posts...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1rem' }}>
                {post.title}
              </h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.5 }}>
                {post.body.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const WindowSizeDemo = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getBreakpoint = () => {
    if (windowSize.width < 640) return 'Mobile'
    if (windowSize.width < 768) return 'Small Tablet'
    if (windowSize.width < 1024) return 'Tablet'
    if (windowSize.width < 1280) return 'Desktop'
    return 'Large Desktop'
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Window Size Tracker</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f0f9ff', 
          border: '1px solid #007acc', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007acc' }}>
            {windowSize.width}px
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Width</div>
        </div>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f0f9ff', 
          border: '1px solid #007acc', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007acc' }}>
            {windowSize.height}px
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Height</div>
        </div>
      </div>
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
          Current Breakpoint: <span style={{ color: '#007acc' }}>{getBreakpoint()}</span>
        </div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
          Resize your browser window to see live updates
        </div>
      </div>
    </div>
  )
}

const UseEffectHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useEffect Hook</h1>
        <p className="page-description">
          Master the useEffect hook for side effects and lifecycle management.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useEffect?</h2>
        <p className="concept-description">
          <code>useEffect</code> is a React Hook that lets you perform side effects in functional components. 
          It serves the same purpose as <code>componentDidMount</code>, <code>componentDidUpdate</code>, 
          and <code>componentWillUnmount</code> combined in React class components.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic useEffect Syntax</h2>
        <CodeBlock
          title="useEffect Patterns"
          code={`import { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // 1. Effect runs after every render (no dependency array)
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  // 2. Effect runs only once after mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted!');
  }, []);

  // 3. Effect runs when specific values change
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  // 4. Effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Count: {count}</div>;
}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Basic Effects</h2>
        <p className="concept-description">
          Here's a simple example showing different useEffect patterns:
        </p>
        <CodeBlock
          title="Basic useEffect Example"
          code={`function EffectDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Component mounted!');

  // Effect runs after every render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  // Effect runs only on mount
  useEffect(() => {
    console.log('Component mounted!');
    setMessage('Component mounted and ready!');
  }, []); // Empty dependency array

  // Effect runs when count changes
  useEffect(() => {
    if (count > 0) {
      setMessage(\`You clicked \${count} time\${count > 1 ? 's' : ''}!\`);
    }
  }, [count]); // Dependency array with count

  return (
    <div>
      <p>{message}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<BasicEffectDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Cleanup with useEffect</h2>
        <p className="concept-description">
          Effects can return a cleanup function to prevent memory leaks and cancel ongoing operations:
        </p>
        <CodeBlock
          title="Timer with Cleanup"
          code={`function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup function - runs when effect is cleaned up
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Effect depends on isRunning

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div>
      <h3>Timer with Cleanup</h3>
      <div style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
        {formatTime(seconds)}
      </div>
      <button onClick={() => setIsRunning(true)} disabled={isRunning}>
        Start
      </button>
      <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={() => { setIsRunning(false); setSeconds(0); }}>
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
        <h2 className="concept-title">Data Fetching</h2>
        <p className="concept-description">
          One of the most common use cases for useEffect is fetching data when a component mounts:
        </p>
        <CodeBlock
          title="Data Fetching with useEffect"
          code={`function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={fetchPosts} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      {posts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<DataFetchingDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Event Listeners</h2>
        <p className="concept-description">
          useEffect is perfect for setting up and cleaning up event listeners:
        </p>
        <CodeBlock
          title="Window Resize Listener"
          code={`function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - setup once on mount

  const getBreakpoint = () => {
    if (windowSize.width < 640) return 'Mobile';
    if (windowSize.width < 768) return 'Small Tablet';
    if (windowSize.width < 1024) return 'Tablet';
    if (windowSize.width < 1280) return 'Desktop';
    return 'Large Desktop';
  };

  return (
    <div>
      <h3>Window Size Tracker</h3>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
      <p>Breakpoint: {getBreakpoint()}</p>
      <small>Resize your browser window to see updates</small>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<WindowSizeDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Dependency Array Rules</h2>
        <div className="concept-description">
          <p>The dependency array is crucial for controlling when effects run:</p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>No dependency array:</strong> Effect runs after every render</li>
            <li><strong>Empty array []:</strong> Effect runs only once after mount</li>
            <li><strong>With dependencies [a, b]:</strong> Effect runs when any dependency changes</li>
            <li><strong>ESLint rule:</strong> Include all values from component scope used inside effect</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="useEffect Common Patterns"
          code={`// 1. Fetching data on mount
useEffect(() => {
  fetchUserData();
}, []);

// 2. Subscribing to external data
useEffect(() => {
  const subscription = DataService.subscribe(handleDataChange);
  return () => subscription.unsubscribe();
}, []);

// 3. Setting up timers
useEffect(() => {
  const timer = setTimeout(() => {
    // Do something after delay
  }, 1000);
  return () => clearTimeout(timer);
}, []);

// 4. Updating document title
useEffect(() => {
  document.title = \`\${appName} - \${currentPage}\`;
}, [appName, currentPage]);

// 5. Focusing input on mount
useEffect(() => {
  inputRef.current?.focus();
}, []);

// 6. Saving to localStorage
useEffect(() => {
  localStorage.setItem('user-preferences', JSON.stringify(preferences));
}, [preferences]);

// 7. Conditional effects
useEffect(() => {
  if (shouldTrack) {
    analytics.track('page-view');
  }
}, [shouldTrack]);`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Include Dependencies:</strong> Always include all values from component scope that are used inside the effect</li>
            <li><strong>Use Multiple Effects:</strong> Separate concerns by using multiple useEffect hooks</li>
            <li><strong>Clean Up:</strong> Always clean up subscriptions, timers, and event listeners</li>
            <li><strong>Avoid Infinite Loops:</strong> Be careful with dependency arrays to prevent infinite re-renders</li>
            <li><strong>Use ESLint Plugin:</strong> Install react-hooks/exhaustive-deps ESLint rule</li>
            <li><strong>Consider Performance:</strong> Use useMemo and useCallback to optimize dependencies</li>
            <li><strong>Handle Async Properly:</strong> Don't make the effect function async; use async functions inside</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UseEffectHook
