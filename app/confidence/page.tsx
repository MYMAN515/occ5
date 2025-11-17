'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Heart, Target, CheckCircle, Circle, Star, ThumbsUp, ThumbsDown, RotateCcw, Sparkles, TrendingUp, XCircle, Lightbulb, BookOpen, Brain } from 'lucide-react'
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

type EmotionOption = {
  id: string
  label: string
  color: string
  description: string
}

type BodyImageActivity = {
  id: string
  image: string
  alt: string
  question: string
  scenario: string
  parentFocus: string
  emotions: EmotionOption[]
}

type WorksheetSection = {
  id: string
  title: string
  summary: string
  prompts: string[]
  color: string
}

type QuizOption = {
  id: string
  text: string
  isAnswer: boolean
}

type SleepNutritionQuestion = {
  id: string
  question: string
  context: string
  options: QuizOption[]
  supportIdea: string
}

const positiveBodyImageActivities: BodyImageActivity[] = [
  {
    id: 'body-watch',
    image: '/confidence-q1.svg',
    alt: 'Teen hugging themselves while thinking about their body',
    question: 'Q1: When you look at this teen hugging themselves, what feeling pops up about your own body?',
    scenario: 'A tween sits alone and feels unsure about how fast their body is changing.',
    parentFocus: 'Invite kids to name uncomfortable feelings and remind them that everybody grows at their own pace.',
    emotions: [
      {
        id: 'anxious',
        label: 'Anxious or worried',
        color: 'bg-red-100 text-red-800 border-red-200',
        description: 'My tummy feels twisty and I want to curl up.'
      },
      {
        id: 'hopeful',
        label: 'Hopeful',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        description: 'I remember something kind that lifts my mood.'
      },
      {
        id: 'curious',
        label: 'Curious',
        color: 'bg-sky-100 text-sky-800 border-sky-200',
        description: 'I have questions about what comes next.'
      },
      {
        id: 'proud',
        label: 'Proud of who I am',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        description: 'I like that my body is still trying its best for me.'
      }
    ]
  },
  {
    id: 'cozy-reading',
    image: '/confidence-q2.svg',
    alt: 'Kid relaxing in a cozy nook with a book',
    question: 'Q2: This kid took a cozy reading break. How do you feel when you make space for yourself?',
    scenario: 'Quiet activities help some kids notice their body feels safe and steady.',
    parentFocus: 'Highlight calming routines that help kids regulate their senses before talking about body image.',
    emotions: [
      {
        id: 'calm',
        label: 'Calm & relaxed',
        color: 'bg-teal-100 text-teal-800 border-teal-200',
        description: 'My breathing slows down and I feel grounded.'
      },
      {
        id: 'lonely',
        label: 'A little lonely',
        color: 'bg-rose-100 text-rose-800 border-rose-200',
        description: 'I wish I could share the moment with someone.'
      },
      {
        id: 'inspired',
        label: 'Inspired',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        description: 'Ideas pop up when I give my brain a pause.'
      },
      {
        id: 'sleepy',
        label: 'Sleepy',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        description: 'My body asks for rest after a busy day.'
      }
    ]
  },
  {
    id: 'screen-night',
    image: '/confidence-q3.svg',
    alt: 'Teen looking at a phone at night',
    question: 'Q3: Late-night scrolling can spark big feelings. Which one do you notice most?',
    scenario: 'Comparing ourselves on screens can change how we feel about our bodies and sleep.',
    parentFocus: 'Talk about media balance and how rest keeps body confidence strong.',
    emotions: [
      {
        id: 'overwhelmed',
        label: 'Overwhelmed',
        color: 'bg-red-200 text-red-900 border-red-300',
        description: 'Too many images make me want to shut down.'
      },
      {
        id: 'curious-screen',
        label: 'Curious about others',
        color: 'bg-amber-100 text-amber-900 border-amber-200',
        description: 'I wonder if my body will look like that.'
      },
      {
        id: 'sleepy',
        label: 'Sleepy',
        color: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        description: 'My eyelids feel heavy but I keep scrolling.'
      },
      {
        id: 'ready',
        label: 'Ready to log off',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        description: 'I remember I feel better when I rest.'
      }
    ]
  },
  {
    id: 'movement-joy',
    image: '/confidence-q4.svg',
    alt: 'Tween practicing yoga balance pose',
    question: 'Q4: When you watch someone balancing in yoga, what does your body say?',
    scenario: 'Strong poses remind us that bodies are for moving, not just looking.',
    parentFocus: 'Focus on how practice builds strength and balance rather than appearance.',
    emotions: [
      {
        id: 'energized',
        label: 'Energized',
        color: 'bg-lime-100 text-lime-900 border-lime-200',
        description: 'I want to move and try the pose too.'
      },
      {
        id: 'wobbly',
        label: 'Wobbly or unsure',
        color: 'bg-orange-100 text-orange-900 border-orange-200',
        description: 'Balance feels tricky and that is okay.'
      },
      {
        id: 'confident',
        label: 'Confident',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        description: 'I trust my body to learn new moves.'
      },
      {
        id: 'bored',
        label: 'Bored',
        color: 'bg-slate-100 text-slate-900 border-slate-200',
        description: 'Slow movements are not my favorite today.'
      }
    ]
  },
  {
    id: 'sweat-pride',
    image: '/confidence-q5.svg',
    alt: 'Close up of a tween with sweat after playing hard',
    question: 'Q5: After a sweaty game or practice, what emotion comes up first?',
    scenario: 'Faces get warm and shiny when we work hard—an awesome reminder of strength.',
    parentFocus: 'Celebrate effort and how bodies support adventures instead of judging looks.',
    emotions: [
      {
        id: 'tired',
        label: 'Tired',
        color: 'bg-blue-100 text-blue-900 border-blue-200',
        description: 'My muscles need a breather.'
      },
      {
        id: 'accomplished',
        label: 'Accomplished',
        color: 'bg-rose-100 text-rose-900 border-rose-200',
        description: 'I did something that took effort.'
      },
      {
        id: 'embarrassed',
        label: 'A little embarrassed',
        color: 'bg-red-100 text-red-900 border-red-200',
        description: 'I worry people notice the sweat.'
      },
      {
        id: 'motivated',
        label: 'Motivated to keep going',
        color: 'bg-green-100 text-green-900 border-green-200',
        description: 'Working hard makes me want to try again.'
      }
    ]
  }
]

const worksheetSections: WorksheetSection[] = [
  {
    id: 'good-at',
    title: 'Part 1 · Things I am good at',
    summary: 'Celebrate the activities and talents that feel natural to you.',
    prompts: [
      'Which activities or hobbies feel easy or fun because you have practiced?',
      'Describe a time you surprised yourself with this skill.',
      'How does being good at this make your body feel?'
    ],
    color: 'from-rose-100 to-rose-200'
  },
  {
    id: 'friends',
    title: 'Part 2 · Things friends like about me',
    summary: 'Notice the kind ways your friends talk about you.',
    prompts: [
      'What compliments or thank-yous have friends given you lately?',
      'How do your friends show that they trust or rely on you?',
      'When did you help a friend feel better?'
    ],
    color: 'from-blue-100 to-blue-200'
  },
  {
    id: 'self-like',
    title: 'Part 3 · Things I like about me',
    summary: 'Write down traits, values, or body parts you appreciate.',
    prompts: [
      'List three things you enjoy about who you are inside.',
      'What body part or talent helps you every single day?',
      'How do you take care of yourself when you need a break?'
    ],
    color: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'family',
    title: 'Part 4 · Things my family loves about me',
    summary: 'Remember the words and traditions that make you feel loved.',
    prompts: [
      'How does your family show you that you matter?',
      'What special traditions or routines make you feel included?',
      'Write a kind word you have heard from family members.'
    ],
    color: 'from-purple-100 to-purple-200'
  },
  {
    id: 'proud-of',
    title: 'Part 5 · Things I am proud of',
    summary: 'Track wins big or small so you can celebrate progress.',
    prompts: [
      'Which goal did you work hard toward this month?',
      'What challenge did you keep trying even when it was tough?',
      'Who are you becoming because of this effort?'
    ],
    color: 'from-amber-100 to-amber-200'
  },
  {
    id: 'unique',
    title: 'Part 6 · One unique thing about me',
    summary: 'Every person has a sparkle that belongs only to them.',
    prompts: [
      'What unique quality, culture, or interest makes you stand out?',
      'How do you use this uniqueness to help yourself or others?',
      'Describe this superpower in one fun sentence.'
    ],
    color: 'from-sky-100 to-sky-200'
  }
]

const sleepNutritionQuestions: SleepNutritionQuestion[] = [
  {
    id: 'screen-rest',
    question: 'What usually happens the next day if you stay on your phone past bedtime?',
    context: 'Keeping screens close to bedtime makes it harder for your body to rest.',
    options: [
      { id: 'screen-rest-1', text: 'I feel energized all day with zero yawns.', isAnswer: false },
      { id: 'screen-rest-2', text: 'I feel sleepy and it is harder to focus or feel confident.', isAnswer: true },
      { id: 'screen-rest-3', text: 'Nothing changes because sleep is not important.', isAnswer: false }
    ],
    supportIdea: 'Less sleep means the brain cannot fully reset, so moods feel bumpy and confidence drops.'
  },
  {
    id: 'breakfast-confidence',
    question: 'Why does eating a colorful breakfast help with confidence at school?',
    context: 'Food is fuel for the brain and for the feelings you bring into class.',
    options: [
      { id: 'breakfast-confidence-1', text: 'Skipping food keeps my stomach totally flat.', isAnswer: false },
      { id: 'breakfast-confidence-2', text: 'It gives steady energy so I can think, speak up, and stay calm.', isAnswer: true },
      { id: 'breakfast-confidence-3', text: 'It makes me invisible so no one notices me.', isAnswer: false }
    ],
    supportIdea: 'Balanced meals keep blood sugar steady, which protects focus, mood, and the way we talk to ourselves.'
  },
  {
    id: 'practice-refuel',
    question: 'After PE or sports practice, what is the best quick choice?',
    context: 'Bodies recover faster when we refuel soon after movement.',
    options: [
      { id: 'practice-refuel-1', text: 'Drink water and grab fruit or yogurt to refuel muscles.', isAnswer: true },
      { id: 'practice-refuel-2', text: 'Skip food until dinner to “save” calories.', isAnswer: false },
      { id: 'practice-refuel-3', text: 'Only drink soda because sugar is enough.', isAnswer: false }
    ],
    supportIdea: 'Protein, carbs, and water repair muscles and keep energy balanced so kids feel strong and proud.'
  },
  {
    id: 'winddown-routine',
    question: 'How does a calm wind-down routine help your body image?',
    context: 'Routines tell your brain it is safe to rest and recharge.',
    options: [
      { id: 'winddown-routine-1', text: 'It tells my brain to slow down so I wake up rested and kinder to myself.', isAnswer: true },
      { id: 'winddown-routine-2', text: 'It makes mornings feel more rushed and grumpy.', isAnswer: false },
      { id: 'winddown-routine-3', text: 'It magically changes my height overnight.', isAnswer: false }
    ],
    supportIdea: 'Predictable routines lower stress hormones so it is easier to notice what your body does well.'
  }
]

export default function ConfidencePage() {
  const [activeTab, setActiveTab] = useState<'habits' | 'game'>('habits')
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null)
  const [habits, setHabits] = useState<Habit[]>([])
  const [gameItems, setGameItems] = useState<LikeItem[]>([])
  const [gameAnswers, setGameAnswers] = useState<{ [key: string]: 'like' | 'not-like' }>({})
  const [gameSubmitted, setGameSubmitted] = useState(false)
  const [selectedEmotions, setSelectedEmotions] = useState<{ [key: string]: string }>({})
  const [openParentInfo, setOpenParentInfo] = useState<string | null>(null)
  const [activeWorksheetSection, setActiveWorksheetSection] = useState<string>(worksheetSections[0].id)
  const [worksheetResponses, setWorksheetResponses] = useState<Record<string, string[]>>(() =>
    worksheetSections.reduce((acc, section) => {
      acc[section.id] = section.prompts.map(() => '')
      return acc
    }, {} as Record<string, string[]>)
  )
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null)
  const [quizShowSupport, setQuizShowSupport] = useState(false)
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

  const handleEmotionSelect = (activityId: string, emotionId: string) => {
    setSelectedEmotions(prev => ({ ...prev, [activityId]: emotionId }))
  }

  const toggleParentInfo = (activityId: string) => {
    setOpenParentInfo(prev => (prev === activityId ? null : activityId))
  }

  const handleWorksheetResponse = (sectionId: string, promptIndex: number, value: string) => {
    setWorksheetResponses(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map((entry, index) => (index === promptIndex ? value : entry))
    }))
  }

  const handleQuizAnswer = (optionId: string) => {
    if (quizShowSupport || quizCompleted) return
    const currentQuestion = sleepNutritionQuestions[quizIndex]
    setQuizSelectedOption(optionId)
    const selectedOption = currentQuestion.options.find(option => option.id === optionId)
    if (selectedOption?.isAnswer) {
      setQuizScore(prev => prev + 1)
    }
    setQuizShowSupport(true)
  }

  const handleQuizNext = () => {
    if (!quizShowSupport) return
    if (quizIndex >= sleepNutritionQuestions.length - 1) {
      setQuizCompleted(true)
    } else {
      setQuizIndex(prev => prev + 1)
    }
    setQuizSelectedOption(null)
    setQuizShowSupport(false)
  }

  const resetQuiz = () => {
    setQuizIndex(0)
    setQuizSelectedOption(null)
    setQuizShowSupport(false)
    setQuizScore(0)
    setQuizCompleted(false)
  }

  const currentWorksheetSection =
    worksheetSections.find(section => section.id === activeWorksheetSection) ?? worksheetSections[0]

  const currentQuizQuestion = sleepNutritionQuestions[quizIndex]

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

      {/* Positive body image activities */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-primary-600 mb-2">
            <Sparkles className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-900">Positive Body Image Activities</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Look at each picture, read the question (Q) aloud, and choose the emotion (A) that best describes how you feel. Colors create an emotion thermometer so kids can notice changes in their bodies and thoughts.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {positiveBodyImageActivities.map(activity => {
            const selectedEmotion = selectedEmotions[activity.id]
            const selectedDescription = activity.emotions.find(emotion => emotion.id === selectedEmotion)?.description
            const selectedLabel = activity.emotions.find(emotion => emotion.id === selectedEmotion)?.label
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-effect rounded-3xl p-6 md:p-8 flex flex-col"
              >
                <div className="relative">
                  <Image
                    src={activity.image}
                    width={320}
                    height={220}
                    alt={activity.alt}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <button
                    aria-label="Show parent focus"
                    onClick={() => toggleParentInfo(activity.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-amber-300 bg-white/90 text-amber-600 flex items-center justify-center shadow-lg"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex-1 flex flex-col">
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-semibold">Q</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.question}</h3>
                  <p className="text-sm text-gray-600 mb-4">{activity.scenario}</p>
                  {openParentInfo === activity.id && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-900 mb-4">
                      <p className="font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Parent focus
                      </p>
                      <p>{activity.parentFocus}</p>
                    </div>
                  )}
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-semibold">A</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {activity.emotions.map(emotion => {
                      const isSelected = selectedEmotion === emotion.id
                      return (
                        <button
                          key={emotion.id}
                          type="button"
                          onClick={() => handleEmotionSelect(activity.id, emotion.id)}
                          className={`border-2 rounded-2xl px-4 py-3 text-left font-semibold transition ${emotion.color} ${
                            isSelected ? 'ring-2 ring-primary-200 shadow-lg' : 'hover:ring-2 hover:ring-offset-1 hover:ring-primary-100'
                          }`}
                        >
                          {emotion.label}
                          <span className="block text-xs font-normal text-gray-700 mt-1">{emotion.description}</span>
                        </button>
                      )
                    })}
                  </div>
                  {selectedEmotion && (
                    <div className="mt-auto bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-2xl p-4 text-sm text-gray-700">
                      <p className="font-semibold text-primary-700 mb-1">You picked: {selectedLabel}</p>
                      <p>{selectedDescription}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* What I like about me worksheet */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-secondary-600 mb-2">
            <BookOpen className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-900">"What I Like About Me" Worksheet</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose a part, respond to the prompts, and keep the words you write somewhere special. These reflections stay on this device so kids can return to them any time.
          </p>
        </div>
        <div className="glass-effect rounded-3xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {worksheetSections.map(section => {
              const completed = worksheetResponses[section.id].filter(Boolean).length
              const total = section.prompts.length
              const isActive = section.id === activeWorksheetSection
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveWorksheetSection(section.id)}
                  className={`text-left rounded-2xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-400 ${
                    isActive ? 'border-secondary-400 shadow-lg' : 'border-transparent'
                  }`}
                >
                  <div className={`rounded-2xl p-4 bg-gradient-to-r ${section.color} h-full`}>
                    <p className="text-sm uppercase tracking-wide text-gray-700 mb-1">{section.title}</p>
                    <p className="text-gray-700 text-sm mb-3">{section.summary}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                      <Star className="w-4 h-4" />
                      {completed}/{total} prompts filled
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
        <div className="glass-effect rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 text-gray-900">
            <Heart className="w-6 h-6 text-secondary-500" />
            <div>
              <h3 className="text-2xl font-bold">{currentWorksheetSection.title}</h3>
              <p className="text-sm text-gray-600">{currentWorksheetSection.summary}</p>
            </div>
          </div>
          <div className="space-y-6">
            {currentWorksheetSection.prompts.map((prompt, index) => (
              <div key={prompt} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-100 text-secondary-700 font-bold">
                    {index + 1}
                  </span>
                  {prompt}
                </label>
                <textarea
                  value={worksheetResponses[currentWorksheetSection.id][index]}
                  onChange={(event) => handleWorksheetResponse(currentWorksheetSection.id, index, event.target.value)}
                  rows={3}
                  placeholder="Type your thoughts here..."
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 p-4 text-gray-800 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sleep and nutrition impact quiz */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-16"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-primary-600 mb-2">
            <Brain className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-900">Sleep & Nutrition Impact Quiz</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose the answer that feels right. The correct answer glows red after you respond, and you'll see the supported idea written in italics before moving on.
          </p>
        </div>
        {quizCompleted ? (
          <div className="glass-effect rounded-3xl p-6 md:p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Reflection complete</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              You scored {quizScore} / {sleepNutritionQuestions.length}
            </h3>
            <p className="text-gray-600 mb-6">
              Every question connected healthy sleep, food, and feelings. Review the prompts anytime to keep building confidence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold"
            >
              Try the quiz again
            </motion.button>
          </div>
        ) : (
          <div className="glass-effect rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>Question {quizIndex + 1} of {sleepNutritionQuestions.length}</span>
              <span>Confidence check</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentQuizQuestion.question}</h3>
            <p className="text-sm text-gray-600 mb-6">{currentQuizQuestion.context}</p>
            <div className="space-y-3 mb-6">
              {currentQuizQuestion.options.map(option => {
                const isSelected = quizSelectedOption === option.id
                const isCorrect = option.isAnswer
                const showCorrect = quizShowSupport && isCorrect
                return (
                  <button
                    key={option.id}
                    onClick={() => handleQuizAnswer(option.id)}
                    disabled={quizShowSupport}
                    className={`w-full text-left border-2 rounded-2xl p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      showCorrect
                        ? 'border-red-400 bg-red-50 text-red-800'
                        : isSelected
                          ? 'border-primary-300 bg-primary-50 text-gray-900'
                          : 'border-gray-200 bg-white/80 text-gray-800 hover:border-primary-200'
                    }`}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
            {quizShowSupport && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-gray-800 mb-4">
                <p className="font-semibold text-red-700 mb-1">Supported idea</p>
                <p className="italic">({currentQuizQuestion.supportIdea})</p>
              </div>
            )}
            {quizShowSupport && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuizNext}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
              >
                {quizIndex === sleepNutritionQuestions.length - 1 ? 'See results' : 'Next question'}
              </motion.button>
            )}
          </div>
        )}
      </motion.section>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
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

