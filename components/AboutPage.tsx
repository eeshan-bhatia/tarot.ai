'use client'

import { motion } from 'framer-motion'
import { QuestionIcon, ReadingIcon } from './Icons'
import Prism from './Prism'
import Navbar from './Navbar'

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
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
      <Navbar onHome={onBack} currentPage="about" />

      {/* Content */}
      <div className="relative z-10 pb-16 pt-8">
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
          <h2 className="text-4xl font-bold text-moonlight mb-12 text-center font-cinzel">
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
      </div>
    </div>
  )
}

