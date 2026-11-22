import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PortraitReveal from './pages/PortraitReveal'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import Memories from './pages/Memories'
import CoconutGirl from './pages/CoconutGirl'
import Letter from './pages/Letter'
import MakeAWish from './pages/MakeAWish'
import Cake from './pages/Cake'
import Kittens from './pages/Kittens'
import Secret from './pages/Secret'
import Finale from './pages/Finale'
import MusicToggle from './components/MusicToggle'
import StarField from './components/StarField'
import ProgressNav from './components/ProgressNav'
import HiddenHeart from './components/HiddenHeart'

const ROUTES = [
  '/', '/login', '/welcome', '/memories', '/coconut-girl',
  '/letter', '/make-a-wish', '/cake', '/kittens', '/secret', '/finale'
]

export default function App() {
  const location = useLocation()
  const [muted, setMuted] = useState(false)
  const showUI = location.pathname !== '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      <StarField />
      
      {showUI && (
        <>
          <MusicToggle muted={muted} setMuted={setMuted} />
          <ProgressNav routes={ROUTES} currentPath={location.pathname} />
          <HiddenHeart />
        </>
      )}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PortraitReveal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/coconut-girl" element={<CoconutGirl />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/make-a-wish" element={<MakeAWish />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/kittens" element={<Kittens />} />
          <Route path="/secret" element={<Secret />} />
          <Route path="/finale" element={<Finale />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
