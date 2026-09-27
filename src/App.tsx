import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import { ProgressProvider } from './context/ProgressContext'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ModuleTracker from './components/ModuleTracker'
import ScrollToTop from './components/ScrollToTop'
import LessonNav from './components/LessonNav'
import Landing from './pages/Landing'
import Home from './pages/Home'
import JSXBasics from './pages/JSXBasics'
import ComponentProps from './pages/ComponentProps'
import EventHandling from './pages/EventHandling'
import ConditionalRendering from './pages/ConditionalRendering'
import ListsAndKeys from './pages/ListsAndKeys'
import UseStateHook from './pages/UseStateHook'
import UseEffectHook from './pages/UseEffectHook'
import UseContextHook from './pages/UseContextHook'
import UseReducerHook from './pages/UseReducerHook'
import UseMemoHook from './pages/UseMemoHook'
import UseCallbackHook from './pages/UseCallbackHook'
import UseRefHook from './pages/UseRefHook'
import CustomHooks from './pages/CustomHooks'
import CriticalRenderingPath from './pages/CriticalRenderingPath'
import ReactMountHydrate from './pages/ReactMountHydrate'
import SyntheticEventSystem from './pages/SyntheticEventSystem'
import MasterAssessment from './pages/MasterAssessment'
import UseDebounceToolkit from './pages/toolkit/UseDebounceToolkit'
import UseOnClickOutsideToolkit from './pages/toolkit/UseOnClickOutsideToolkit'
import UseLocalStorageToolkit from './pages/toolkit/UseLocalStorageToolkit'
import UseMediaQueryToolkit from './pages/toolkit/UseMediaQueryToolkit'
import UseCopyToClipboardToolkit from './pages/toolkit/UseCopyToClipboardToolkit'
import UseIntervalToolkit from './pages/toolkit/UseIntervalToolkit'
import UseWindowSizeToolkit from './pages/toolkit/UseWindowSizeToolkit'
import './App.css'

const LEGACY_REDIRECTS = [
  'jsx-basics',
  'component-props',
  'event-handling',
  'conditional-rendering',
  'lists-and-keys',
  'use-state',
  'use-effect',
  'use-context',
  'use-reducer',
  'use-memo',
  'use-callback',
  'use-ref',
  'custom-hooks',
] as const

function LearnLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="app learn-app">
      <ScrollToTop />
      <ModuleTracker />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen((o) => !o)}
      />
      <main className="main-content">
        <Outlet />
        <LessonNav />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ProgressProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Navigate to="/" replace state={{ openAuth: true, authMode: 'login' }} />} />
              <Route path="/register" element={<Navigate to="/" replace state={{ openAuth: true, authMode: 'register' }} />} />

              <Route
                path="/learn"
                element={
                  <ProtectedRoute>
                    <LearnLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                <Route path="critical-rendering-path" element={<CriticalRenderingPath />} />
                <Route path="react-mount-hydrate" element={<ReactMountHydrate />} />
                <Route path="synthetic-events" element={<SyntheticEventSystem />} />
                <Route path="jsx-basics" element={<JSXBasics />} />
                <Route path="component-props" element={<ComponentProps />} />
                <Route path="event-handling" element={<EventHandling />} />
                <Route path="conditional-rendering" element={<ConditionalRendering />} />
                <Route path="lists-and-keys" element={<ListsAndKeys />} />
                <Route path="use-state" element={<UseStateHook />} />
                <Route path="use-effect" element={<UseEffectHook />} />
                <Route path="use-context" element={<UseContextHook />} />
                <Route path="use-reducer" element={<UseReducerHook />} />
                <Route path="use-memo" element={<UseMemoHook />} />
                <Route path="use-callback" element={<UseCallbackHook />} />
                <Route path="use-ref" element={<UseRefHook />} />
                <Route path="custom-hooks" element={<CustomHooks />} />
                <Route path="toolkit/use-debounce" element={<UseDebounceToolkit />} />
                <Route path="toolkit/use-onclick-outside" element={<UseOnClickOutsideToolkit />} />
                <Route path="toolkit/use-local-storage" element={<UseLocalStorageToolkit />} />
                <Route path="toolkit/use-media-query" element={<UseMediaQueryToolkit />} />
                <Route path="toolkit/use-copy-to-clipboard" element={<UseCopyToClipboardToolkit />} />
                <Route path="toolkit/use-interval" element={<UseIntervalToolkit />} />
                <Route path="toolkit/use-window-size" element={<UseWindowSizeToolkit />} />
                <Route path="master-assessment" element={<MasterAssessment />} />
              </Route>

              {LEGACY_REDIRECTS.map((slug) => (
                <Route key={slug} path={`/${slug}`} element={<Navigate to={`/learn/${slug}`} replace />} />
              ))}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProgressProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
