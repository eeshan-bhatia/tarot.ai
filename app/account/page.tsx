'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { updatePassword, getCurrentUser, fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import { useRouter } from 'next/navigation'
import { SUBSCRIPTION_PLANS } from '@/types/subscription'

export default function AccountPage() {
  const { user, isLoading, signOut, refreshUser } = useAuth()
  const { subscription } = useSubscription()
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isChangingUsername, setIsChangingUsername] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showUsernameForm, setShowUsernameForm] = useState(false)
  const [userAttributes, setUserAttributes] = useState<any>(null)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsChangingPassword(true)

    try {
      // Note: AWS Cognito requires the user to be signed in to change password
      // This will use the current session
      await updatePassword({
        oldPassword: currentPassword,
        newPassword,
      })
      setSuccess('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowPasswordForm(false)
    } catch (err: any) {
      console.error('Password change error:', err)
      setError(err.message || 'Failed to change password. Please check your current password.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  // Load user attributes on mount
  useEffect(() => {
    const loadUserAttributes = async () => {
      if (user) {
        try {
          const attributes = await fetchUserAttributes()
          setUserAttributes(attributes)
          // Set current username (preferred_username, cognito:username, or fallback to userId)
          // preferred_username is the display username users can change
          // cognito:username is the actual Cognito username (immutable)
          const preferredUsername = attributes['preferred_username'] || attributes['cognito:username'] || user.userId
          setUsername(preferredUsername)
          setNewUsername(preferredUsername)
        } catch (error) {
          console.error('Error fetching user attributes:', error)
          // Fallback to userId if attributes can't be fetched
          setUsername(user.userId)
          setNewUsername(user.userId)
        }
      }
    }
    loadUserAttributes()
  }, [user])

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!newUsername || newUsername.trim() === '') {
      setError('Username cannot be empty')
      return
    }

    if (newUsername === username) {
      setError('New username must be different from current username')
      return
    }

    // Validate username format (alphanumeric, underscore, hyphen, 3-20 chars)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    if (!usernameRegex.test(newUsername)) {
      setError('Username must be 3-20 characters and contain only letters, numbers, underscores, or hyphens')
      return
    }

    setIsChangingUsername(true)

    try {
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'preferred_username',
          value: newUsername.trim(),
        },
      })
      setSuccess('Username changed successfully! You may need to sign out and sign back in for changes to take full effect.')
      setUsername(newUsername.trim())
      await refreshUser()
      // Reload attributes to get updated preferred_username
      const attributes = await fetchUserAttributes()
      setUserAttributes(attributes)
      setShowUsernameForm(false)
    } catch (err: any) {
      console.error('Username change error:', err)
      if (err.message?.includes('already exists') || err.message?.includes('taken')) {
        setError('This username is already taken. Please choose another one.')
      } else {
        setError(err.message || 'Failed to change username. Please try again.')
      }
    } finally {
      setIsChangingUsername(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
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

  if (!user) {
    router.push('/')
    return null
  }

  const userEmail = user.signInDetails?.loginId || 'Unknown'

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

      <Navbar
        onHome={() => router.push('/')}
        currentPage="account"
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ornate-box rounded-2xl p-8 shadow-2xl"
          >
            <h1 className="text-4xl font-bold text-moonlight mb-2 font-cinzel">Account Settings</h1>
            <p className="text-moon-silver mb-8 font-sans">Manage your account and preferences</p>

            {/* Subscription Info */}
            {subscription && (
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-moonlight font-cinzel">Subscription</h2>
                  <button
                    onClick={() => router.push('/subscription')}
                    className="px-4 py-2 bg-lake-blue/20 hover:bg-lake-blue/30 text-lake-blue rounded-lg transition-colors font-sans text-sm"
                  >
                    Manage
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-moon-silver mb-1 font-sans">Current Plan</label>
                    <p className="text-white font-sans">
                      {SUBSCRIPTION_PLANS[subscription.tier].name} - ${SUBSCRIPTION_PLANS[subscription.tier].price}
                      {SUBSCRIPTION_PLANS[subscription.tier].price > 0 ? '/month' : ''}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-moon-silver mb-1 font-sans">Readings</label>
                    <p className="text-white font-sans">
                      {subscription.readingsLimit === null
                        ? 'Unlimited'
                        : `${subscription.readingsUsed} / ${subscription.readingsLimit} this month`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <h2 className="text-2xl font-semibold text-moonlight mb-4 font-cinzel">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-moon-silver mb-1 font-sans">Email</label>
                  <p className="text-white font-sans">{userEmail}</p>
                  <p className="text-white/50 text-xs mt-1 font-sans">Used for sign in and account recovery</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-moon-silver font-sans">Username</label>
                    {!showUsernameForm && (
                      <button
                        onClick={() => setShowUsernameForm(true)}
                        className="text-sm px-3 py-1 bg-lake-blue/20 hover:bg-lake-blue/30 text-lake-blue rounded-lg transition-colors font-sans"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  {showUsernameForm ? (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      onSubmit={handleUsernameChange}
                      className="space-y-3 mt-2"
                    >
                      {error && (
                        <div className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="p-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-xs">
                          {success}
                        </div>
                      )}

                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                        pattern="[a-zA-Z0-9_-]{3,20}"
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans text-sm"
                        placeholder="Enter new username"
                        minLength={3}
                        maxLength={20}
                      />
                      <p className="text-white/50 text-xs font-sans">
                        3-20 characters, letters, numbers, underscores, or hyphens only
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={isChangingUsername}
                          className="px-4 py-2 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans text-sm"
                        >
                          {isChangingUsername ? 'Changing...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowUsernameForm(false)
                            setError(null)
                            setSuccess(null)
                            setNewUsername(username)
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-sans text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <p className="text-white font-sans">{username || user.userId}</p>
                  )}
                  <p className="text-white/50 text-xs mt-1 font-sans">Your display name</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-moon-silver mb-1 font-sans">User ID</label>
                  <p className="text-white/60 text-sm font-mono font-sans">{user.userId}</p>
                  <p className="text-white/50 text-xs mt-1 font-sans">Internal identifier (cannot be changed)</p>
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-moonlight font-cinzel">Password</h2>
                {!showPasswordForm && (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="px-4 py-2 bg-lake-blue/20 hover:bg-lake-blue/30 text-lake-blue rounded-lg transition-colors font-sans"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {showPasswordForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handlePasswordChange}
                  className="space-y-4 mt-4"
                >
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
                      {success}
                    </div>
                  )}

                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-moon-silver mb-2 font-sans">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-moon-silver mb-2 font-sans">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-moon-silver mb-2 font-sans">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="px-6 py-3 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                    >
                      {isChangingPassword ? 'Changing...' : 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false)
                        setError(null)
                        setSuccess(null)
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-sans"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Sign Out */}
            <div className="pt-8 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-colors font-sans"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

