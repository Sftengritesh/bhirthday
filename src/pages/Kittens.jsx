import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageNav from '../components/PageNav'
import FloatingElements from '../components/FloatingElements'

const FAIRYTALE_KITTENS = [
  {
    id: 1,
    name: 'Princess Tiara',
    role: 'Bearer of the Royal Crown',
    badge: '👑 Tiara & Jewels',
    message: "You're purr-fect, princess Pranjal! 🐾👑",
    sub: 'Wishes you infinite sparkles and elegance today.',
    accent: '#E8C98D',
  },
  {
    id: 2,
    name: 'Lady Blossom',
    role: 'Flower Bouquet Delivery',
    badge: '🌸 Pink Roses',
    message: 'Sending you the warmest cuddles & extra hugs! 🌸💗',
    sub: 'May your year bloom with peace and sweet laughter.',
    accent: '#EFA5BD',
  },
  {
    id: 3,
    name: 'Duchess Ribbon',
    role: 'Birthday Gift Guardian',
    badge: '🎀 Pink Bow & Pearls',
    message: 'Never, ever stop smiling! You light up rooms. ✨',
    sub: 'Your smile is literally the most contagious thing.',
    accent: '#F8BBD0',
  },
  {
    id: 4,
    name: 'Duchess Iconic',
    role: 'Royal Cheerleader',
    badge: '🎂 Birthday Cake Queen',
    message: 'One more year of being totally iconic! 🥳💖',
    sub: 'Always stay the rare, unfiltered soul you are.',
    accent: '#A64D70',
  },
]

export default function Kittens() {
  const [activeKitten, setActiveKitten] = useState(null)
  const [paws, setPaws] = useState([])

  const handleKittenClick = (k) => {
    setActiveKitten(k)
    // Spawn playful pink paw prints
    setPaws(Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    })))
  }

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
      <FloatingElements count={16} type="mixed" />

      {/* Walking Paw Prints Trail across Bottom */}
      <div className="fixed bottom-6 left-0 right-0 pointer-events-none overflow-hidden h-12 z-20">
        <motion.div
          className="flex items-center gap-6 whitespace-nowrap text-rose-pink/70 text-lg"
          animate={{ x: ['100vw', '-250px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-xl">🐾</span>
          ))}
          <span className="text-3xl">🐱🎀</span>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess mb-3">
            <span className="text-sm">🐱</span>
            <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
              Emergency Delivery of Cuteness
            </span>
            <span className="text-sm">🎀</span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-gradient-rose mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Little Kitten Parade 🐱👑
          </h1>
          <p
            className="text-[#6D4255] text-lg sm:text-xl italic font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Because a coconut girl deserves a little extra pampering."
          </p>
        </motion.div>

        {/* 4 Illustrated Fairytale Kitten Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {FAIRYTALE_KITTENS.map((k, idx) => (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => handleKittenClick(k)}
              className="cursor-pointer rounded-3xl p-5 bg-white/90 border-2 border-rose-pink/40 shadow-princess hover:shadow-princess-lg transition-all relative overflow-hidden flex flex-col items-center text-center group"
            >
              {/* Badge Tag */}
              <div className="mb-3 px-3 py-1 rounded-full text-[11px] font-semibold text-deep-rose bg-baby-pink border border-rose-pink/40 shadow-xs">
                {k.badge}
              </div>

              {/* Kitten Illustrated Portrait (Using the User's Princess Kitten Asset) */}
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden mb-4 border-2 border-rose-pink/50 shadow-md bg-[#FFF5F8]">
                <img
                  src="/images/kittens/princess-cat.jpg"
                  alt={k.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-rose/30 to-transparent pointer-events-none" />
              </div>

              {/* Kitten Info */}
              <h3
                className="text-xl font-bold text-deep-rose mb-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {k.name}
              </h3>
              <p className="text-xs text-[#8C586E] font-medium mb-3">
                {k.role}
              </p>

              <button className="mt-auto px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-deep-rose bg-baby-pink/80 border border-rose-pink/60 group-hover:bg-deep-rose group-hover:text-white transition-colors">
                Pet Me 🐾
              </button>
            </motion.div>
          ))}
        </div>

        {/* Kitten Speech Bubble Modal / Card on Click */}
        <AnimatePresence>
          {activeKitten && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto p-6 md:p-8 rounded-3xl glass-princess-pink shadow-princess-lg text-center relative mb-8 border-2 border-white"
            >
              <div className="text-4xl mb-2">🐱💖</div>
              <h4
                className="text-2xl sm:text-3xl font-semibold text-deep-rose mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeKitten.message}
              </h4>
              <p
                className="text-base text-[#5A3546] italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}
              >
                "{activeKitten.sub}"
              </p>
              <button
                onClick={() => setActiveKitten(null)}
                className="mt-4 px-6 py-2 rounded-full bg-white/90 border border-rose-pink text-xs font-bold text-deep-rose uppercase tracking-widest shadow-xs"
              >
                Thank you! 🌸
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <PageNav prev="/cake" next="/finale" nextLabel="Princess Grand Finale →" />
      </div>
    </motion.div>
  )
}
