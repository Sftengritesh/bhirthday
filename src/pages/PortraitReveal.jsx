import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function PortraitReveal() {
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [showQuote, setShowQuote] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const animRef = useRef(null)

  const portraitSrc = '/images/portrait/pranjal-dotted-portrait.png'
  const fallbackSrc = '/images/portrait/pranjal-dotted-portrait.jpg'
  const [currentSrc, setCurrentSrc] = useState(portraitSrc)

  // Force reveal everything (failsafe & click-to-skip)
  const revealAll = () => {
    setImageLoaded(true)
    setPortraitVisible(true)
    setShowQuote(true)
    setShowTitle(true)
    setShowButton(true)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Preload image
    const img = new Image()
    img.src = currentSrc
    img.onload = () => {
      setImageLoaded(true)
    }
    img.onerror = () => {
      // Try fallback jpg
      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc)
      } else {
        setImageLoaded(true)
      }
    }

    // Particle Swarm Configuration
    // Target center is where the portrait card sits
    const targetCenterX = width / 2
    const targetCenterY = height * 0.38

    const PARTICLE_COUNT = Math.min(width < 640 ? 600 : 1200, 1400)
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * Math.max(width, height) * 0.7 + 80
      const sx = targetCenterX + Math.cos(angle) * dist
      const sy = targetCenterY + Math.sin(angle) * dist

      // Destination within the portrait card area
      const tx = targetCenterX + (Math.random() - 0.5) * (width < 640 ? 180 : 220)
      const ty = targetCenterY + (Math.random() - 0.5) * (width < 640 ? 258 : 315)

      let color = '#FFF9F5'
      const rand = Math.random()
      if (rand > 0.75) color = '#E8C98D' // Champagne gold
      else if (rand > 0.5) color = '#F8BBD0' // Blush pink
      else if (rand > 0.35) color = '#E8DDFB' // Soft lavender

      particles.push({
        sx,
        sy,
        tx,
        ty,
        radius: Math.random() * 1.5 + 1.0,
        color,
        delay: Math.random() * 0.4,
      })
    }

    // Floating Ambient Starlight Sparkles
    const sparkles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.5 ? '#E8C98D' : '#F8BBD0',
      alpha: Math.random() * 0.7 + 0.2,
      vy: Math.random() * 0.4 + 0.15,
    }))

    const DURATION = 1800 // 1.8s smooth convergence
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / DURATION, 1)

      ctx.clearRect(0, 0, width, height)

      // Ambient floating starlight
      for (const s of sparkles) {
        s.y -= s.vy
        if (s.y < 0) s.y = height
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Reconstructing particles flying towards portrait
      if (progress < 1) {
        for (const p of particles) {
          const pElapsed = Math.max(0, elapsed - p.delay * 1000)
          const pProg = Math.min(pElapsed / (DURATION - 300), 1)
          // Cubic ease-out
          const ease = 1 - Math.pow(1 - pProg, 3)

          const curX = p.sx + (p.tx - p.sx) * ease
          const curY = p.sy + (p.ty - p.sy) * ease
          const alpha = Math.min(pProg * 1.4, 0.95)

          ctx.globalAlpha = alpha
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(curX, curY, p.radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)

    // Sequence timing
    const tPortrait = setTimeout(() => setPortraitVisible(true), 1200)
    const tQuote = setTimeout(() => setShowQuote(true), 1600)
    const tTitle = setTimeout(() => setShowTitle(true), 2100)
    const tButton = setTimeout(() => setShowButton(true), 2500)

    // Guaranteed production safety timeouts
    const safetyTimer = setTimeout(() => {
      revealAll()
    }, 2800)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        revealAll()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (animRef.current) cancelAnimationFrame(animRef.current)
      clearTimeout(tPortrait)
      clearTimeout(tQuote)
      clearTimeout(tTitle)
      clearTimeout(tButton)
      clearTimeout(safetyTimer)
    }
  }, [currentSrc])

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-x-hidden cursor-pointer select-none"
      onClick={revealAll}
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #381525 0%, #200B17 50%, #0E040A 100%)',
      }}
    >
      {/* Background Stardust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Butterflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl select-none"
            style={{
              left: `${8 + i * 16}%`,
              top: `${10 + (i % 3) * 22}%`,
              opacity: 0.75,
            }}
            animate={{
              x: [0, 15, -12, 0],
              y: [0, -20, -35, 0],
              rotate: [0, 10, -8, 0],
            }}
            transition={{
              duration: 6.5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      {/* Main Content Container (Flex column, responsive, never overflows) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto my-auto w-full">
        {/* Authentic Dotted Portrait with Royal Gold-Pink Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: portraitVisible ? 1 : 0,
            scale: portraitVisible ? 1 : 0.92,
          }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative mb-5 sm:mb-6"
        >
          {/* Radial Glowing Aura Behind Portrait */}
          <div
            className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-60 blur-xl pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(circle, rgba(232,201,141,0.45) 0%, rgba(248,187,208,0.3) 50%, transparent 75%)',
            }}
          />

          {/* Portrait Card */}
          <div
            className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, rgba(232,201,141,0.85), rgba(248,187,208,0.7), rgba(232,201,141,0.85))',
              boxShadow: '0 0 35px rgba(232, 201, 141, 0.35), 0 0 70px rgba(248, 187, 208, 0.25)',
            }}
          >
            <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-black/95">
              <img
                src={currentSrc}
                alt="Pranjal Vishwakarma - Authentic Dotted Portrait"
                className="w-48 sm:w-56 md:w-64 h-auto object-cover block"
                onError={() => {
                  if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
                }}
              />
            </div>

            {/* Corner Decorative Sparkles */}
            <span className="absolute -top-2.5 -left-2.5 text-base sm:text-lg select-none">✨</span>
            <span className="absolute -top-2.5 -right-2.5 text-base sm:text-lg select-none">👑</span>
            <span className="absolute -bottom-2.5 -left-2.5 text-base sm:text-lg select-none">🌸</span>
            <span className="absolute -bottom-2.5 -right-2.5 text-base sm:text-lg select-none">✨</span>
          </div>
        </motion.div>

        {/* State 3: Introductory Quote */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-2 sm:mb-3 max-w-lg px-2"
            >
              <p
                className="text-[#FFF9F5]/90 text-sm sm:text-base md:text-lg font-light leading-relaxed italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "Some people make ordinary days feel a little more special..."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 3: Birthday Greeting */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-4 sm:mb-6 px-2"
            >
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide mb-1.5 sm:mb-2 text-gradient-gold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HAPPIEST BIRTHDAY, PRANJAL! 💐
              </h1>
              <p
                className="text-[#E8C98D]/90 text-xs sm:text-sm tracking-widest uppercase font-medium"
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.22em' }}
              >
                Today, this little fairytale universe belongs to you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State 4: Entry Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-3 sm:gap-4 mt-1"
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/login')
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-princess shadow-princess-lg text-sm sm:text-base px-8 py-3.5 sm:py-4"
              >
                ENTER YOUR LITTLE WORLD →
              </motion.button>

              {/* Cute Princess Kittens */}
              <div className="flex gap-8 opacity-90 pt-1">
                <span
                  className="animate-kitten-bounce text-2xl"
                  title="Kitten with flower 🐱🌸"
                >
                  🐱🌸
                </span>
                <span
                  className="text-2xl"
                  style={{ animation: 'kittenBounce 2.4s ease-in-out infinite 0.5s', display: 'inline-block' }}
                  title="Kitten with birthday crown 🐱👑"
                >
                  🐱👑
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
