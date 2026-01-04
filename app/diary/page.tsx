'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Calendar, Smile, Meh, Frown, Heart, CalendarDays } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from 'date-fns'
import { safeLocalStorage } from '@/utils/storage'
import { useLanguage } from '@/contexts/LanguageContext'

type Mood = 'happy' | 'neutral' | 'sad' | 'excited' | 'anxious'
type Entry = {
  id: string
  date: string
  mood: Mood
  content: string
}

export default function DiaryPage() {
  const { t } = useLanguage()
  const diary = t<any>('diary')
  const [entries, setEntries] = useState<Entry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [currentMood, setCurrentMood] = useState<Mood>('happy')
  const [currentContent, setCurrentContent] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Load entries from localStorage
  useEffect(() => {
    const saved = safeLocalStorage.getItem('puberty-diary')
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch (error) {
        console.warn('Unable to parse saved diary entries', error)
      }
    }
  }, [])

  // Save entries to localStorage
  useEffect(() => {
    if (entries.length > 0) {
      safeLocalStorage.setItem('puberty-diary', JSON.stringify(entries))
    } else {
      safeLocalStorage.removeItem('puberty-diary')
    }
  }, [entries])

  const moods = [
    { value: 'happy', icon: '😊', label: diary?.moods?.happy, color: 'from-yellow-400 to-orange-400' },
    { value: 'neutral', icon: '😐', label: diary?.moods?.neutral, color: 'from-gray-400 to-gray-500' },
    { value: 'sad', icon: '😢', label: diary?.moods?.sad, color: 'from-blue-400 to-blue-500' },
    { value: 'excited', icon: '🤩', label: diary?.moods?.excited, color: 'from-pink-400 to-purple-500' },
    { value: 'anxious', icon: '😰', label: diary?.moods?.anxious, color: 'from-orange-400 to-red-500' },
  ]

  const addEntry = () => {
    if (!currentContent.trim()) return

    const newEntry: Entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: currentMood,
      content: currentContent.trim()
    }

    setEntries([newEntry, ...entries])
    setCurrentContent('')
    setShowForm(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const getMoodData = (mood: Mood) => moods.find(m => m.value === mood) || moods[0]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {diary?.header}
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          {diary?.description}
        </p>
      </motion.div>

      {/* View Toggle and Add Entry Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 space-y-4"
      >
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`flex-1 glass-effect rounded-2xl p-4 flex items-center justify-center gap-3 font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'text-gray-700 hover:border-2 hover:border-primary-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            {diary?.views?.list}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('calendar')}
            className={`flex-1 glass-effect rounded-2xl p-4 flex items-center justify-center gap-3 font-semibold transition-all ${
              viewMode === 'calendar'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'text-gray-700 hover:border-2 hover:border-primary-400'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            {diary?.views?.calendar}
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="w-full glass-effect rounded-2xl p-6 flex items-center justify-center gap-3 font-semibold text-lg text-gray-700 hover:border-2 hover:border-primary-400 transition-all"
        >
          <Plus className="w-6 h-6" />
          {showForm ? diary?.cancel : diary?.addEntry}
        </motion.button>
      </motion.div>

      {/* Entry Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <div className="glass-effect rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{diary?.howFeeling}</h3>
              
              {/* Mood Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {moods.map((mood) => (
                  <motion.button
                    key={mood.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMood(mood.value as Mood)}
                    className={`p-4 rounded-xl transition-all ${
                      currentMood === mood.value
                        ? `bg-gradient-to-r ${mood.color} text-white shadow-lg`
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    <div className="text-3xl mb-1">{mood.icon}</div>
                    <div className="text-sm font-medium">{mood.label}</div>
                  </motion.button>
                ))}
              </div>

              {/* Text Area */}
              <textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder={diary?.placeholder}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none mb-4 min-h-[150px] resize-none"
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addEntry}
                disabled={!currentContent.trim()}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  currentContent.trim()
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {diary?.saveEntry}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass-effect rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label={diary?.calendar?.previous}
              >
                ←
              </motion.button>
              <h3 className="text-xl font-bold text-gray-800">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label={diary?.calendar?.next}
              >
                →
              </motion.button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {(diary?.calendar?.weekdays || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((day: string) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {(() => {
                const monthStart = startOfMonth(currentMonth)
                const monthEnd = endOfMonth(currentMonth)
                const calendarStart = startOfWeek(monthStart)
                const calendarEnd = endOfWeek(monthEnd)
                const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

                return days.map((day, index) => {
                  const dayEntry = entries.find(entry => isSameDay(new Date(entry.date), day))
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth()
                  const isToday = isSameDay(day, new Date())

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className={`aspect-square rounded-xl p-2 ${
                        !isCurrentMonth ? 'opacity-30' : ''
                      } ${
                        isToday ? 'ring-2 ring-primary-500' : ''
                      } ${
                        dayEntry ? `bg-gradient-to-br ${getMoodData(dayEntry.mood).color} text-white` : 'bg-gray-50'
                      }`}
                    >
                      <div className="text-xs font-semibold mb-1">{format(day, 'd')}</div>
                      {dayEntry && (
                        <div className="text-lg">{getMoodData(dayEntry.mood).icon}</div>
                      )}
                    </motion.div>
                  )
                })
              })()}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                {diary?.note}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Entries List */}
      {viewMode === 'list' && (
      <div className="space-y-4">
        <AnimatePresence>
          {entries.length === 0 && !showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-effect rounded-2xl p-12 text-center"
            >
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{diary?.listEmpty}</p>
            </motion.div>
          )}

          {entries.map((entry, index) => {
            const moodData = getMoodData(entry.mood)
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${moodData.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                      {moodData.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{moodData.label}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(entry.date), 'PPP')}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 glass-effect rounded-2xl p-6 md:p-8"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">{diary?.tips?.title}</h3>
        <ul className="space-y-2 text-gray-700">
          <li>{diary?.tips?.regular}</li>
          <li>{diary?.tips?.honest}</li>
          <li>{diary?.tips?.lookback}</li>
          <li>{diary?.tips?.valid}</li>
        </ul>
      </motion.div>
    </div>
  )
}
