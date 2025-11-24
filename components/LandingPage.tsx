'use client'

import { motion } from 'framer-motion'
import { QuestionIcon, CardsIcon, ReadingIcon, CrystalBallIcon, AIIcon, ArtIcon, LightningIcon, MagicOrbIcon } from './Icons'

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
              <MagicOrbIcon size={64} className="text-moonlight" />
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
            <div className="mb-4 flex justify-center">
              <CardsIcon size={64} className="text-moonlight" />
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

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="ornate-box rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-moonlight mb-8 text-center font-cinzel">
            Why Choose Tarot.ai?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <CrystalBallIcon size={32} className="text-moonlight" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-moonlight mb-2 font-cinzel">Complete Tarot Deck</h3>
                <p className="text-moon-silver">
                  Access all 78 traditional tarot cards, including Major and Minor Arcana
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <AIIcon size={32} className="text-moonlight" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-moonlight mb-2 font-cinzel">AI-Powered Insights</h3>
                <p className="text-moon-silver">
                  Advanced AI technology provides personalized, thoughtful interpretations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <ArtIcon size={32} className="text-moonlight" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-moonlight mb-2 font-cinzel">Beautiful Experience</h3>
                <p className="text-moon-silver">
                  Immersive, mystical interface that captures the essence of tarot reading
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <LightningIcon size={32} className="text-moonlight" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-moonlight mb-2 font-cinzel">Instant Readings</h3>
                <p className="text-moon-silver">
                  Get your personalized reading in seconds, anytime you need guidance
                </p>
              </div>
            </div>
          </div>
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

