'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Prism from './Prism'
import Navbar from './Navbar'

interface LandingPageProps {
  onGetStarted: () => void
  onAbout: () => void
  onHome?: () => void
}

export default function LandingPage({ onGetStarted, onAbout, onHome }: LandingPageProps) {
  const fullText = "Discover your path with AI-powered tarot readings"
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 50) // Typing speed: 50ms per character
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, fullText])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Prism Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Prism
          animationType="3drotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0.06}
          colorFrequency={1.3}
          noise={0.5}
          glow={1.3}
        />
      </div>
      
      {/* Navigation Bar */}
      <Navbar onHome={onHome || (() => {})} onAbout={onAbout} currentPage="home" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white font-cinzel leading-tight" style={{ 
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2)',
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'
            }}>
              Welcome to Tarot.AI
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white mb-8 max-w-2xl mx-auto font-sans font-normal"
              style={{ 
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2)',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'
              }}
            >
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all backdrop-blur-sm font-sans"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAbout}
                className="px-8 py-4 bg-black/20 backdrop-blur-md text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-black/30 transition-all font-sans"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

