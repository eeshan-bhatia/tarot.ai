'use client'

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
      { label: 'Conclusion', text: conclusionText, quote: finalQuote || undefined, showCard: false },
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
          <h3 className="text-xl font-semibold text-moon-silver mb-4 font-cinzel">Selected Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-lake-blue/20 via-mystic-purple/20 to-lake-deep/20 rounded-xl p-4 border border-moonlight/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-moonlight font-semibold text-lg">{card.name}</div>
                  {card.isReversed && (
                    <span className="bg-red-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-red-400">
                      REVERSED
                    </span>
                  )}
                </div>
                <div className="text-moon-silver text-sm mb-2">
                  {(card.isReversed ? card.reversedKeywords : card.keywords).join(', ')}
                </div>
                <div className="text-moon-silver/80 text-xs italic">
                  {card.isReversed ? card.reversed : card.meaning}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-moon-silver mb-4 font-cinzel">Your Reading</h3>
          <div className="space-y-6">
            {readingSections.map((section, index) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-midnight-deep/50 rounded-xl p-6 border border-moonlight/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 bg-gradient-to-r from-lake-blue/30 via-mystic-purple/30 to-lake-deep/30 rounded-lg border border-moonlight/20">
                    <span className="text-moonlight font-semibold text-sm font-cinzel">{section.label}</span>
                  </div>
                  {section.showCard && section.cardIndex !== undefined && selectedCards[section.cardIndex] && (
                    <span className="text-moon-silver text-sm italic">
                      {selectedCards[section.cardIndex].name}
                      {selectedCards[section.cardIndex].isReversed && ' (Reversed)'}
                    </span>
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
            ))}
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

