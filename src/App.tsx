import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
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
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onToggle={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jsx-basics" element={<JSXBasics />} />
            <Route path="/component-props" element={<ComponentProps />} />
            <Route path="/event-handling" element={<EventHandling />} />
            <Route path="/conditional-rendering" element={<ConditionalRendering />} />
            <Route path="/lists-and-keys" element={<ListsAndKeys />} />
            <Route path="/use-state" element={<UseStateHook />} />
            <Route path="/use-effect" element={<UseEffectHook />} />
            <Route path="/use-context" element={<UseContextHook />} />
            <Route path="/use-reducer" element={<UseReducerHook />} />
            <Route path="/use-memo" element={<UseMemoHook />} />
            <Route path="/use-callback" element={<UseCallbackHook />} />
            <Route path="/use-ref" element={<UseRefHook />} />
            <Route path="/custom-hooks" element={<CustomHooks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
