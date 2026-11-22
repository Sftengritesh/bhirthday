import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FloatingElements from '../components/FloatingElements'
import PageNav from '../components/PageNav'

export default function MakeAWish() {
  const navigate = useNavigate()
  const [wished, setWished] = useState(false)
  const [releasedStars, setReleasedStars] = useState([])

  const handleWish = () => {
    setWished(true)
    const stars = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      size: Math.random() * 20 + 14,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 1.5,
      emoji: ['⭐', '✨', '💖', '🌟', '🌸', '🦋'][Math.floor(Math.random() * 6)],
    }))
    setReleasedStars(stars)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #3D1E30 0%, #200E19 55%, #10060C 100%)',
      }}
    >
      <FloatingElements count={20} type="stars" />

      {/* Dreamy Glowing Moon in the Night Sky */}
      <motion.div
        className="absolute top-10 right-12 md:right-28 pointer-events-none z-0"
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFFDFB 0%, #F8BBD0 60%, #EFA5BD 100%)',
            boxShadow: '0 0 50px rgba(248, 187, 208, 0.7), 0 0 100px rgba(232, 201, 141, 0.4)',
          }}
        />
      </motion.div>

      {/* Floating Pink Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-36 bg-blush-pink rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-40 bg-soft-lavender rounded-full filter blur-3xl" />
      </div>

      {/* Released Wishing Stars Flying Upwards */}
      <AnimatePresence>
        {wished && releasedStars.map(s => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none z-30 select-none"
            style={{ left: `${s.x}%`, bottom: '25%', fontSize: s.size }}
            initial={{ y: 0, opacity: 1, scale: 0.6 }}
            animate={{
              y: '-120vh',
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1.4, 0.8],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              ease: 'easeOut',
            }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 text-center max-w-xl mx-auto space-y-6 px-4">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-blush-pink/30 mb-4 backdrop-blur-md">
            <span className="text-sm">✨</span>
            <span className="text-xs font-semibold tracking-widest text-[#F8BBD0] uppercase">
              Before the Grand Cake
            </span>
            <span className="text-sm">✨</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-gradient-gold mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Make a Little Wish, Princess! ✨
          </h1>

          <p
            className="text-[#F8BBD0]/90 text-lg sm:text-xl italic font-light max-w-md mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Close your eyes for a second and wish for something your heart really wants."
          </p>
        </div>

        {/* Realistic Glowing Glass Wishing Jar */}
        <motion.div
          className="relative mx-auto w-48 h-64 cursor-pointer select-none py-2"
          onClick={!wished ? handleWish : undefined}
          whileHover={!wished ? { scale: 1.05 } : {}}
          animate={wished ? { filter: 'drop-shadow(0 0 35px rgba(248, 187, 208, 0.9))' } : {
            filter: [
              'drop-shadow(0 0 15px rgba(248, 187, 208, 0.4))',
              'drop-shadow(0 0 35px rgba(232, 201, 141, 0.7))',
              'drop-shadow(0 0 15px rgba(248, 187, 208, 0.4))',
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Jar Lid (Floating when wished) */}
          <motion.div
            className="w-24 h-7 mx-auto rounded-t-xl relative z-20"
            style={{
              background: 'linear-gradient(135deg, #E8C98D, #C9963D)',
              border: '2px solid #FFF',
              boxShadow: '0 4px 15px rgba(232, 201, 141, 0.5)',
            }}
            animate={wished ? { y: -45, rotate: -15, opacity: 0.9 } : { y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="w-8 h-3 mx-auto -mt-2 bg-[#F5E6C4] rounded-t-md" />
          </motion.div>

          {/* Jar Neck */}
          <div
            className="w-20 h-4 mx-auto border-x-2 border-white/40 bg-white/10 backdrop-blur-sm"
          />

          {/* Glass Jar Body */}
          <div
            className="w-40 h-52 mx-auto rounded-3xl relative overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(248, 187, 208, 0.12))',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Glass Curvature Highlights */}
            <div className="absolute left-3 top-4 bottom-4 w-1.5 rounded-full bg-white/40" />
            <div className="absolute right-3 top-4 bottom-4 w-1 rounded-full bg-white/20" />

            {/* Glowing Stars Inside Jar */}
            {!wished ? (
              <div className="relative text-3xl flex flex-wrap gap-3 justify-center items-center p-4">
                <motion.span
                  animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1], y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
                >
                  💖
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 0.9 }}
                >
                  🌟
                </motion.span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.5 }}
                className="text-5xl"
              >
                💫
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA or Wish Revealed Message */}
        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.div key="btn" className="pt-2">
              <motion.button
                onClick={handleWish}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-princess"
              >
                MAKE MY WISH 💗
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4 pt-2"
            >
              <p
                className="text-xl sm:text-2xl text-[#FFF9F5] italic leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "Whatever your heart wishes for, may the universe find a beautiful way to make it happen." ✨
              </p>

              <motion.button
                onClick={() => navigate('/cake')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-princess mt-4"
              >
                NOW, LET'S CUT THE CAKE 🎂 →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PageNav prev="/letter" next="/cake" nextLabel="Princess Birthday Cake →" />
    </motion.div>
  )
}
