import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingElements from '../components/FloatingElements'
import PageNav from '../components/PageNav'

export default function Welcome() {
  const navigate = useNavigate()
  const [coconutClicked, setCoconutClicked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #FCE4EC 0%, #FFF9F5 55%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={22} type="mixed" />

      {/* Fairytale Castle Backdrop Silhouette */}
      <div className="absolute top-12 inset-x-0 flex justify-center pointer-events-none opacity-15 text-8xl md:text-9xl">
        🏰
      </div>

      {/* Glowing Fairy Lights along the top */}
      <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none py-3 px-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-3.5 h-3.5 rounded-full shadow-pink-glow"
            style={{
              background: i % 2 === 0 ? '#EFA5BD' : '#E8C98D',
              boxShadow: '0 0 12px rgba(239, 165, 189, 0.9)',
            }}
          />
        ))}
      </div>

      {/* Floating White & Pink Butterflies */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none pointer-events-none z-10"
          style={{
            left: `${8 + i * 20}%`,
            top: `${20 + (i % 3) * 22}%`,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, -35, 0],
            rotate: [0, 10, -8, 0],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.2,
          }}
        >
          🦋
        </motion.div>
      ))}

      {/* Cute Fluffy Kitten with Pink Bow Illustration */}
      <motion.div
        className="absolute bottom-16 left-6 md:left-16 z-10 hidden sm:flex flex-col items-center pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-5xl md:text-6xl drop-shadow-md">🐱🎀</span>
        <span className="text-xs font-serif italic text-deep-rose mt-1 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
          Princess Purr 🐾
        </span>
      </motion.div>

      {/* Main Content Card */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess shadow-sm mb-4">
            <span className="text-sm">🌸</span>
            <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
              Welcome to your fairytale
            </span>
            <span className="text-sm">🌸</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-gradient-rose mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome to Your Fairytale, Pranjal! 👑
          </h1>

          <p
            className="text-[#6D4255] text-lg sm:text-xl md:text-2xl italic font-light max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "A little world filled with love, wishes and surprises, created just for you."
          </p>
        </motion.div>

        {/* Crowned Coconut Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 14 }}
          className="relative inline-block py-2"
        >
          <motion.button
            onClick={() => setCoconutClicked(!coconutClicked)}
            className="relative cursor-pointer p-4 rounded-3xl glass-princess hover:shadow-princess-lg transition-all"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title="Click the princess coconut!"
          >
            {/* Crowned Coconut */}
            <div className="relative text-7xl sm:text-8xl select-none">
              🥥
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl drop-shadow-md">
                👑
              </span>
            </div>
            <p className="text-xs font-semibold text-deep-rose mt-2 tracking-widest uppercase">
              Tap the coconut girl ✦
            </p>
          </motion.button>

          {/* Interactive Popup Message */}
          <AnimatePresence>
            {coconutClicked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-6 py-2.5 rounded-full glass-princess-pink shadow-princess-lg text-deep-rose font-medium text-sm sm:text-base z-30"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}
              >
                Strong shell, soft heart. That's our coconut girl. 🥥💖
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-2"
        >
          <motion.button
            onClick={() => navigate('/memories')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-princess"
          >
            ENTER MY FAIRYTALE ✨
          </motion.button>
        </motion.div>
      </div>

      <PageNav prev="/login" next="/memories" nextLabel="Memories Scrapbook →" />
    </motion.div>
  )
}
