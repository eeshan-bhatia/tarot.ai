'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  onHome: () => void
  onAbout?: () => void
  currentPage?: 'home' | 'about' | 'reading' | 'account'
}

export default function Navbar({ onHome, onAbout, currentPage = 'home' }: NavbarProps) {
  const { isAuthenticated, user, isLoading, signOut } = useAuth()
  const { subscription } = useSubscription()
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const userEmail = user?.signInDetails?.loginId || ''

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <>
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 w-full px-6 md:px-12 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        <button onClick={onHome} className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white font-cinzel">Tarot.ai</h2>
        </button>
        <div className="flex items-center gap-6">
          <button 
            onClick={onHome}
            className={`transition-colors text-sm font-medium font-sans ${
              currentPage === 'home' ? 'text-white' : 'text-white/80 hover:text-white'
            }`}
          >
            Home
          </button>
          {onAbout && (
            <button 
              onClick={onAbout}
              className={`transition-colors text-sm font-medium font-sans ${
                currentPage === 'about' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </button>
          )}
            
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-sans"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lake-blue to-water-teal flex items-center justify-center text-white font-semibold text-sm">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white text-sm hidden md:block">{userEmail}</span>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-md rounded-lg border border-white/10 shadow-xl overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            router.push('/account')
                            setShowUserMenu(false)
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors text-sm font-sans"
                        >
                          Account Settings
                        </button>
                        <button
                          onClick={() => {
                            router.push('/subscription')
                            setShowUserMenu(false)
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors text-sm font-sans"
                        >
                          Subscription
                        </button>
                        {subscription?.tier === 'premium' && (
                          <>
                            <div className="border-t border-white/10">
                              <button
                                onClick={() => {
                                  router.push('/library')
                                  setShowUserMenu(false)
                                }}
                                className="w-full px-4 py-3 text-left text-lake-blue hover:bg-lake-blue/10 transition-colors text-sm font-sans"
                              >
                                Card Library
                              </button>
                              <button
                                onClick={() => {
                                  router.push('/flashcards')
                                  setShowUserMenu(false)
                                }}
                                className="w-full px-4 py-3 text-left text-lake-blue hover:bg-lake-blue/10 transition-colors text-sm font-sans"
                              >
                                Flashcards
                              </button>
                            </div>
                          </>
                        )}
                        <div className="border-t border-white/10">
                          <button
                            onClick={handleSignOut}
                            className="w-full px-4 py-3 text-left text-red-300 hover:bg-red-500/10 transition-colors text-sm font-sans"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-4 py-2 text-white/80 hover:text-white transition-colors text-sm font-medium font-sans"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="px-4 py-2 bg-gradient-to-r from-lake-blue to-water-teal hover:from-lake-deep hover:to-cyan-600 text-white rounded-lg transition-all duration-200 text-sm font-medium font-sans"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
      </div>
    </motion.nav>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
      />
    </>
  )
}






