'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, HeartHandshake, BookOpen, Library, Users, Sparkles, ChevronDown, Gamepad2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

type NavLink = {
  href: string
  label: string
  icon: ReactNode
  description?: string
  highlight?: boolean
}

type NavGroup = {
  id: string
  label: string
  icon: ReactNode
  items: NavLink[]
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  const parentLinks: NavLink[] = [
    { href: '/parent-guide', label: t('nav.parentGuide'), icon: <BookOpen className="w-4 h-4" />, description: t('home.features.parentGuide.description') },
    { href: '/body-guide', label: t('nav.developmentalChanges'), icon: <HeartHandshake className="w-4 h-4" />, description: t('home.features.bodyGuide.description') },
    { href: '/resources', label: t('nav.resourceLibrary'), icon: <Library className="w-4 h-4" /> }
  ]

  const navItems: (NavGroup | NavLink)[] = [
    { href: '/', label: t('nav.home'), icon: <Home className="w-4 h-4" /> },
    {
      href: '/#quick-links',
      label: t('nav.games'),
      icon: <Gamepad2 className="w-4 h-4" aria-hidden />,
      description: t('games.subtitle'),
      highlight: true
    },
    { id: 'parents', label: t('nav.forParents'), icon: <HeartHandshake className="w-4 h-4" />, items: parentLinks },
    { href: '/team', label: t('nav.about'), icon: <Users className="w-4 h-4" /> }
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
    setOpenMenu(null)
  }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const renderLink = (link: NavLink) => (
    <Link key={link.href} href={link.href} className="relative" aria-label={link.label}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
          isActive(link.href)
            ? 'text-white'
            : link.highlight
              ? 'text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-100 shadow-md ring-1 ring-purple-100 font-semibold'
              : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        {isActive(link.href) && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
          {link.icon}
          <span className="whitespace-nowrap">{link.label}</span>
        </span>
      </motion.div>
    </Link>
  )

  const renderGroup = (group: NavGroup) => {
    const activeChild = group.items.some((item) => isActive(item.href))
    return (
      <div
        key={group.id}
        className="relative"
        onMouseEnter={() => setOpenMenu(group.id)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          onClick={() => setOpenMenu(openMenu === group.id ? null : group.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${activeChild ? 'text-white' : 'text-gray-700 hover:text-blue-600'} relative`}
        >
          {activeChild && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {group.icon}
            <span className="font-medium text-sm whitespace-nowrap">{group.label}</span>
            <ChevronDown className="w-3 h-3" />
          </span>
        </button>
        <AnimatePresence>
          {openMenu === group.id && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 mt-2 w-64 rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden"
            >
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-start gap-3 px-4 py-3 text-left hover:bg-blue-50 ${isActive(item.href) ? 'bg-blue-50' : ''}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    {item.description && <p className="text-xs text-gray-600 leading-tight">{item.description}</p>}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg backdrop-blur-xl bg-white/90' : 'glass-effect bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
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

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => ('items' in item ? renderGroup(item as NavGroup) : renderLink(item as NavLink)))}
            <div className="ml-2 pl-2 border-l border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>

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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                {navItems.map((item) => {
                  if ('items' in item) {
                    const group = item as NavGroup
                    const activeChild = group.items.some((link) => isActive(link.href))
                    return (
                      <div key={group.id} className="bg-white rounded-2xl border border-gray-100">
                        <button
                          onClick={() => setOpenMenu(openMenu === group.id ? null : group.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left font-semibold ${activeChild ? 'text-blue-700' : 'text-gray-800'}`}
                        >
                          <span className="flex items-center gap-2">
                            {group.icon}
                            {group.label}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition ${openMenu === group.id ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openMenu === group.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-gray-100"
                            >
                              {group.items.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`flex items-center gap-3 px-4 py-3 ${isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
                                >
                                  {link.icon}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{link.label}</span>
                                    {link.description && <span className="text-xs text-gray-600">{link.description}</span>}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  const linkItem = item as NavLink
                  return (
                    <Link
                      key={linkItem.href}
                      href={linkItem.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(linkItem.href)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/30'
                          : linkItem.highlight
                            ? 'bg-purple-50 text-purple-800 border border-purple-100 shadow-sm'
                            : 'text-gray-700 hover:bg-blue-50 active:bg-blue-100'
                      }`}
                    >
                      {linkItem.icon}
                      <span className="font-medium">{linkItem.label}</span>
                      {isActive(linkItem.href) && <span className="ml-auto w-2 h-2 bg-white rounded-full" />}
                    </Link>
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

