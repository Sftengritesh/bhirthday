import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Heart, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import FloatingElements from '../components/FloatingElements'

const SCRAPBOOK_PHOTOS = [
  {
    id: 1,
    src: '/images/memories/photo-1.jpg',
    caption: 'Elegance without even trying. ✨',
    scriptNote: 'forever & always',
    tapeStyle: 'washi-tape-floral',
    rotation: -2.5,
    flowerDeco: '🌸 Pressed rose',
    isEmpty: false,
  },
  {
    id: 2,
    src: '/images/memories/photo-2.jpg',
    caption: 'A smile worth remembering. 💗',
    scriptNote: 'our adventure',
    tapeStyle: 'washi-tape',
    rotation: 2.2,
    flowerDeco: '🌷 Sweet blossom',
    isEmpty: false,
  },
  {
    id: 3,
    src: null,
    caption: 'Adventures waiting to be made 🌸',
    scriptNote: 'sweet moments ahead',
    tapeStyle: 'washi-tape-floral',
    rotation: -1.8,
    flowerDeco: '✨ Reserved for memory #3',
    isEmpty: true,
    placeholderNote: 'Tap to add future memory',
  },
  {
    id: 4,
    src: null,
    caption: 'Laughter waiting to be captured 🎀',
    scriptNote: 'love you more',
    tapeStyle: 'washi-tape',
    rotation: 2.8,
    flowerDeco: '🌺 Reserved for memory #4',
    isEmpty: true,
    placeholderNote: 'Tap to add future memory',
  },
  {
    id: 5,
    src: null,
    caption: 'Forever iconic, forever you ✨',
    scriptNote: 'our favorite chapter',
    tapeStyle: 'washi-tape-floral',
    rotation: -2.0,
    flowerDeco: '💐 Reserved for memory #5',
    isEmpty: true,
    placeholderNote: 'Tap to add future memory',
  },
]

export default function Memories() {
  const [selected, setSelected] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen px-4 md:px-8 py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #FCE4EC 0%, #FFF9F5 50%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={14} type="petals" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 max-w-2xl mx-auto relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-princess mb-3">
          <span className="text-sm">📖</span>
          <span className="text-xs font-semibold tracking-widest text-deep-rose uppercase">
            A little digital scrapbook
          </span>
          <span className="text-sm">🌸</span>
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-gradient-rose mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Moments Worth Keeping
        </h1>
        <p
          className="text-[#6D4255] italic text-base md:text-lg"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          "Some pictures speak louder than any words ever could."
        </p>
      </motion.div>

      {/* Main Vintage Scrapbook Album Page — Inspired directly by user reference */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className="rounded-3xl p-6 sm:p-10 md:p-14 relative shadow-princess-lg"
          style={{
            background: 'linear-gradient(145deg, #FFFDFB 0%, #FFF5ED 50%, #FDF0E8 100%)',
            border: '2px solid rgba(239, 165, 189, 0.4)',
            boxShadow: '0 25px 60px -10px rgba(166, 77, 112, 0.2), inset 0 0 60px rgba(232, 201, 141, 0.15)',
          }}
        >
          {/* Scrapbook Left Spine Stitching & Holes */}
          <div className="absolute left-2.5 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#B8947C] border border-[#8C6B55]" />
            ))}
          </div>

          {/* Decorative Pressed Flowers on corners */}
          <div className="absolute -top-3 -right-3 text-4xl select-none pointer-events-none">
            🌸
          </div>
          <div className="absolute -bottom-3 -left-3 text-4xl select-none pointer-events-none">
            💐
          </div>

          {/* Scrapbook Polaroids Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">
            {SCRAPBOOK_PHOTOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, rotate: item.rotation * 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: item.rotation }}
                transition={{ delay: 0.15 + idx * 0.12, duration: 0.7 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                className="relative cursor-pointer group"
                onClick={() => !item.isEmpty && setSelected(item)}
              >
                {/* Washi Tape at Top */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 z-20 rounded-xs ${item.tapeStyle}`}
                  style={{
                    transform: `translateX(-50%) rotate(${item.rotation > 0 ? -3 : 3}deg)`,
                  }}
                />

                {/* Dried Pressed Flower Accent */}
                {idx === 0 && (
                  <div className="absolute -top-6 -left-4 z-20 text-3xl select-none pointer-events-none filter drop-shadow-sm">
                    🌾🌸
                  </div>
                )}
                {idx === 1 && (
                  <div className="absolute -bottom-4 -right-3 z-20 text-3xl select-none pointer-events-none filter drop-shadow-sm">
                    🌷
                  </div>
                )}

                {/* Polaroid Frame */}
                <div
                  className="rounded-xs overflow-hidden transition-shadow duration-300 group-hover:shadow-xl"
                  style={{
                    background: '#FFFFFF',
                    padding: '12px 12px 32px 12px',
                    boxShadow: '0 12px 30px rgba(100, 60, 75, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(230, 215, 205, 0.8)',
                  }}
                >
                  {/* Photo Canvas Area */}
                  <div
                    className="relative overflow-hidden rounded-xs bg-[#F7F2EE]"
                    style={{ width: '100%', paddingBottom: '115%' }}
                  >
                    {!item.isEmpty ? (
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    ) : (
                      /* Aesthetic Empty Slot for Future Photos */
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-rose-pink/40 bg-baby-pink/30 rounded-xs">
                        <Camera className="w-8 h-8 text-rose-pink/60 mb-2" />
                        <span className="text-xs font-serif italic text-deep-rose/80 font-medium">
                          {item.placeholderNote}
                        </span>
                        <span className="text-[10px] text-rose-pink/80 mt-1 uppercase tracking-widest">
                          Slot #{item.id}
                        </span>
                      </div>
                    )}

                    {/* View Magnifier Overlay on hover */}
                    {!item.isEmpty && (
                      <div className="absolute inset-0 bg-[#A64D70]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-white/90 text-deep-rose text-xs font-semibold tracking-wider shadow-md">
                          VIEW ✦
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Handwritten Script Note under Photo (matches reference) */}
                  <div className="pt-3 px-1 text-center">
                    <p
                      className="text-base text-[#4A2D3A] font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.caption}
                    </p>
                    <p
                      className="text-lg text-[#8C586E] italic mt-0.5"
                      style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.45rem' }}
                    >
                      {item.scriptNote}
                    </p>
                  </div>
                </div>

                {/* Little Cut-out Hearts scattered around (as in reference) */}
                <div className="absolute -bottom-2 -left-2 text-rose-pink/70 text-sm select-none pointer-events-none">
                  💗
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Scrapbook Footer Message */}
          <div className="text-center pt-10 border-t border-rose-pink/30 mt-10">
            <p
              className="text-xl md:text-2xl text-deep-rose"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.85rem' }}
            >
              Every memory with you is a little treasure. 🎀
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#3D1B28]/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFFFFF] p-5 sm:p-7 rounded-2xl shadow-princess-lg border-2 border-rose-pink"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-rose-pink flex items-center justify-center text-deep-rose hover:bg-baby-pink transition-colors cursor-pointer shadow-md"
              >
                <X size={18} />
              </button>

              <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#FFF9F5] shadow-inner">
                <img
                  src={selected.src}
                  alt={selected.caption}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              <div className="text-center pt-4">
                <p
                  className="text-2xl font-semibold text-deep-rose"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {selected.caption}
                </p>
                <p
                  className="text-xl text-[#8C586E] italic mt-1"
                  style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.7rem' }}
                >
                  {selected.scriptNote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageNav prev="/welcome" next="/coconut-girl" nextLabel="Meet Coconut Girl →" />
    </motion.div>
  )
}
