import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HiddenHeart() {
  const [found, setFound] = useState(false)

  return (
    <>
      {/* Hidden glowing pink crystal heart */}
      <motion.button
        onClick={() => setFound(true)}
        className="fixed bottom-5 right-6 z-40 cursor-pointer p-2 rounded-full bg-white/70 backdrop-blur-md border border-rose-pink/40 shadow-princess"
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 10px rgba(239, 165, 189, 0.4)',
            '0 0 25px rgba(239, 165, 189, 0.8)',
            '0 0 10px rgba(239, 165, 189, 0.4)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        title="A secret surprise..."
      >
        <span className="text-lg">💖</span>
      </motion.button>

      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#3D1B28]/60 backdrop-blur-md"
            onClick={() => setFound(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="max-w-md w-full text-center space-y-6 p-8 md:p-10 rounded-3xl bg-[#FFF9F5] border-2 border-rose-pink shadow-princess-lg relative overflow-hidden"
            >
              {/* Decorative top ribbon */}
              <div className="text-4xl">👑🎀</div>

              <h2
                className="font-serif text-3xl md:text-4xl text-deep-rose font-medium leading-tight"
              >
                You found something I almost kept secret...
              </h2>

              <div className="space-y-3 text-[#5A3A4A] leading-relaxed font-serif text-lg">
                <p>Some people are not easy to describe in words.</p>
                <p>But if I had to describe you, I'd say:</p>
                <div
                  className="space-y-1 py-3 text-deep-rose"
                  style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.9rem' }}
                >
                  <p>Rare.</p>
                  <p>Strong.</p>
                  <p>Sensitive.</p>
                  <p>Beautifully unpredictable.</p>
                  <p>And genuinely special.</p>
                </div>
                <p className="italic text-base text-[#7A5262]">
                  I hope this little surprise made you smile, even if just for a moment.
                </p>
              </div>

              <button
                onClick={() => setFound(false)}
                className="btn-princess text-xs mt-2"
              >
                Close with Love 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
