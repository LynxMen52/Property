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
  title: 'AYU BALI — Private Property Curator & Investment Consultant',
  description: 'A personal Bali property curator helping discerning clients discover premium land and villa opportunities. Bali villas, investment land, and lifestyle estates — privately curated.',
  keywords: 'Bali villa, Bali property investment, luxury Bali real estate, Bali land for sale, Canggu villa, Uluwatu villa, Bali investment consultant',
  openGraph: {
    title: 'AYU BALI — Private Property Curator',
    description: 'Curated villa & land opportunities in Bali for foreign investors and lifestyle buyers.',
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
