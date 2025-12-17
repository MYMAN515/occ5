'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage, Language } from '@/contexts/LanguageContext'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇯🇴' },
    { code: 'ms', name: 'Melayu', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ]

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  const currentLang = languages.find(l => l.code === language) || languages[0]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all"
      >
        <Globe className="w-5 h-5 text-primary-600" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium text-gray-700 hidden sm:inline">{currentLang.name}</span>
      </motion.button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 glass-effect rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[200px]"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-gray-800">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary-600">✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
}
