import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingElements from '../components/FloatingElements'
import PageNav from '../components/PageNav'

const CORRECT_ID = 'pranjal vishwakarma'
const CORRECT_PW = '23 nov 2026'

export default function Login() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [shake, setShake] = useState(false)

  const handleLogin = () => {
    const uid = userId.trim().toLowerCase()
    const pw = password.trim().toLowerCase()

    if (uid === CORRECT_ID && pw === CORRECT_PW) {
      setSuccess(true)
      setTimeout(() => navigate('/welcome'), 2600)
    } else {
      setError('Hmm, that doesn\'t seem right... try again, princess? 🤔')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #FCE4EC 0%, #FFF9F5 50%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={16} type="butterflies" />

      {/* Fairytale Palace Castle silhouette in subtle backdrop */}
      <div className="absolute top-8 inset-x-0 flex justify-center opacity-10 pointer-events-none text-9xl">
        🏰
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-8 relative z-10 max-w-lg"
      >
        <span className="text-3xl mb-2 inline-block animate-kitten-bounce">👑🎀</span>
        <p className="text-deep-rose/70 text-xs font-semibold tracking-[0.35em] uppercase mb-2">
          A little world made just for you
        </p>
        <h1
          className="text-4xl md:text-5xl font-normal text-gradient-rose mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Palace Gate
        </h1>
        <p
          className="text-[#6D4255] text-base md:text-lg italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          "Some surprises are worth unlocking."
        </p>
      </motion.div>

      {/* Interactive Palace Gate Form */}
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`w-full max-w-md p-8 md:p-10 rounded-3xl glass-princess shadow-princess-lg relative z-10 ${shake ? 'animate-shake' : ''}`}
            style={{
              transform: shake ? 'translateX(-6px)' : 'none',
              transition: 'transform 0.1s ease',
            }}
          >
            {/* Crown Key Icon */}
            <div className="text-center text-4xl mb-6">🔑✨</div>

            <div className="space-y-5">
              {/* User ID Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-rose uppercase tracking-widest block">
                  Princess ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={e => { setUserId(e.target.value); setError('') }}
                  onKeyDown={handleKeyDown}
                  placeholder="pranjal vishwakarma"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/90 border-1.5 border-rose-pink/60 text-[#3D1B28] placeholder-rose-pink/50 text-sm focus:outline-none focus:border-deep-rose focus:ring-2 focus:ring-rose-pink/30 shadow-inner"
                  autoComplete="off"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-rose uppercase tracking-widest block">
                  Fairytale Code
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  onKeyDown={handleKeyDown}
                  placeholder="23 nov 2026"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/90 border-1.5 border-rose-pink/60 text-[#3D1B28] placeholder-rose-pink/50 text-sm focus:outline-none focus:border-deep-rose focus:ring-2 focus:ring-rose-pink/30 shadow-inner"
                  autoComplete="off"
                />
              </div>

              {/* Helpful Hint */}
              <p
                className="text-xs text-center text-[#8C586E] italic pt-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem' }}
              >
                Hint: Your full name & your upcoming birthday date 🌸
              </p>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-deep-rose font-medium text-xs text-center bg-rose-pink/20 py-2 rounded-xl"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                onClick={handleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-princess w-full mt-4"
              >
                OPEN THE PALACE GATE 👑
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center space-y-4 p-8 glass-princess rounded-3xl max-w-md shadow-princess-lg relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-2"
            >
              🥹👑
            </motion.div>
            <h2
              className="text-3xl md:text-4xl font-normal text-deep-rose"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Well well well...
            </h2>
            <p
              className="text-xl italic text-[#5A3546]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              look who's here! 🥹
            </p>
            <p
              className="text-2xl text-deep-rose py-2"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.1rem' }}
            >
              Come in, princess coconut girl.<br />Your surprise is waiting.
            </p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-xs tracking-widest uppercase text-deep-rose font-semibold pt-2"
            >
              Entering your fairytale... ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageNav prev="/" next={null} prevLabel="← Portrait" />
    </motion.div>
  )
}
