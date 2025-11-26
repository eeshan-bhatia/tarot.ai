'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TarotCard } from '@/data/tarotCards'

interface ReadingDisplayProps {
  question: string | null
  selectedCards: TarotCard[]
  reading: string
  onReset: () => void
}

interface ReadingSection {
  label: string
  text: string
  quote?: string
  showCard: boolean
  cardIndex?: number
}

export default function ReadingDisplay({ question, selectedCards, reading, onReset }: ReadingDisplayProps) {
  // Track which cards are revealed (showing card image)
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())
  // Track which cards are flipped (showing back design)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const handleCardClick = (cardId: number, cardIndex: number) => {
    // If card is not revealed, reveal it
    if (!revealedCards.has(cardId)) {
      setRevealedCards(prev => new Set(prev).add(cardId))
    } else {
      // If card is already revealed, toggle flip
      setFlippedCards(prev => {
        const newSet = new Set(prev)
        if (newSet.has(cardId)) {
          newSet.delete(cardId)
        } else {
          newSet.add(cardId)
        }
        return newSet
      })
    }
  }

  // Check if all cards are revealed
  const allCardsRevealed = selectedCards.length === 3 && selectedCards.every((card, index) => revealedCards.has(card.id))

  // Split reading into paragraphs and assign labels
  const splitReading = (): ReadingSection[] => {
    // Split by double newlines first, then by single newlines if needed
    let paragraphs = reading.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    
    // If we don't have enough paragraphs, try splitting by single newlines
    if (paragraphs.length < 4) {
      const singleNewlineSplit = reading.split(/\n/).filter(p => p.trim().length > 0)
      if (singleNewlineSplit.length >= 4) {
        paragraphs = singleNewlineSplit
      }
    }
    
    // If we still don't have 4 paragraphs, return the original reading as a single section
    if (paragraphs.length < 4) {
      return [
        { label: 'Reading', text: reading, showCard: false }
      ]
    }
    
    // For conclusion, check if there's a 5th paragraph (the quote)
    // The quote should be in a separate paragraph after the conclusion
    let conclusionText = paragraphs[3]?.trim() || ''
    const quoteText = paragraphs.length >= 5 ? paragraphs[4]?.trim() || '' : ''
    
    // Check if the quote paragraph is actually a quote (contains quotation marks or is short and meaningful)
    let finalQuote = ''
    if (quoteText) {
      // If it's wrapped in quotes or starts/ends with quotes, extract it
      const quoteMatch = quoteText.match(/"([^"]+)"/)
      if (quoteMatch) {
        finalQuote = quoteMatch[1]
      } else if (quoteText.length < 200 && (quoteText.startsWith('"') || quoteText.includes('"'))) {
        // Likely a quote even if not perfectly formatted
        finalQuote = quoteText.replace(/^["']|["']$/g, '').trim()
      } else if (quoteText.length < 150) {
        // Short paragraph might be a quote
        finalQuote = quoteText.replace(/^["']|["']$/g, '').trim()
      }
    }
    
    // If no separate quote paragraph found, check if conclusion ends with a quoted section
    if (!finalQuote && conclusionText.includes('"')) {
      const quoteMatch = conclusionText.match(/"([^"]+)"/g)
      if (quoteMatch && quoteMatch.length > 0) {
        const lastQuote = quoteMatch[quoteMatch.length - 1]
        const quoteIndex = conclusionText.lastIndexOf(lastQuote)
        // If quote is in the last 40% of the text, treat it as separate
        if (quoteIndex > conclusionText.length * 0.6) {
          finalQuote = lastQuote.replace(/"/g, '').trim()
          // Remove the quote from conclusion text
          conclusionText = conclusionText.substring(0, quoteIndex).trim()
        }
      }
    }
    
    return [
      { label: 'Past', text: paragraphs[0]?.trim() || '', showCard: true, cardIndex: 0 },
      { label: 'Present', text: paragraphs[1]?.trim() || '', showCard: true, cardIndex: 1 },
      { label: 'Future', text: paragraphs[2]?.trim() || '', showCard: true, cardIndex: 2 },
      { label: 'Summary', text: conclusionText, quote: finalQuote || undefined, showCard: false },
    ]
  }

  const readingSections = splitReading()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="ornate-box rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-moonlight mb-6 text-center font-cinzel">
          Your Reading
        </h2>

        {question && question.trim() !== '' ? (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-moon-silver mb-2 font-cinzel">Your Question</h3>
            <p className="text-moonlight text-lg italic bg-midnight-deep/50 rounded-lg p-4 border border-moonlight/10">"{question}"</p>
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-moon-silver mb-2 font-cinzel">Reading Type</h3>
            <p className="text-moonlight text-lg italic bg-midnight-deep/50 rounded-lg p-4 border border-moonlight/10">General Reading</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-moon-silver mb-8 font-cinzel text-center">
            {allCardsRevealed ? 'Selected Cards' : 'Click a Card to Reveal it'}
          </h3>
          {/* Selected Cards Spread - Traditional Layout */}
          <div className="mb-12">
            <div className="flex justify-center items-end gap-4 md:gap-8 relative">
              {selectedCards.map((card, index) => {
                const positions = [
                  { rotate: -15, x: -20, y: 0, label: 'Past' },
                  { rotate: 0, x: 0, y: -15, label: 'Present' },
                  { rotate: 15, x: 20, y: 0, label: 'Future' }
                ]
                const pos = positions[index] || { rotate: 0, x: 0, y: 0, label: '' }
                
                return (
              <motion.div
                key={card.id}
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
                      damping: 15,
                      delay: index * 0.1
                    }}
                    className="relative group"
                  >
                    {/* Card Position Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm md:text-base text-moon-silver font-bold font-cinzel whitespace-nowrap">
                      {pos.label}
                    </div>
                    
                    {/* Flip Card Container */}
                    <div 
                      className="relative aspect-[2/3] w-24 md:w-32 cursor-pointer group"
                      style={{ 
                        perspective: '1000px',
                        filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 75px rgba(255, 255, 255, 0.4))'
                      }}
                      onClick={() => handleCardClick(card.id, index)}
                    >
                      <div
                        className="relative w-full h-full transition-transform duration-700"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: !revealedCards.has(card.id) 
                            ? 'rotateY(180deg)' // Show placeholder (back face) when not revealed
                            : flippedCards.has(card.id) 
                              ? 'rotateY(180deg)' // Show description (back face) when flipped
                              : 'rotateY(0deg)' // Show card image (front face) when revealed
                        }}
                      >
                        {/* Front Face - Card Image */}
                        <div className="absolute inset-0 w-full h-full rounded-lg shadow-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                          {card.imageUrl ? (
                            <img
                              src={card.imageUrl}
                              alt={card.name}
                              className={`w-full h-full object-cover ${card.isReversed ? 'transform rotate-180' : ''}`}
                              onLoad={() => {
                                // Image loaded successfully
                              }}
                              onError={(e) => {
                                // Silently handle image errors
                                e.currentTarget.style.display = 'none'
                                const parent = e.currentTarget.parentElement
                                if (parent && !parent.querySelector('.image-error')) {
                                  const errorDiv = document.createElement('div')
                                  errorDiv.className = 'image-error absolute inset-0 flex items-center justify-center bg-midnight-deep/80 text-moon-silver text-xs text-center p-2'
                                  errorDiv.textContent = 'Image unavailable'
                                  parent.appendChild(errorDiv)
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-midnight-deep/50 flex items-center justify-center">
                              <span className="text-moon-silver text-xs text-center p-2">No image</span>
                            </div>
                          )}
                          
                          {/* Ornate Border Pattern */}
                          <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: `
                              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px)
                            `
                          }}></div>
                          
                          {/* Corner Ornaments */}
                          <div className="absolute top-1 left-1 w-2 h-2 border border-moonlight/50 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                          <div className="absolute top-1 right-1 w-2 h-2 border border-moonlight/50 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleX(-1)' }}></div>
                          <div className="absolute bottom-1 left-1 w-2 h-2 border border-moonlight/50 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scaleY(-1)' }}></div>
                          <div className="absolute bottom-1 right-1 w-2 h-2 border border-moonlight/50 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'scale(-1)' }}></div>
                          
                          {/* Card Name on Hover */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center rounded-lg">
                            <div className="text-moonlight font-semibold text-sm md:text-base font-cinzel text-center px-2 mb-1">
                              {card.name}
                            </div>
                            {card.isReversed && (
                              <span className="bg-red-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-red-400">
                                REVERSED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Back Face - Placeholder when not revealed, Description only when explicitly flipped */}
                        <div 
                          className="absolute inset-0 w-full h-full rounded-lg shadow-2xl overflow-hidden" 
                          style={{ 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)'
                          }}
                        >
                          {!revealedCards.has(card.id) || !flippedCards.has(card.id) ? (
                            /* Placeholder Back - Shown when card is not revealed OR when revealed but not flipped */
                            <>
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
                            </>
                          ) : (
                            /* Description - Shown ONLY when card is both revealed AND flipped */
                            <>
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
                              
                              {/* Card Information Text on Hover */}
                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center p-2 md:p-3 rounded-lg overflow-y-auto">
                                {/* Card Name */}
                                <div className="text-moonlight font-semibold text-xs md:text-sm font-cinzel text-center mb-2 leading-tight">
                                  {card.name}
                                </div>
                                
                                {/* Reversed Badge */}
                                {card.isReversed && (
                                  <span className="bg-red-600/80 text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded border border-red-400 mb-2">
                                    REVERSED
                                  </span>
                                )}
                                
                                {/* Meaning - Always show first 3 keywords */}
                                <div className="text-moon-silver/80 text-[8px] md:text-[9px] italic text-center leading-tight px-1">
                                  {(() => {
                                    const keywords = card.isReversed && card.reversedKeywords 
                                      ? card.reversedKeywords 
                                      : card.keywords;
                                    const threeKeywords = keywords.slice(0, 3);
                                    return threeKeywords.join(', ');
                                  })()}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                </div>
              </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-moon-silver mb-4 font-cinzel">Your Reading</h3>
          <div className="space-y-6">
            {readingSections.map((section, index) => {
              // Check if this section should be visible
              let isVisible = false
              if (section.label === 'Summary') {
                isVisible = allCardsRevealed
              } else if (section.showCard && section.cardIndex !== undefined) {
                const card = selectedCards[section.cardIndex]
                isVisible = card ? revealedCards.has(card.id) : false
              } else {
                isVisible = true
              }

              if (!isVisible) {
                return null
              }

              return (
          <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
            className="bg-midnight-deep/50 rounded-xl p-6 border border-moonlight/10"
          >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="px-3 py-1 bg-gradient-to-r from-lake-blue/30 via-mystic-purple/30 to-lake-deep/30 rounded-lg border border-moonlight/20">
                      <span className="text-moonlight font-semibold text-sm font-cinzel">{section.label}</span>
                    </div>
                    {section.showCard && section.cardIndex !== undefined && selectedCards[section.cardIndex] && (
                      <div className="flex items-center gap-2">
                        <span className="text-moonlight font-semibold text-xl md:text-2xl font-cinzel">
                          {selectedCards[section.cardIndex].name}
                        </span>
                        {selectedCards[section.cardIndex].isReversed && (
                          <span className="bg-red-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-red-400">
                            REVERSED
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-moonlight leading-relaxed">
                    {section.text}
                    {section.quote && (
                      <div className="mt-4 pt-4 border-t border-moonlight/20">
                        <p className="text-moonlight/90 italic text-center text-lg leading-relaxed">
                          "{section.quote}"
                        </p>
                      </div>
                    )}
            </div>
          </motion.div>
              )
            })}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="w-full px-6 py-4 bg-gradient-to-r from-lake-blue via-mystic-purple to-lake-deep text-white text-lg font-semibold rounded-xl hover:from-blue-500 hover:via-indigo-500 hover:to-blue-700 transition-all shadow-lg shadow-lake-blue/30"
        >
          Ask Another Question
        </motion.button>
      </div>
    </motion.div>
  )
}

