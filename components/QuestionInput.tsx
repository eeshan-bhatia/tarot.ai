'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QuestionIcon, ReadingIcon } from './Icons'

interface QuestionInputProps {
  onSubmit: (question: string | null) => void
  initialOption?: 'question' | 'general' | null
  initialQuestion?: string
}

export default function QuestionInput({ onSubmit, initialOption = null, initialQuestion = '' }: QuestionInputProps) {
  const [question, setQuestion] = useState(initialQuestion)
  const [selectedOption, setSelectedOption] = useState<'question' | 'general' | null>(initialOption)
  
  // Update question when initialQuestion changes
  useEffect(() => {
    setQuestion(initialQuestion)
  }, [initialQuestion])

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onSubmit(question.trim())
    }
  }

  const handleGeneralReading = () => {
    onSubmit('') // Use empty string to indicate general reading
  }

  if (selectedOption === null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ornate-box rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-moonlight mb-8 text-center font-cinzel">
          Choose Your Reading Type
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ask a Question Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOption('question')}
            className="ornate-box rounded-xl p-6 text-center hover:border-moonlight/30 transition-all"
          >
            <div className="mb-4 flex justify-center">
              <QuestionIcon size={56} className="text-moonlight" />
            </div>
            <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">Ask a Question</h3>
            <p className="text-moon-silver text-sm">
              Ask a specific question about your life, relationships, career, or any area where you seek guidance.
            </p>
          </motion.button>

          {/* General Reading Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGeneralReading}
            className="ornate-box rounded-xl p-6 text-center hover:border-moonlight/30 transition-all"
          >
            <div className="mb-4 flex justify-center">
              <ReadingIcon size={56} className="text-moonlight" />
            </div>
            <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">General Reading</h3>
            <p className="text-moon-silver text-sm">
              Receive a general tarot reading that reveals insights about your current path and what the universe wants you to know.
            </p>
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ornate-box rounded-2xl p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-moonlight font-cinzel">
          What would you like to know?
        </h2>
        <button
          onClick={() => setSelectedOption(null)}
          className="text-moon-silver hover:text-moonlight transition-colors text-sm"
        >
          ← Back
        </button>
      </div>
      <form onSubmit={handleQuestionSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question... (e.g., What should I focus on in my career? How can I improve my relationships?)"
          className="w-full h-32 px-4 py-3 bg-midnight-deep/50 backdrop-blur-sm border border-moonlight/20 rounded-xl text-moonlight placeholder-moon-silver/50 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent resize-none"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-lake-blue via-mystic-purple to-lake-deep text-white text-lg font-semibold rounded-xl hover:from-blue-500 hover:via-indigo-500 hover:to-blue-700 transition-all shadow-lg shadow-lake-blue/30"
        >
          Continue to Card Selection
        </motion.button>
      </form>
    </motion.div>
  )
}

