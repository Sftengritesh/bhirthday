import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import FloatingElements from '../components/FloatingElements'
import PageNav from '../components/PageNav'
import { sounds } from '../utils/audio'

export default function Cake() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('ready') // ready | cutting | cut | celebration
  const [candlesLit, setCandlesLit] = useState(true)
  const [balloons, setBalloons] = useState([])

  const handleCutCake = () => {
    if (phase !== 'ready') return
    setPhase('cutting')

    // 1. Knife moves through cake (~1.1s)
    setTimeout(() => {
      setPhase('cut')
      setCandlesLit(false)
      sounds.celebration()

      // 2. Confetti explosion
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.62 },
        colors: ['#F8BBD0', '#EFA5BD', '#E8C98D', '#FFF9F5', '#A64D70', '#FF4081'],
      })
      setTimeout(() => {
        confetti({
          particleCount: 140,
          angle: 55,
          spread: 85,
          origin: { x: 0.12, y: 0.68 },
          colors: ['#F8BBD0', '#E8C98D', '#EFA5BD', '#FFF'],
        })
        confetti({
          particleCount: 140,
          angle: 125,
          spread: 85,
          origin: { x: 0.88, y: 0.68 },
          colors: ['#F8BBD0', '#E8C98D', '#EFA5BD', '#FFF'],
        })
      }, 350)

      // 3. Balloons float upward
      setBalloons(Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: 6 + i * 8,
        delay: i * 0.2,
        emoji: ['🎈', '🎀', '🌸', '💖', '👑', '🎉'][i % 6],
      })))

      setPhase('celebration')
    }, 1100)
  }

  const handleReplay = () => {
    setPhase('ready')
    setCandlesLit(true)
    setBalloons([])
  }

  const isCut = phase === 'cut' || phase === 'celebration'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #FCE4EC 0%, #FFF9F5 55%, #F8BBD0 100%)',
      }}
    >
      <FloatingElements count={18} type="petals" />

      {/* Celebratory Floating Balloons */}
      {balloons.map(b => (
        <motion.div
          key={b.id}
          className="fixed text-5xl pointer-events-none z-40 select-none"
          style={{ left: `${b.x}%`, bottom: '-10%' }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-135vh', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, delay: b.delay, ease: 'easeOut' }}
        >
          {b.emoji}
        </motion.div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 px-2 sm:px-4">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-princess mb-3 shadow-sm">
            <span className="text-base">🎂</span>
            <span className="text-xs md:text-sm font-bold tracking-widest text-deep-rose uppercase">
              The Sweetest Birthday Celebration
            </span>
            <span className="text-base">🎀</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal text-gradient-rose mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Make a wish, coconut girl! 🎂
          </h1>

          <p
            className="text-[#6D4255] text-lg sm:text-xl italic font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Your special day deserves the sweetest celebration."
          </p>
        </div>

        {/* ============================================================== */}
        {/* REAL BAKERY-DESIGNED THREE-TIER PASTEL PINK CAKE (SVG 3D PERSPECTIVE) */}
        {/* ============================================================== */}
        <div className="relative mx-auto flex justify-center items-center py-2">
          <div className="relative w-full max-w-[500px] h-[380px] sm:h-[440px] flex items-center justify-center select-none">
            <svg
              viewBox="0 0 520 460"
              className="w-full h-full filter drop-shadow-2xl"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Stand Gradients */}
                <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EDE5E0" />
                  <stop offset="35%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#F5ECE6" />
                  <stop offset="100%" stopColor="#DDD3CC" />
                </linearGradient>

                {/* Cake Buttercream Tier Gradients */}
                <linearGradient id="tierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F8BBD0" />
                  <stop offset="25%" stopColor="#FCE4EC" />
                  <stop offset="65%" stopColor="#F8BBD0" />
                  <stop offset="100%" stopColor="#EFA5BD" />
                </linearGradient>

                <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF0F5" />
                  <stop offset="100%" stopColor="#FCE4EC" />
                </linearGradient>

                {/* Ribbon Gradient */}
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EFA5BD" />
                  <stop offset="40%" stopColor="#FFF5F8" />
                  <stop offset="75%" stopColor="#EFA5BD" />
                  <stop offset="100%" stopColor="#A64D70" />
                </linearGradient>

                {/* Golden Candle Gradient */}
                <linearGradient id="goldCandle" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4A74F" />
                  <stop offset="35%" stopColor="#FFF3D4" />
                  <stop offset="70%" stopColor="#E8C98D" />
                  <stop offset="100%" stopColor="#A87926" />
                </linearGradient>

                {/* Candle Flame Radial Glow */}
                <radialGradient id="flameGlow" cx="50%" cy="80%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFEB3B" />
                  <stop offset="60%" stopColor="#FF9800" />
                  <stop offset="100%" stopColor="rgba(255, 87, 34, 0)" />
                </radialGradient>

                {/* Strawberry Gradient */}
                <linearGradient id="strawberryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5252" />
                  <stop offset="50%" stopColor="#E53935" />
                  <stop offset="100%" stopColor="#B71C1C" />
                </linearGradient>

                {/* Exposed Cake Slice Interior Layer Gradient */}
                <linearGradient id="spongeInterior" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFF0D4" />
                  <stop offset="30%" stopColor="#FFE0B2" />
                  <stop offset="70%" stopColor="#FFF0D4" />
                  <stop offset="100%" stopColor="#FCE4EC" />
                </linearGradient>
              </defs>

              {/* -------------------------------------------------------- */}
              {/* 1. CAKE STAND (Pedestal + Base + Top Plate) */}
              {/* -------------------------------------------------------- */}
              <g id="cakeStand">
                {/* Pedestal Base Floor Shadow */}
                <ellipse cx="260" cy="442" rx="195" ry="16" fill="rgba(60, 20, 35, 0.14)" filter="blur(4px)" />

                {/* Pedestal Foot */}
                <path d="M 210,432 C 210,422 230,410 260,410 C 290,410 310,422 310,432 Z" fill="url(#standGrad)" />
                <ellipse cx="260" cy="432" rx="55" ry="10" fill="#E8DDD6" />

                {/* Stand Circular Top Plate (Perspective Ellipse) */}
                <path d="M 55,395 C 55,420 465,420 465,395 L 465,385 C 465,410 55,410 55,385 Z" fill="#DDD1C8" />
                <ellipse cx="260" cy="385" rx="205" ry="26" fill="url(#standGrad)" stroke="#FFFFFF" strokeWidth="2" />

                {/* Stand Lace Scallop Rim */}
                {[...Array(26)].map((_, i) => {
                  const angle = (i / 26) * Math.PI
                  const x = 260 - Math.cos(angle) * 203
                  const y = 385 + Math.sin(angle) * 25
                  return <circle key={i} cx={x} cy={y} r="4.5" fill="#FFFFFF" stroke="#E8DDD6" strokeWidth="0.8" />
                })}
              </g>

              {/* -------------------------------------------------------- */}
              {/* 2. TIER 3 (BOTTOM TIER - CYLINDRICAL) */}
              {/* -------------------------------------------------------- */}
              <g id="tier3">
                {/* Bottom Tier Shadow on Stand */}
                <ellipse cx="260" cy="372" rx="168" ry="20" fill="rgba(80, 25, 45, 0.12)" />

                {/* Cylinder Side Surface */}
                <path
                  d="M 95,290 L 95,360 C 95,385 425,385 425,360 L 425,290 Z"
                  fill="url(#tierGrad)"
                  stroke="#EFA5BD"
                  strokeWidth="1"
                />

                {/* Pink Satin Ribbon along Bottom */}
                <path
                  d="M 95,348 L 95,362 C 95,386 425,386 425,362 L 425,348 C 425,372 95,372 95,348 Z"
                  fill="url(#ribbonGrad)"
                />
                {/* Ribbon Jewel / Clasp */}
                <circle cx="260" cy="368" r="6" fill="#FFFFFF" stroke="#E8C98D" strokeWidth="2" />
                <circle cx="260" cy="368" r="3" fill="#EFA5BD" />

                {/* Piped White Whipped Cream Scallops around Tier 3 */}
                {[...Array(19)].map((_, i) => {
                  const angle = (i / 19) * Math.PI
                  const x = 260 - Math.cos(angle) * 163
                  const y = 360 + Math.sin(angle) * 21
                  return (
                    <g key={i}>
                      <ellipse cx={x} cy={y} rx="9.5" ry="6.5" fill="#FFFFFF" stroke="#FCE4EC" strokeWidth="0.8" />
                      <circle cx={x} cy={y - 1} r="2.5" fill="#F8BBD0" />
                    </g>
                  )
                })}

                {/* Delicate Pearl & Sprinkle accents on Tier 3 */}
                {[135, 175, 215, 260, 305, 345, 385].map((px, idx) => (
                  <circle key={idx} cx={px} cy={315 + (idx % 3) * 6} r="2.5" fill="#FFFFFF" opacity="0.9" />
                ))}

                {/* Tier 3 Top Surface (Perspective Ellipse) */}
                <ellipse cx="260" cy="290" rx="165" ry="22" fill="url(#tierTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>

              {/* -------------------------------------------------------- */}
              {/* 3. TIER 2 (MIDDLE TIER - CYLINDRICAL) */}
              {/* -------------------------------------------------------- */}
              <g id="tier2">
                {/* Shadow from Tier 2 onto Tier 3 */}
                <ellipse cx="260" cy="285" rx="128" ry="16" fill="rgba(80, 25, 45, 0.15)" />

                {/* Sliced Strawberries & Pearls on Tier 3 ledge */}
                {[120, 150, 370, 400].map((sx, idx) => (
                  <g key={idx} transform={`translate(${sx}, 282)`}>
                    <path d="M 0,-6 Q 8,-8 10,0 Q 12,8 0,10 Q -10,8 -8,0 Z" fill="url(#strawberryGrad)" />
                    <circle cx="2" cy="0" r="1.5" fill="#FFF59D" />
                    <circle cx="-3" cy="2" r="1.5" fill="#FFF59D" />
                  </g>
                ))}

                {/* Cylinder Side Surface */}
                <path
                  d="M 135,220 L 135,278 C 135,300 385,300 385,278 L 385,220 Z"
                  fill="url(#tierGrad)"
                  stroke="#EFA5BD"
                  strokeWidth="1"
                />

                {/* Piped Cream Shells around Tier 2 Base */}
                {[...Array(15)].map((_, i) => {
                  const angle = (i / 15) * Math.PI
                  const x = 260 - Math.cos(angle) * 123
                  const y = 278 + Math.sin(angle) * 17
                  return (
                    <g key={i}>
                      <ellipse cx={x} cy={y} rx="8.5" ry="5.5" fill="#FFFFFF" stroke="#FCE4EC" strokeWidth="0.8" />
                      <circle cx={x} cy={y - 1} r="2" fill="#E8C98D" />
                    </g>
                  )
                })}

                {/* Pearl details on Tier 2 */}
                {[170, 210, 260, 310, 350].map((px, idx) => (
                  <circle key={idx} cx={px} cy={242 + (idx % 2) * 6} r="2.8" fill="#FFFFFF" stroke="#EFA5BD" strokeWidth="0.5" />
                ))}

                {/* Tier 2 Top Surface (Perspective Ellipse) */}
                <ellipse cx="260" cy="220" rx="125" ry="18" fill="url(#tierTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>

              {/* -------------------------------------------------------- */}
              {/* 4. TIER 1 (TOP TIER - CYLINDRICAL) */}
              {/* -------------------------------------------------------- */}
              <g id="tier1">
                {/* Shadow from Tier 1 onto Tier 2 */}
                <ellipse cx="260" cy="216" rx="92" ry="12" fill="rgba(80, 25, 45, 0.16)" />

                {/* Cylinder Side Surface */}
                <path
                  d="M 172,155 L 172,210 C 172,228 348,228 348,210 L 348,155 Z"
                  fill="url(#tierGrad)"
                  stroke="#EFA5BD"
                  strokeWidth="1"
                />

                {/* Scalloped Piped Cream around Tier 1 Base */}
                {[...Array(11)].map((_, i) => {
                  const angle = (i / 11) * Math.PI
                  const x = 260 - Math.cos(angle) * 86
                  const y = 210 + Math.sin(angle) * 13
                  return (
                    <ellipse key={i} cx={x} cy={y} rx="7.5" ry="4.5" fill="#FFFFFF" stroke="#FCE4EC" strokeWidth="0.6" />
                  )
                })}

                {/* Tier 1 Top Surface (Perspective Ellipse) */}
                <ellipse cx="260" cy="155" rx="88" ry="14" fill="url(#tierTopGrad)" stroke="#FFFFFF" strokeWidth="1.5" />

                {/* Cream Dollops / Piped Rosettes around Rim (Reference matching!) */}
                {[...Array(14)].map((_, i) => {
                  const angle = (i / 14) * Math.PI * 2
                  const x = 260 + Math.cos(angle) * 82
                  const y = 155 + Math.sin(angle) * 13
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="6.5" fill="#FFFFFF" stroke="#FCE4EC" strokeWidth="0.8" />
                      <circle cx={x} cy={y - 1} r="4" fill="#FFF9F5" />
                    </g>
                  )
                })}

                {/* Fresh Strawberries on Top Tier (Inspired by Reference Image) */}
                {[
                  { x: 235, y: 152, s: 1.1 },
                  { x: 260, y: 150, s: 1.3 },
                  { x: 285, y: 152, s: 1.1 },
                  { x: 248, y: 158, s: 0.95 },
                  { x: 272, y: 158, s: 0.95 },
                ].map((st, idx) => (
                  <g key={idx} transform={`translate(${st.x}, ${st.y}) scale(${st.s})`}>
                    <path
                      d="M 0,-8 C 6,-9 11,-4 8,4 C 6,10 0,12 -4,9 C -10,4 -7,-7 0,-8 Z"
                      fill="url(#strawberryGrad)"
                    />
                    {/* Strawberry Seeds */}
                    <circle cx="1" cy="-2" r="1" fill="#FFF59D" />
                    <circle cx="-3" cy="2" r="1" fill="#FFF59D" />
                    <circle cx="2" cy="4" r="1" fill="#FFF59D" />
                    {/* Calyx Leaves */}
                    <path d="M 0,-8 L -3,-12 L 0,-10 L 3,-12 Z" fill="#4CAF50" />
                  </g>
                ))}

                {/* Delicate Pink Sugar Roses on Top */}
                <g transform="translate(225, 160) scale(0.9)">
                  <circle cx="0" cy="0" r="6" fill="#F8BBD0" />
                  <path d="M -3,-3 C 0,-6 4,-4 3,0 C 2,4 -3,4 -3,-3" stroke="#A64D70" strokeWidth="1" fill="none" />
                </g>
                <g transform="translate(295, 160) scale(0.9)">
                  <circle cx="0" cy="0" r="6" fill="#F8BBD0" />
                  <path d="M -3,-3 C 0,-6 4,-4 3,0 C 2,4 -3,4 -3,-3" stroke="#A64D70" strokeWidth="1" fill="none" />
                </g>
              </g>

              {/* -------------------------------------------------------- */}
              {/* 5. ELEGANT GOLDEN TOPPER: "Pranjal" */}
              {/* -------------------------------------------------------- */}
              <g id="cakeTopper" transform="translate(260, 95)">
                {/* Golden Heart Wire Frame (as in user reference photo) */}
                <path
                  d="M 0,-2 C -18,-24 -36,-10 -36,8 C -36,24 0,42 0,42 C 0,42 36,24 36,8 C 36,-10 18,-24 0,-2 Z"
                  fill="none"
                  stroke="url(#goldCandle)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Support Stick into Cake */}
                <line x1="0" y1="42" x2="0" y2="60" stroke="url(#goldCandle)" strokeWidth="3" />

                {/* Calligraphy Script Topper Label */}
                <rect x="-42" y="4" width="84" height="22" rx="11" fill="rgba(255, 255, 255, 0.95)" stroke="#E8C98D" strokeWidth="1.5" />
                <text
                  x="0"
                  y="19"
                  textAnchor="middle"
                  fill="#A64D70"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="'Playfair Display', serif"
                  letterSpacing="0.08em"
                >
                  Pranjal 👑
                </text>
              </g>

              {/* -------------------------------------------------------- */}
              {/* 6. FIVE SLENDER GOLDEN BIRTHDAY CANDLES & FLAMES */}
              {/* -------------------------------------------------------- */}
              <g id="candles">
                {[
                  { x: 215, y: 146, h: 58 },
                  { x: 238, y: 140, h: 65 },
                  { x: 260, y: 136, h: 70 }, // Center
                  { x: 282, y: 140, h: 65 },
                  { x: 305, y: 146, h: 58 },
                ].map((c, i) => (
                  <g key={i}>
                    {/* Candle Holder Stud in Frosting */}
                    <ellipse cx={c.x} cy={c.y} rx="3" ry="1.5" fill="#E8DDD6" />

                    {/* Slender Golden Candle Body */}
                    <rect
                      x={c.x - 2}
                      y={c.y - c.h}
                      width="4"
                      height={c.h}
                      rx="1"
                      fill="url(#goldCandle)"
                      stroke="#8C651E"
                      strokeWidth="0.4"
                    />

                    {/* Black Wick */}
                    <line
                      x1={c.x}
                      y1={c.y - c.h}
                      x2={c.x}
                      y2={c.y - c.h - 5}
                      stroke="#2E1810"
                      strokeWidth="1.2"
                    />

                    {/* Glowing Realistic Animated Candle Flame */}
                    <AnimatePresence>
                      {candlesLit && (
                        <motion.g
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.1, 0.94, 1], opacity: 1 }}
                          exit={{ scale: 0, opacity: 0, y: -8 }}
                          transition={{ duration: 0.35 + (i % 3) * 0.1, repeat: candlesLit ? Infinity : 0 }}
                        >
                          {/* Flame Aura Glow */}
                          <circle
                            cx={c.x}
                            cy={c.y - c.h - 13}
                            r="11"
                            fill="url(#flameGlow)"
                            opacity="0.85"
                          />
                          {/* Flame Teardrop */}
                          <path
                            d={`M ${c.x},${c.y - c.h - 22} C ${c.x + 5.5},${c.y - c.h - 14} ${c.x + 4.5},${c.y - c.h - 5} ${c.x},${c.y - c.h - 5} C ${c.x - 4.5},${c.y - c.h - 5} ${c.x - 5.5},${c.y - c.h - 14} ${c.x},${c.y - c.h - 22} Z`}
                            fill="url(#flameGlow)"
                          />
                          {/* Intense White/Yellow Flame Core */}
                          <ellipse
                            cx={c.x}
                            cy={c.y - c.h - 9}
                            rx="2"
                            ry="4.5"
                            fill="#FFFFFF"
                          />
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                ))}
              </g>

              {/* -------------------------------------------------------- */}
              {/* 7. SEPARATING CAKE WEDGE (CUT INTERACTION) */}
              {/* -------------------------------------------------------- */}
              {isCut && (
                <motion.g
                  id="cutWedge"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: 75, y: 35, rotate: 6 }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                >
                  {/* Wedge Shadow on Plate */}
                  <ellipse cx="360" cy="385" rx="50" ry="14" fill="rgba(80, 25, 45, 0.22)" filter="blur(3px)" />

                  {/* Cut Slice Side 1 (Interior Layer Sponge & Cream) */}
                  <path
                    d="M 260,290 L 360,290 L 360,365 L 260,375 Z"
                    fill="url(#spongeInterior)"
                    stroke="#EFA5BD"
                    strokeWidth="1.5"
                  />

                  {/* Delicious Inner Layers: Strawberry Jam & Vanilla Cream Stripes */}
                  <path d="M 260,310 L 360,305" stroke="#E53935" strokeWidth="3.5" />
                  <path d="M 260,320 L 360,315" stroke="#FFFFFF" strokeWidth="4" />
                  <path d="M 260,335 L 360,330" stroke="#E53935" strokeWidth="3" />
                  <path d="M 260,345 L 360,340" stroke="#FFFFFF" strokeWidth="4.5" />

                  {/* Top Frosting of the Cut Slice */}
                  <path
                    d="M 260,290 Q 310,278 360,290 L 330,270 Q 280,265 260,290 Z"
                    fill="url(#tierTopGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />

                  {/* A strawberry slice topping the cut wedge */}
                  <g transform="translate(310, 280) scale(0.9)">
                    <path d="M 0,-7 C 5,-8 9,-3 7,3 C 5,8 0,10 -3,7 C -8,3 -6,-6 0,-7 Z" fill="url(#strawberryGrad)" />
                    <circle cx="1" cy="-1" r="1" fill="#FFF59D" />
                  </g>
                </motion.g>
              )}

              {/* -------------------------------------------------------- */}
              {/* 8. REALISTIC CHEF'S KNIFE (Cutting Animation) */}
              {/* -------------------------------------------------------- */}
              {phase === 'cutting' && (
                <motion.g
                  id="cuttingKnife"
                  initial={{ x: 180, y: -120, rotate: -35 }}
                  animate={{ x: -40, y: 140, rotate: 20 }}
                  transition={{ duration: 1.05, ease: 'easeInOut' }}
                >
                  {/* Knife Blade (Silver metallic gleam) */}
                  <path
                    d="M 260,100 L 380,260 L 375,270 L 250,115 Z"
                    fill="linear-gradient(to right, #ECEFF1, #FFFFFF, #B0BEC5)"
                    stroke="#90A4AE"
                    strokeWidth="1"
                    filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                  />
                  {/* Blade Edge Sparkle */}
                  <line x1="260" y1="100" x2="380" y2="260" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Rose Gold Knife Handle */}
                  <rect
                    x="215"
                    y="55"
                    width="55"
                    height="18"
                    rx="6"
                    transform="rotate(52 230 65)"
                    fill="url(#goldCandle)"
                    stroke="#8C651E"
                    strokeWidth="1.5"
                  />
                </motion.g>
              )}
            </svg>
          </div>
        </div>

        {/* Action Controls & Large Princess Buttons */}
        <div className="pt-2">
          {phase === 'ready' && (
            <motion.button
              onClick={handleCutCake}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-princess shadow-princess-lg"
            >
              CUT THE CAKE 🎀
            </motion.button>
          )}

          {phase === 'cutting' && (
            <div
              className="text-deep-rose font-serif italic text-2xl animate-pulse"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Slicing the sweetest birthday cake for Pranjal... 🎀✨
            </div>
          )}

          {isCut && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 14 }}
              className="space-y-4 p-8 sm:p-10 rounded-3xl glass-princess shadow-princess-lg max-w-xl mx-auto border-2 border-white"
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-deep-rose leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HAPPIEST BIRTHDAYYYYY PRANJAL!!! 💐🎉
              </h2>

              <p
                className="text-lg sm:text-xl italic text-[#5A3546] leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "May every candle you blow out bring you closer to your dreams."
              </p>

              <p
                className="text-2xl sm:text-3xl text-deep-rose font-medium py-1"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem' }}
              >
                YOU DESERVE THE WORLD. 💗
              </p>

              {/* Special Birthday Guest Video Surprise */}
              <div className="pt-6 border-t border-rose-pink/40 mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 mb-3 text-xs font-bold tracking-widest text-deep-rose uppercase shadow-sm">
                  <span>🦆 Special Birthday Guest</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-semibold text-deep-rose mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Look Who Brought You Another Cake! 🎂✨
                </h3>
                <p
                  className="text-sm sm:text-base italic text-[#5A3546] mb-4 max-w-md mx-auto"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "He heard one cake wasn't enough for the princess, so he brought a cookie cake & an iced latte too! 🥺🍰"
                </p>

                {/* Video Container in Princess Rounded Border */}
                <div className="relative max-w-xs mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black/90">
                  <video
                    src="/video/birthday-duck-cake.mp4"
                    controls
                    playsInline
                    loop
                    autoPlay
                    muted
                    className="w-full h-auto object-cover block"
                  />
                </div>
                <p className="text-xs text-[#8C586E] italic mt-2.5">
                  Tap video for sound 🔊 • Happy Birthday Pranjal! 🎀
                </p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <button
                  onClick={handleReplay}
                  className="btn-princess-outline"
                >
                  ↺ REPLAY CAKE
                </button>
                <button
                  onClick={() => navigate('/kittens')}
                  className="btn-princess"
                >
                  KITTEN PARADE 🐱 →
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <PageNav prev="/make-a-wish" next="/kittens" nextLabel="Kitten Surprise →" />
    </motion.div>
  )
}
