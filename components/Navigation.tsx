'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  Heart,
  Activity,
  BookOpen,
  Sparkles,
  Users,
  Brain,
  Library,
  BookHeart,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    {
      type: 'link',
      href: '/',
      label: t('nav.home'),
      icon: <Home className="w-4 h-4" />,
    },
    {
      type: 'group',
      label: t('nav.forChildren'),
      icon: <Sparkles className="w-4 h-4" />,
      key: 'children',
      children: [
        { href: '/body-image-activities', label: t('nav.bodyImage'), icon: <Heart className="w-4 h-4" /> },
        { href: '/what-i-like-about-me', label: t('nav.selfReflection'), icon: <BookHeart className="w-4 h-4" /> },
        { href: '/quizzes', label: t('nav.quizzes'), icon: <Brain className="w-4 h-4" /> },
      ],
    },
    {
      type: 'group',
      label: t('nav.forParents'),
      icon: <Users className="w-4 h-4" />,
      key: 'parents',
      children: [
        { href: '/parent-guide', label: t('nav.parentGuide'), icon: <BookOpen className="w-4 h-4" /> },
        { href: '/developmental-changes', label: t('nav.developmental'), icon: <Activity className="w-4 h-4" /> },
        { href: '/resources', label: t('nav.resources'), icon: <Library className="w-4 h-4" /> },
      ],
    },
    {
      type: 'link',
      href: '/team',
      label: t('nav.about'),
      icon: <Users className="w-4 h-4" />,
      special: true,
    },
  ] as const

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenGroup(null)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

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
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link key={item.label} href={item.href}>
                    <motion.div
                      whileHover={{ y: -2, scale: item.special ? 1.05 : 1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-white'
                          : item.special
                            ? 'text-gray-700 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                            : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 rounded-xl shadow-md ${
                            item.special
                              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-purple-500/30'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/30'
                          }`}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {item.special && !isActive(item.href) && (
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                              'linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                              'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-0 rounded-xl opacity-50"
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                        {item.special && (
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
                )
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(item.key)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    onClick={() => setOpenGroup(openGroup === item.key ? null : item.key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                      item.children.some((child) => isActive(child.href))
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    aria-expanded={openGroup === item.key}
                  >
                    {item.icon}
                    <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                  </button>
                  <AnimatePresence>
                    {openGroup === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 p-3 space-y-1"
                      >
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <div
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                                isActive(child.href)
                                  ? 'bg-blue-50 text-blue-700 font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {child.icon}
                              <span className="text-sm">{child.label}</span>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
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
                {navItems.map((item, index) => {
                  if (item.type === 'link') {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive(item.href)
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30'
                              : item.special
                                ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 active:bg-gradient-to-r active:from-blue-100 active:via-purple-100 active:to-pink-100'
                                : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                          }`}
                        >
                          <motion.div
                            animate={isActive(item.href) ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="font-medium">{item.label}</span>
                          {item.special && (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-xs ml-1"
                            >
                              ⭐
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="px-4"
                    >
                      <button
                        onClick={() => setOpenGroup(openGroup === item.key ? null : item.key)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl text-gray-800 font-semibold bg-gray-50"
                        aria-expanded={openGroup === item.key}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                        <span aria-hidden>{openGroup === item.key ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {openGroup === item.key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-1"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                                  isActive(child.href)
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {child.icon}
                                <span className="text-sm">{child.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
