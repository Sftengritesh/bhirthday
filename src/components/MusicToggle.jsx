import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MusicToggle({ muted, setMuted }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={() => setMuted(!muted)}
      className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-princess"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1.5px solid #F8BBD0',
        backdropFilter: 'blur(12px)',
      }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(239, 165, 189, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      title={muted ? 'Unmute fairytale music' : 'Mute music'}
    >
      {muted
        ? <VolumeX size={18} color="#A64D70" />
        : <Volume2 size={18} color="#A64D70" />
      }
    </motion.button>
  )
}
