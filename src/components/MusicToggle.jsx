import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { toggleBackgroundMusic } from '../utils/audio'

export default function MusicToggle({ muted, setMuted }) {
  const handleToggle = () => {
    const nextState = !muted
    setMuted(nextState)
    toggleBackgroundMusic(!nextState)
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      onClick={handleToggle}
      className="fixed top-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-princess"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: '2px solid #F8BBD0',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(239, 165, 189, 0.8)' }}
      whileTap={{ scale: 0.94 }}
      title={muted ? 'Play fairytale music 🎵' : 'Mute music 🔇'}
    >
      {muted
        ? <VolumeX size={20} color="#A64D70" />
        : <Volume2 size={20} color="#A64D70" />
      }
    </motion.button>
  )
}
