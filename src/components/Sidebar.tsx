import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Code, Component, MousePointer, GitBranch, List, Hash, Eye, Globe, Repeat, Zap, Bookmark, Target, Cpu, LogIn, UserPlus, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import OnlineUsers from './OnlineUsers'
import './Sidebar.css'

interface NavigationItem {
  path: string
  title: string
  icon: React.ReactNode
  category: string
}


const navigationItems: NavigationItem[] = [
  { path: '/', title: 'Home', icon: <Home size={18} />, category: 'Getting Started' },
  { path: '/jsx-basics', title: 'JSX Basics', icon: <Code size={18} />, category: 'Fundamentals' },
  { path: '/component-props', title: 'Components & Props', icon: <Component size={18} />, category: 'Fundamentals' },
  { path: '/event-handling', title: 'Event Handling', icon: <MousePointer size={18} />, category: 'Fundamentals' },
  { path: '/conditional-rendering', title: 'Conditional Rendering', icon: <GitBranch size={18} />, category: 'Fundamentals' },
  { path: '/lists-and-keys', title: 'Lists & Keys', icon: <List size={18} />, category: 'Fundamentals' },
  { path: '/use-state', title: 'useState Hook', icon: <Hash size={18} />, category: 'React Hooks' },
  { path: '/use-effect', title: 'useEffect Hook', icon: <Eye size={18} />, category: 'React Hooks' },
  { path: '/use-context', title: 'useContext Hook', icon: <Globe size={18} />, category: 'React Hooks' },
  { path: '/use-reducer', title: 'useReducer Hook', icon: <Repeat size={18} />, category: 'React Hooks' },
  { path: '/use-memo', title: 'useMemo Hook', icon: <Zap size={18} />, category: 'React Hooks' },
  { path: '/use-callback', title: 'useCallback Hook', icon: <Bookmark size={18} />, category: 'React Hooks' },
  { path: '/use-ref', title: 'useRef Hook', icon: <Target size={18} />, category: 'React Hooks' },
  { path: '/custom-hooks', title: 'Custom Hooks', icon: <Cpu size={18} />, category: 'Advanced' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()
  
  const categories = Array.from(new Set(navigationItems.map(item => item.category)))

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth <= 768) {
      onClose()
    }
  }

  const handleLogout = () => {
    logout()
    handleLinkClick()
  }

  return (
    <>
      {/* Hamburger/Close Toggle Button */}
      <button 
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="hamburger-svg"
        >
          <path 
            d="M3 6H21" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className="hamburger-line line-1"
          />
          <path 
            d="M3 12H21" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className="hamburger-line line-2"
          />
          <path 
            d="M3 18H21" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            className="hamburger-line line-3"
          />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            <h1 className="sidebar-title">React Mastery</h1>
            <p className="sidebar-subtitle">Learning Platform</p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <OnlineUsers />
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {categories.map(category => (
            <div key={category} className="nav-category">
              <h3 className="category-title">{category}</h3>
              <ul className="nav-list">
                {navigationItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <li key={item.path} className="nav-item">
                      <Link 
                        to={item.path}
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.title}</span>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}

          {/* Authentication Section */}
          <div className="nav-category">
            <h3 className="category-title">Account</h3>
            <ul className="nav-list">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <div className="nav-link" style={{ cursor: 'default', opacity: 0.8 }}>
                      <span className="nav-icon">👤</span>
                      <span className="nav-text">{user?.username}</span>
                    </div>
                  </li>
                  <li className="nav-item">
                    <button 
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        width: '100%', 
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <span className="nav-icon"><LogOut size={18} /></span>
                      <span className="nav-text">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link 
                      to="/login"
                      className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      <span className="nav-icon"><LogIn size={18} /></span>
                      <span className="nav-text">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      to="/register"
                      className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      <span className="nav-icon"><UserPlus size={18} /></span>
                      <span className="nav-text">Register</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
