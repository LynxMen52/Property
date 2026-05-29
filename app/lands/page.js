import PortfolioPage from '@/components/PortfolioPage'
import { LAND_LISTINGS } from '@/lib/data'

export const metadata = {
  title: 'Land — Theo · JC Bali Property',
  description: 'Browse all 25+ curated land parcels for lease and sale across Bali, by Jaya Carita Bali Property.',
}

export default function LandsRoute() {
  return <PortfolioPage kind="land" listings={LAND_LISTINGS} />
}
