'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { DragEvent as ReactDragEvent } from 'react'
import { CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react'
import { safeLocalStorage } from '@/utils/storage'
import { useLanguage } from '@/contexts/LanguageContext'

type RoutineItem = {
  id: string
  name: string
  icon: string
  category: 'morning' | 'afternoon' | 'evening'
}

type HygieneItem = {
  id: string
  name: string
  icon: string
  category: 'shower' | 'oral' | 'hands' | 'general'
}

type GameCategory = {
  id: string
  name: string
  color: string
  icon: string
}

export default function HygienePage() {
  const { t } = useLanguage()
  const hygiene = t<any>('hygienePage')
  const [activeTab, setActiveTab] = useState<'builder' | 'game'>('builder')
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([])
  const [quickAddTime, setQuickAddTime] = useState<'morning' | 'afternoon' | 'evening'>('morning')
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [gameItems, setGameItems] = useState<HygieneItem[]>([])
  const [gameAnswers, setGameAnswers] = useState<{ [key: string]: string }>({})
  const [gameSubmitted, setGameSubmitted] = useState(false)

  const availableRoutineItems: RoutineItem[] = hygiene?.builderItems || []

  const hygieneGameItems: HygieneItem[] = hygiene?.game?.items || []

  const gameCategories: GameCategory[] = hygiene?.game?.categories || []

  // Load saved routine
  useEffect(() => {
    const saved = safeLocalStorage.getItem('hygiene-routine')
    if (saved) {
      try {
        setRoutineItems(JSON.parse(saved))
      } catch (error) {
        console.warn('Unable to parse saved routine', error)
      }
    }
  }, [])

  // Save routine
  useEffect(() => {
    if (routineItems.length > 0) {
      safeLocalStorage.setItem('hygiene-routine', JSON.stringify(routineItems))
    }
  }, [routineItems])

  // Initialize game items
  useEffect(() => {
    if (gameItems.length === 0) {
      setGameItems([...hygieneGameItems].sort(() => Math.random() - 0.5))
    }
  }, [])

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDrop = (category: 'morning' | 'afternoon' | 'evening') => {
    if (!draggedItem) return

    const item = availableRoutineItems.find(i => i.id === draggedItem)
    if (item && !routineItems.find(r => r.id === item.id)) {
      setRoutineItems([...routineItems, { ...item, category }])
    }
    setDraggedItem(null)
  }

  const handleQuickAdd = (itemId: string) => {
    const item = availableRoutineItems.find(i => i.id === itemId)
    if (item && !routineItems.find(r => r.id === item.id)) {
      setRoutineItems([...routineItems, { ...item, category: quickAddTime }])
    }
  }

  const removeRoutineItem = (id: string) => {
    setRoutineItems(routineItems.filter(item => item.id !== id))
  }

  const handleGameDrop = (itemId: string, category: string) => {
    if (gameSubmitted) return
    setGameAnswers({ ...gameAnswers, [itemId]: category })
  }

  const handleGameSubmit = () => {
    setGameSubmitted(true)
  }

  const getGameScore = () => {
    let correct = 0
    hygieneGameItems.forEach(item => {
      if (gameAnswers[item.id] === item.category) {
        correct++
      }
    })
    return { correct, total: hygieneGameItems.length }
  }

  const resetGame = () => {
    setGameItems([...hygieneGameItems].sort(() => Math.random() - 0.5))
    setGameAnswers({})
    setGameSubmitted(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {hygiene?.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {hygiene?.subtitle}
        </p>
      </motion.div>

      {/* Tab Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="glass-effect rounded-full p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'builder'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {hygiene?.tabs?.builder}
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {hygiene?.tabs?.game}
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'builder' ? (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Available Items */}
            <div className="glass-effect rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{hygiene?.availableActivities}</h3>
              <p className="text-gray-600 mb-4">{hygiene?.dragHelp}</p>
              <div className="flex flex-wrap gap-2 mb-4 items-center text-sm">
                <span className="font-semibold text-gray-700">{hygiene?.tapTarget}</span>
                {(['morning', 'afternoon', 'evening'] as const).map((time) => (
                  <button
                    key={time}
                    onClick={() => setQuickAddTime(time)}
                    className={`px-3 py-1 rounded-full border ${
                      quickAddTime === time
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-transparent shadow'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {time === 'morning'
                      ? hygiene?.routines?.morning
                      : time === 'afternoon'
                        ? hygiene?.routines?.afternoon
                        : hygiene?.routines?.evening}
                  </button>
                ))}
                <span className="text-gray-500">{hygiene?.tapHint}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {availableRoutineItems
                  .filter(item => !routineItems.find(r => r.id === item.id))
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item.id)}
                      onClick={() => handleQuickAdd(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 text-center cursor-grab active:cursor-grabbing"
                    >
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Routine Builder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['morning', 'afternoon', 'evening'] as const).map((time) => (
                <motion.div
                  key={time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onDrop={(e) => {
                    e.preventDefault()
                    handleDrop(time)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="glass-effect rounded-3xl p-6 min-h-[300px]"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-800 capitalize flex items-center gap-2">
                    <span className="text-2xl">
                      {time === 'morning' ? '🌅' : time === 'afternoon' ? '☀️' : '🌙'}
                    </span>
                    {hygiene?.routines?.title?.replace('{time}', time === 'morning' ? hygiene?.routines?.morning : time === 'afternoon' ? hygiene?.routines?.afternoon : hygiene?.routines?.evening)}
                  </h3>
                  <div className="space-y-3">
                    {routineItems
                      .filter(item => item.category === time)
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-medium text-gray-700">{item.name}</span>
                          </div>
                          <button
                            onClick={() => removeRoutineItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    {routineItems.filter(item => item.category === time).length === 0 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
                        {hygiene?.routines?.empty}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {routineItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-6 bg-gradient-to-r from-green-50 to-blue-50"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                  {hygiene?.routines?.saved?.title}
                </h3>
                <p className="text-gray-600">
                  {hygiene?.routines?.saved?.description?.replace('{count}', routineItems.length.toString())}
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{hygiene?.game?.title}</h3>
              <p className="text-gray-600 mb-6">
                {hygiene?.game?.description}
              </p>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {gameCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    onDrop={(e: ReactDragEvent<HTMLDivElement>) => {
                      e.preventDefault()
                      const itemId = e.dataTransfer.getData('text/plain')
                      if (itemId) {
                        handleGameDrop(itemId, category.id)
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 min-h-[200px] text-white`}
                  >
                    <div className="text-4xl mb-3 text-center">{category.icon}</div>
                    <h4 className="font-bold text-lg text-center mb-4">{category.name}</h4>
                    <div className="space-y-2">
                      {hygieneGameItems
                        .filter(item => gameAnswers[item.id] === category.id)
                        .map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/20 backdrop-blur rounded-lg p-2 text-center"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <p className="text-xs font-medium">{item.name}</p>
                            {gameSubmitted && (
                              <div className="mt-1">
                                {item.category === category.id ? (
                                  <CheckCircle className="w-4 h-4 text-green-300 mx-auto" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-300 mx-auto" />
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Items to Drag */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-4 text-gray-800">{hygiene?.game?.dragPrompt}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {hygieneGameItems
                    .filter(item => !gameAnswers[item.id])
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        draggable={!gameSubmitted}
                        onDragStartCapture={(e: ReactDragEvent<HTMLDivElement>) => {
                          if (!gameSubmitted) {
                            e.dataTransfer.setData('text/plain', item.id)
                          }
                        }}
                        whileHover={!gameSubmitted ? { scale: 1.05 } : {}}
                        whileTap={!gameSubmitted ? { scale: 0.95 } : {}}
                        className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center ${
                          gameSubmitted ? 'opacity-50' : 'cursor-grab active:cursor-grabbing'
                        }`}
                      >
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <p className="text-sm font-medium text-gray-700">{item.name}</p>
                        {!gameSubmitted && (
                          <div className="flex flex-wrap gap-2 mt-3 text-xs justify-center">
                            <span className="font-semibold text-gray-700">{hygiene?.game?.tapToPlace}</span>
                            {gameCategories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => handleGameDrop(item.id, category.id)}
                                className="px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-primary-300"
                              >
                                {category.icon} {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Submit Button */}
              {!gameSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGameSubmit}
                  disabled={Object.keys(gameAnswers).length !== hygieneGameItems.length}
                  className={`w-full py-4 rounded-xl font-semibold text-lg ${
                    Object.keys(gameAnswers).length === hygieneGameItems.length
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {hygiene?.game?.checkAnswers
                    ? hygiene?.game?.checkAnswers
                        .replace('{answered}', Object.keys(gameAnswers).length.toString())
                        .replace('{total}', hygieneGameItems.length.toString())
                    : `Check Answers (${Object.keys(gameAnswers).length}/${hygieneGameItems.length})`}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h4 className="text-2xl font-bold mb-2 text-gray-800">
                      {hygiene?.game?.score
                        ?.replace('{correct}', getGameScore().correct.toString())
                        .replace('{total}', getGameScore().total.toString())}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {getGameScore().correct === getGameScore().total
                        ? hygiene?.game?.perfect
                        : hygiene?.game?.almost}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      {hygiene?.game?.playAgain}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
          {hygiene?.tips?.title}
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <p>{hygiene?.tips?.daily}</p>
          <p>{hygiene?.tips?.morning}</p>
          <p>{hygiene?.tips?.hands}</p>
          <p>{hygiene?.tips?.shower}</p>
        </div>
      </motion.div>
    </div>
  )
}

