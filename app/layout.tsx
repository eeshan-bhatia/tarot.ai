import type { Metadata } from 'next'
import { Cinzel, Playfair_Display, Crimson_Text } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const crimson = Crimson_Text({ 
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'Tarot.ai - AI-Powered Tarot Readings',
  description: 'Get personalized tarot card readings powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${playfair.variable} ${crimson.variable} font-serif`}>{children}</body>
    </html>
  )
}

