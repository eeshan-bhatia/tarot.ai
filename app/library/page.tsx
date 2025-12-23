'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import Navbar from '@/components/Navbar'
import LightRays from '@/components/LightRays'
import { useRouter } from 'next/navigation'
import { tarotCards, TarotCard } from '@/data/tarotCards'

export default function CardLibraryPage() {
  const { isAuthenticated } = useAuth()
  const { subscription } = useSubscription()
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterArcana, setFilterArcana] = useState<'all' | 'major' | 'minor'>('all')
  const [filterSuit, setFilterSuit] = useState<string>('all')

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
                The Card Library is available for Premium subscribers. Upgrade to access detailed card meanings, interpretations, and educational resources.
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

  const filteredCards = tarotCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesArcana = filterArcana === 'all' || card.arcana === filterArcana
    const matchesSuit = filterSuit === 'all' || card.suit === filterSuit
    return matchesSearch && matchesArcana && matchesSuit
  })

  const suits = Array.from(new Set(tarotCards.filter(c => c.suit).map(c => c.suit))).filter(Boolean) as string[]

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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-moonlight mb-2 font-cinzel">Tarot Card Library</h1>
            <p className="text-moon-silver font-sans">Explore detailed meanings and interpretations of all tarot cards</p>
          </motion.div>

          {/* Filters */}
          <div className="ornate-box rounded-2xl p-6 mb-6 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-moon-silver mb-2 font-sans">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cards..."
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-moon-silver mb-2 font-sans">Arcana</label>
                <select
                  value={filterArcana}
                  onChange={(e) => setFilterArcana(e.target.value as 'all' | 'major' | 'minor')}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                >
                  <option value="all">All</option>
                  <option value="major">Major Arcana</option>
                  <option value="minor">Minor Arcana</option>
                </select>
              </div>
              {filterArcana === 'minor' && (
                <div>
                  <label className="block text-sm font-medium text-moon-silver mb-2 font-sans">Suit</label>
                  <select
                    value={filterSuit}
                    onChange={(e) => setFilterSuit(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent font-sans"
                  >
                    <option value="all">All Suits</option>
                    {suits.map((suit) => (
                      <option key={suit} value={suit}>{suit}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredCards.map((card) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCard(card)}
                className={`ornate-box rounded-xl p-4 text-left transition-all ${
                  selectedCard?.id === card.id ? 'ring-2 ring-lake-blue' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-moonlight font-cinzel">{card.name}</h3>
                  {card.arcana === 'major' && (
                    <span className="text-xs bg-lake-blue/30 text-lake-blue px-2 py-1 rounded font-sans">Major</span>
                  )}
                  {card.suit && (
                    <span className="text-xs bg-water-teal/30 text-water-teal px-2 py-1 rounded font-sans">{card.suit}</span>
                  )}
                </div>
                <p className="text-moon-silver text-sm font-sans line-clamp-2">{card.meaning}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {card.keywords.slice(0, 3).map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded font-sans">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Card Detail */}
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ornate-box rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-moonlight mb-2 font-cinzel">{selectedCard.name}</h2>
                  <div className="flex gap-2">
                    {selectedCard.arcana === 'major' && (
                      <span className="text-sm bg-lake-blue/30 text-lake-blue px-3 py-1 rounded font-sans">Major Arcana</span>
                    )}
                    {selectedCard.suit && (
                      <span className="text-sm bg-water-teal/30 text-water-teal px-3 py-1 rounded font-sans">{selectedCard.suit}</span>
                    )}
                    {selectedCard.number && (
                      <span className="text-sm bg-white/10 text-white/70 px-3 py-1 rounded font-sans">#{selectedCard.number}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">Upright Meaning</h3>
                  <p className="text-moon-silver leading-relaxed font-sans">{selectedCard.meaning}</p>
                </div>

                {selectedCard.reversed && (
                  <div>
                    <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">Reversed Meaning</h3>
                    <p className="text-moon-silver leading-relaxed font-sans">{selectedCard.reversed}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">Keywords</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedCard.keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-lake-blue/20 text-lake-blue px-3 py-1 rounded-lg font-sans">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  {selectedCard.reversedKeywords && (
                    <>
                      <p className="text-moon-silver text-sm mb-2 font-sans">Reversed Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCard.reversedKeywords.map((keyword, idx) => (
                          <span key={idx} className="bg-red-600/20 text-red-300 px-3 py-1 rounded-lg font-sans">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

