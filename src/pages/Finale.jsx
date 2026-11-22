import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingElements from '../components/FloatingElements'

const MANIFESTO_LINES = [
  { text: 'Never stop smiling.', delay: 0.3 },
  { text: 'Never lower your standards.', delay: 0.6 },
  { text: 'Never hide your thoughts.', delay: 0.9 },
  { text: 'Never stop being YOU.', delay: 1.2, emphasis: true },
]

export default function Finale() {
  const navigate = useNavigate()
  const [balloons, setBalloons] = useState([])

  useEffect(() => {
    setBalloons(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 6 + i * 8,
      delay: i * 0.3,
      emoji: ['🎈', '🎀', '🌸', '💖', '👑', '🎉'][i % 6],
    })))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #FCE4EC 0%, #FFF9F5 55%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={24} type="mixed" />

      {/* Floating Ballroom Balloons */}
      {balloons.map(b => (
        <motion.div
          key={b.id}
          className="fixed text-5xl pointer-events-none z-0 select-none"
          style={{ left: `${b.x}%`, bottom: '-10%' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-135vh', opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 7, delay: b.delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 3 }}
        >
          {b.emoji}
        </motion.div>
      ))}

      {/* Walking Princess Kitten with Glowing Paws */}
      <div className="fixed bottom-6 left-0 right-0 pointer-events-none overflow-hidden h-14 z-30">
        <motion.div
          className="flex items-center gap-5 whitespace-nowrap text-rose-pink"
          initial={{ x: '-20%' }}
          animate={{ x: '110vw' }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(14)].map((_, i) => (
            <span key={i} className="text-xl">🐾</span>
          ))}
          <span className="text-4xl filter drop-shadow-md">🐱👑</span>
        </motion.div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 px-4">
        {/* Crown Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess mb-3">
            <span className="text-sm">👑</span>
            <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
              To the One and Only
            </span>
            <span className="text-sm">🥥</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-gradient-rose"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            To the Coconut Girl 🥥👑
          </h1>
        </motion.div>

        {/* Manifesto Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 py-2"
        >
          {MANIFESTO_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.6 }}
              className={`text-xl sm:text-2xl md:text-3xl font-light italic ${line.emphasis ? 'text-deep-rose font-semibold' : 'text-[#5A3546]'}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {line.text}
            </motion.p>
          ))}
        </motion.div>

        {/* New Chapter Paragraph Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="p-7 sm:p-9 rounded-3xl glass-princess shadow-princess-lg border-2 border-white space-y-3"
        >
          <p
            className="text-lg sm:text-xl md:text-2xl text-[#3D1B28] leading-relaxed font-serif"
          >
            "May this new chapter bring you happiness, freedom, good health, beautiful memories and all the success you dream of."
          </p>
          <p
            className="text-xl sm:text-2xl text-deep-rose font-medium pt-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You deserve the best of everything.
          </p>
        </motion.div>

        {/* Grand Birthday Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', damping: 14 }}
          className="pt-2"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-deep-rose tracking-wide mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            HAPPIEST BIRTHDAY, PRANJAL! 💗
          </h2>
          <p
            className="text-base sm:text-lg text-[#7A455A] italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem' }}
          >
            "May the universe always be a little kinder to you."
          </p>
        </motion.div>

        {/* Sign-off & Replay CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="space-y-6 pt-4"
        >
          <p
            className="text-2xl sm:text-3xl text-deep-rose"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem' }}
          >
            Made with lots of love, just for you. ❤️
          </p>

          <div className="flex justify-center pb-8">
            <button
              onClick={() => navigate('/')}
              className="btn-princess shadow-princess-lg"
            >
              RELIVE YOUR FAIRYTALE UNIVERSE ↺
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
