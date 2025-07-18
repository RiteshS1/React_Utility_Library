import React, { createContext, useContext, useState } from 'react'
import CodeBlock from '../components/CodeBlock'

// Demo Components
// 1. Theme Context Example
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header style={{
      padding: '1rem',
      backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
      color: theme === 'light' ? '#1f2937' : '#ffffff',
      border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
      borderRadius: '4px',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>
          {theme === 'light' ? '☀️ Light Theme' : '🌙 Dark Theme'}
        </h3>
        <button
          onClick={toggleTheme}
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
      </div>
    </header>
  )
}

const Content: React.FC = () => {
  const { theme } = useTheme()
  
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: theme === 'light' ? '#f9fafb' : '#374151',
      color: theme === 'light' ? '#1f2937' : '#f9fafb',
      border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#4b5563'}`,
      borderRadius: '4px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>Content Area</h4>
      <p style={{ margin: 0 }}>
        This content adapts to the current theme. Notice how both the header and content 
        components can access the theme state without prop drilling!
      </p>
    </div>
  )
}

const ThemeDemo: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
        <Header />
        <Content />
      </div>
    </ThemeProvider>
  )
}

// 2. User Context Example
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

const UserProfile: React.FC = () => {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: '#fef2f2',
        border: '1px solid #ef4444',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 1rem 0', color: '#b91c1c' }}>Please log in to view profile</p>
      </div>
    )
  }

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f0f9ff',
      border: '1px solid #007acc',
      borderRadius: '4px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>User Profile</h4>
      <p style={{ margin: '0.25rem 0', color: '#1e40af' }}><strong>Name:</strong> {user.name}</p>
      <p style={{ margin: '0.25rem 0', color: '#1e40af' }}><strong>Email:</strong> {user.email}</p>
      <p style={{ margin: '0.25rem 0 1rem 0', color: '#1e40af' }}><strong>Role:</strong> {user.role}</p>
      <button
        onClick={logout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#ef4444',
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

const LoginForm: React.FC = () => {
  const { user, login } = useUser()

  const handleLogin = (role: 'admin' | 'user' | 'guest') => {
    const userData: User = {
      id: Date.now().toString(),
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@example.com`,
      role
    }
    login(userData)
  }

  if (user) {
    return <UserProfile />
  }

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '4px'
    }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>Login as:</h4>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleLogin('admin')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Admin
        </button>
        <button
          onClick={() => handleLogin('user')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          User
        </button>
        <button
          onClick={() => handleLogin('guest')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Guest
        </button>
      </div>
    </div>
  )
}

const Navigation: React.FC = () => {
  const { user } = useUser()

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      borderRadius: '4px',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>My App</h4>
        <div style={{ fontSize: '0.875rem' }}>
          {user ? (
            <span>Welcome, {user.name}! ({user.role})</span>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </div>
    </nav>
  )
}

const UserDemo: React.FC = () => {
  return (
    <UserProvider>
      <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
        <Navigation />
        <LoginForm />
      </div>
    </UserProvider>
  )
}

// 3. Multiple Contexts Example
interface SettingsContextType {
  language: string
  notifications: boolean
  updateLanguage: (lang: string) => void
  toggleNotifications: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('English')
  const [notifications, setNotifications] = useState(true)

  const updateLanguage = (lang: string) => setLanguage(lang)
  const toggleNotifications = () => setNotifications(prev => !prev)

  return (
    <SettingsContext.Provider value={{
      language,
      notifications,
      updateLanguage,
      toggleNotifications
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

const SettingsPanel: React.FC = () => {
  const { language, notifications, updateLanguage, toggleNotifications } = useSettings()
  const { user } = useUser()
  const { theme } = useTheme()

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: theme === 'light' ? '#f9fafb' : '#374151',
      color: theme === 'light' ? '#1f2937' : '#f9fafb',
      border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#4b5563'}`,
      borderRadius: '4px'
    }}>
      <h4 style={{ margin: '0 0 1rem 0' }}>Settings Panel</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Language:
        </label>
        <select
          value={language}
          onChange={(e) => updateLanguage(e.target.value)}
          style={{
            padding: '0.25rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
            color: theme === 'light' ? '#1f2937' : '#ffffff'
          }}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
          />
          <span>Enable notifications</span>
        </label>
      </div>

      <div style={{
        padding: '0.75rem',
        backgroundColor: theme === 'light' ? '#e5e7eb' : '#4b5563',
        borderRadius: '4px',
        fontSize: '0.875rem'
      }}>
        <p style={{ margin: '0 0 0.25rem 0' }}><strong>Current Context Values:</strong></p>
        <p style={{ margin: '0.25rem 0' }}>Theme: {theme}</p>
        <p style={{ margin: '0.25rem 0' }}>User: {user ? user.name : 'Not logged in'}</p>
        <p style={{ margin: '0.25rem 0' }}>Language: {language}</p>
        <p style={{ margin: '0.25rem 0' }}>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  )
}

const MultiContextDemo: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <SettingsProvider>
          <div style={{ padding: '1rem', border: '2px solid #007acc', borderRadius: '4px' }}>
            <SettingsPanel />
          </div>
        </SettingsProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

const UseContextHook: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">useContext Hook</h1>
        <p className="page-description">
          Learn how to avoid prop drilling with the useContext hook.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">What is useContext?</h2>
        <p className="concept-description">
          <code>useContext</code> is a React Hook that lets you read and subscribe to context from your component. 
          Context provides a way to share data between components without having to pass props down manually 
          at every level (avoiding "prop drilling"). It's perfect for global state like themes, user authentication, 
          or application settings.
        </p>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Creating and Using Context</h2>
        <CodeBlock
          title="Basic Context Setup"
          code={`import { createContext, useContext, useState } from 'react';

// 1. Create the context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Create a provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook for easier usage
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 4. Use the context in components
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <h1>{theme === 'light' ? '☀️ Light' : '🌙 Dark'} Theme</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}`}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Theme Context Example</h2>
        <p className="concept-description">
          Here's a complete example showing how to implement a theme context:
        </p>
        <CodeBlock
          title="Theme Context Implementation"
          code={`// Context definition
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Components using the context
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header style={{ 
      backgroundColor: theme === 'light' ? '#fff' : '#1f2937',
      color: theme === 'light' ? '#1f2937' : '#fff' 
    }}>
      <h3>{theme === 'light' ? '☀️ Light' : '🌙 Dark'} Theme</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

const Content = () => {
  const { theme } = useTheme();
  return (
    <div style={{ 
      backgroundColor: theme === 'light' ? '#f9fafb' : '#374151',
      color: theme === 'light' ? '#1f2937' : '#f9fafb' 
    }}>
      This content adapts to the theme without prop drilling!
    </div>
  );
};

// App component
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}`}
          showDemo={true}
          demoComponent={<ThemeDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">User Authentication Context</h2>
        <p className="concept-description">
          Context is commonly used for user authentication state management:
        </p>
        <CodeBlock
          title="User Context for Authentication"
          code={`interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// Components
const Navigation = () => {
  const { user } = useUser();
  return (
    <nav>
      <h4>My App</h4>
      <div>
        {user ? \`Welcome, \${user.name}!\` : 'Not logged in'}
      </div>
    </nav>
  );
};

const LoginForm = () => {
  const { user, login, logout } = useUser();

  const handleLogin = (role) => {
    login({
      id: Date.now().toString(),
      name: \`\${role} User\`,
      email: \`\${role}@example.com\`,
      role
    });
  };

  if (user) {
    return (
      <div>
        <h4>User Profile</h4>
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
      <button onClick={() => handleLogin('user')}>Login as User</button>
    </div>
  );
};`}
          showDemo={true}
          demoComponent={<UserDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Multiple Contexts</h2>
        <p className="concept-description">
          You can use multiple contexts together by nesting providers:
        </p>
        <CodeBlock
          title="Multiple Context Providers"
          code={`// Multiple context providers
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SettingsProvider>
          <div>
            {/* All components here have access to all three contexts */}
            <Navigation />
            <MainContent />
            <SettingsPanel />
          </div>
        </SettingsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// Component using multiple contexts
const SettingsPanel = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const { language, notifications, updateLanguage, toggleNotifications } = useSettings();

  return (
    <div className={theme}>
      <h4>Settings for {user?.name}</h4>
      
      <select value={language} onChange={(e) => updateLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
      </select>
      
      <label>
        <input 
          type="checkbox" 
          checked={notifications} 
          onChange={toggleNotifications} 
        />
        Enable notifications
      </label>
      
      <div>
        Current values: {theme} theme, {language}, 
        notifications {notifications ? 'on' : 'off'}
      </div>
    </div>
  );
};`}
          showDemo={true}
          demoComponent={<MultiContextDemo />}
        />
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Context Best Practices</h2>
        <div className="concept-description">
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li><strong>Custom Hooks:</strong> Always create custom hooks for context consumption</li>
            <li><strong>Error Boundaries:</strong> Throw errors when context is used outside providers</li>
            <li><strong>TypeScript:</strong> Use proper typing for context values and providers</li>
            <li><strong>Split Contexts:</strong> Don't put everything in one context - split by concern</li>
            <li><strong>Provider Placement:</strong> Place providers at the appropriate level in your component tree</li>
            <li><strong>Performance:</strong> Be mindful of re-renders - split contexts if needed</li>
            <li><strong>Default Values:</strong> Provide meaningful default values when creating context</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">When to Use Context</h2>
        <div className="concept-description">
          <p><strong>Use Context for:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Theme/UI preferences</li>
            <li>User authentication state</li>
            <li>Application settings</li>
            <li>Language/localization</li>
            <li>Shopping cart state</li>
            <li>Any data that many components need</li>
          </ul>
          
          <p style={{ marginTop: '1rem' }}><strong>Don't use Context for:</strong></p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Passing props through 1-2 levels (use props)</li>
            <li>Local component state</li>
            <li>Performance-critical state updates</li>
            <li>Complex state logic (consider useReducer instead)</li>
          </ul>
        </div>
      </div>

      <div className="concept-card">
        <h2 className="concept-title">Common Patterns</h2>
        <CodeBlock
          title="Useful Context Patterns"
          code={`// 1. Context with reducer for complex state
const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// 2. Conditional context provider
const ConditionalProvider = ({ children, condition }) => {
  if (condition) {
    return <SomeProvider>{children}</SomeProvider>;
  }
  return children;
};

// 3. Context composition hook
const useAppContext = () => {
  const theme = useTheme();
  const user = useUser();
  const settings = useSettings();
  
  return { theme, user, settings };
};

// 4. Context with localStorage persistence
const PersistentProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('app-state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('app-state', JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, setState }}>
      {children}
    </Context.Provider>
  );
};`}
        />
      </div>
    </div>
  )
}

export default UseContextHook
