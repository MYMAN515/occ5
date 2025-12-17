'use client'

import Link from 'next/link'
import { HeartHandshake, ShieldCheck, Smartphone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const infoLinks = [
  { href: '/parent-guide', key: 'parentGuide' },
  { href: '/guidance', key: 'guidance' },
  { href: '/#quick-links', key: 'games' },
  { href: '/diary', key: 'diary' },
]

const languages = ['English', 'العربية', 'Bahasa Melayu', '中文']

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 text-white mt-20 pt-10 pb-8 safe-area-bottom">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold">
              <HeartHandshake className="w-3 h-3" />
              {t('footer.tagline')}
            </div>
            <h2 className="text-lg font-bold leading-tight">{t('footer.title')}</h2>
            <p className="text-xs text-white/90 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-3">
              {t('footer.links.title') || 'Quick Links'}
            </p>
            <ul className="space-y-1.5">
              {infoLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>{t(`footer.links.${link.key}`) || link.key}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-3">
              {t('footer.languagesLabel') || 'Languages'}
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((label) => (
                <span key={label} className="px-2.5 py-1.5 rounded-lg border border-white/20 bg-white/10 text-xs text-white/80">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* PWA Info */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-3">
              {t('footer.pwa.title') || 'Install App'}
            </p>
            <div className="bg-white/10 border border-white/20 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <p className="text-xs font-semibold">{t('footer.pwa.headline') || 'Install as App'}</p>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {t('footer.pwa.instructions') || 'Add to your home screen for easy access anytime, anywhere.'}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 text-center text-xs text-white/70 space-y-1">
          <p>{t('footer.rights') || '© 2025 Parenting Hub. All rights reserved.'}</p>
          <p>{t('footer.communityNote') || 'Made with 💙 to support families through puberty education'}</p>
        </div>
      </div>
    </footer>
  )
}
