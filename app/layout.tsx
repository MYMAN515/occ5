import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import AIChat from '@/components/AIChat'
import WelcomeCheck from '@/components/WelcomeCheck'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Parenting Hub - Supporting Your Child Through Puberty',
  description: 'A comprehensive guide for parents to understand and support their children during puberty. Includes expert advice, interactive games, and AI assistance in English, Arabic, and Malay.',
  keywords: ['parenting', 'puberty', 'education', 'child development', 'adolescence', 'family', 'البلوغ', 'akil baligh'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Parenting Hub',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#9333EA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <LanguageProvider>
          <WelcomeCheck>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <AIChat />
          </WelcomeCheck>
        </LanguageProvider>
      </body>
    </html>
  )
}
