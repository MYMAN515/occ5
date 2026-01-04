'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type Item = {
  id: string
  text: string
  stage: 'before' | 'after'
}

type TimelineContent = {
  header: { title: string; subtitle: string }
  stats: { score: string; attempts: string; accuracy: string }
  complete: { title: string; message: string; playAgain: string }
  instructions: { selectFirst: string; chooseStage: string }
  stages: { before: string; after: string }
  items: Item[]
}

export default function TimelinePage() {
  const { t } = useLanguage()
  const content = t('timelinePage') as TimelineContent

  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [matchedItems, setMatchedItems] = useState<string[]>([])
  const items = content.items

  const [shuffledItems, setShuffledItems] = useState<Item[]>([])

  useEffect(() => {
    setShuffledItems([...items].sort(() => Math.random() - 0.5))
  }, [items])

  const handleItemClick = (item: Item) => {
    if (matchedItems.includes(item.id)) return
    setSelectedItem(item)
  }

  const handleStageClick = (stage: 'before' | 'after') => {
    if (!selectedItem) return

    setAttempts(attempts + 1)

    if (selectedItem.stage === stage) {
      setScore(score + 1)
      setMatchedItems([...matchedItems, selectedItem.id])
      
      if (matchedItems.length + 1 === items.length) {
        setGameComplete(true)
      }
    }
    
    setSelectedItem(null)
  }

  const resetGame = () => {
    setScore(0)
    setAttempts(0)
    setMatchedItems([])
    setGameComplete(false)
    setSelectedItem(null)
    setShuffledItems([...items].sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    resetGame()
  }, [items])

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {content.header.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto text-balance">
          {content.header.subtitle}
        </p>
      </motion.div>

      {/* Score Board */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-around items-center text-center gap-4">
          <div className="w-full sm:w-auto">
            <p className="text-gray-600 font-medium mb-1">{content.stats.score}</p>
            <p className="text-3xl font-bold text-primary-600">{score}/{items.length}</p>
          </div>
          <div className="h-px w-full bg-gray-200 sm:h-12 sm:w-px sm:bg-gray-300"></div>
          <div className="w-full sm:w-auto">
            <p className="text-gray-600 font-medium mb-1">{content.stats.attempts}</p>
            <p className="text-3xl font-bold text-secondary-600">{attempts}</p>
          </div>
          <div className="h-px w-full bg-gray-200 sm:h-12 sm:w-px sm:bg-gray-300"></div>
          <div className="w-full sm:w-auto">
            <p className="text-gray-600 font-medium mb-1">{content.stats.accuracy}</p>
            <p className="text-3xl font-bold text-green-600">
              {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Game Complete */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-effect rounded-3xl p-8 mb-8 max-w-2xl mx-auto text-center"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{content.complete.title}</h2>
            <p className="text-xl text-gray-700 mb-6">
              {content.complete.message
                .replace('{score}', score.toString())
                .replace('{attempts}', attempts.toString())}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              {content.complete.playAgain}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!gameComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-700 max-w-2xl mx-auto glass-effect rounded-2xl p-4 text-balance">
            {selectedItem ? content.instructions.chooseStage : content.instructions.selectFirst}
          </p>
        </motion.div>
      )}

      {/* Stage Buttons */}
      {!gameComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-2xl mx-auto px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStageClick('before')}
            disabled={!selectedItem}
            className={`flex-1 py-6 rounded-2xl font-bold text-xl transition-all w-full ${
              selectedItem
                ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {content.stages.before}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStageClick('after')}
            disabled={!selectedItem}
            className={`flex-1 py-6 rounded-2xl font-bold text-xl transition-all w-full ${
              selectedItem
                ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {content.stages.after}
          </motion.button>
        </motion.div>
      )}

      {/* Items Grid */}
      {!gameComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {shuffledItems.map((item, index) => {
            const isMatched = matchedItems.includes(item.id)
            const isSelected = selectedItem?.id === item.id

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: isSelected ? 1.1 : isMatched ? 0.95 : 1,
                  rotate: isSelected ? [0, -5, 5, -5, 0] : 0,
                  boxShadow: isSelected 
                    ? '0 0 0 4px rgba(59, 130, 246, 0.5), 0 10px 25px rgba(59, 130, 246, 0.3)' 
                    : isMatched 
                    ? '0 0 0 2px rgba(34, 197, 94, 0.5)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ 
                  delay: index * 0.05,
                  rotate: { duration: 0.5 },
                  scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileHover={!isMatched && !isSelected ? { scale: 1.05, y: -5 } : {}}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleItemClick(item)}
                disabled={isMatched}
                className={`p-6 rounded-2xl font-medium text-lg transition-all relative overflow-hidden ${
                  isMatched
                    ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-400'
                    : isSelected
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white border-4 border-blue-300'
                    : 'glass-effect text-gray-700 hover:border-2 hover:border-blue-300'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-blue-400/20 rounded-2xl"
                  />
                )}
                {isMatched && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="inline-block mr-2"
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                )}
                <span className="relative z-10">{item.text}</span>
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Reset Button */}
      {!gameComplete && attempts > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto border-2 border-gray-300 hover:border-gray-400 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
