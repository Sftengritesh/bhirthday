import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PageNav({ prev, next, prevLabel = 'Back', nextLabel = 'Continue' }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between gap-4 mt-12 pb-8 px-4 w-full max-w-4xl mx-auto">
      {prev ? (
        <motion.button
          onClick={() => navigate(prev)}
          whileHover={{ x: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 text-deep-rose hover:text-[#3D1B28] transition-all text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer px-6 py-3 md:px-7 md:py-3.5 rounded-full glass-princess shadow-md"
        >
          <ChevronLeft size={18} />
          {prevLabel}
        </motion.button>
      ) : <div />}
      {next && (
        <motion.button
          onClick={() => navigate(next)}
          whileHover={{ x: 4, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 text-[#4A1A2C] transition-all text-xs md:text-sm font-bold tracking-widest uppercase cursor-pointer px-8 py-3.5 md:px-10 md:py-4 rounded-full shadow-princess hover:shadow-princess-lg"
          style={{
            background: 'linear-gradient(135deg, #F8BBD0, #EFA5BD, #E8C98D)',
            border: '2px solid #FFF',
          }}
        >
          {nextLabel}
          <ChevronRight size={18} />
        </motion.button>
      )}
    </div>
  )
}
