import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'THEO — Bali Property Curator | Jaya Carita Bali Property',
  description: 'Theo, your personal Bali property advisor at Jaya Carita Bali Property. Curated land, villa, and investment opportunities across Canggu, Ubud, Uluwatu, Cemagi and beyond.',
  keywords: 'Bali villa, Bali land for sale, Bali property investment, Jaya Carita Bali, Canggu land, Ubud land, Cemagi land, Bali leasehold, Bali freehold, Theo Bali agent',
  openGraph: {
    title: 'THEO — Bali Property Curator',
    description: 'Curated land & villa opportunities in Bali, with Jaya Carita Bali Property.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#f5f1ea] text-[#1a1a1a] antialiased">
        {children}
      </body>
    </html>
  )
}
