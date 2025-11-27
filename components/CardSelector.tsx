'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TarotCard, tarotCardsWithImages } from '@/data/tarotCards'

interface CardSelectorProps {
  selectedCards: (TarotCard | null)[]
  onCardSelect: (card: TarotCard) => void
  onCardRemove: (position: number) => void
  canRemoveCards?: boolean
}

export default function CardSelector({ selectedCards, onCardSelect, onCardRemove, canRemoveCards = true }: CardSelectorProps) {
  const [availableCards, setAvailableCards] = useState<TarotCard[]>([])
  const [displayCards, setDisplayCards] = useState<TarotCard[]>([]) // 26 cards to display

  useEffect(() => {
    // Initialize available cards (shuffled)
    const shuffled = [...tarotCardsWithImages].sort(() => Math.random() - 0.5)
    setAvailableCards(shuffled)
    // Pick 26 random cards to display
    const display = shuffled.slice(0, 26)
    setDisplayCards(display)
  }, [])

  // Update available cards when cards are selected/removed
  useEffect(() => {
    const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
    if (validCards.length === 0) {
      // Reset available cards when all are removed
      const shuffled = [...tarotCardsWithImages].sort(() => Math.random() - 0.5)
      setAvailableCards(shuffled)
      // Reset display cards
      const display = shuffled.slice(0, 26)
      setDisplayCards(display)
    }
  }, [selectedCards])

  const handlePlaceholderClick = (card: TarotCard) => {
    const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
    const selectedCardIds = new Set(validCards.map(c => c.id))
    
    // Check if this card is already selected
    if (selectedCardIds.has(card.id)) {
      return // Don't allow selecting an already selected card
    }
    
    if (validCards.length < 3) {
      // Randomly determine if card is reversed (50/50 chance)
      const isReversed = Math.random() < 0.5
      
      // Create card with reversed status
      const selectedCard: TarotCard = {
        ...card,
        isReversed,
      }
      
      // Call the parent's onCardSelect
      onCardSelect(selectedCard)
    }
  }

  const handleCardRemove = (position: number) => {
    // Only allow removal if canRemoveCards is true
    if (!canRemoveCards) return
    const removedCard = selectedCards[position]
    if (removedCard) {
      // Card is removed, it will be re-enabled in the display
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
                  { rotate: -15, x: -20, y: 0, label: 'Past' },
                  { rotate: 0, x: 0, y: -15, label: 'Present' },
                  { rotate: 15, x: 20, y: 0, label: 'Future' }
                  ]
                const pos = positions[index] || { rotate: 0, x: 0, y: 0, label: '' }
                const card = selectedCards[index]
                  
                  return (
                    <motion.div
                    key={`position-${index}-${card?.id ?? 'empty'}`}
                      initial={{ scale: 0, rotate: -180, y: 100 }}
                      animate={{ 
                        scale: 1, 
                        rotate: pos.rotate,
                      y: pos.y,
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
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm md:text-base text-moon-silver font-bold font-cinzel whitespace-nowrap">
                        {pos.label}
                      </div>
                      
                    {card ? (
                      /* Selected Card - Traditional Tarot Design with Full-Card Remove */
                      <button
                        onClick={() => handleCardRemove(index)}
                        disabled={!canRemoveCards}
                        className={`relative aspect-[2/3] w-24 md:w-32 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 group/card ${
                          canRemoveCards ? 'cursor-pointer' : 'cursor-default'
                        }`}
                        style={{
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)'
                        }}
                      >
                        {/* Greyed Out Overlay on Hover - Only show if cards can be removed */}
                        {canRemoveCards && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center rounded-lg">
                            <span className="text-moonlight font-semibold text-sm md:text-base font-sans">
                              Remove
                            </span>
                          </div>
                        )}

                        {/* Ornate Border Pattern */}
                        <div className="absolute inset-0 border border-moonlight/20" style={{
                            backgroundImage: `
                            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px),
                            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px)
                          `
                        }}></div>
                        
                        {/* Corner Ornaments */}
                        <div className="absolute top-1 left-1 w-2 h-2 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                        <div className="absolute top-1 right-1 w-2 h-2 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleX(-1)' }}></div>
                        <div className="absolute bottom-1 left-1 w-2 h-2 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleY(-1)' }}></div>
                        <div className="absolute bottom-1 right-1 w-2 h-2 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scale(-1)' }}></div>
                        
                        {/* Central Mystical Symbol - Star Pattern */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center">
                          {/* Outer Circle */}
                          <div className="absolute w-12 h-12 md:w-16 md:h-16 border border-moonlight/30 rounded-full"></div>
                          {/* Inner Star */}
                          <div className="relative w-8 h-8 md:w-12 md:h-12" style={{
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                          }}></div>
                          {/* Center Dot */}
                          <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-moonlight/50 rounded-full"></div>
                        </div>
                        </button>
                    ) : (
                      /* Placeholder Card - Simple dotted design */
                      <div
                        className="aspect-[2/3] w-24 md:w-32 rounded-lg border-2 border-dashed border-moonlight/20 bg-midnight-deep/20"
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
                    {(() => {
                      // Memoize expensive calculations
                      const validCards = selectedCards.filter((card): card is TarotCard => card !== null)
                      const selectedCardIds = new Set(validCards.map(c => c.id))
                      const totalCards = 26
                      const centerIndex = Math.floor(totalCards / 2)
                      const overlapMobile = 28 // ~70% of 40px
                      
                      // Pre-calculate positions for all cards
                      const cardPositions = displayCards.map((_, index) => {
                      const offset = index - centerIndex
                      const maxOffset = centerIndex
                      const rotation = maxOffset > 0 ? (offset / maxOffset) * 30 : 0
                        const zIndex = totalCards - Math.abs(offset)
                        const distanceFromCenter = Math.abs(offset)
                        const delay = distanceFromCenter * 0.04
                        return { rotation, zIndex, delay, offset }
                      })
                      
                      return displayCards.map((card, index) => {
                        const isCardSelected = selectedCardIds.has(card.id)
                        const disabled = validCards.length >= 3 || isCardSelected
                        const { rotation, zIndex, delay } = cardPositions[index]
                      
                      return (
                        <motion.button
                          key={card.id}
                            initial={{ 
                              opacity: 0, 
                              scale: 0.8, 
                              rotate: 0,
                              x: 0,
                              y: 20
                            }}
                          animate={{ 
                            opacity: disabled ? 0.3 : 1,
                              scale: 1,
                              rotate: rotation,
                              x: 0,
                              y: 0
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                              delay: delay // Stagger from center outward
                          }}
                            whileHover={!disabled ? { 
                            scale: 1.2, 
                            rotate: rotation + 5,
                            zIndex: 1000,
                            y: -15
                          } : {}}
                          whileTap={!disabled ? { scale: 0.95 } : {}}
                            onClick={() => handlePlaceholderClick(card)}
                          disabled={disabled}
                          className={`
                              relative aspect-[2/3] w-10 md:w-14 rounded-md transition-all overflow-hidden flex-shrink-0 font-sans
                            ${index > 0 ? 'md:-ml-[39px]' : ''}
                              ${disabled
                                ? 'cursor-not-allowed'
                                : 'hover:shadow-xl cursor-pointer'
                            }
                          `}
                          style={{
                              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
                              zIndex: zIndex,
                            transformOrigin: 'center bottom',
                            marginLeft: index === 0 ? 0 : `-${overlapMobile}px`
                          }}
                        >
                          {/* Traditional Tarot Card Back Design - Placeholder - Type 3 design, scaled for smaller cards */}
                          {/* Ornate Border Pattern */}
                          <div className="absolute inset-0 border border-moonlight/20" style={{
                            backgroundImage: `
                              repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px),
                              repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255, 255, 255, 0.06) 1px, rgba(255, 255, 255, 0.06) 2px)
                            `
                          }}></div>
                          
                          {/* Corner Ornaments - Scaled proportionally for smaller cards */}
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                          <div className="absolute top-0.5 right-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleX(-1)' }}></div>
                          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleY(-1)' }}></div>
                          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border border-moonlight/40" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scale(-1)' }}></div>
                          
                          {/* Central Mystical Symbol - Star Pattern - Scaled proportionally for smaller cards */}
                          <div className="relative z-10 h-full flex flex-col items-center justify-center">
                            {/* Outer Circle - Scaled: w-12->w-4, w-16->w-6 */}
                            <div className="absolute w-4 h-4 md:w-6 md:h-6 border border-moonlight/30 rounded-full"></div>
                            {/* Inner Star - Scaled: w-8->w-3, w-12->w-5 */}
                            <div className="relative w-3 h-3 md:w-5 md:h-5" style={{
                              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
                              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                            }}></div>
                            {/* Center Dot - Scaled proportionally: w-1.5->w-0.5, w-2->w-0.75 (using w-0.5 md:w-1) */}
                            <div className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-moonlight/50 rounded-full"></div>
                          </div>
                        </motion.button>
                      )
                      })
                    })()}
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

