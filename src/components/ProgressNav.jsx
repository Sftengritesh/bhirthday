import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ROUTE_LABELS = {
  '/': '✨ Portrait',
  '/login': '🔑 Palace Gate',
  '/welcome': '👑 Fairytale',
  '/memories': '📸 Scrapbook',
  '/coconut-girl': '🥥 Coconut Girl',
  '/letter': '💌 Royal Letter',
  '/make-a-wish': '🌟 Make a Wish',
  '/cake': '🎂 Princess Cake',
  '/kittens': '🐱 Kitten Parade',
  '/secret': '🤫 Secret Love',
  '/finale': '💖 Grand Finale',
}

export default function ProgressNav({ routes, currentPath }) {
  const navigate = useNavigate()
  const currentIdx = routes.indexOf(currentPath)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2.5 p-2 rounded-full glass-princess"
    >
      {routes.map((route, i) => (
        <button
          key={route}
          onClick={() => navigate(route)}
          title={ROUTE_LABELS[route]}
          className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer relative group"
          style={{
            background: i === currentIdx
              ? '#A64D70'
              : i < currentIdx
                ? '#EFA5BD'
                : 'rgba(239, 165, 189, 0.35)',
            boxShadow: i === currentIdx ? '0 0 10px #A64D70' : 'none',
            transform: i === currentIdx ? 'scale(1.4)' : 'scale(1)',
          }}
        >
          {/* Tooltip on hover */}
          <span className="absolute left-6 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none glass-princess text-[#4A2D3A] shadow-md">
            {ROUTE_LABELS[route]}
          </span>
        </button>
      ))}
    </motion.div>
  )
}
