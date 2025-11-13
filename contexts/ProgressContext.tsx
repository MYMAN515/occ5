'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ProgressData {
  activities: {
    [key: string]: {
      completed: boolean
      score?: number
      completedAt?: string
    }
  }
  quizzes: {
    [key: string]: {
      score: number
      total: number
      completedAt: string
    }
  }
  diaryEntries: number
  lastUpdated: string
}

interface ProgressContextType {
  progress: ProgressData
  markActivityComplete: (activityId: string, score?: number) => void
  markQuizComplete: (quizId: string, score: number, total: number) => void
  addDiaryEntry: () => void
  clearProgress: () => void
  getActivityProgress: (activityId: string) => boolean
  getOverallProgress: () => number
}

const defaultProgress: ProgressData = {
  activities: {},
  quizzes: {},
  diaryEntries: 0,
  lastUpdated: new Date().toISOString()
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress)

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('parenting-hub-progress')
    if (stored) {
      try {
        setProgress(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever progress changes
    localStorage.setItem('parenting-hub-progress', JSON.stringify(progress))
  }, [progress])

  const markActivityComplete = (activityId: string, score?: number) => {
    setProgress(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activityId]: {
          completed: true,
          score,
          completedAt: new Date().toISOString()
        }
      },
      lastUpdated: new Date().toISOString()
    }))
  }

  const markQuizComplete = (quizId: string, score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizzes: {
        ...prev.quizzes,
        [quizId]: {
          score,
          total,
          completedAt: new Date().toISOString()
        }
      },
      lastUpdated: new Date().toISOString()
    }))
  }

  const addDiaryEntry = () => {
    setProgress(prev => ({
      ...prev,
      diaryEntries: prev.diaryEntries + 1,
      lastUpdated: new Date().toISOString()
    }))
  }

  const clearProgress = () => {
    setProgress(defaultProgress)
    localStorage.removeItem('parenting-hub-progress')
  }

  const getActivityProgress = (activityId: string): boolean => {
    return progress.activities[activityId]?.completed || false
  }

  const getOverallProgress = (): number => {
    const totalActivities = 6 // Timeline, Matching, Diary, Hygiene, Confidence, Quiz
    const completedActivities = Object.keys(progress.activities).filter(
      id => progress.activities[id].completed
    ).length
    return Math.round((completedActivities / totalActivities) * 100)
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markActivityComplete,
        markQuizComplete,
        addDiaryEntry,
        clearProgress,
        getActivityProgress,
        getOverallProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

