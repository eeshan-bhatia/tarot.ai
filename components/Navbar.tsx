'use client'

import { motion } from 'framer-motion'

interface NavbarProps {
  onHome: () => void
  onAbout?: () => void
  currentPage?: 'home' | 'about' | 'reading'
}

export default function Navbar({ onHome, onAbout, currentPage = 'home' }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 w-full px-6 md:px-12 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        <button onClick={onHome} className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white font-cinzel">Tarot.ai</h2>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={onHome}
            className={`transition-colors text-sm font-medium font-sans ${
              currentPage === 'home' ? 'text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            Home
          </button>
          {onAbout && (
            <button 
              onClick={onAbout}
              className={`transition-colors text-sm font-medium font-sans ${
                currentPage === 'about' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

