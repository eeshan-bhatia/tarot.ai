'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import AboutPage from '@/components/AboutPage'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import QuestionInput from '@/components/QuestionInput'
import CardSelector from '@/components/CardSelector'
import ReadingDisplay from '@/components/ReadingDisplay'
import SignupModal from '@/components/SignupModal'
import LoginModal from '@/components/LoginModal'
import { TarotCard } from '@/data/tarotCards'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { subscription, canDoReading, incrementReadingCount, isLoading: subscriptionLoading } = useSubscription()
  const [showLanding, setShowLanding] = useState(true)
  const [showAbout, setShowAbout] = useState(false)
  const [question, setQuestion] = useState<string | null>(null) // null = not selected, '' = general reading, string = question
  const [selectedCards, setSelectedCards] = useState<(TarotCard | null)[]>([null, null, null])
  const [reading, setReading] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showQuestionInputDirectly, setShowQuestionInputDirectly] = useState(false)
  const [previousQuestion, setPreviousQuestion] = useState<string>('')
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Check if guest user has completed a reading
  const hasGuestCompletedReading = () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('guest_reading_completed') === 'true'
  }

  // Mark guest reading as completed
  const markGuestReadingCompleted = () => {
    if (typeof window !== 'undefined' && !isAuthenticated) {
      localStorage.setItem('guest_reading_completed', 'true')
    }
  }

  // Clear guest reading flag when user signs in
  useEffect(() => {
    if (isAuthenticated && typeof window !== 'undefined') {
      localStorage.removeItem('guest_reading_completed')
    }
  }, [isAuthenticated])

  const handleQuestionSubmit = (q: string | null) => {
    // Check if free user is trying to ask a question
    if (isAuthenticated && subscription?.tier === 'free' && q !== null && q.trim() !== '') {
      // Free users can only do general readings
      alert('Question-based readings are available for Basic and Premium subscribers. Please upgrade your subscription to ask specific questions.')
      router.push('/subscription')
      return
    }

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
    // Check if user is a guest and has already completed a reading
    if (!isAuthenticated && hasGuestCompletedReading()) {
      setShowSignupModal(true)
      return
    }

    // Check subscription limits for authenticated users
    if (isAuthenticated && !canDoReading()) {
      // Show upgrade modal or redirect to subscription page
      alert('You have reached your reading limit for this month. Please upgrade your subscription to continue.')
      return
    }

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
        // Mark guest reading as completed after successful reading
        if (!isAuthenticated) {
          markGuestReadingCompleted()
        } else {
          // Increment reading count for authenticated users
          await incrementReadingCount()
        }
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
    // Check if user is a guest and has already completed a reading
    if (!isAuthenticated && hasGuestCompletedReading()) {
      // Show signup modal with message
      setShowSignupModal(true)
      return
    }

    // Allow reset for authenticated users or first-time guests
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
          
          {/* Signup Modal for guest users who need to sign up */}
          <SignupModal
            isOpen={showSignupModal}
            onClose={() => {
              setShowSignupModal(false)
              // If user successfully signs up, clear the guest reading flag
              // This is handled by the useEffect that watches isAuthenticated
            }}
            onSwitchToLogin={() => {
              setShowSignupModal(false)
              setShowLoginModal(true)
            }}
            requireSignupMessage={true}
          />
          
          {/* Login Modal */}
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={() => {
              setShowLoginModal(false)
              setShowSignupModal(true)
            }}
          />
          <div className="container mx-auto px-4 py-8 relative z-10">

            {!reading ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {question === null ? (
                  <QuestionInput 
                    onSubmit={handleQuestionSubmit} 
                    initialOption={showQuestionInputDirectly ? 'question' : null}
                    initialQuestion={showQuestionInputDirectly ? previousQuestion : ''}
                    allowQuestionReadings={!isAuthenticated || subscription?.tier !== 'free'}
                    onUpgradeClick={() => router.push('/subscription')}
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
                        {/* Show upgrade prompt for free users if they somehow got here */}
                        {isAuthenticated && subscription?.tier === 'free' && (
                          <div className="mt-4 p-3 bg-lake-blue/20 border border-lake-blue/50 rounded-lg">
                            <p className="text-lake-blue text-sm font-sans">
                              Question-based readings require a Basic or Premium subscription. 
                              <button
                                onClick={() => router.push('/subscription')}
                                className="underline ml-1 font-semibold"
                              >
                                Upgrade now
                              </button>
                            </p>
                          </div>
                        )}
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

