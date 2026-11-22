import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageNav from '../components/PageNav'
import FloatingElements from '../components/FloatingElements'

const LETTER_PARAGRAPHS = [
  { text: "Happiest birthday to the coconut girl 🥥", type: 'title' },
  { text: "Stud from outside and deeply emotional and sensitive from inside. 💐🎉", type: 'subtitle' },
  { text: "May the universe bless you with good health and all the happiness you deserve. 💫", type: 'body' },
  { text: "The kind of person you are is rare in time. Someone who always keeps her values and standards high, who likes to keep her opinions and thoughts openly without thinking about being judged. ✨", type: 'body' },
  { text: "I know that you will not be able to celebrate your birthday as you wished because of your friends' absence. But never lose your smile. 😊", type: 'body' },
  { text: "You aree theee besttttt! 🤞\nYou deserve the besstttt! 🥳", type: 'cheer' },
  { text: "And you will surely get all the happiness, freedom and success you wish for. 💙", type: 'body' },
  { text: "One more thing...", type: 'whisper' },
  { text: "No matter how life changes, I hope you never forget how special you are.", type: 'promise' },
]

export default function Letter() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (!opened && !opening) {
      setOpening(true)
      setTimeout(() => {
        setOpened(true)
        setOpening(false)
      }, 900)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen px-4 md:px-8 py-16 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #FCE4EC 0%, #FFF9F5 50%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={16} type="hearts" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-xl relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess mb-3">
          <span className="text-sm">💌</span>
          <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
            From the heart
          </span>
          <span className="text-sm">✨</span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-normal text-gradient-rose mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          A Royal Birthday Letter
        </h1>
        <p
          className="text-[#6D4255] italic text-base"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          "Written with affection, sealed with care."
        </p>
      </motion.div>

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* Princess Lavender & Pink Envelope (Inspired by Reference Flatlay) */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              className="relative cursor-pointer mx-auto max-w-md w-full"
              onClick={handleOpen}
            >
              <div
                className="rounded-3xl p-8 md:p-12 text-center shadow-princess-lg relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #E8DDFB 0%, #F8BBD0 50%, #FCE4EC 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                }}
              >
                {/* Envelope Flap Pattern */}
                <div className="absolute top-0 inset-x-0 h-28 bg-white/30 clip-triangle pointer-events-none" />

                {/* Satin Ribbon Band across Envelope */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-white/40 border-y border-white/60 pointer-events-none" />

                {/* Golden Wax Seal */}
                <motion.div
                  className="relative z-10 w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-gold-glow mb-6"
                  style={{
                    background: 'radial-gradient(circle, #F5E6C4 0%, #E8C98D 50%, #C9963D 100%)',
                    border: '3px solid #FFF',
                  }}
                  animate={opening ? { scale: [1, 1.25, 0], rotate: 180 } : { scale: [1, 1.06, 1] }}
                  transition={{ duration: opening ? 0.6 : 2.5, repeat: opening ? 0 : Infinity }}
                >
                  <span className="text-3xl select-none">👑</span>
                </motion.div>

                <h3
                  className="relative z-10 text-2xl md:text-3xl font-medium text-deep-rose mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  One little letter, just for you.
                </h3>
                <p
                  className="relative z-10 text-base italic text-[#5A3546]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}
                >
                  To our dearest Coconut Girl 🥥
                </p>

                <div className="relative z-10 mt-6 inline-block px-5 py-2 rounded-full bg-white/80 border border-rose-pink/50 text-deep-rose text-xs font-bold tracking-widest uppercase shadow-sm">
                  {opening ? 'Breaking the Wax Seal... 🎀' : 'TAP TO UNSEAL 💌'}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Princess Letter Paper with Ornate Floral Borders */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl p-8 sm:p-12 md:p-14 relative shadow-princess-lg"
              style={{
                background: 'linear-gradient(145deg, #FFFDFB 0%, #FFF8F2 60%, #FDF3EB 100%)',
                border: '3px double #EFA5BD',
                boxShadow: '0 20px 60px rgba(166, 77, 112, 0.2), inset 0 0 40px rgba(248, 187, 208, 0.2)',
              }}
            >
              {/* Ornate Lace Floral Top Bar */}
              <div className="flex justify-between items-center pb-6 border-b border-rose-pink/30 mb-8 text-2xl">
                <span>🌸</span>
                <span className="text-xs font-semibold tracking-widest uppercase text-deep-rose">
                  Pranjal's Birthday Epistle 👑
                </span>
                <span>🌸</span>
              </div>

              {/* Letter Content */}
              <div className="space-y-6 text-[#3D1B28]">
                {LETTER_PARAGRAPHS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                  >
                    {item.type === 'title' && (
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-deep-rose leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.text}
                      </h2>
                    )}
                    {item.type === 'subtitle' && (
                      <p
                        className="text-lg sm:text-xl font-medium text-[#7A4358] italic"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem' }}
                      >
                        {item.text}
                      </p>
                    )}
                    {item.type === 'body' && (
                      <p
                        className="text-base sm:text-lg leading-relaxed text-[#4A2D3A]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', lineHeight: '1.8' }}
                      >
                        {item.text}
                      </p>
                    )}
                    {item.type === 'cheer' && (
                      <div
                        className="p-4 rounded-2xl bg-baby-pink/60 border border-rose-pink/40 text-center my-4"
                      >
                        <p
                          className="text-2xl sm:text-3xl text-deep-rose whitespace-pre-line"
                          style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.1rem' }}
                        >
                          {item.text}
                        </p>
                      </div>
                    )}
                    {item.type === 'whisper' && (
                      <p
                        className="text-sm uppercase tracking-widest text-deep-rose font-bold pt-2"
                      >
                        {item.text}
                      </p>
                    )}
                    {item.type === 'promise' && (
                      <p
                        className="text-lg sm:text-xl italic font-serif text-[#3D1B28] leading-relaxed font-medium"
                      >
                        "{item.text}"
                      </p>
                    )}
                  </motion.div>
                ))}

                {/* Hand-signed closing */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="pt-8 border-t border-rose-pink/30 text-right"
                >
                  <p
                    className="text-2xl sm:text-3xl text-deep-rose"
                    style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem' }}
                  >
                    With lots of wishes and a little extra affection. ❤️
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PageNav prev="/coconut-girl" next="/make-a-wish" nextLabel="Make a Wish ✨ →" />
    </motion.div>
  )
}
