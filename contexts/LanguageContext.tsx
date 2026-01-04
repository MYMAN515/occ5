'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { safeLocalStorage } from '@/utils/storage'
import enTranslations from '@/translations/en.json'

export type Language = 'en' | 'ar' | 'ms' | 'zh'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: <T = string>(key: string) => T
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<any>(enTranslations)

  useEffect(() => {
    // Load saved language from localStorage
    const saved = safeLocalStorage.getItem('app-language')
    if (saved && ['en', 'ar', 'ms', 'zh'].includes(saved)) {
      setLanguageState(saved as Language)
    }
  }, [])

  useEffect(() => {
    // Load translations for current language
    import(`@/translations/${language}.json`).then((module) => {
      setTranslations(module.default)
    })
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    safeLocalStorage.setItem('app-language', lang)
    // Update HTML dir attribute for RTL support
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = lang
    }
  }

  const t = <T = string>(key: string): T => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key as T
    }

    return (value || key) as T
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
