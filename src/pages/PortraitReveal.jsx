import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function PortraitReveal() {
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const [showQuote, setShowQuote] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Load the EXACT uploaded dotted portrait
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/images/portrait/pranjal-dotted-portrait.jpg'

    img.onload = () => {
      startDotReconstruction(canvas, ctx, img)
    }

    img.onerror = () => {
      console.error('Failed to load dotted portrait')
      // Immediate fallback if image error
      setShowQuote(true)
      setShowTitle(true)
      setShowButton(true)
    }

    // Bulletproof production safety timer: guarantees button appears within 2.5s
    const timer1 = setTimeout(() => setShowQuote(true), 1200)
    const timer2 = setTimeout(() => setShowTitle(true), 1800)
    const timer3 = setTimeout(() => setShowButton(true), 2400)

    return () => {
      window.removeEventListener('resize', setSize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  function startDotReconstruction(canvas, ctx, img) {
    const W = canvas.width
    const H = canvas.height

    const aspect = img.naturalHeight / img.naturalWidth // 1024 / 713 ≈ 1.436

    // Sized to ensure plenty of breathing room for text and buttons below
    let portraitW = Math.min(W * 0.65, 290)
    let portraitH = portraitW * aspect
    const maxH = Math.min(H * 0.42, 420)
    if (portraitH > maxH) {
      portraitH = maxH
      portraitW = portraitH / aspect
    }

    const offsetX = (W - portraitW) / 2
    // Positioned in upper-mid area
    const offsetY = Math.max(16, (H - portraitH) * 0.16)

    // Draw to offscreen canvas to sample exact dot coordinates
    const offscreen = document.createElement('canvas')
    offscreen.width = portraitW
    offscreen.height = portraitH
    const oc = offscreen.getContext('2d')
    oc.drawImage(img, 0, 0, portraitW, portraitH)

    const imgData = oc.getImageData(0, 0, portraitW, portraitH)
    const data = imgData.data

    const particles = []
    const step = 2.8 // High sampling density

    for (let y = 0; y < portraitH; y += step) {
      for (let x = 0; x < portraitW; x += step) {
        const idx = (Math.floor(y) * portraitW + Math.floor(x)) * 4
        const r = data[idx]
        const g = data[idx + 1]
        const b = data[idx + 2]
        const brightness = (r + g + b) / 3

        if (brightness > 85) {
          const tx = offsetX + x
          const ty = offsetY + y

          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * Math.max(W, H) * 0.75 + 40
          const sx = W / 2 + Math.cos(angle) * distance
          const sy = H / 2 + Math.sin(angle) * distance

          let color = '#FFF9F5'
          const rand = Math.random()
          if (rand > 0.82) {
            color = '#E8C98D' // Champagne gold
          } else if (rand > 0.68) {
            color = '#F8BBD0' // Blush pink
          }

          particles.push({
            x: sx,
            y: sy,
            tx,
            ty,
            radius: Math.random() * 0.9 + 1.1,
            color,
            alpha: 0,
            speed: Math.random() * 0.055 + 0.035, // Snappier convergence
          })
        }
      }
    }

    // Ambient floating pink petals & golden sparkles around portrait
    const ambientSparkles = Array.from({ length: 35 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#E8C98D' : '#F8BBD0',
      alpha: Math.random() * 0.7 + 0.2,
      vy: Math.random() * 0.4 + 0.1,
    }))

    let frameCount = 0
    let allDone = false

    function animate() {
      // Dark pink luxury velvet background
      ctx.fillStyle = 'rgba(25, 12, 19, 0.25)'
      ctx.fillRect(0, 0, W, H)

      frameCount++

      // Draw ambient sparkles
      for (const s of ambientSparkles) {
        s.y -= s.vy
        if (s.y < 0) s.y = H
        ctx.fillStyle = s.color
        ctx.globalAlpha = s.alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      let arrivedCount = 0

      // Animate reconstruction particles towards their target dot positions
      for (const p of particles) {
        p.x += (p.tx - p.x) * p.speed
        p.y += (p.ty - p.y) * p.speed
        p.alpha = Math.min(p.alpha + 0.03, 1)

        const dist = Math.hypot(p.tx - p.x, p.ty - p.y)
        if (dist < 2.5) arrivedCount++

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Seamlessly reveal the full authentic dotted portrait
      if (frameCount > 50) {
        const revealAlpha = Math.min((frameCount - 50) / 60, 0.96)
        ctx.save()
        ctx.globalAlpha = revealAlpha
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(offsetX, offsetY, portraitW, portraitH, 16)
        } else {
          ctx.rect(offsetX, offsetY, portraitW, portraitH)
        }
        ctx.clip()
        ctx.drawImage(img, offsetX, offsetY, portraitW, portraitH)
        ctx.restore()
      }

      // Soft champagne-gold and pink border + radiant halo glow
      if (frameCount > 65) {
        const glowProg = Math.min((frameCount - 65) / 45, 0.8)
        ctx.save()
        ctx.globalAlpha = glowProg
        ctx.strokeStyle = 'rgba(232, 201, 141, 0.65)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(offsetX, offsetY, portraitW, portraitH, 16)
        } else {
          ctx.rect(offsetX, offsetY, portraitW, portraitH)
        }
        ctx.stroke()

        // Radial golden-pink aura
        const cx = offsetX + portraitW / 2
        const cy = offsetY + portraitH / 2
        const glowGrad = ctx.createRadialGradient(cx, cy, portraitW * 0.35, cx, cy, portraitW * 0.95)
        glowGrad.addColorStop(0, `rgba(232, 201, 141, ${glowProg * 0.16})`)
        glowGrad.addColorStop(0.5, `rgba(248, 187, 208, ${glowProg * 0.09})`)
        glowGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGrad
        ctx.fillRect(0, 0, W, H)
        ctx.restore()
      }

      ctx.globalAlpha = 1

      // Trigger text reveals smoothly as dots arrive (or at frame 60)
      if ((frameCount >= 60 || arrivedCount / particles.length > 0.55) && !allDone) {
        allDone = true
        setShowQuote(true)
        setTimeout(() => setShowTitle(true), 400)
        setTimeout(() => setShowButton(true), 800)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #301624 0%, #1A0B14 60%, #0D0509 100%)',
      }}
    >
      {/* HTML Canvas Particle Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Floating Pink Butterflies & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl select-none"
            style={{
              left: `${10 + i * 16}%`,
              top: `${12 + (i % 3) * 18}%`,
              opacity: 0.7,
            }}
            animate={{
              x: [0, 18, -10, 0],
              y: [0, -18, -32, 0],
              rotate: [0, 8, -6, 0],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      {/* Overlay Typography & Interactive CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8 md:pb-12 px-4 pointer-events-none z-10">
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center mb-3 sm:mb-4 max-w-lg pointer-events-none"
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

        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center mb-4 sm:mb-5"
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-1 sm:mb-2 text-gradient-gold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HAPPIEST BIRTHDAY, PRANJAL! 💐
              </h1>
              <p
                className="text-[#E8C98D]/90 text-xs sm:text-sm tracking-widest uppercase"
                style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.25em' }}
              >
                Today, this little fairytale universe belongs to you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-auto flex flex-col items-center gap-3 sm:gap-4"
            >
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-princess shadow-princess-lg"
              >
                DISCOVER YOUR SURPRISE →
              </motion.button>

              {/* Cute Princess Kittens in Bottom Corners */}
              <div className="flex gap-10 opacity-90 pt-1">
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
