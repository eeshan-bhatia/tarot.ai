'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { fetchAuthSession } from 'aws-amplify/auth'
import { SUBSCRIPTION_PLANS, type SubscriptionTier } from '@/types/subscription'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import { useRouter } from 'next/navigation'
// No longer need to load Stripe.js - we'll redirect directly to the checkout URL

export default function SubscriptionPage() {
  const { user, isAuthenticated } = useAuth()
  const { subscription, isLoading, refreshSubscription } = useSubscription()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async (tier: SubscriptionTier) => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }

    if (tier === 'free') {
      // Downgrade to free
      try {
        setIsProcessing(true)
        setError(null)
        await fetch('/api/subscription/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: 'free' }),
        })
        await refreshSubscription()
      } catch (err) {
        setError('Failed to update subscription')
      } finally {
        setIsProcessing(false)
      }
      return
    }

    // For paid tiers, redirect to Stripe Checkout
    try {
      setIsProcessing(true)
      setError(null)

      // Get the access token from the current session
      const session = await fetchAuthSession()
      
      if (!session.tokens?.accessToken) {
        console.error('No access token in session')
        throw new Error('Not authenticated. Please sign in again.')
      }

      // Get the token string - in Amplify v6, accessToken is a JWT object
      // We need to get the raw token string
      const accessToken = session.tokens.accessToken
      let tokenString: string
      
      // Try to get the token as a string
      if (typeof accessToken === 'string') {
        tokenString = accessToken
      } else {
        // In Amplify v6, accessToken might be a CognitoAccessToken object
        // Try to access the token property or use toString
        const tokenObj = accessToken as any
        tokenString = tokenObj.token || tokenObj.toString?.() || String(accessToken)
        
        if (!tokenString || tokenString === '[object Object]') {
          console.error('Unable to extract token string from:', accessToken)
          throw new Error('Unable to extract access token. Please sign in again.')
        }
      }

      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`
        },
        body: JSON.stringify({ tier }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      if (url) {
        // Redirect directly to the Stripe Checkout URL
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout process')
      setIsProcessing(false)
    }
  }

  if (!isAuthenticated) {
    router.push('/')
    return null
  }

  if (isLoading) {
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
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <p className="text-white text-xl font-cinzel">Loading...</p>
        </div>
      </main>
    )
  }

  const currentTier = subscription?.tier || 'free'
  const currentPlan = SUBSCRIPTION_PLANS[currentTier]
  const readingsRemaining = subscription?.readingsLimit
    ? subscription.readingsLimit - subscription.readingsUsed
    : null

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

      <Navbar onHome={() => router.push('/')} currentPage="account" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-moonlight mb-2 font-cinzel">Subscription Plans</h1>
            <p className="text-moon-silver font-sans">Choose the plan that's right for you</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
            >
              {error}
            </motion.div>
          )}

          {/* Current Plan Status */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ornate-box rounded-2xl p-6 mb-8 shadow-2xl"
            >
              <h2 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Current Plan</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-moon-silver text-sm font-sans">Plan</p>
                  <p className="text-white text-lg font-semibold font-cinzel">{currentPlan.name}</p>
                </div>
                <div>
                  <p className="text-moon-silver text-sm font-sans">Readings Used</p>
                  <p className="text-white text-lg font-semibold font-sans">
                    {subscription.readingsLimit === null
                      ? 'Unlimited'
                      : `${subscription.readingsUsed} / ${subscription.readingsLimit}`}
                  </p>
                </div>
                {readingsRemaining !== null && (
                  <div>
                    <p className="text-moon-silver text-sm font-sans">Remaining</p>
                    <p className="text-white text-lg font-semibold font-sans">{readingsRemaining} readings</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
              const isCurrentPlan = plan.id === currentTier
              const isUpgrade = ['free', 'basic'].includes(currentTier) && ['basic', 'premium'].includes(plan.id)
              const isDowngrade = ['basic', 'premium'].includes(currentTier) && plan.id === 'free'

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: plan.id === 'basic' ? 0.1 : plan.id === 'premium' ? 0.2 : 0 }}
                  className={`ornate-box rounded-2xl p-6 shadow-2xl relative ${
                    isCurrentPlan ? 'ring-2 ring-lake-blue' : ''
                  } ${plan.id === 'basic' ? 'md:scale-105' : ''}`}
                >
                  {plan.id === 'basic' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-lake-blue to-water-teal text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-moonlight mb-2 font-cinzel">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white font-cinzel">${plan.price}</span>
                      {plan.price > 0 && (
                        <span className="text-moon-silver text-sm font-sans">/month</span>
                      )}
                    </div>
                    <p className="text-moon-silver text-sm font-sans">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-lake-blue mt-0.5 flex-shrink-0"
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
                        <span className="text-white text-sm font-sans">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan || isProcessing}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 font-sans ${
                      isCurrentPlan
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : isUpgrade
                        ? 'bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isCurrentPlan
                      ? 'Current Plan'
                      : isProcessing
                      ? 'Processing...'
                      : isUpgrade
                      ? 'Upgrade'
                      : isDowngrade
                      ? 'Downgrade to Free'
                      : 'Select Plan'}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

