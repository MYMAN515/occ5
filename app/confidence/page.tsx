'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart, Target, CheckCircle, Circle, Star, ThumbsUp, ThumbsDown, RotateCcw, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import { safeLocalStorage } from '@/utils/storage'
import { format } from 'date-fns'

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
  category: 'like' | 'not-like'
}

export default function ConfidencePage() {
  const [activeTab, setActiveTab] = useState<'habits' | 'game'>('habits')
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [gameItems, setGameItems] = useState<LikeItem[]>([])
  const [gameAnswers, setGameAnswers] = useState<{ [key: string]: 'like' | 'not-like' }>({})
  const [gameSubmitted, setGameSubmitted] = useState(false)

  const availableHabits: Habit[] = [
    {
      id: 'exercise',
      name: 'Daily Exercise',
      description: 'Move your body for at least 30 minutes',
      icon: '🏃',
      color: 'from-blue-400 to-cyan-500',
      completedDates: []
    },
    {
      id: 'sleep',
      name: 'Good Sleep',
      description: 'Get 8-10 hours of sleep',
      icon: '😴',
      color: 'from-purple-400 to-indigo-500',
      completedDates: []
    },
    {
      id: 'water',
      name: 'Drink Water',
      description: 'Drink 6-8 glasses of water',
      icon: '💧',
      color: 'from-cyan-400 to-blue-500',
      completedDates: []
    },
    {
      id: 'gratitude',
      name: 'Gratitude Journal',
      description: 'Write 3 things you\'re grateful for',
      icon: '📝',
      color: 'from-yellow-400 to-orange-500',
      completedDates: []
    },
    {
      id: 'reading',
      name: 'Read for Fun',
      description: 'Read for 20 minutes',
      icon: '📚',
      color: 'from-green-400 to-emerald-500',
      completedDates: []
    },
    {
      id: 'meditation',
      name: 'Mindful Moment',
      description: 'Take 5 minutes to breathe and relax',
      icon: '🧘',
      color: 'from-pink-400 to-rose-500',
      completedDates: []
    }
  ]

  const likeGameItems: LikeItem[] = [
    { id: 'healthy-food', name: 'Eating Healthy Food', icon: '🥗', category: 'like' },
    { id: 'exercise-fun', name: 'Playing Sports', icon: '⚽', category: 'like' },
    { id: 'reading-books', name: 'Reading Books', icon: '📖', category: 'like' },
    { id: 'art-creativity', name: 'Drawing & Art', icon: '🎨', category: 'like' },
    { id: 'music', name: 'Listening to Music', icon: '🎵', category: 'like' },
    { id: 'friends', name: 'Spending Time with Friends', icon: '👫', category: 'like' },
    { id: 'junk-food', name: 'Eating Only Junk Food', icon: '🍟', category: 'not-like' },
    { id: 'screen-all-day', name: 'Screen Time All Day', icon: '📱', category: 'not-like' },
    { id: 'skipping-meals', name: 'Skipping Meals', icon: '⏭️', category: 'not-like' },
    { id: 'no-sleep', name: 'Staying Up Very Late', icon: '🌙', category: 'not-like' },
    { id: 'no-exercise', name: 'No Physical Activity', icon: '🛋️', category: 'not-like' },
    { id: 'isolation', name: 'Isolating from Others', icon: '🚪', category: 'not-like' },
  ]

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
      alert('Focus on one habit at a time! Complete your current habit before adding a new one. 💪')
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

  const handleGameAnswer = (itemId: string, answer: 'like' | 'not-like') => {
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
          Confidence, Self-Acceptance & Lifestyle
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Build healthy habits and boost your confidence one step at a time! 🌟💪
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
            🎯 Habit Tracker
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            👍 Like / Not Like
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Focus</h3>
                    <p className="text-gray-600">One habit at a time for better success! 💪</p>
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
                      <p className="text-sm text-gray-600">Streak</p>
                      <p className="text-2xl font-bold text-primary-600">{getStreak(currentHabit)} 🔥</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Days</p>
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
                        Completed Today! 🎉
                      </>
                    ) : (
                      <>
                        <Circle className="w-6 h-6" />
                        Mark as Complete
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
                      🎉 Amazing! You've completed {currentHabit.completedDates.length} days! You can now add a new habit or continue building this one!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Available Habits */}
            <div className="glass-effect rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Available Habits</h3>
              <p className="text-gray-600 mb-4">
                {habits.length >= 1 
                  ? "Complete your current habit (7+ days) to unlock new ones!"
                  : "Choose a habit to start your journey!"}
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
                        {habits.length >= 1 ? 'Focus on Current Habit' : 'Start This Habit'}
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
                How Habits Build Confidence
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Healthy Lifestyle</strong> → Taking care of your body makes you feel strong and capable
                </p>
                <p>
                  <strong>Self-Control</strong> → Proving to yourself that you can stick to habits builds trust in yourself
                </p>
                <p>
                  <strong>Direct Feedback</strong> → Seeing your progress (streaks, completed days) shows you're reliable
                </p>
                <p>
                  <strong>Self-Acceptance</strong> → When you achieve your goals, you learn to value yourself without needing others' approval
                </p>
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
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Like / Not Like Activity</h3>
              <p className="text-gray-600 mb-6">
                Choose whether each activity is something you LIKE (healthy, positive) or NOT LIKE (unhealthy, negative) for your lifestyle!
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
                        onClick={() => handleGameAnswer(item.id, 'like')}
                        disabled={gameSubmitted}
                        className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                          gameAnswers[item.id] === 'like'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } ${gameSubmitted ? 'opacity-50' : ''}`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        LIKE
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGameAnswer(item.id, 'not-like')}
                        disabled={gameSubmitted}
                        className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                          gameAnswers[item.id] === 'not-like'
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        } ${gameSubmitted ? 'opacity-50' : ''}`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                        NOT LIKE
                      </motion.button>
                    </div>

                    {gameSubmitted && (
                      <div className="mt-4 text-center">
                        {gameAnswers[item.id] === item.category ? (
                          <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                            <CheckCircle className="w-5 h-5" />
                            Correct!
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
                            <XCircle className="w-5 h-5" />
                            Should be {item.category === 'like' ? 'LIKE' : 'NOT LIKE'}
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
                  Check Answers ({Object.keys(gameAnswers).length}/{likeGameItems.length})
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
                      You got {getGameScore().correct} out of {getGameScore().total} correct!
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {getGameScore().correct === getGameScore().total
                        ? "Perfect! You understand healthy lifestyle choices! 🌟"
                        : "Great job! Keep learning about healthy habits! 💪"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Play Again
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
          Building Confidence Tips 💡
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong>One Habit at a Time:</strong> Focus on building one healthy habit before adding another. This helps you succeed!
          </p>
          <p>
            <strong>Track Your Progress:</strong> Seeing your streak and completed days proves you're capable and reliable.
          </p>
          <p>
            <strong>Celebrate Small Wins:</strong> Every day you complete your habit is a victory worth celebrating!
          </p>
          <p>
            <strong>Be Patient:</strong> Building confidence takes time. Be kind to yourself on the journey.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

