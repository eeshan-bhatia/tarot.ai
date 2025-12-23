'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSubscription } from '@/contexts/SubscriptionContext'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import { motion } from 'framer-motion'

export default function SubscriptionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSubscription } = useSubscription()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      // Refresh subscription to get updated tier
      refreshSubscription().then(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [searchParams, refreshSubscription])

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
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ornate-box rounded-2xl p-8 shadow-2xl text-center"
          >
            {isLoading ? (
              <p className="text-white text-xl font-cinzel">Processing...</p>
            ) : (
              <>
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 text-green-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h1 className="text-4xl font-bold text-moonlight mb-2 font-cinzel">Subscription Activated!</h1>
                  <p className="text-moon-silver font-sans">
                    Thank you for subscribing. Your account has been upgraded.
                  </p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 font-sans"
                >
                  Start Reading
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

