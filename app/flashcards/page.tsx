'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import { useRouter } from 'next/navigation'
import { tarotCards, TarotCard } from '@/data/tarotCards'

export default function FlashcardsPage() {
  const { isAuthenticated } = useAuth()
  const { subscription } = useSubscription()
  const router = useRouter()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState<'all' | 'major' | 'minor'>('all')
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([])
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    let cards = tarotCards
    if (studyMode === 'major') {
      cards = cards.filter(c => c.arcana === 'major')
    } else if (studyMode === 'minor') {
      cards = cards.filter(c => c.arcana === 'minor')
    }
    // Shuffle cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setShuffledCards(shuffled)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setStudiedCards(new Set())
  }, [studyMode])

  const currentCard = shuffledCards[currentCardIndex]

  const handleNext = () => {
    if (currentCard) {
      setStudiedCards(prev => new Set(prev).add(currentCard.id))
    }
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      // Restart
      setCurrentCardIndex(0)
      setIsFlipped(false)
      setStudiedCards(new Set())
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
      setIsFlipped(false)
    }
  }

  if (!isAuthenticated) {
    router.push('/')
    return null
  }

  if (subscription?.tier !== 'premium') {
    return (
      <main className="min-h-screen relative">
        <div className="fixed inset-0 w-full h-full z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.5}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        <Navbar onHome={() => router.push('/')} />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ornate-box rounded-2xl p-8 shadow-2xl"
            >
              <h1 className="text-3xl font-bold text-moonlight mb-4 font-cinzel">Premium Feature</h1>
              <p className="text-moon-silver mb-6 font-sans">
                Interactive flashcards are available for Premium subscribers. Upgrade to practice and memorize tarot card meanings.
              </p>
              <button
                onClick={() => router.push('/subscription')}
                className="px-6 py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 font-sans"
              >
                Upgrade to Premium
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.5}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <Navbar onHome={() => router.push('/')} />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold text-moonlight mb-2 font-cinzel">Tarot Flashcards</h1>
            <p className="text-moon-silver font-sans">Practice and memorize tarot card meanings</p>
          </motion.div>

          {/* Study Mode Selector */}
          <div className="ornate-box rounded-2xl p-6 mb-6 shadow-2xl">
            <label className="block text-sm font-medium text-moon-silver mb-3 font-sans">Study Mode</label>
            <div className="flex gap-3">
              {(['all', 'major', 'minor'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setStudyMode(mode)}
                  className={`px-4 py-2 rounded-lg font-sans transition-all ${
                    studyMode === mode
                      ? 'bg-gradient-to-r from-lake-blue to-water-teal text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {mode === 'all' ? 'All Cards' : mode === 'major' ? 'Major Arcana' : 'Minor Arcana'}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="ornate-box rounded-2xl p-4 mb-6 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-moon-silver font-sans">Progress</span>
              <span className="text-white font-sans">
                {currentCardIndex + 1} / {shuffledCards.length}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-lake-blue to-water-teal h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / shuffledCards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          {currentCard && (
            <div className="mb-6" style={{ perspective: '1000px' }}>
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="ornate-box rounded-2xl p-8 shadow-2xl cursor-pointer min-h-[400px] flex flex-col items-center justify-center"
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {!isFlipped ? (
                    <>
                      <h2 className="text-4xl font-bold text-moonlight mb-4 font-cinzel text-center">
                        {currentCard.name}
                      </h2>
                      {currentCard.arcana === 'major' && (
                        <span className="bg-lake-blue/30 text-lake-blue px-4 py-2 rounded-lg mb-4 font-sans">
                          Major Arcana
                        </span>
                      )}
                      {currentCard.suit && (
                        <span className="bg-water-teal/30 text-water-teal px-4 py-2 rounded-lg mb-4 font-sans">
                          {currentCard.suit}
                        </span>
                      )}
                      <p className="text-moon-silver text-sm mt-4 font-sans">Click to flip</p>
                    </>
                  ) : (
                    <div className="text-center" style={{ transform: 'rotateY(180deg)' }}>
                      <h3 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Meaning</h3>
                      <p className="text-moon-silver text-lg mb-6 leading-relaxed font-sans">
                        {currentCard.meaning}
                      </p>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-moonlight mb-2 font-cinzel">Keywords</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {currentCard.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="bg-lake-blue/20 text-lake-blue px-3 py-1 rounded-lg font-sans"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      {currentCard.reversed && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h4 className="text-lg font-semibold text-moonlight mb-2 font-cinzel">Reversed</h4>
                          <p className="text-moon-silver text-sm leading-relaxed font-sans">
                            {currentCard.reversed}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              Previous
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white rounded-lg transition-all font-sans"
            >
              {isFlipped ? 'Show Card' : 'Show Meaning'}
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-sans"
            >
              {currentCardIndex < shuffledCards.length - 1 ? 'Next' : 'Restart'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

