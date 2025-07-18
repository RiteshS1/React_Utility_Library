import React, { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
const IfElseDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const username = 'John Doe'

  const renderContent = () => {
    if (isLoggedIn) {
      return (
        <div style={{ padding: '1rem', backgroundColor: '#22c55e', color: 'white', borderRadius: '4px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Welcome back, {username}!</h3>
          <p style={{ margin: 0 }}>You have access to all features.</p>
        </div>
      )
    } else {
      return (
        <div style={{ padding: '1rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '4px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Please log in</h3>
          <p style={{ margin: 0 }}>You need to log in to access this content.</p>
        </div>
      )
    }
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        {renderContent()}
      </div>
      
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </div>
  )
}

const TernaryDemo = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState(3)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div
        style={{
          padding: '1rem',
          backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
          color: theme === 'light' ? '#1f2937' : '#ffffff',
          borderRadius: '4px',
          border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
          marginBottom: '1rem'
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>
          {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </h3>
        <p style={{ margin: '0 0 1rem 0' }}>
          Current theme: <strong>{theme}</strong>
        </p>
        <p style={{ margin: 0 }}>
          {notifications > 0 ? (
            <span style={{ color: theme === 'light' ? '#ef4444' : '#fca5a5' }}>
              You have {notifications} notification{notifications > 1 ? 's' : ''}
            </span>
          ) : (
            <span style={{ color: theme === 'light' ? '#22c55e' : '#86efac' }}>
              No new notifications
            </span>
          )}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: theme === 'light' ? '#1f2937' : '#ffffff',
            color: theme === 'light' ? '#ffffff' : '#1f2937',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Theme
        </button>
        <button
          onClick={() => setNotifications(Math.max(0, notifications - 1))}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Notification
        </button>
        <button
          onClick={() => setNotifications(notifications + 1)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Notification
        </button>
      </div>
    </div>
  )
}

const LogicalAndDemo = () => {
  const [showAlert, setShowAlert] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [messageCount, setMessageCount] = useState(0)

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      <div style={{ marginBottom: '1rem' }}>
        {showAlert && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>⚠️ Important Notice</h4>
            <p style={{ margin: 0, color: '#92400e' }}>
              This is a conditional alert that only shows when showAlert is true.
            </p>
          </div>
        )}

        {hasPermission && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#dcfce7',
            border: '1px solid #22c55e',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>✅ Access Granted</h4>
            <p style={{ margin: 0, color: '#166534' }}>
              You have permission to access restricted content.
            </p>
          </div>
        )}

        {messageCount > 0 && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#dbeafe',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>📨 Messages</h4>
            <p style={{ margin: 0, color: '#1e40af' }}>
              You have {messageCount} unread message{messageCount > 1 ? 's' : ''}.
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowAlert(!showAlert)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: showAlert ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showAlert ? 'Hide Alert' : 'Show Alert'}
        </button>
        <button
          onClick={() => setHasPermission(!hasPermission)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: hasPermission ? '#ef4444' : '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {hasPermission ? 'Revoke Permission' : 'Grant Permission'}
        </button>
        <button
          onClick={() => setMessageCount(messageCount + 1)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Message
        </button>
        <button
          onClick={() => setMessageCount(0)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Messages
        </button>
      </div>
    </div>
  )
}

const ComplexDemo = () => {
  const [user, setUser] = useState<{
    name: string
    role: 'admin' | 'user' | 'guest'
    isActive: boolean
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const roles = [
    { value: 'admin', label: 'Administrator', color: '#ef4444' },
    { value: 'user', label: 'Regular User', color: '#3b82f6' },
    { value: 'guest', label: 'Guest', color: '#6b7280' }
  ]

  const simulateLogin = (role: 'admin' | 'user' | 'guest') => {
    setLoading(true)
    setTimeout(() => {
      setUser({
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        role,
        isActive: Math.random() > 0.3 // 70% chance of being active
      })
      setLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
  }

  const renderUserInterface = () => {
    if (loading) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #007acc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ margin: 0, color: '#6b7280' }}>Loading...</p>
        </div>
      )
    }

    if (!user) {
      return (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Welcome! Please log in</h3>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {roles.map(role => (
              <button
                key={role.value}
                onClick={() => simulateLogin(role.value as 'admin' | 'user' | 'guest')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: role.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Login as {role.label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div style={{
        padding: '1.5rem',
        backgroundColor: user.isActive ? '#f0f9ff' : '#fef2f2',
        border: `2px solid ${user.isActive ? '#007acc' : '#ef4444'}`,
        borderRadius: '4px'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
            Welcome, {user.name}!
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>
            Role: <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong>
          </p>
          <p style={{
            margin: '0 0 1rem 0',
            color: user.isActive ? '#22c55e' : '#ef4444',
            fontWeight: '600'
          }}>
            Status: {user.isActive ? '🟢 Active' : '🔴 Inactive'}
          </p>
        </div>

        {/* Role-based content */}
        {user.role === 'admin' && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#b91c1c' }}>🔧 Admin Panel</h4>
            <p style={{ margin: 0, color: '#b91c1c' }}>
              You have full administrative access to all system features.
            </p>
          </div>
        )}

        {user.role === 'user' && user.isActive && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>👤 User Features</h4>
            <p style={{ margin: 0, color: '#1e40af' }}>
              You can access all standard user features and your personal dashboard.
            </p>
          </div>
        )}

        {user.role === 'guest' && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f9fafb',
            border: '1px solid #6b7280',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4b5563' }}>👥 Guest Access</h4>
            <p style={{ margin: 0, color: '#4b5563' }}>
              You have limited access. Consider registering for full features.
            </p>
          </div>
        )}

        {!user.isActive && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#b91c1c' }}>⚠️ Account Inactive</h4>
            <p style={{ margin: 0, color: '#b91c1c' }}>
              Your account is currently inactive. Please contact support.
            </p>
          </div>
        )}

        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
      {renderUserInterface()}
    </div>
  )
}

const ConditionalRendering: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Conditional Rendering</h1>
        <p className="page-description">
          Learn different patterns for conditional rendering in React.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is Conditional Rendering?</h2>
        <p className="concept-description">
          Conditional rendering in React allows you to render different components or elements based on certain conditions. 
          It's like conditional statements in JavaScript, but applied to JSX elements. This enables dynamic user interfaces 
          that respond to state changes, user interactions, and application data.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">If-Else Statements</h2>
        <p className="concept-description">
          The most straightforward way to conditionally render content is using if-else statements in a separate function:
        </p>
        <CodeBlock
          title="If-Else Conditional Rendering"
          code={`function WelcomeMessage({ isLoggedIn, username }) {
  const renderContent = () => {
    if (isLoggedIn) {
      return (
        <div className="welcome-message">
          <h3>Welcome back, {username}!</h3>
          <p>You have access to all features.</p>
        </div>
      );
    } else {
      return (
        <div className="login-prompt">
          <h3>Please log in</h3>
          <p>You need to log in to access this content.</p>
        </div>
      );
    }
  };

  return (
    <div>
      {renderContent()}
      <button onClick={toggleLogin}>
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<IfElseDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Ternary Operator</h2>
        <p className="concept-description">
          The ternary operator provides a concise way to render one of two options inline within JSX:
        </p>
        <CodeBlock
          title="Ternary Operator Conditional Rendering"
          code={`function ThemeToggle({ theme, notifications }) {
  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <h3>
        {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </h3>
      
      <p>Current theme: <strong>{theme}</strong></p>
      
      <p>
        {notifications > 0 ? (
          <span className="has-notifications">
            You have {notifications} notification{notifications > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="no-notifications">
            No new notifications
          </span>
        )}
      </p>
      
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<TernaryDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Logical AND (&&) Operator</h2>
        <p className="concept-description">
          Use the logical AND operator to conditionally render elements only when a condition is true:
        </p>
        <CodeBlock
          title="Logical AND Conditional Rendering"
          code={`function NotificationPanel({ showAlert, hasPermission, messageCount }) {
  return (
    <div>
      {/* Show alert only if showAlert is true */}
      {showAlert && (
        <div className="alert">
          <h4>⚠️ Important Notice</h4>
          <p>This alert only shows when showAlert is true.</p>
        </div>
      )}

      {/* Show permission message only if user has permission */}
      {hasPermission && (
        <div className="permission-granted">
          <h4>✅ Access Granted</h4>
          <p>You have permission to access restricted content.</p>
        </div>
      )}

      {/* Show messages only if there are any */}
      {messageCount > 0 && (
        <div className="messages">
          <h4>📨 Messages</h4>
          <p>You have {messageCount} unread message{messageCount > 1 ? 's' : ''}.</p>
        </div>
      )}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<LogicalAndDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Complex Conditional Logic</h2>
        <p className="concept-description">
          For more complex scenarios, you can combine multiple conditional rendering patterns:
        </p>
        <CodeBlock
          title="Complex Conditional Rendering"
          code={`function UserDashboard({ user, loading }) {
  // Handle loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Handle no user (not logged in)
  if (!user) {
    return (
      <div className="login-prompt">
        <h3>Welcome! Please log in</h3>
        <button onClick={() => login('admin')}>Login as Admin</button>
        <button onClick={() => login('user')}>Login as User</button>
        <button onClick={() => login('guest')}>Login as Guest</button>
      </div>
    );
  }

  // Handle logged in user
  return (
    <div className={user.isActive ? 'active-user' : 'inactive-user'}>
      <h3>Welcome, {user.name}!</h3>
      <p>Role: <strong>{user.role}</strong></p>
      <p>Status: {user.isActive ? '🟢 Active' : '🔴 Inactive'}</p>

      {/* Role-based content */}
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h4>🔧 Admin Panel</h4>
          <p>You have full administrative access.</p>
        </div>
      )}

      {user.role === 'user' && user.isActive && (
        <div className="user-features">
          <h4>👤 User Features</h4>
          <p>Access to all standard user features.</p>
        </div>
      )}

      {user.role === 'guest' && (
        <div className="guest-access">
          <h4>👥 Guest Access</h4>
          <p>Limited access. Consider registering for full features.</p>
        </div>
      )}

      {/* Warning for inactive users */}
      {!user.isActive && (
        <div className="warning">
          <h4>⚠️ Account Inactive</h4>
          <p>Your account is currently inactive. Please contact support.</p>
        </div>
      )}
    </div>
  );
}`}
          showDemo={true}
          demoComponent={<ComplexDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Use Logical AND (&&):</strong> For simple show/hide conditions</li>
            <li><strong>Use Ternary Operator:</strong> When choosing between two different components</li>
            <li><strong>Extract Complex Logic:</strong> Move complex conditions to separate functions</li>
            <li><strong>Early Returns:</strong> Use early returns in functions for better readability</li>
            <li><strong>Avoid Complex Inline Logic:</strong> Keep JSX clean by extracting complex conditions</li>
            <li><strong>Consider Performance:</strong> Be mindful of re-rendering with changing conditions</li>
            <li><strong>Handle Loading States:</strong> Always consider loading and error states</li>
            <li><strong>Accessibility:</strong> Ensure conditional content is accessible to screen readers</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="Useful Conditional Rendering Patterns"
          code={`// 1. Default fallback with logical OR
const userName = user?.name || 'Guest';

// 2. Multiple conditions with logical AND
{isLoggedIn && hasPermission && showContent && (
  <SecretContent />
)}

// 3. Null check with optional chaining
{user?.profile?.avatar && (
  <img src={user.profile.avatar} alt="Avatar" />
)}

// 4. Array length check
{items.length > 0 && (
  <ItemList items={items} />
)}

// 5. Enum-based conditions
{status === 'loading' && <Spinner />}
{status === 'error' && <ErrorMessage />}
{status === 'success' && <SuccessContent />}

// 6. Switch-like pattern with object
const statusComponents = {
  loading: <Spinner />,
  error: <ErrorMessage />,
  success: <SuccessContent />,
  idle: <WelcomeMessage />
};

return statusComponents[status] || <DefaultComponent />;`}
        />
      </div>
    </div>
  )
}

export default ConditionalRendering
