'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Heart, Activity, BookOpen, Sparkles, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const links = [
    { href: '/', label: t('nav.home'), icon: <Home className="w-4 h-4" /> },
    { href: '/activities', label: 'Activities', icon: <Activity className="w-4 h-4" /> },
    { href: '/parent-guide', label: t('nav.parentGuide'), icon: <BookOpen className="w-4 h-4" /> },
    { href: '/body-guide', label: 'Changes & Body', icon: <Heart className="w-4 h-4" /> },
    { href: '/resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/diary', label: t('nav.diary'), icon: <Sparkles className="w-4 h-4" /> },
    { href: '/team', label: 'Team', icon: <Users className="w-4 h-4" />, special: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-effect shadow-lg backdrop-blur-xl bg-white/90' 
        : 'glass-effect bg-white/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
            <motion.span 
              className="font-bold text-lg md:text-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent hidden sm:inline"
              whileHover={{ scale: 1.05 }}
            >
              Parenting Hub
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ y: -2, scale: link.special ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? link.special 
                        ? 'text-white'
                        : 'text-white'
                      : link.special
                        ? 'text-gray-700 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                        : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-xl shadow-md ${
                        link.special
                          ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-purple-500/30'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/30'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.special && !isActive(link.href) && (
                    <motion.div
                      animate={{
                        background: [
                          'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                          'linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                          'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl opacity-50"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon}
                    <span className="font-medium text-sm whitespace-nowrap">{link.label}</span>
                    {link.special && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs"
                      >
                        ⭐
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-blue-50 transition-colors relative"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(link.href)
                          ? link.special
                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30'
                          : link.special
                            ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 active:bg-gradient-to-r active:from-blue-100 active:via-purple-100 active:to-pink-100'
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                      }`}
                    >
                      <motion.div
                        animate={isActive(link.href) ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {link.icon}
                      </motion.div>
                      <span className="font-medium">{link.label}</span>
                      {link.special && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-xs ml-1"
                        >
                          ⭐
                        </motion.span>
                      )}
                      {isActive(link.href) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
