import PortfolioPage from '@/components/PortfolioPage'
import { VILLA_LISTINGS } from '@/lib/data'

export const metadata = {
  title: 'Villas — Theo · JC Bali Property',
  description: 'Browse all 25+ curated villas for sale and lease in Bali, by Jaya Carita Bali Property.',
}

export default function VillasRoute() {
  return <PortfolioPage kind="villa" listings={VILLA_LISTINGS} />
}
