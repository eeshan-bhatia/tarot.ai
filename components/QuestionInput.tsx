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
        transition={{ duration: 0.6 }}
        className="ornate-box rounded-2xl p-8 shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-moonlight mb-8 text-center font-cinzel"
        >
          Choose Your Reading Type
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ask a Question Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOption('question')}
            className="ornate-box rounded-xl p-6 text-center hover:border-moonlight/30 transition-all font-sans"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 flex justify-center"
            >
              <QuestionIcon size={56} className="text-moonlight" />
            </motion.div>
            <h3 className="text-xl font-semibold text-moonlight mb-3 font-cinzel">Ask a Question</h3>
            <p className="text-moon-silver text-sm">
              Ask a specific question about your life, relationships, career, or any area where you seek guidance.
            </p>
          </motion.button>

          {/* General Reading Option */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGeneralReading}
            className="ornate-box rounded-xl p-6 text-center hover:border-moonlight/30 transition-all font-sans"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 flex justify-center"
            >
              <ReadingIcon size={56} className="text-moonlight" />
            </motion.div>
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
      transition={{ duration: 0.6 }}
      className="ornate-box rounded-2xl p-8 shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-3xl font-bold text-moonlight font-cinzel">
          What would you like to know?
        </h2>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => setSelectedOption(null)}
          className="text-moon-silver hover:text-moonlight transition-colors text-sm font-sans"
        >
          ← Back
        </motion.button>
      </motion.div>
      <form onSubmit={handleQuestionSubmit} className="space-y-4">
        <motion.textarea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question... (e.g., What should I focus on in my career? How can I improve my relationships?)"
          className="w-full h-32 px-4 py-3 bg-midnight-deep/50 backdrop-blur-sm border border-moonlight/20 rounded-xl text-moonlight placeholder-moon-silver/50 focus:outline-none focus:ring-2 focus:ring-lake-blue focus:border-transparent resize-none"
        />
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all backdrop-blur-sm font-sans"
        >
          Continue to Card Selection
        </motion.button>
      </form>
    </motion.div>
  )
}

