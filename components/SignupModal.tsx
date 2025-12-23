'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import { useAuth } from '@/contexts/AuthContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  requireSignupMessage?: boolean
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin, requireSignupMessage = false }: SignupModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [username, setUsername] = useState<string>('') // Store username for email alias pools
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { refreshUser } = useAuth()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)

    try {
      // Generate a username from email (for email alias pools)
      // When email alias is enabled, username cannot be in email format
      // Take the part before @ and add a random suffix to ensure uniqueness
      const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
      const randomSuffix = Math.random().toString(36).substring(2, 8)
      const generatedUsername = `${emailPrefix}_${randomSuffix}`
      
      // Store username for confirmation
      setUsername(generatedUsername)

      await signUp({
        username: generatedUsername,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      })
      setNeedsVerification(true)
    } catch (err: any) {
      console.error('Sign up error:', err)
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Use the stored username for confirmation (not email, since email alias is enabled)
      await confirmSignUp({
        username: username || email, // Fallback to email if username not set
        confirmationCode: verificationCode,
      })
      await refreshUser()
      // Clear guest reading flag when user successfully signs up
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest_reading_completed')
      }
      onClose()
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setVerificationCode('')
      setUsername('')
      setNeedsVerification(false)
    } catch (err: any) {
      console.error('Confirmation error:', err)
      setError(err.message || 'Invalid verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError(null)
    try {
      // Use the stored username for resend (not email, since email alias is enabled)
      await resendSignUpCode({ username: username || email })
      setError(null)
      alert('Verification code resent to your email')
    } catch (err: any) {
      setError(err.message || 'Failed to resend code')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-gradient-to-br from-midnight-blue/95 via-lake-deep/90 to-midnight-deep/95 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-lake-blue/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-3xl font-bold text-white mb-2 font-cinzel">
            {needsVerification ? 'Verify Your Email' : 'Create Account'}
          </h2>
          {requireSignupMessage && !needsVerification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-gradient-to-r from-lake-blue/20 to-water-teal/20 border border-lake-blue/50 rounded-lg"
            >
              <p className="text-white font-semibold mb-1 font-sans">Sign up to continue using Tarot.AI</p>
              <p className="text-white/80 text-sm font-sans">
                You've completed your free reading. Create an account to get unlimited readings and save your tarot journey.
              </p>
            </motion.div>
          )}
          <p className="text-white/70 mb-6 font-sans">
            {needsVerification
              ? 'Enter the verification code sent to your email'
              : requireSignupMessage
              ? 'Create your account to continue'
              : 'Sign up to save your readings'}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
            >
              {error}
            </motion.div>
          )}

          {needsVerification ? (
            <form onSubmit={handleConfirmSignup} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-white/80 mb-2 font-sans">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                className="w-full py-2 text-white/60 hover:text-white text-sm transition-colors font-sans"
              >
                Resend code
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2 font-sans">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2 font-sans">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2 font-sans">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
          )}

          {!needsVerification && (
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm font-sans">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-lake-blue hover:text-water-teal font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

