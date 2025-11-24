'use client'

import { motion } from 'framer-motion'
import { TarotCard } from '@/data/tarotCards'

interface ReadingDisplayProps {
  question: string | null
  selectedCards: TarotCard[]
  reading: string
  onReset: () => void
}

export default function ReadingDisplay({ question, selectedCards, reading, onReset }: ReadingDisplayProps) {
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
                <div className="text-moonlight font-semibold text-lg mb-2">{card.name}</div>
                <div className="text-moon-silver text-sm mb-2">
                  {card.keywords.join(', ')}
                </div>
                <div className="text-moon-silver/80 text-xs italic">{card.meaning}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-moon-silver mb-4 font-cinzel">Your Reading</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-midnight-deep/50 rounded-xl p-6 border border-moonlight/10"
          >
            <div className="text-moonlight whitespace-pre-wrap leading-relaxed">
              {reading}
            </div>
          </motion.div>
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

