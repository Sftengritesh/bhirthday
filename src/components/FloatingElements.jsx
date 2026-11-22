import { useEffect, useRef } from 'react'

export default function FloatingElements({ count = 16, type = 'mixed' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const elements = []

    const pools = {
      stars: ['✨', '⭐', '✦', '✧', '💫'],
      hearts: ['💗', '💕', '💖', '🌸', '🎀'],
      butterflies: ['🦋', '🌸', '✨'],
      mixed: ['🌸', '✨', '💖', '🦋', '🎀', '⭐'],
      petals: ['🌸', '🌺', '🌷', '✨'],
    }

    const pool = pools[type] || pools.mixed

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span')
      const emoji = pool[Math.floor(Math.random() * pool.length)]
      const size = Math.random() * 12 + 14
      const x = Math.random() * 96 + 2
      const y = Math.random() * 94 + 3
      const delay = Math.random() * 5
      const duration = Math.random() * 6 + 5
      const opacity = Math.random() * 0.45 + 0.25

      el.textContent = emoji
      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        font-size: ${size}px;
        opacity: ${opacity};
        animation: floatSlow ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
        user-select: none;
        z-index: 1;
      `
      container.appendChild(el)
      elements.push(el)
    }

    return () => elements.forEach(e => e.remove())
  }, [count, type])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    />
  )
}
