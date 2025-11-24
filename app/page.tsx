'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import QuestionInput from '@/components/QuestionInput'
import CardSelector from '@/components/CardSelector'
import ReadingDisplay from '@/components/ReadingDisplay'
import { TarotCard } from '@/data/tarotCards'

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [question, setQuestion] = useState<string | null>(null) // null = not selected, '' = general reading, string = question
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [reading, setReading] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionSubmit = (q: string | null) => {
    // q can be: null (not selected), '' (general reading), or string (question)
    setQuestion(q === null ? null : q) // Keep null as null, but allow empty string
    setSelectedCards([])
    setReading(null)
  }

  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card])
    }
  }

  const handleCardRemove = (index: number) => {
    setSelectedCards(selectedCards.filter((_, i) => i !== index))
  }

  const handleGetReading = async () => {
    if (selectedCards.length === 3) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/reading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: question && question.trim() !== '' ? question : null,
            cards: selectedCards.map(card => ({
              name: card.name,
              meaning: card.meaning,
              keywords: card.keywords,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate reading')
        }

        const data = await response.json()
        setReading(data.reading)
      } catch (error) {
        console.error('Error generating reading:', error)
        alert('Failed to generate reading. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleReset = () => {
    setQuestion(null)
    setSelectedCards([])
    setReading(null)
    setShowLanding(true)
  }

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  return (
    <main className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8">
        {showLanding ? (
          <LandingPage onGetStarted={handleGetStarted} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-moonlight via-moon-silver to-lake-blue bg-clip-text text-transparent font-cinzel">
                Tarot.ai
              </h1>
              <button
                onClick={() => setShowLanding(true)}
                className="text-moon-silver hover:text-moonlight transition-colors text-sm"
              >
                ← Back to Home
              </button>
            </motion.div>

            {!reading ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {question === null ? (
                  <QuestionInput onSubmit={handleQuestionSubmit} />
                ) : (
                  <>
                    {question && question.trim() !== '' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ornate-box rounded-2xl p-6 shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold text-moonlight font-cinzel">Your Question</h2>
                          <button
                            onClick={() => setQuestion(null)}
                            className="text-moon-silver hover:text-moonlight transition-colors"
                          >
                            Change
                          </button>
                        </div>
                        <p className="text-moon-silver text-lg italic">"{question}"</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ornate-box rounded-2xl p-6 shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold text-moonlight font-cinzel">General Reading</h2>
                          <button
                            onClick={() => setQuestion(null)}
                            className="text-moon-silver hover:text-moonlight transition-colors"
                          >
                            Change
                          </button>
                        </div>
                        <p className="text-moon-silver text-lg italic">A general reading to reveal what the universe wants you to know.</p>
                      </motion.div>
                    )}

                    <CardSelector
                      selectedCards={selectedCards}
                      onCardSelect={handleCardSelect}
                      onCardRemove={handleCardRemove}
                    />

                    {selectedCards.length === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <button
                          onClick={handleGetReading}
                          disabled={isLoading}
                          className="px-8 py-4 bg-gradient-to-r from-lake-blue via-mystic-purple to-lake-deep text-white text-xl font-semibold rounded-full hover:from-blue-500 hover:via-indigo-500 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-lake-blue/50"
                        >
                          {isLoading ? 'Reading the cards...' : 'Get Your Reading'}
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <ReadingDisplay
                question={question}
                selectedCards={selectedCards}
                reading={reading}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </div>
    </main>
  )
}

