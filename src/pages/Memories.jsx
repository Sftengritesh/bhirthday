import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
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
  },
  {
    id: 2,
    src: '/images/memories/photo-2.jpg',
    caption: 'A smile worth remembering. 💗',
    scriptNote: 'our adventure',
    tapeStyle: 'washi-tape',
    rotation: 2.2,
    flowerDeco: '🌷 Sweet blossom',
  },
  {
    id: 3,
    src: '/images/memories/photo-3.jpg',
    caption: 'A moment worth keeping. 🌸',
    scriptNote: 'sweet moments',
    tapeStyle: 'washi-tape-floral',
    rotation: -1.8,
    flowerDeco: '✨ Cherished memory',
  },
  {
    id: 4,
    src: '/images/memories/photo-4.jpg',
    caption: 'Some pictures need no explanation. 🎀',
    scriptNote: 'love you more',
    tapeStyle: 'washi-tape',
    rotation: 2.8,
    flowerDeco: '🌺 Unfiltered joy',
  },
  {
    id: 5,
    src: '/images/memories/photo-5.jpg',
    caption: 'Rare and radiant. ✨',
    scriptNote: 'our favorite chapter',
    tapeStyle: 'washi-tape-floral',
    rotation: -2.0,
    flowerDeco: '💐 Forever iconic',
  },
  {
    id: 6,
    isVideo: true,
    src: '/video/birthday-duck-cake.mp4',
    caption: 'VIP Birthday Guest Delivery! 🦆🎂',
    scriptNote: 'special birthday wish',
    tapeStyle: 'washi-tape-floral',
    rotation: 2.1,
    flowerDeco: '🎉 Live Birthday Wish',
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
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-princess mb-3 shadow-sm">
          <span className="text-base">📖</span>
          <span className="text-xs md:text-sm font-bold tracking-widest text-deep-rose uppercase">
            A little digital scrapbook
          </span>
          <span className="text-base">🌸</span>
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

      {/* Main Vintage Scrapbook Album Page */}
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

          {/* Scrapbook Polaroids Grid (All 5 Photos Shown) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">
            {SCRAPBOOK_PHOTOS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, rotate: item.rotation * 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: item.rotation }}
                transition={{ delay: 0.12 + idx * 0.1, duration: 0.7 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                className="relative cursor-pointer group"
                onClick={() => setSelected(item)}
              >
                {/* Washi Tape at Top */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 z-20 rounded-xs ${item.tapeStyle}`}
                  style={{
                    transform: `translateX(-50%) rotate(${item.rotation > 0 ? -3 : 3}deg)`,
                  }}
                />

                {/* Dried Pressed Flower Accents */}
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
                {idx === 2 && (
                  <div className="absolute -top-4 -right-3 z-20 text-2xl select-none pointer-events-none filter drop-shadow-sm">
                    ✨
                  </div>
                )}
                {idx === 3 && (
                  <div className="absolute -bottom-3 -left-3 z-20 text-2xl select-none pointer-events-none filter drop-shadow-sm">
                    🎀
                  </div>
                )}

                {/* Polaroid Frame */}
                <div
                  className="rounded-xs overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl"
                  style={{
                    background: '#FFFFFF',
                    padding: '12px 12px 32px 12px',
                    boxShadow: '0 14px 32px rgba(100, 60, 75, 0.16), 0 2px 6px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(230, 215, 205, 0.8)',
                  }}
                >
                  {/* Photo / Video Canvas Area */}
                  <div
                    className="relative overflow-hidden rounded-xs bg-[#F7F2EE]"
                    style={{ width: '100%', paddingBottom: '115%' }}
                  >
                    {item.isVideo ? (
                      <>
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-deep-rose/85 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md z-10">
                          <span>🎥 Live</span>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    )}

                    {/* View Magnifier Overlay on hover */}
                    <div className="absolute inset-0 bg-[#A64D70]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-1.5 rounded-full bg-white/95 text-deep-rose text-xs font-bold tracking-wider shadow-md">
                        {item.isVideo ? 'PLAY VIDEO ✦' : 'VIEW ✦'}
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Script Note under Photo */}
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

                {/* Little Cut-out Hearts scattered around */}
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
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-rose-pink flex items-center justify-center text-deep-rose hover:bg-baby-pink transition-colors cursor-pointer shadow-md"
              >
                <X size={20} />
              </button>

              <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#FFF9F5] shadow-inner">
                {selected.isVideo ? (
                  <video
                    src={selected.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={selected.src}
                    alt={selected.caption}
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
                  />
                )}
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
