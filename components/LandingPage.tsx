'use client'

import { motion } from 'framer-motion'
import { QuestionIcon, CardsIcon, ReadingIcon } from './Icons'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 pt-12"
      >
        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-moonlight via-moon-silver to-lake-blue bg-clip-text text-transparent font-cinzel">
          Tarot.ai
        </h1>
        <p className="text-2xl md:text-3xl text-moon-silver mb-8 max-w-2xl mx-auto">
          Discover your path with AI-powered tarot readings
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="px-10 py-5 bg-gradient-to-r from-lake-blue via-mystic-purple to-lake-deep text-white text-xl font-semibold rounded-full hover:from-blue-500 hover:via-indigo-500 hover:to-blue-700 transition-all shadow-2xl shadow-lake-blue/50 transform"
        >
          Begin Your Reading
        </motion.button>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="ornate-box rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-moonlight mb-6 text-center font-cinzel">
            Ancient Wisdom Meets Modern AI
          </h2>
          <p className="text-lg text-moon-silver leading-relaxed text-center mb-6">
            Experience the mystical art of tarot reading enhanced by artificial intelligence. 
            Our platform combines the traditional 78-card tarot deck with advanced AI technology 
            to provide you with personalized, insightful readings tailored to your questions.
          </p>
          <p className="text-lg text-moon-silver leading-relaxed text-center">
            Whether you seek guidance on love, career, personal growth, or life's mysteries, 
            Tarot.ai offers a unique blend of spiritual wisdom and intelligent interpretation 
            to help illuminate your path forward.
          </p>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-4xl font-bold text-moonlight mb-12 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="ornate-box rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="mb-4 flex justify-center">
              <QuestionIcon size={64} className="text-moonlight" />
            </div>
            <h3 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Ask Your Question</h3>
            <p className="text-moon-silver">
              Share what's on your mind. Ask about relationships, career, personal growth, 
              or any area where you seek guidance.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="ornate-box rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="mb-4 flex justify-center items-center" style={{ height: '64px' }}>
              {/* 3 Fanned Out Cards */}
              <div className="relative flex items-end" style={{ width: '70px', height: '60px' }}>
                {/* Card 1 - Left */}
                <div 
                  className="absolute rounded-lg border-2 border-moonlight/40 shadow-lg z-0"
                  style={{
                    width: '32px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
                    left: '0',
                    transform: 'rotate(-12deg)',
                    transformOrigin: 'bottom center'
                  }}
                >
                  {/* Ornate border pattern */}
                  <div className="absolute inset-0 border border-moonlight/20" style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px),
                      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px)
                    `
                  }}></div>
                  {/* Central Star Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-4 h-4" style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    }}></div>
                    <div className="absolute w-1 h-1 bg-moonlight/60 rounded-full"></div>
                  </div>
                </div>
                {/* Card 2 - Center */}
                <div 
                  className="absolute rounded-lg border-2 border-moonlight/40 shadow-lg z-10"
                  style={{
                    width: '32px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
                    left: '19px',
                    transform: 'translateY(-3px)',
                    transformOrigin: 'bottom center'
                  }}
                >
                  {/* Ornate border pattern */}
                  <div className="absolute inset-0 border border-moonlight/20" style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px),
                      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px)
                    `
                  }}></div>
                  {/* Central Star Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-4 h-4" style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    }}></div>
                    <div className="absolute w-1 h-1 bg-moonlight/60 rounded-full"></div>
                  </div>
                </div>
                {/* Card 3 - Right */}
                <div 
                  className="absolute rounded-lg border-2 border-moonlight/40 shadow-lg z-20"
                  style={{
                    width: '32px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
                    left: '38px',
                    transform: 'rotate(12deg)',
                    transformOrigin: 'bottom center'
                  }}
                >
                  {/* Ornate border pattern */}
                  <div className="absolute inset-0 border border-moonlight/20" style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px),
                      repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.05) 2px)
                    `
                  }}></div>
                  {/* Central Star Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-4 h-4" style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    }}></div>
                    <div className="absolute w-1 h-1 bg-moonlight/60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Select Your Cards</h3>
            <p className="text-moon-silver">
              Choose 3 cards from our complete 78-card deck. Trust your intuition as you 
              select the cards that call to you.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="ornate-box rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="mb-4 flex justify-center">
              <ReadingIcon size={64} className="text-moonlight" />
            </div>
            <h3 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Receive Your Reading</h3>
            <p className="text-moon-silver">
              Get a personalized, AI-powered interpretation that weaves together the meanings 
              of your selected cards into a cohesive reading.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center mb-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="px-12 py-6 bg-gradient-to-r from-lake-blue via-mystic-purple to-lake-deep text-white text-2xl font-semibold rounded-full hover:from-blue-500 hover:via-indigo-500 hover:to-blue-700 transition-all shadow-2xl shadow-lake-blue/50 transform"
        >
          Start Your Journey
        </motion.button>
      </motion.div>
    </div>
  )
}

