'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Heart,
  Target,
  CheckCircle,
  Circle,
  Star,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  TrendingUp,
  XCircle,
  Lightbulb,
  PenLine,
  Moon,
  Apple
} from 'lucide-react'
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

type BodyImageActivity = {
  id: string
  question: string
  image: string
  focus: string
  description: string
}

type EmotionOption = {
  id: string
  label: string
  color: string
  description: string
}

type WorksheetPart = {
  id: string
  title: string
  description: string
  prompts: string[]
  accent: string
}

type QuizOption = {
  id: string
  text: string
  isCorrect: boolean
}

type QuizQuestion = {
  id: string
  question: string
  options: QuizOption[]
  support: string
}

export default function ConfidencePage() {
  const [activeTab, setActiveTab] = useState<'habits' | 'game'>('habits')
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [gameItems, setGameItems] = useState<LikeItem[]>([])
  const [gameAnswers, setGameAnswers] = useState<{ [key: string]: 'like' | 'not-like' }>({})
  const [gameSubmitted, setGameSubmitted] = useState(false)
  const [emotionSelections, setEmotionSelections] = useState<Record<string, string>>({})
  const [activityInfoVisible, setActivityInfoVisible] = useState<Record<string, boolean>>({})
  const [activeWorksheetPart, setActiveWorksheetPart] = useState<string>('part1')
  const [worksheetResponses, setWorksheetResponses] = useState<Record<string, string[]>>({})
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [quizSelected, setQuizSelected] = useState<string | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

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

  const bodyImageActivities: BodyImageActivity[] = [
    {
      id: 'q1',
      question: 'Q1: How does this person holding themselves gently make you feel about caring for your body?',
      image: '/confidence/q1.svg',
      focus: 'Self-compassion & noticing body cues',
      description: 'The illustration shows someone giving themselves a hug, a reminder that bodies deserve kindness even on tough days.'
    },
    {
      id: 'q2',
      question: 'Q2: When you see a cozy reading corner, what emotions show up in your body?',
      image: '/confidence/q2.svg',
      focus: 'Quiet moments & calming routines',
      description: 'A peaceful space for reading or drawing can help muscles relax and lets kids tune into what their body likes.'
    },
    {
      id: 'q3',
      question: 'Q3: Looking at a glowing screen late at night, what feeling do you notice?',
      image: '/confidence/q3.svg',
      focus: 'Screen breaks & sleepy signals',
      description: 'Night screens can keep the brain buzzing—naming emotions helps decide when bodies need rest.'
    },
    {
      id: 'q4',
      question: 'Q4: Watching someone try a balance pose, which emotion rises for you?',
      image: '/confidence/q4.svg',
      focus: 'Movement & playful stretching',
      description: 'Even wobbly moments strengthen body trust. Parents can spotlight effort instead of perfection.'
    },
    {
      id: 'q5',
      question: 'Q5: Seeing sweat after exercise, what do you feel about your hard-working body?',
      image: '/confidence/q5.svg',
      focus: 'Effort, cooling down & body signals',
      description: 'Sweat shows effort! Talking about it keeps the focus on strength, not appearance.'
    }
  ]

  const emotionOptions: EmotionOption[] = [
    { id: 'proud', label: 'Proud', color: 'from-amber-200 to-amber-400 text-amber-900', description: 'Warm glow in my chest' },
    { id: 'calm', label: 'Calm', color: 'from-sky-200 to-sky-400 text-sky-900', description: 'Slow, steady breaths' },
    { id: 'curious', label: 'Curious', color: 'from-violet-200 to-violet-400 text-violet-900', description: 'I want to learn more' },
    { id: 'anxious', label: 'Anxious', color: 'from-rose-300 to-red-500 text-white', description: 'Buzzy tummy feelings' },
    { id: 'energized', label: 'Energized', color: 'from-emerald-200 to-emerald-400 text-emerald-900', description: 'Ready to move!' }
  ]

  const worksheetParts: WorksheetPart[] = [
    {
      id: 'part1',
      title: 'Some things I am good at',
      description: 'Spot everyday skills, no matter how small.',
      prompts: ['I shine when I...', 'Friends notice I can...', 'I practiced and improved at...'],
      accent: 'from-orange-100 to-amber-200'
    },
    {
      id: 'part2',
      title: 'Things my friends like about me',
      description: 'Capture compliments and kind words.',
      prompts: ['A friend once told me...', 'People smile because I...', 'I am a great friend when I...'],
      accent: 'from-pink-100 to-rose-200'
    },
    {
      id: 'part3',
      title: 'Things I like about me',
      description: 'Celebrate traits, quirks and style.',
      prompts: ['I like my...', 'I feel happiest when...', 'A value I live by is...'],
      accent: 'from-sky-100 to-blue-200'
    },
    {
      id: 'part4',
      title: 'Things my family love about me',
      description: 'Remember encouraging words from home.',
      prompts: ['My family cheers when I...', 'They say I am...', 'We laugh together about...'],
      accent: 'from-emerald-100 to-green-200'
    },
    {
      id: 'part5',
      title: 'Things that I am proud of',
      description: 'Honor wins, effort and progress.',
      prompts: ['A proud moment was...', 'I kept going even when...', 'Next I want to celebrate...'],
      accent: 'from-purple-100 to-violet-200'
    },
    {
      id: 'part6',
      title: 'One unique thing about me',
      description: 'Every body has a special spark.',
      prompts: ['Something that makes me unique...', 'People remember me for...', 'This part of me is growing...'],
      accent: 'from-yellow-100 to-lime-200'
    }
  ]

  const sleepNutritionQuiz: QuizQuestion[] = [
    {
      id: 'quiz1',
      question: 'You stayed up late scrolling your phone. How might that affect your confidence during class tomorrow?',
      options: [
        { id: 'a', text: 'I might feel foggy and less ready to share ideas.', isCorrect: true },
        { id: 'b', text: 'Losing sleep will make me extra energetic.', isCorrect: false }
      ],
      support: 'Rested brains remember details and manage emotions, which keeps confidence steady.'
    },
    {
      id: 'quiz2',
      question: 'Why does eating a colorful breakfast help you feel brave in PE or sports?',
      options: [
        { id: 'a', text: 'Balanced fuel gives muscles energy to jump, run and try.', isCorrect: true },
        { id: 'b', text: 'Skipping breakfast makes me faster.', isCorrect: false }
      ],
      support: 'Carbs, protein and fruit send power to muscles so effort feels easier.'
    },
    {
      id: 'quiz3',
      question: 'How does a regular bedtime routine (stretch, journal, lights out) support self-acceptance?',
      options: [
        { id: 'a', text: 'Routines show my body I am worth care every night.', isCorrect: true },
        { id: 'b', text: 'It makes bedtime more stressful.', isCorrect: false }
      ],
      support: 'Predictable habits calm the nervous system, so it is easier to speak kindly to yourself.'
    },
    {
      id: 'quiz4',
      question: 'After soccer you feel super thirsty. What choice keeps your mood steady for homework?',
      options: [
        { id: 'a', text: 'Drink water and grab a snack with protein + fruit.', isCorrect: true },
        { id: 'b', text: 'Skip snacks because hunger will go away.', isCorrect: false }
      ],
      support: 'Protein repairs muscles and fruit refills energy, which stops cranky feelings.'
    },
    {
      id: 'quiz5',
      question: 'How can turning screens off 30 minutes before bed support lifestyle goals?',
      options: [
        { id: 'a', text: 'Blue light break lets melatonin flow so sleep feels deeper.', isCorrect: true },
        { id: 'b', text: 'Screen glow makes me fall asleep faster.', isCorrect: false }
      ],
      support: 'Deep sleep heals muscles and skin, so body confidence grows from the inside out.'
    }
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

  useEffect(() => {
    const storedWorksheet = safeLocalStorage.getItem('confidence-worksheet')
    if (storedWorksheet) {
      try {
        setWorksheetResponses(JSON.parse(storedWorksheet))
      } catch (error) {
        console.warn('Unable to load worksheet notes', error)
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(worksheetResponses).length > 0) {
      safeLocalStorage.setItem('confidence-worksheet', JSON.stringify(worksheetResponses))
    }
  }, [worksheetResponses])

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

  const handleEmotionSelect = (activityId: string, emotionId: string) => {
    setEmotionSelections({ ...emotionSelections, [activityId]: emotionId })
  }

  const toggleActivityInfo = (activityId: string) => {
    setActivityInfoVisible({ ...activityInfoVisible, [activityId]: !activityInfoVisible[activityId] })
  }

  const handleWorksheetChange = (partId: string, promptIndex: number, value: string) => {
    setWorksheetResponses(prev => {
      const current = prev[partId] ? [...prev[partId]] : Array(worksheetParts.find(part => part.id === partId)?.prompts.length || 0).fill('')
      current[promptIndex] = value
      return { ...prev, [partId]: current }
    })
  }

  const currentWorksheetPart = worksheetParts.find(part => part.id === activeWorksheetPart) || worksheetParts[0]

  const currentQuiz = sleepNutritionQuiz[quizIndex]
  const correctQuizOption = currentQuiz?.options.find(option => option.isCorrect)

  const handleQuizAnswer = (optionId: string) => {
    if (quizAnswered || !currentQuiz) return
    setQuizSelected(optionId)
    setQuizAnswered(true)
    const selectedOption = currentQuiz.options.find(option => option.id === optionId)
    if (selectedOption?.isCorrect) {
      setQuizScore(prev => prev + 1)
    }
  }

  const goToNextQuiz = () => {
    if (quizIndex === sleepNutritionQuiz.length - 1) {
      setQuizCompleted(true)
    } else {
      setQuizIndex(prev => prev + 1)
    }
    setQuizAnswered(false)
    setQuizSelected(null)
  }

  const resetQuiz = () => {
    setQuizIndex(0)
    setQuizAnswered(false)
    setQuizSelected(null)
    setQuizScore(0)
    setQuizCompleted(false)
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

      {/* Positive Body Image Activities */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass-effect rounded-3xl p-6 md:p-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary-500 font-semibold">Positive body image activities</p>
            <h2 className="text-3xl font-bold text-gray-800">Emotion Thermometer Gallery</h2>
            <p className="text-gray-600 mt-2">Look at each image, read the question, and tap the color that matches how you feel.</p>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl px-4 py-3">
            <Lightbulb className="w-8 h-8 text-amber-500" />
            <p className="text-sm text-gray-700">Parents: Tap the tiny bulb on each card to read the focus of that question.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bodyImageActivities.map(activity => {
            const selectedEmotion = emotionSelections[activity.id]
            const emotionDetails = emotionOptions.find(option => option.id === selectedEmotion)
            return (
              <div key={activity.id} className="bg-white/70 rounded-3xl p-4 md:p-6 shadow-inner border border-white/40">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{activity.question}</p>
                  </div>
                  <button
                    onClick={() => toggleActivityInfo(activity.id)}
                    className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition"
                    aria-label="Show parent focus"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-hidden rounded-2xl mb-4 border border-gray-100">
                  <img src={activity.image} alt={activity.focus} className="w-full h-48 object-cover" />
                </div>
                {activityInfoVisible[activity.id] && (
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 mb-4 text-sm text-gray-700">
                    <p className="font-semibold text-gray-800">Focus: {activity.focus}</p>
                    <p className="mt-1">{activity.description}</p>
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-3">Pick the emotion that feels closest right now.</p>
                <div className="flex flex-wrap gap-3">
                  {emotionOptions.map(option => (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEmotionSelect(activity.id, option.id)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm bg-gradient-to-r ${option.color} shadow-sm transition ${
                        selectedEmotion === option.id ? 'ring-2 ring-offset-2 ring-gray-900/10' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
                {emotionDetails && (
                  <div className={`mt-4 p-4 rounded-2xl bg-gradient-to-r ${emotionDetails.color}`}>
                    <p className="text-sm font-semibold">A: {emotionDetails.label}</p>
                    <p className="text-xs opacity-80">{emotionDetails.description}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* What I Like About Me Worksheet */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass-effect rounded-3xl p-6 md:p-10"
      >
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-sm uppercase tracking-widest text-secondary-500 font-semibold">What I like about me worksheet</p>
          <h2 className="text-3xl font-bold text-gray-800">Six-Part Self-Love Journal</h2>
          <p className="text-gray-600">Tap a part to focus on it, then answer the prompts inside each colorful box.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {worksheetParts.map(part => (
            <button
              key={part.id}
              onClick={() => setActiveWorksheetPart(part.id)}
              className={`px-4 py-3 rounded-2xl text-left min-w-[180px] transition border ${
                activeWorksheetPart === part.id
                  ? 'bg-gradient-to-r from-secondary-100 to-secondary-200 border-secondary-300 text-secondary-900'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <p className="text-xs uppercase tracking-widest font-semibold">Part {part.id.replace('part', '')}</p>
              <p className="text-base font-bold">{part.title}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 bg-white rounded-3xl p-6 shadow-inner border border-white/50">
          <div className={`rounded-2xl p-6 bg-gradient-to-r ${currentWorksheetPart.accent} mb-6`}>
            <div className="flex items-center gap-3 mb-2">
              <PenLine className="w-6 h-6 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-800">{currentWorksheetPart.title}</h3>
            </div>
            <p className="text-gray-700">{currentWorksheetPart.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentWorksheetPart.prompts.map((prompt, index) => (
              <label key={`${currentWorksheetPart.id}-${index}`} className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">{prompt}</span>
                <textarea
                  value={worksheetResponses[currentWorksheetPart.id]?.[index] || ''}
                  onChange={(event) => handleWorksheetChange(currentWorksheetPart.id, index, event.target.value)}
                  className="min-h-[100px] rounded-2xl border border-gray-200 p-3 focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                  placeholder="Write a few words here..."
                />
              </label>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sleep & Nutrition Impact Quiz */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass-effect rounded-3xl p-6 md:p-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-rose-500 font-semibold">Sleep & nutrition impact quizzes</p>
            <h2 className="text-3xl font-bold text-gray-800">Confidence Boost Pop Quiz</h2>
            <p className="text-gray-600">Answer each question. Once you choose, the red answer and the italic idea will appear before you move on.</p>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-rose-100 to-orange-100 rounded-2xl px-4 py-3">
            <Moon className="w-6 h-6 text-rose-500" />
            <Apple className="w-6 h-6 text-emerald-500" />
            <p className="text-sm text-gray-700">Sleep + food choices shape moods, focus and self-acceptance.</p>
          </div>
        </div>
        {!quizCompleted && currentQuiz && (
          <div className="bg-white rounded-3xl p-6 border border-white/60 shadow-inner">
            <p className="text-sm font-semibold text-gray-500">Question {quizIndex + 1} of {sleepNutritionQuiz.length}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">{currentQuiz.question}</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuiz.options.map(option => (
                <button
                  key={option.id}
                  disabled={quizAnswered}
                  onClick={() => handleQuizAnswer(option.id)}
                  className={`rounded-2xl border-2 p-4 text-left transition font-semibold ${
                    quizAnswered
                      ? option.isCorrect
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : quizSelected === option.id
                          ? 'border-gray-300 bg-gray-50 text-gray-500'
                          : 'border-gray-200 bg-white text-gray-700'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-gray-700'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            {quizAnswered && correctQuizOption && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-rose-100 border border-red-200">
                <p className="text-red-600 font-bold">
                  A: {correctQuizOption.text}
                  <span className="text-gray-700 italic font-normal ml-2">({currentQuiz.support})</span>
                </p>
              </div>
            )}
            {quizAnswered && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={goToNextQuiz}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold"
                >
                  {quizIndex === sleepNutritionQuiz.length - 1 ? 'See my results' : 'Next question'}
                </button>
              </div>
            )}
          </div>
        )}
        {quizCompleted && (
          <div className="bg-white rounded-3xl p-6 border border-white/60 shadow-inner text-center">
            <div className="text-5xl mb-4">🌙🍎</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">You answered {quizScore} / {sleepNutritionQuiz.length} questions!</h3>
            <p className="text-gray-600 mb-6">Keep practicing healthy routines to boost your mood and confidence every day.</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-semibold"
            >
              Try the quiz again
            </button>
          </div>
        )}
      </motion.section>
    </div>
  )
}

