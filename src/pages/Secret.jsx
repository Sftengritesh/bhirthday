import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingElements from '../components/FloatingElements'
import PageNav from '../components/PageNav'

const ADJECTIVES = [
  'Rare.',
  'Strong.',
  'Sensitive.',
  'Beautifully unpredictable.',
  'And genuinely special.',
]

export default function Secret() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #FCE4EC 0%, #FFF9F5 55%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={20} type="hearts" />

      <div className="max-w-xl text-center space-y-6 relative z-10 glass-princess p-8 sm:p-12 rounded-3xl shadow-princess-lg border-2 border-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="text-5xl"
        >
          🤫💖
        </motion.div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-gradient-rose"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          You found something I almost kept secret...
        </h1>

        <div
          className="space-y-3 text-lg sm:text-xl text-[#5A3546] italic leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <p>Some people are not easy to describe in words.</p>
          <p>But if I had to describe you, I'd say:</p>
        </div>

        <div className="py-2 space-y-1">
          {ADJECTIVES.map((word, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl text-deep-rose font-medium"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: i === ADJECTIVES.length - 1 ? '2.3rem' : '2rem',
              }}
            >
              {word}
            </motion.p>
          ))}
        </div>

        <p
          className="text-base sm:text-lg text-[#7A455A] italic font-serif"
        >
          I hope this little surprise made you smile, even if just for a moment. 🌸
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate('/finale')}
            className="btn-princess"
          >
            Go to the Grand Finale 👑 →
          </button>
        </div>
      </div>

      <PageNav prev="/kittens" next="/finale" nextLabel="Princess Finale →" />
    </motion.div>
  )
}
