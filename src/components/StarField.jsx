import { useEffect, useRef } from 'react'

export default function StarField() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = []
    
    // Golden fairy sparkles
    for (let i = 0; i < 45; i++) {
      const sparkle = document.createElement('div')
      const size = Math.random() * 3 + 1.5
      sparkle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #E8C98D;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.7 + 0.2};
        box-shadow: 0 0 ${size * 3}px #E8C98D;
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `
      container.appendChild(sparkle)
      elements.push(sparkle)
    }

    // Soft baby pink floating fairy dust
    for (let i = 0; i < 35; i++) {
      const dust = document.createElement('div')
      const size = Math.random() * 4 + 2
      dust.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #F8BBD0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 ${size * 2}px #EFA5BD;
        animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `
      container.appendChild(dust)
      elements.push(dust)
    }

    // Floating delicate rose petals
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div')
      petal.innerHTML = '🌸'
      const size = Math.random() * 10 + 12
      petal.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.4 + 0.2};
        pointer-events: none;
        animation: floatSlow ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `
      container.appendChild(petal)
      elements.push(petal)
    }

    return () => {
      elements.forEach(e => e.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #FCE4EC 0%, #FFF9F5 65%, #F8BBD0 100%)',
      }}
    />
  )
}
