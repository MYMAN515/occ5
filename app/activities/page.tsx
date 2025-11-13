'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Gamepad2, Puzzle, Target, Heart, Brain, 
  Droplets, Sparkles, BookOpen, Calendar, 
  ThumbsUp, ThumbsDown, RotateCcw, CheckCircle
} from 'lucide-react'
import { useState } from 'react'

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  const quickActivities = [
    {
      id: 'timeline',
      title: 'Timeline Game',
      description: 'Match changes to before or after puberty',
      icon: <Target className="w-8 h-8" />,
      color: 'from-blue-400 to-cyan-500',
      href: '/timeline',
      emoji: '🎯'
    },
    {
      id: 'matching',
      title: 'Matching Game',
      description: 'Match related items together',
      icon: <Puzzle className="w-8 h-8" />,
      color: 'from-pink-400 to-rose-500',
      href: '/games',
      emoji: '🧩'
    },
    {
      id: 'diary',
      title: 'Mood Diary',
      description: 'Track your feelings and thoughts',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-purple-400 to-indigo-500',
      href: '/diary',
      emoji: '📝'
    },
    {
      id: 'hygiene',
      title: 'Hygiene Builder',
      description: 'Build your daily routine',
      icon: <Droplets className="w-8 h-8" />,
      color: 'from-cyan-400 to-blue-500',
      href: '/hygiene',
      emoji: '🧼'
    },
    {
      id: 'confidence',
      title: 'Habit Tracker',
      description: 'Build healthy habits one at a time',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      href: '/confidence',
      emoji: '⭐'
    },
    {
      id: 'quiz',
      title: 'Quick Quiz',
      description: 'Test your knowledge about puberty',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      href: '/changes',
      emoji: '🧠'
    }
  ]

  const parentResources = [
    {
      id: 'guide',
      title: 'Parent Guide',
      description: 'Expert advice and tips',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      href: '/parent-guide',
      emoji: '📚'
    },
    {
      id: 'chat',
      title: 'Parent Helper',
      description: 'Quick answers to common questions',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      href: '#',
      emoji: '💬',
      onClick: () => {
        // Trigger chatbot
        const chatButton = document.querySelector('[aria-label*="chat"], [aria-label*="Chat"]') as HTMLElement
        if (chatButton) chatButton.click()
      }
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Gamepad2 className="w-16 h-16 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Activities & Games
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Fun and educational activities for kids and helpful resources for parents! 🎮✨
        </p>
      </motion.div>

      {/* For Kids Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">👶</span>
            For Kids
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link href={activity.href}>
                <div className="glass-effect rounded-3xl p-6 h-full cursor-pointer card-hover">
                  <div className={`bg-gradient-to-r ${activity.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4`}>
                    {activity.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{activity.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                    Play Now →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* For Parents Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">👨‍👩‍👧</span>
            For Parents
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {parentResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {resource.onClick ? (
                <div
                  onClick={resource.onClick}
                  className="glass-effect rounded-3xl p-6 h-full cursor-pointer card-hover"
                >
                  <div className={`bg-gradient-to-r ${resource.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4`}>
                    {resource.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{resource.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-800">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                  <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                    Open Helper →
                  </div>
                </div>
              ) : (
                <Link href={resource.href}>
                  <div className="glass-effect rounded-3xl p-6 h-full cursor-pointer card-hover">
                    <div className={`bg-gradient-to-r ${resource.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4`}>
                      {resource.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{resource.emoji}</span>
                      <h3 className="text-xl font-bold text-gray-800">{resource.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                    <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                      Read More →
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-3xl p-6 md:p-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">💡 Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>All activities are safe and educational - perfect for learning!</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>Parents can explore activities together with their children</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>No account needed - everything works right away!</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>All data stays private on your device</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

