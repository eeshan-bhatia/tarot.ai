'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TarotCard, tarotCards } from '@/data/tarotCards'

interface CardSelectorProps {
  selectedCards: (TarotCard | null)[]
  onCardSelect: (card: TarotCard) => void
  onCardRemove: (position: number) => void
}

export default function CardSelector({ selectedCards, onCardSelect, onCardRemove }: CardSelectorProps) {
  const [availableCards, setAvailableCards] = useState<TarotCard[]>([])

  useEffect(() => {
    // Initialize available cards (shuffled)
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
    setAvailableCards(shuffled)
  }, [])

  // Update available cards when cards are selected/removed
  useEffect(() => {
    const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
    if (validCards.length === 0) {
      // Reset available cards when all are removed
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
      setAvailableCards(shuffled)
    }
  }, [selectedCards])

  const handlePlaceholderClick = () => {
    const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
    if (validCards.length < 3 && availableCards.length > 0) {
      // Randomly pick a card from available cards
      const randomIndex = Math.floor(Math.random() * availableCards.length)
      const baseCard = availableCards[randomIndex]
      
      // Randomly determine if card is reversed (50/50 chance)
      const isReversed = Math.random() < 0.5
      
      // Create card with reversed status
      const selectedCard: TarotCard = {
        ...baseCard,
        isReversed,
      }
      
      // Remove the selected card from available cards
      const newAvailableCards = availableCards.filter((_, index) => index !== randomIndex)
      setAvailableCards(newAvailableCards)
      
      // Call the parent's onCardSelect
      onCardSelect(selectedCard)
    }
  }

  const handleCardRemove = (position: number) => {
    const removedCard = selectedCards[position]
    if (removedCard) {
      // Remove isReversed property when returning card to pool (it will be randomly assigned again)
      const { isReversed, ...baseCard } = removedCard
      // Add the removed card back to available cards (shuffled in)
      const newAvailableCards = [...availableCards, baseCard].sort(() => Math.random() - 0.5)
      setAvailableCards(newAvailableCards)
      onCardRemove(position)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Table Surface - Moonlit Lake */}
      <div className="relative bg-gradient-to-br from-midnight-black/80 via-midnight-deep/70 to-midnight-blue/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-moonlight/20 shadow-2xl">
        {/* Water Ripple Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-moonlight mb-2 font-cinzel">
              Select 3 Cards
            </h2>
            <p className="text-moon-silver">
              {selectedCards.filter((card): card is TarotCard => card !== null).length} of 3 cards selected
            </p>
          </div>

          {/* Selected Cards Spread - Traditional Layout */}
          <div className="mb-12">
            <div className="flex justify-center items-end gap-4 md:gap-8 relative">
              {Array.from({ length: 3 }).map((_, index) => {
                const positions = [
                  { rotate: -15, x: -20, label: 'Past' },
                  { rotate: 0, x: 0, label: 'Present' },
                  { rotate: 15, x: 20, label: 'Future' }
                ]
                const pos = positions[index] || { rotate: 0, x: 0, label: '' }
                const card = selectedCards[index]
                
                return (
                  <motion.div
                    key={`position-${index}-${card?.id ?? 'empty'}`}
                    initial={{ scale: 0, rotate: -180, y: 100 }}
                    animate={{ 
                      scale: 1, 
                      rotate: pos.rotate,
                      y: 0,
                      x: pos.x
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative group"
                  >
                    {/* Card Position Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-moon-silver font-medium whitespace-nowrap">
                      {pos.label}
                    </div>
                    
                    {card ? (
                      /* Selected Card - Traditional Tarot Design with Full-Card Remove */
                      <button
                        onClick={() => handleCardRemove(index)}
                        className="relative aspect-[2/3] w-24 md:w-32 rounded-lg border-2 border-moonlight/40 shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 group/card"
                        style={{
                          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)'
                        }}
                      >
                        {/* Greyed Out Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center rounded-lg">
                          <span className="text-moonlight font-semibold text-sm md:text-base font-cinzel">
                            Remove
                          </span>
                        </div>

                        {/* Ornate Border Pattern */}
                        <div className="absolute inset-0 border-2 border-moonlight/30 group-hover/card:border-moonlight/20 transition-colors" style={{
                            backgroundImage: `
                            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px)
                          `
                        }}></div>
                        
                        {/* Corner Ornaments */}
                        <div className="absolute top-1 left-1 w-2 h-2 border border-moonlight/50 group-hover/card:border-moonlight/30 transition-colors" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                        <div className="absolute top-1 right-1 w-2 h-2 border border-moonlight/50 group-hover/card:border-moonlight/30 transition-colors" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleX(-1)' }}></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 border border-moonlight/50 group-hover/card:border-moonlight/30 transition-colors" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleY(-1)' }}></div>
                        <div className="absolute bottom-1 right-1 w-2 h-2 border border-moonlight/50 group-hover/card:border-moonlight/30 transition-colors" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scale(-1)' }}></div>
                        
                        {/* Central Mystical Symbol - Star Pattern */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center group-hover/card:opacity-50 transition-opacity">
                          {/* Outer Circle */}
                          <div className="absolute w-12 h-12 md:w-16 md:h-16 border border-moonlight/40 rounded-full"></div>
                          {/* Inner Star */}
                          <div className="relative w-8 h-8 md:w-12 md:h-12" style={{
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                          }}></div>
                          {/* Center Dot */}
                          <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-moonlight/60 rounded-full"></div>
                        </div>
                        
                        {/* Decorative Elements - Small Stars */}
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-moonlight/40 group-hover/card:opacity-30 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-moonlight/40 group-hover/card:opacity-30 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-moonlight/40 group-hover/card:opacity-30 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-moonlight/40 group-hover/card:opacity-30 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                      </button>
                    ) : (
                      /* Placeholder Card */
                      <div
                        className="aspect-[2/3] w-24 md:w-32 rounded-lg border-2 border-dashed border-moonlight/20 bg-midnight-deep/20"
                        style={{ transform: `rotate(${pos.rotate}deg) translateX(${pos.x}px)` }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Deck - Fanned Out Placeholder Cards */}
          <div className="relative min-h-[200px] flex items-center justify-center overflow-x-auto pb-4 -mx-4 px-4">
            <div className="relative inline-flex">
              {/* Fanned Card Layout - Single Horizontal Line with Overlap */}
              <div className="relative flex items-center justify-center" style={{ perspective: '1000px' }}>
                <div className="relative flex items-center" style={{ whiteSpace: 'nowrap' }}>
                  <AnimatePresence>
                    {Array.from({ length: 26 }).map((_, index) => {
                      const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
                      const disabled = validCards.length >= 3
                      
                      // Create fan effect - spread all 26 cards in an arc
                      const totalCards = 26
                      const centerIndex = Math.floor(totalCards / 2)
                      const offset = index - centerIndex
                      const maxOffset = centerIndex
                      // More gradual rotation for 26 cards - max 30 degrees
                      const rotation = maxOffset > 0 ? (offset / maxOffset) * 30 : 0
                      const zIndex = totalCards - Math.abs(offset) // Cards in center have higher z-index
                      
                      // Calculate overlap - cards should overlap by about 70% of their width for traditional fan
                      // w-10 = 2.5rem = 40px, w-14 = 3.5rem = 56px
                      const overlapMobile = 28 // ~70% of 40px
                      const overlapDesktop = 39 // ~70% of 56px
                      
                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                          animate={{ 
                            opacity: disabled ? 0.3 : 1,
                            scale: 1,
                            rotate: rotation,
                            y: 0
                          }}
                          whileHover={!disabled ? { 
                            scale: 1.2, 
                            rotate: rotation + 5,
                            zIndex: 1000,
                            y: -15
                          } : {}}
                          whileTap={!disabled ? { scale: 0.95 } : {}}
                          onClick={handlePlaceholderClick}
                          disabled={disabled}
                          className={`
                            relative aspect-[2/3] w-10 md:w-14 rounded-md border-2 transition-all overflow-hidden flex-shrink-0
                            ${index > 0 ? 'md:-ml-[39px]' : ''}
                            ${disabled
                              ? 'border-moonlight/10 cursor-not-allowed'
                              : 'border-moonlight/30 hover:border-moonlight/50 hover:shadow-xl cursor-pointer'
                            }
                          `}
                          style={{
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
                            zIndex: zIndex,
                            transformOrigin: 'center bottom',
                            marginLeft: index === 0 ? 0 : `-${overlapMobile}px`
                          }}
                        >
                          {/* Traditional Tarot Card Back Design - Placeholder */}
                          {/* Ornate Border Pattern */}
                          <div className="absolute inset-0 border border-moonlight/20" style={{
                            backgroundImage: `
                              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px),
                              repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px)
                            `
                          }}></div>
                          
                          {/* Corner Ornaments - Smaller for fanned cards */}
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                          <div className="absolute top-0.5 right-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleX(-1)' }}></div>
                          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleY(-1)' }}></div>
                          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scale(-1)' }}></div>
                          
                          {/* Central Mystical Symbol - Star Pattern */}
                          <div className="relative z-10 h-full flex flex-col items-center justify-center">
                            {/* Outer Circle */}
                            <div className="absolute w-4 h-4 md:w-6 md:h-6 border border-moonlight/30 rounded-full"></div>
                            {/* Inner Star */}
                            <div className="relative w-3 h-3 md:w-5 md:h-5" style={{
                              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
                              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                            }}></div>
                            {/* Center Dot */}
                            <div className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-moonlight/50 rounded-full"></div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

