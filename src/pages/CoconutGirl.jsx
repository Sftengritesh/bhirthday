import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageNav from '../components/PageNav'
import FloatingElements from '../components/FloatingElements'

const PERSONALITY_CARDS = [
  {
    num: '01',
    title: 'THE STRONG SHELL',
    icon: '🥥👑',
    desc: 'Someone who knows her worth and keeps her values high.',
    accent: '#E8C98D',
    bg: 'from-[#FFFDFB] to-[#FCE4EC]',
  },
  {
    num: '02',
    title: 'THE SOFT HEART',
    icon: '💗🌸',
    desc: 'Deeply emotional and sensitive, even when she doesn\'t always show it.',
    accent: '#EFA5BD',
    bg: 'from-[#FFFDFB] to-[#F8BBD0]',
  },
  {
    num: '03',
    title: 'THE UNFILTERED MIND',
    icon: '✨🎀',
    desc: 'Someone who expresses her opinions openly without constantly worrying about being judged.',
    accent: '#A64D70',
    bg: 'from-[#FFFDFB] to-[#E8DDFB]',
  },
  {
    num: '04',
    title: 'THE RARE SOUL',
    icon: '🌟💫',
    desc: 'Someone whose authenticity makes her special.',
    accent: '#E8C98D',
    bg: 'from-[#FFFDFB] to-[#FCE4EC]',
  },
]

export default function CoconutGirl() {
  const [opened, setOpened] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #FCE4EC 0%, #FFF9F5 55%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={18} type="hearts" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess mb-3">
            <span className="text-sm">🥥</span>
            <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
              The Personality Behind the Smile
            </span>
            <span className="text-sm">👑</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-gradient-rose mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Meet the Coconut Girl.
          </h1>
          <p
            className="text-[#6D4255] text-lg sm:text-xl italic font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Stud from outside, deeply emotional and sensitive from inside."
          </p>
        </motion.div>

        {/* Crowned Coconut Interactive Opening Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 14 }}
          className="text-center mb-10"
        >
          <motion.div
            className="relative inline-block cursor-pointer p-6 rounded-3xl glass-princess hover:shadow-princess-lg transition-all"
            onClick={() => setOpened(!opened)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <motion.div
                className="text-8xl select-none"
                animate={opened ? { scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] } : { y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🥥
              </motion.div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl drop-shadow-md">
                👑
              </div>
            </div>

            <p className="text-xs font-bold text-deep-rose uppercase tracking-widest mt-2">
              {opened ? '✨ Tap to close ✨' : '🌸 Tap to reveal her inner world 🌸'}
            </p>
          </motion.div>
        </motion.div>

        {/* Highlight Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-6 md:p-8 rounded-3xl glass-princess-pink shadow-princess mb-10 max-w-2xl mx-auto"
        >
          <p
            className="text-2xl md:text-3xl font-medium text-deep-rose leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Strong shell, soft heart.<br />That's our coconut girl. 🥥💖"
          </p>
        </motion.div>

        {/* 4 Beautiful Personality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {PERSONALITY_CARDS.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`p-7 rounded-3xl bg-gradient-to-br ${card.bg} border-1.5 border-rose-pink/50 shadow-princess relative overflow-hidden`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-white/80 shadow-sm border border-rose-pink/30 text-3xl">
                  {card.icon}
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-deep-rose/70 tracking-widest uppercase">
                    Trait {card.num}
                  </span>
                  <h3
                    className="text-lg md:text-xl font-semibold text-deep-rose tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#5A3546] text-base leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}
                  >
                    "{card.desc}"
                  </p>
                </div>
              </div>

              {/* Decorative Floral Corner */}
              <div className="absolute -bottom-2 -right-2 text-2xl opacity-20 pointer-events-none">
                🌸
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ending Affirmation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center p-8 rounded-3xl glass-princess max-w-2xl mx-auto shadow-sm"
        >
          <p
            className="text-xl md:text-2xl text-[#5A3546] italic leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Never lose the person you are.<br />The world needs more people who are genuinely themselves." 🌸
          </p>
        </motion.div>

        <PageNav prev="/memories" next="/letter" nextLabel="Open Birthday Letter →" />
      </div>
    </motion.div>
  )
}
