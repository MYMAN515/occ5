'use client'

import { motion } from 'framer-motion'
import { useProgress } from '@/contexts/ProgressContext'
import { Trophy, CheckCircle, BookOpen, Sparkles, Activity } from 'lucide-react'
import Link from 'next/link'

export default function ProgressWidget() {
  const { progress, getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  const stats = [
    {
      label: 'Activities',
      value: Object.keys(progress.activities).filter(id => progress.activities[id].completed).length,
      icon: <Activity className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Quizzes',
      value: Object.keys(progress.quizzes).length,
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Diary Entries',
      value: progress.diaryEntries,
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-pink-500 to-pink-600'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-blue-600" />
          Your Progress
        </h3>
        <Link
          href="/#quick-links"
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
        >
          View All →
        </Link>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-blue-600">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`bg-gradient-to-r ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white mx-auto mb-2`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3 text-center">
          {overallProgress === 100 
            ? "🎉 Amazing! You've completed everything!" 
            : overallProgress > 50
            ? "Great progress! Keep going! 💪"
            : "Start exploring activities to track your progress!"}
        </p>
        <Link
          href="/#quick-links"
          className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Explore Activities
        </Link>
      </div>
    </motion.div>
  )
}

