import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Code,
  Component,
  MousePointer,
  GitBranch,
  List,
  Hash,
  Eye,
  Globe,
  Repeat,
  Zap,
  Bookmark,
  Target,
  Cpu,
  LogOut,
  Layers,
  Network,
  MousePointerClick,
  Trophy,
  Check,
  Timer,
  Clipboard,
  Monitor,
  MousePointerBan,
  HardDrive,
  Smartphone,
  Wrench,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import OnlineUsers from './OnlineUsers'
import ProgressRing from './ProgressRing'
import './Sidebar.css'

interface NavigationItem {
  path: string
  title: string
  icon: React.ReactNode
  category: string
  moduleId?: string
}

const navigationItems: NavigationItem[] = [
  { path: '/learn', title: 'Dashboard', icon: <Home size={18} />, category: 'Getting Started' },
  {
    path: '/learn/critical-rendering-path',
    title: 'Critical Rendering Path',
    icon: <Layers size={18} />,
    category: 'Browser & DOM Internals',
    moduleId: 'crp',
  },
  {
    path: '/learn/react-mount-hydrate',
    title: 'Mount & Hydrate',
    icon: <Network size={18} />,
    category: 'Browser & DOM Internals',
    moduleId: 'mount-hydrate',
  },
  {
    path: '/learn/synthetic-events',
    title: 'Synthetic Events',
    icon: <MousePointerClick size={18} />,
    category: 'Browser & DOM Internals',
    moduleId: 'synthetic-events',
  },
  { path: '/learn/jsx-basics', title: 'JSX Basics', icon: <Code size={18} />, category: 'Fundamentals', moduleId: 'jsx-basics' },
  { path: '/learn/component-props', title: 'Components & Props', icon: <Component size={18} />, category: 'Fundamentals', moduleId: 'component-props' },
  { path: '/learn/event-handling', title: 'Event Handling', icon: <MousePointer size={18} />, category: 'Fundamentals', moduleId: 'event-handling' },
  { path: '/learn/conditional-rendering', title: 'Conditional Rendering', icon: <GitBranch size={18} />, category: 'Fundamentals', moduleId: 'conditional-rendering' },
  { path: '/learn/lists-and-keys', title: 'Lists & Keys', icon: <List size={18} />, category: 'Fundamentals', moduleId: 'lists-and-keys' },
  { path: '/learn/use-state', title: 'useState Hook', icon: <Hash size={18} />, category: 'React Hooks', moduleId: 'use-state' },
  { path: '/learn/use-effect', title: 'useEffect Hook', icon: <Eye size={18} />, category: 'React Hooks', moduleId: 'use-effect' },
  { path: '/learn/use-context', title: 'useContext Hook', icon: <Globe size={18} />, category: 'React Hooks', moduleId: 'use-context' },
  { path: '/learn/use-reducer', title: 'useReducer Hook', icon: <Repeat size={18} />, category: 'React Hooks', moduleId: 'use-reducer' },
  { path: '/learn/use-memo', title: 'useMemo Hook', icon: <Zap size={18} />, category: 'React Hooks', moduleId: 'use-memo' },
  { path: '/learn/use-callback', title: 'useCallback Hook', icon: <Bookmark size={18} />, category: 'React Hooks', moduleId: 'use-callback' },
  { path: '/learn/use-ref', title: 'useRef Hook', icon: <Target size={18} />, category: 'React Hooks', moduleId: 'use-ref' },
  { path: '/learn/custom-hooks', title: 'Custom Hooks Intro', icon: <Cpu size={18} />, category: 'React Hooks', moduleId: 'custom-hooks' },
  { path: '/learn/toolkit/use-debounce', title: 'useDebounce', icon: <Timer size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-debounce' },
  { path: '/learn/toolkit/use-onclick-outside', title: 'useOnClickOutside', icon: <MousePointerBan size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-outside' },
  { path: '/learn/toolkit/use-local-storage', title: 'useLocalStorage', icon: <HardDrive size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-storage' },
  { path: '/learn/toolkit/use-media-query', title: 'useMediaQuery', icon: <Smartphone size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-media' },
  { path: '/learn/toolkit/use-copy-to-clipboard', title: 'useCopyToClipboard', icon: <Clipboard size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-copy' },
  { path: '/learn/toolkit/use-interval', title: 'useInterval', icon: <Wrench size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-interval' },
  { path: '/learn/toolkit/use-window-size', title: 'useWindowSize', icon: <Monitor size={18} />, category: 'Custom Hooks Toolkit', moduleId: 'tk-window' },
  { path: '/learn/master-assessment', title: 'Master SDE-1 & SDE-2 Quiz', icon: <Trophy size={18} />, category: 'Assessment' },
]

const CATEGORIES = [
  'Getting Started',
  'Browser & DOM Internals',
  'Fundamentals',
  'React Hooks',
  'Custom Hooks Toolkit',
  'Assessment',
] as const

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { progressPercent, isComplete, quizBestScore } = useProgress()

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) onClose()
  }

  const handleLogout = async () => {
    handleLinkClick()
    navigate('/', { replace: true })
    await logout()
  }

  const isActive = (path: string) =>
    path === '/learn' ? location.pathname === '/learn' : location.pathname === path

  return (
    <>
      <button
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hamburger-svg" aria-hidden>
          <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" className="hamburger-line line-1" />
          <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" className="hamburger-line line-2" />
          <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" className="hamburger-line line-3" />
        </svg>
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <div>
              <h1 className="sidebar-title">React Mastery</h1>
              <p className="sidebar-subtitle">Learning Platform</p>
            </div>
            <ProgressRing percent={progressPercent} size={48} strokeWidth={4} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <OnlineUsers />
          </div>
          {quizBestScore !== null && (
            <div className="sidebar-quiz-best">
              <Trophy size={14} /> Best quiz: {quizBestScore}%
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {CATEGORIES.map((category) => (
            <div key={category} className="nav-category">
              <h3 className="category-title">{category}</h3>
              <ul className="nav-list">
                {navigationItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <li key={item.path} className="nav-item">
                      <Link
                        to={item.path}
                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={handleLinkClick}
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.title}</span>
                        {item.moduleId && isComplete(item.moduleId) && (
                          <span className="nav-done" title="Completed">
                            <Check size={14} />
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        {user && (
          <div className="sidebar-user-profile">
            <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <button type="button" onClick={handleLogout} className="logout-button" title="Logout" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar
