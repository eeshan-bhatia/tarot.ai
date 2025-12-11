'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import AboutPage from '@/components/AboutPage'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import QuestionInput from '@/components/QuestionInput'
import CardSelector from '@/components/CardSelector'
import ReadingDisplay from '@/components/ReadingDisplay'
import { TarotCard } from '@/data/tarotCards'

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [showAbout, setShowAbout] = useState(false)
  const [question, setQuestion] = useState<string | null>(null) // null = not selected, '' = general reading, string = question
  const [selectedCards, setSelectedCards] = useState<(TarotCard | null)[]>([null, null, null])
  const [reading, setReading] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showQuestionInputDirectly, setShowQuestionInputDirectly] = useState(false)
  const [previousQuestion, setPreviousQuestion] = useState<string>('')

  const handleQuestionSubmit = (q: string | null) => {
    // q can be: null (not selected), '' (general reading), or string (question)
    setQuestion(q === null ? null : q) // Keep null as null, but allow empty string
    setSelectedCards([null, null, null])
    setReading(null)
    setShowQuestionInputDirectly(false) // Reset the flag after submission
  }

  const handleCardSelect = (card: TarotCard) => {
    // Find the first empty position (null) and place the card there
    const newCards = [...selectedCards]
    const emptyIndex = newCards.findIndex(c => c === null)
    if (emptyIndex !== -1) {
      newCards[emptyIndex] = card
      setSelectedCards(newCards)
    }
  }

  const handleCardRemove = (position: number) => {
    // Remove card from specific position
    const newCards = [...selectedCards]
    newCards[position] = null
    setSelectedCards(newCards)
  }

  const handleGetReading = async () => {
    const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
    if (validCards.length === 3) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/reading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: question && question.trim() !== '' ? question : null,
            cards: validCards.map(card => ({
              name: card.name,
              meaning: card.isReversed && card.reversed ? card.reversed : card.meaning,
              keywords: card.isReversed && card.reversedKeywords ? card.reversedKeywords : card.keywords,
              isReversed: card.isReversed || false,
            })),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          // Log full error details for debugging
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData,
            errorName: errorData.errorName,
            errorCode: errorData.errorCode,
            details: errorData.details
          })
          throw new Error(errorData.error || 'Failed to generate reading')
        }

        const data = await response.json()
        setReading(data.reading)
      } catch (error: any) {
        // Log full error for debugging
        console.error('Error generating reading:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          fullError: error
        })
        
        // Show detailed error message
        const errorMessage = error.message || 'Failed to generate reading. Please try again.'
        
        // In production, show user-friendly message
        // In development, show full details
        if (process.env.NODE_ENV === 'development') {
          alert(`Error: ${errorMessage}\n\nCheck console for full details.`)
        } else {
          alert(errorMessage)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleReset = () => {
    setQuestion(null)
    setSelectedCards([null, null, null])
    setReading(null)
    // Keep showLanding as false so user goes back to question input, not landing page
  }

  const handleGetStarted = () => {
    setShowLanding(false)
    setShowAbout(false)
  }

  const handleAbout = () => {
    setShowAbout(true)
    setShowLanding(false)
  }

  const handleBackToHome = () => {
    setShowLanding(true)
    setShowAbout(false)
  }

  return (
    <main className="min-h-screen relative">
      {showAbout ? (
        <AboutPage onBack={handleBackToHome} />
      ) : showLanding ? (
        <LandingPage onGetStarted={handleGetStarted} onAbout={handleAbout} />
      ) : (
        <>
          {/* LightRays Background */}
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
          
          <Navbar 
            onHome={() => {
              setShowLanding(true)
              setShowAbout(false)
            }}
            onAbout={handleAbout}
            currentPage="reading"
          />
          <div className="container mx-auto px-4 py-8 relative z-10">

            {!reading ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {question === null ? (
                  <QuestionInput 
                    onSubmit={handleQuestionSubmit} 
                    initialOption={showQuestionInputDirectly ? 'question' : null}
                    initialQuestion={showQuestionInputDirectly ? previousQuestion : ''}
                  />
                ) : (
                  <>
                    <CardSelector
                      selectedCards={selectedCards}
                      onCardSelect={handleCardSelect}
                      onCardRemove={handleCardRemove}
                      canRemoveCards={!reading && !isLoading}
                      onGetReading={handleGetReading}
                      isLoading={isLoading}
                    />

                    {question && question.trim() !== '' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ornate-box rounded-2xl p-6 shadow-2xl"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold text-moonlight font-cinzel">Your Question</h2>
                          <button
                            onClick={() => {
                              setPreviousQuestion(question) // Save the current question
                              setShowQuestionInputDirectly(true)
                              setQuestion(null)
                            }}
                            className="text-moon-silver hover:text-moonlight transition-colors font-sans"
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
                            className="text-moon-silver hover:text-moonlight transition-colors font-sans"
                          >
                            Change
                          </button>
                        </div>
                        <p className="text-moon-silver text-lg italic">A general reading to reveal what the universe wants you to know.</p>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <ReadingDisplay
                question={question}
                selectedCards={selectedCards.filter((card): card is TarotCard => card !== null)}
                reading={reading}
                onReset={handleReset}
              />
            )}
          </div>
        </>
      )}
    </main>
  )
}

