'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart, Target, CheckCircle, Circle, Star, ThumbsUp, ThumbsDown, RotateCcw, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import { safeLocalStorage } from '@/utils/storage'
import { format } from 'date-fns'
import { useLanguage } from '@/contexts/LanguageContext'

type Habit = {
  id: string
  name: string
  description: string
  icon: string
  color: string
  completedDates: string[]
}

type LikeItem = {
  id: string
  name: string
  icon: string
  category: 'good' | 'not-good'
}

export default function ConfidencePage() {
  const { t } = useLanguage()
  const confidence = t<any>('confidencePage')
  const [activeTab, setActiveTab] = useState<'habits' | 'game'>('habits')
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [gameItems, setGameItems] = useState<LikeItem[]>([])
  const [gameAnswers, setGameAnswers] = useState<{ [key: string]: 'good' | 'not-good' }>({})
  const [gameSubmitted, setGameSubmitted] = useState(false)
  const availableHabits: Habit[] = (confidence?.habits || []).map((habit: any) => ({ ...habit, completedDates: habit.completedDates || [] }))

  const likeGameItems: LikeItem[] = confidence?.game?.items || []

  // Load saved habits
  useEffect(() => {
    const saved = safeLocalStorage.getItem('confidence-habits')
    if (saved) {
      try {
        const savedHabits = JSON.parse(saved)
        setHabits(savedHabits)
        // Set current habit if none selected
        if (savedHabits.length > 0 && !currentHabit) {
          setCurrentHabit(savedHabits[0])
        }
      } catch (error) {
        console.warn('Unable to parse saved habits', error)
      }
    } else {
      // Initialize with first habit
      if (availableHabits.length > 0) {
        const firstHabit = { ...availableHabits[0] }
        setHabits([firstHabit])
        setCurrentHabit(firstHabit)
      }
    }
  }, [])

  // Save habits
  useEffect(() => {
    if (habits.length > 0) {
      safeLocalStorage.setItem('confidence-habits', JSON.stringify(habits))
    }
  }, [habits])

  // Initialize game items
  useEffect(() => {
    if (gameItems.length === 0) {
      setGameItems([...likeGameItems].sort(() => Math.random() - 0.5))
    }
  }, [])

  const addHabit = (habit: Habit) => {
    if (habits.length >= 1) {
      alert(confidence?.habitLimit)
      return
    }
    const newHabit = { ...habit }
    setHabits([newHabit])
    setCurrentHabit(newHabit)
  }

  const toggleHabitCompletion = (habitId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(today)
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        }
      }
      return habit
    }))
    if (currentHabit?.id === habitId) {
      setCurrentHabit({
        ...currentHabit,
        completedDates: currentHabit.completedDates.includes(today)
          ? currentHabit.completedDates.filter(date => date !== today)
          : [...currentHabit.completedDates, today]
      })
    }
  }

  const getStreak = (habit: Habit) => {
    if (habit.completedDates.length === 0) return 0
    const sortedDates = habit.completedDates.sort().reverse()
    let streak = 0
    const today = new Date()
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i])
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)
      if (format(date, 'yyyy-MM-dd') === format(expectedDate, 'yyyy-MM-dd')) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const isTodayCompleted = (habit: Habit) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    return habit.completedDates.includes(today)
  }

  const handleGameAnswer = (itemId: string, answer: 'good' | 'not-good') => {
    if (gameSubmitted) return
    setGameAnswers({ ...gameAnswers, [itemId]: answer })
  }

  const handleGameSubmit = () => {
    setGameSubmitted(true)
  }

  const getGameScore = () => {
    let correct = 0
    likeGameItems.forEach(item => {
      if (gameAnswers[item.id] === item.category) {
        correct++
      }
    })
    return { correct, total: likeGameItems.length }
  }

  const resetGame = () => {
    setGameItems([...likeGameItems].sort(() => Math.random() - 0.5))
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
          {confidence?.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {confidence?.subtitle}
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
            onClick={() => setActiveTab('habits')}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'habits'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {confidence?.tabs?.habits}
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {confidence?.tabs?.game}
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'habits' ? (
          <motion.div
            key="habits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Current Habit */}
            {currentHabit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect rounded-3xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{confidence?.currentFocus?.title}</h3>
                    <p className="text-gray-600">{confidence?.currentFocus?.subtitle}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${currentHabit.color} w-20 h-20 rounded-2xl flex items-center justify-center text-4xl`}>
                    {currentHabit.icon}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 mb-6">
                  <h4 className="text-xl font-bold mb-2 text-gray-800">{currentHabit.name}</h4>
                  <p className="text-gray-600 mb-4">{currentHabit.description}</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">{confidence?.currentFocus?.streak}</p>
                      <p className="text-2xl font-bold text-primary-600">{getStreak(currentHabit)} 🔥</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{confidence?.currentFocus?.totalDays}</p>
                      <p className="text-2xl font-bold text-secondary-600">{currentHabit.completedDates.length}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleHabitCompletion(currentHabit.id)}
                    className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 ${
                      isTodayCompleted(currentHabit)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    }`}
                  >
                    {isTodayCompleted(currentHabit) ? (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        {confidence?.currentFocus?.markComplete}
                      </>
                    ) : (
                      <>
                        <Circle className="w-6 h-6" />
                        {confidence?.currentFocus?.markIncomplete}
                      </>
                    )}
                  </motion.button>
                </div>

                {currentHabit.completedDates.length >= 7 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-gray-700 font-semibold">
                      🎉 {confidence?.habitCompletion?.replace('{days}', currentHabit.completedDates.length.toString())}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Available Habits */}
            <div className="glass-effect rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{confidence?.availableHabits}</h3>
              <p className="text-gray-600 mb-4">
                {habits.length >= 1
                  ? confidence?.habitLocked
                  : confidence?.chooseHabit}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableHabits
                  .filter(habit => !habits.find(h => h.id === habit.id))
                  .map((habit) => (
                    <motion.div
                      key={habit.id}
                      whileHover={{ y: -5 }}
                      className={`bg-gradient-to-br ${habit.color} rounded-2xl p-6 text-white`}
                    >
                      <div className="text-4xl mb-3">{habit.icon}</div>
                      <h4 className="font-bold text-lg mb-2">{habit.name}</h4>
                      <p className="text-sm mb-4 opacity-90">{habit.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addHabit(habit)}
                        disabled={habits.length >= 1}
                        className={`w-full py-2 rounded-lg font-semibold ${
                          habits.length >= 1
                            ? 'bg-white/30 text-white/70 cursor-not-allowed'
                            : 'bg-white text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {habits.length >= 1 ? confidence?.habitLimit : confidence?.chooseHabit}
                      </motion.button>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Impact Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-3xl p-6 md:p-8 bg-gradient-to-r from-green-50 to-blue-50"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary-600" />
                {confidence?.progress?.title}
              </h3>
              <div className="space-y-3 text-gray-700">
                {(confidence?.progress?.points || []).map((point: string, index: number) => (
                  <p key={index}>{point}</p>
                ))}
              </div>
            </motion.div>
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
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{confidence?.game?.title}</h3>
              <p className="text-gray-600 mb-6">
                {confidence?.game?.description}
              </p>

              {/* Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {likeGameItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6"
                  >
                    <div className="text-4xl mb-4 text-center">{item.icon}</div>
                    <h4 className="font-bold text-lg mb-4 text-center text-gray-800">{item.name}</h4>
                    
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGameAnswer(item.id, 'good')}
                        disabled={gameSubmitted}
                        className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                          gameAnswers[item.id] === 'good'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } ${gameSubmitted ? 'opacity-50' : ''}`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        {confidence?.game?.good}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGameAnswer(item.id, 'not-good')}
                        disabled={gameSubmitted}
                        className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                          gameAnswers[item.id] === 'not-good'
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } ${gameSubmitted ? 'opacity-50' : ''}`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        {confidence?.game?.notGood}
                      </motion.button>
                    </div>

                    {gameSubmitted && (
                      <div className="mt-4 text-center">
                            {gameAnswers[item.id] === item.category ? (
                              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                                <CheckCircle className="w-5 h-5" />
                                {confidence?.game?.feedback?.correct}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                                <XCircle className="w-5 h-5" />
                                {item.category === 'good'
                                  ? confidence?.game?.feedback?.shouldBeGood
                                  : confidence?.game?.feedback?.shouldBeNotGood}
                              </div>
                            )}
                          </div>
                        )}
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              {!gameSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGameSubmit}
                  disabled={Object.keys(gameAnswers).length !== likeGameItems.length}
                  className={`w-full py-4 rounded-xl font-semibold text-lg ${
                    Object.keys(gameAnswers).length === likeGameItems.length
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {confidence?.game?.checkAnswers
                    ? confidence?.game?.checkAnswers
                        .replace('{answered}', Object.keys(gameAnswers).length.toString())
                        .replace('{total}', likeGameItems.length.toString())
                    : `Check Answers (${Object.keys(gameAnswers).length}/${likeGameItems.length})`}
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
                      {confidence?.game?.feedback?.score
                        ?.replace('{correct}', getGameScore().correct.toString())
                        .replace('{total}', getGameScore().total.toString())}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {getGameScore().correct === getGameScore().total
                        ? confidence?.game?.feedback?.perfect
                        : confidence?.game?.feedback?.almost}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      {confidence?.game?.feedback?.playAgain}
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
          {confidence?.tips?.title}
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          {(confidence?.tips?.items || []).map((tip: string, index: number) => (
            <p key={index}>{tip}</p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

