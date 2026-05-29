'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight, MapPin, Bed, Bath, Maximize, Phone, Mail, Instagram,
  ChevronDown, Sparkles, TreePalm, TrendingUp, ShieldCheck, Globe2, Star, Menu, X
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */
const NAV = [
  { label: 'Collection', href: '#collection' },
  { label: 'Bali Life', href: '#lifestyle' },
  { label: 'Invest', href: '#invest' },
  { label: 'Voices', href: '#voices' },
  { label: 'Contact', href: '#contact' },
]

const PROPERTIES = [
  {
    id: 'jimbaran-36are',
    name: 'Prime 36 Are Land',
    location: 'Jimbaran — Close to the Beach',
    sqm: 3600,
    tag: 'Freehold · For Sale',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2025/10/freehold-36R-850x570.jpg',
    href: 'https://jcbaliproperty.com/property/prime-36-are-land-for-sale-in-jimbaran-close-to-the-beach/',
    blurb: 'A rare 3,600 m² freehold parcel in Jimbaran, walking distance to the beach. Exceptional for resort, villa estate, or long-hold investment.',
  },
  {
    id: 'kerambitan-6500',
    name: 'Strategic Land',
    location: 'Kerambitan — 6,500 m²',
    sqm: 6500,
    tag: 'For Sale · Investment',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2026/03/65are2.jpg',
    href: 'https://jcbaliproperty.com/property/strategic-land-for-sale-in-kerambitan-great-investment-opportunity/',
    blurb: 'A landmark 65-are parcel in Tabanan’s emerging Kerambitan corridor. Strategic location for boutique resort or master-planned community.',
  },
  {
    id: 'cemagi-coastal',
    name: 'Cemagi Coastal Pink Zone',
    location: 'Cemagi — 800 m²',
    sqm: 800,
    tag: 'Leasehold',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2025/09/Untitled-design-3-850x570.jpg',
    href: 'https://jcbaliproperty.com/property/balis-hidden-jewel-8-are-land-in-cemagi-coastal-pink-zone/',
    blurb: 'Bali’s hidden jewel — 8 are within the protected coastal pink zone of Cemagi. Sea breeze, low-density, full villa permissions.',
  },
  {
    id: 'cemagi-32are',
    name: 'Spacious 32 Are',
    location: 'Cemagi — Ocean Breeze',
    sqm: 1700,
    tag: 'Leasehold',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2025/09/2-17r-cemagi-1140x764.jpg',
    href: 'https://jcbaliproperty.com/property/spacious-32-are-land-with-ocean-breeze-in-cemagi/',
    blurb: 'A generous 1,700 m² leasehold parcel kissed by the ocean breeze. Ideal canvas for a tropical estate or multi-villa development.',
  },
  {
    id: 'ubud-petulu',
    name: 'Riverside Land — Petulu',
    location: 'Ubud — 900 m²',
    sqm: 900,
    tag: 'Leasehold',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2026/05/ubud-9r-1.jpg',
    href: 'https://jcbaliproperty.com/property/riverside-land-for-lease-in-petulu-ubud/',
    blurb: 'A riverside sanctuary tucked into Petulu, north of Ubud. Mature trees, water rights, and the kind of silence Ubud is built for.',
  },
  {
    id: 'babakan-investment',
    name: 'Prime Investment Land',
    location: 'Babakan — Near Beach',
    sqm: 500,
    tag: 'Leasehold · High Value',
    img: 'https://jcbaliproperty.com/wp-content/uploads/2025/10/Untitled-design-14-850x570.jpg',
    href: 'https://jcbaliproperty.com/property/prime-investment-land-in-babakan-high-value-location-near-the-beach/',
    blurb: 'A high-value 5-are parcel in Babakan’s tightest beachside pocket. Walk to the sand, ride to Canggu — yield-ready land.',
  },
]

const STATS = [
  { value: '15–20%', label: 'Avg. annual yield on premium villa rentals', icon: TrendingUp },
  { value: '6.5M+',  label: 'International visitors to Bali in 2024',       icon: Globe2 },
  { value: '8–12%',  label: 'Annual capital appreciation in prime zones',   icon: Sparkles },
  { value: '100%',   label: 'Legal structures for foreign ownership',       icon: ShieldCheck },
]

const TESTIMONIALS = [
  {
    quote: 'Ayu found us a parcel that wasn’t on any market. Two years later, the villa is built and yielding 18%. She is the only person I would trust in Bali.',
    name: 'Marc D.',
    role: 'Founder, Lisbon',
  },
  {
    quote: 'It felt less like buying property and more like being introduced to the island. Every detail — notary, zoning, design — was already considered.',
    name: 'Sasha & Elena K.',
    role: 'Investors, Dubai',
  },
  {
    quote: 'I was sceptical about Bali. Ayu changed that in a single afternoon of driving. The home she curated for us is now where we spend half the year.',
    name: 'James R.',
    role: 'CEO, Singapore',
  },
]

const LIFESTYLE_IMAGES = [
  'https://images.pexels.com/photos/35428411/pexels-photo-35428411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  'https://images.pexels.com/photos/7980413/pexels-photo-7980413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  'https://images.pexels.com/photos/33799012/pexels-photo-33799012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  'https://images.pexels.com/photos/6190475/pexels-photo-6190475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
]

const WHATSAPP = 'https://wa.me/6281918238875?text=Hi%20Theo%2C%20I%27m%20interested%20in%20exploring%20Bali%20property%20opportunities%20with%20Jaya%20Carita%20Bali.'
const INSTAGRAM = 'https://instagram.com/Theo_JCPropertyagent'
const EMAIL = 'tsinjal52@gmail.com'
const PHONE_DISPLAY = '+62 819 1823 8875'
const OFFICE_URL = 'https://maps.app.goo.gl/umG3aRvZ4qjTqKXq6'
const OFFICE_ADDR = 'Jalan Betaka No 3a, Dalung, Kuta Utara, Badung, Bali 80361'

/* -------------------------------------------------------------------------- */
/* Reusable animations                                                        */
/* -------------------------------------------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#f5f1ea]/85 backdrop-blur-xl border-b border-black/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#top" className={`font-serif text-xl md:text-2xl tracking-display transition-colors leading-none ${
          scrolled ? 'text-[#1a1a1a]' : 'text-white'
        }`}>
          THEO<span className="italic font-light"> · jc bali</span>
          <span className={`block text-[9px] uppercase tracking-luxe mt-1 font-sans not-italic ${scrolled ? 'text-[#1a1a1a]/50' : 'text-white/60'}`}>Jaya Carita Bali Property</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}
               className={`text-[11px] uppercase tracking-luxe transition-colors hover:opacity-60 ${
                 scrolled ? 'text-[#1a1a1a]' : 'text-white/90'
               }`}>
              {n.label}
            </a>
          ))}
        </nav>

        <a href={WHATSAPP} target="_blank" rel="noreferrer"
           className={`hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe px-5 py-3 rounded-full border transition-all ${
             scrolled
               ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f1ea]'
               : 'border-white/70 text-white hover:bg-white hover:text-[#1a1a1a]'
           }`}>
          Begin a Conversation <ArrowUpRight size={14} />
        </a>

        <button onClick={() => setOpen(true)} className={`md:hidden ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1a1a] z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center">
              <span className="font-serif text-2xl text-[#f5f1ea]">THEO <span className="italic font-light">· jc bali</span></span>
              <button onClick={() => setOpen(false)} className="text-[#f5f1ea]"><X size={24} /></button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-8">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                   className="font-serif text-4xl text-[#f5f1ea] hover:text-[#b5896a] transition">
                  {n.label}
                </a>
              ))}
            </nav>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-[#f5f1ea] border border-[#f5f1ea]/50 px-6 py-4 justify-center rounded-full">
              WhatsApp Theo <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[#1a1a1a]">
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <video
          autoPlay loop muted playsInline
          poster="https://images.pexels.com/photos/35043038/pexels-photo-35043038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
          className="w-full h-full object-cover scale-110 kenburns"
        >
          <source src="https://videos.pexels.com/video-files/2169307/2169307-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-[1500px] mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}
          className="text-[11px] uppercase tracking-luxe text-white/80 mb-6 flex items-center gap-3"
        >
          <span className="w-10 h-px bg-white/50" />
          Theo — Digital Marketing at Jaya Carita Bali Property
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white text-[14vw] md:text-[7.5vw] leading-[0.92] tracking-display max-w-[1200px]"
        >
          Your Bali story, <span className="italic font-light">begins</span>
          <br />with land.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="text-white/85 max-w-md text-[15px] leading-relaxed">
            I&apos;m Theo. I help foreign investors, founders and lifestyle buyers discover the right land and villa opportunities in Bali — backed by the trusted portfolio of Jaya Carita Bali Property.
          </p>
          <div className="flex items-center gap-4">
            <a href="#collection"
               className="inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-white border border-white/60 px-6 py-4 rounded-full hover:bg-white hover:text-[#1a1a1a] transition-all duration-500">
              View the Collection <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function Marquee() {
  const words = ['Uluwatu', 'Canggu', 'Ubud', 'Pererenan', 'Bingin', 'Seseh', 'Sayan', 'Berawa']
  return (
    <div className="py-8 border-y border-black/10 bg-[#ebe4d8] overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {words.map((w, j) => (
              <span key={`${i}-${j}`} className="font-serif text-3xl md:text-5xl px-8 italic text-[#1a1a1a]/80">
                {w} <span className="text-[#b5896a]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 px-6 md:px-12 bg-[#f5f1ea]">
      <div className="max-w-[1500px] mx-auto grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-5 relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#ebe4d8]">
            <img
              src="https://images.pexels.com/photos/14524357/pexels-photo-14524357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=900"
              alt="Ayu, private property curator in Bali"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#1a1a1a] text-[#f5f1ea] px-6 py-4 hidden md:block">
            <p className="font-serif italic text-sm">"My role is to listen first."</p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-7"
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#8a5a3b]" /> About
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-[0.98] tracking-display mb-10">
            I am Ayu. <span className="italic font-light text-[#8a5a3b]">A quiet introduction</span> to the right Bali.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#2b2926]/80 text-lg leading-relaxed mb-6 max-w-xl">
            For nearly a decade I have walked clients through this island — not as a broker, but as a curator. I source what the market never sees: land held by families, villas sold before listing, parcels that will define the next coastline.
          </motion.p>
          <motion.p variants={fadeUp} className="text-[#2b2926]/80 text-lg leading-relaxed mb-12 max-w-xl">
            I work with a small number of buyers each year. Investors, founders, lifestyle owners. People who understand that the best opportunities are introduced, not advertised.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8 pt-8 border-t border-black/10">
            <div>
              <p className="font-serif text-4xl tracking-display">25<span className="text-[#8a5a3b]">+</span></p>
              <p className="text-xs uppercase tracking-luxe text-[#2b2926]/60 mt-1">Active Listings</p>
            </div>
            <div>
              <p className="font-serif text-4xl tracking-display">12<span className="text-[#8a5a3b]">+</span></p>
              <p className="text-xs uppercase tracking-luxe text-[#2b2926]/60 mt-1">Bali Regions</p>
            </div>
            <div>
              <p className="font-serif text-4xl tracking-display">1<span className="text-[#8a5a3b]">on1</span></p>
              <p className="text-xs uppercase tracking-luxe text-[#2b2926]/60 mt-1">Personal Guidance</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Collection() {
  return (
    <section id="collection" className="py-28 md:py-40 px-6 md:px-12 bg-[#ebe4d8]">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
        >
          <div>
            <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#8a5a3b]" /> The Collection
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl tracking-display leading-[0.98] max-w-3xl">
              Six parcels, <span className="italic font-light">selected this season.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-[#2b2926]/70 max-w-sm">
            A live selection from our full portfolio of 25+ active land and villa opportunities — refreshed continually. Each property is visited, photographed, and pre-cleared by our notary team.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {PROPERTIES.map((p, i) => (
            <motion.a
              href={p.href || WHATSAPP} target="_blank" rel="noreferrer"
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group block"
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-[#1a1a1a]">
                <img
                  src={p.img} alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] uppercase tracking-luxe bg-[#f5f1ea]/90 backdrop-blur text-[#1a1a1a] px-3 py-1.5">{p.tag}</span>
                </div>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white">
                  <p className="text-[10px] uppercase tracking-luxe flex items-center gap-2 mb-3 text-white/80">
                    <MapPin size={11} /> {p.location}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl tracking-display mb-2">{p.name}</h3>
                  <p className="text-sm text-white/80 max-w-md leading-relaxed">{p.blurb}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-5 text-xs text-[#2b2926]/70">
                  <span className="flex items-center gap-1.5"><Maximize size={13}/> {p.sqm.toLocaleString()} m²</span>
                  <span className="hidden sm:inline text-[#2b2926]/40">·</span>
                  <span className="hidden sm:inline uppercase tracking-luxe text-[10px]">View on JC Bali</span>
                </div>
                <span className="font-serif text-base italic text-[#8a5a3b] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Details <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-[#2b2926]/60 italic font-serif mb-6">
            — Off-market opportunities available upon request —
          </p>
          <a href="https://jcbaliproperty.com/land/" target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe text-[#1a1a1a] border border-[#1a1a1a] px-8 py-4 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f1ea] transition-all duration-500">
            See the Full Portfolio at JCBali <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Lifestyle() {
  return (
    <section id="lifestyle" className="relative py-28 md:py-40 px-6 md:px-12 bg-[#f5f1ea] overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-20"
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#8a5a3b]" /> A way of living
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl tracking-display leading-[0.98]">
            Mornings in the rice fields. <span className="italic font-light text-[#8a5a3b]">Evenings on the cliff.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-lg text-[#2b2926]/75 leading-relaxed">
            Bali isn’t a destination. It is a daily rhythm — ocean before breakfast, work in linen shadows, dinner under bougainvillea. A home here doesn’t sit on a balance sheet. It becomes the place your year revolves around.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-12 grid-rows-2 gap-4 md:gap-6 h-[120vh] md:h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="col-span-12 md:col-span-7 row-span-2 overflow-hidden"
          >
            <img src={LIFESTYLE_IMAGES[0]} alt="Bali rice terrace" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="col-span-6 md:col-span-5 row-span-1 overflow-hidden"
          >
            <img src={LIFESTYLE_IMAGES[2]} alt="Bali beach club" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="col-span-6 md:col-span-5 row-span-1 overflow-hidden"
          >
            <img src={LIFESTYLE_IMAGES[3]} alt="Bali pool resort" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
        </div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-12 md:gap-20 border-t border-black/10 pt-16"
        >
          {[
            { t: 'Surf at dawn', d: 'World-class breaks fifteen minutes from your gate. From mellow Berawa to glassy Bingin.' },
            { t: 'Work in stillness', d: 'Bamboo studios, gigabit fibre, and the kind of quiet that produces real thinking.' },
            { t: 'Dine like a local', d: 'A constellation of restaurants from warungs to chef-driven institutions — we know the tables.' },
          ].map((item, i) => (
            <motion.div variants={fadeUp} key={i}>
              <p className="font-serif text-2xl mb-3 italic text-[#8a5a3b]">0{i+1}</p>
              <h4 className="font-serif text-2xl mb-3">{item.t}</h4>
              <p className="text-sm text-[#2b2926]/70 leading-relaxed">{item.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Invest() {
  return (
    <section id="invest" className="relative py-28 md:py-40 px-6 md:px-12 bg-[#1a1a1a] text-[#f5f1ea] overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 mb-24 items-end"
        >
          <div>
            <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-[#b5896a] flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#b5896a]" /> Why Bali
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-7xl tracking-display leading-[0.98]">
              The numbers <span className="italic font-light text-[#b5896a]">behind the dream.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-[#f5f1ea]/70 text-lg leading-relaxed">
            Bali has quietly become one of the world’s most resilient investment destinations — a tropical Lisbon with the demand of Dubai and the soul of Kyoto. The data tells the story.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-[#f5f1ea]/10"
        >
          {STATS.map((s, i) => (
            <motion.div
              variants={fadeUp} key={i}
              className="bg-[#1a1a1a] p-8 md:p-10 group hover:bg-[#2b2926] transition-colors duration-700"
            >
              <s.icon className="text-[#b5896a] mb-8" size={26} strokeWidth={1.2} />
              <p className="font-serif text-5xl md:text-6xl tracking-display mb-4">{s.value}</p>
              <p className="text-sm text-[#f5f1ea]/65 leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-24 grid md:grid-cols-3 gap-px bg-[#f5f1ea]/10"
        >
          {[
            { t: 'Ownership, secured.', d: 'PT PMA, leasehold, hak pakai — we structure ownership the way blue-chip law firms do, never the way agents do.' },
            { t: 'Due diligence, total.', d: 'Title chain, zoning, water table, road access, neighbour intent. Every parcel is forensically vetted before you visit.' },
            { t: 'Rental, managed.', d: 'A vetted partner network operates your villa to five-star standards — transparent monthly statements, no friction.' },
          ].map((c, i) => (
            <motion.div variants={fadeUp} key={i} className="bg-[#1a1a1a] p-8 md:p-12">
              <span className="font-serif text-[#b5896a] italic text-lg mb-6 block">0{i+1} —</span>
              <h4 className="font-serif text-3xl mb-4 tracking-display">{c.t}</h4>
              <p className="text-[#f5f1ea]/65 leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Voices() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="voices" className="py-28 md:py-40 px-6 md:px-12 bg-[#ebe4d8]">
      <div className="max-w-[1100px] mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-[#8a5a3b]" /> Voices
          <span className="w-10 h-px bg-[#8a5a3b]" />
        </motion.span>

        <div className="flex justify-center gap-1 mb-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="fill-[#b5896a] text-[#b5896a]" />
          ))}
        </div>

        <div className="relative min-h-[340px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif italic text-2xl md:text-4xl leading-[1.3] tracking-display text-[#1a1a1a] mb-10">
                “{TESTIMONIALS[idx].quote}”
              </p>
              <p className="text-sm uppercase tracking-luxe text-[#1a1a1a]">{TESTIMONIALS[idx].name}</p>
              <p className="text-xs text-[#2b2926]/60 mt-2">{TESTIMONIALS[idx].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-px transition-all duration-500 ${idx === i ? 'w-12 bg-[#1a1a1a]' : 'w-6 bg-[#1a1a1a]/30'}`}
              aria-label={`Voice ${i+1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 bg-[#f5f1ea] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <img src="https://images.pexels.com/photos/37610710/pexels-photo-37610710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-[1500px] mx-auto grid md:grid-cols-12 gap-12 items-center">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="md:col-span-7"
        >
          <motion.span variants={fadeUp} className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#8a5a3b]" /> Begin
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-6xl md:text-8xl tracking-display leading-[0.95] mb-10">
            Tell me what you’re looking for.
            <br /><span className="italic font-light text-[#8a5a3b]">I’ll do the rest.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[#2b2926]/75 max-w-xl leading-relaxed mb-12">
            Conversations begin with WhatsApp — it is how we work here. Tell me your budget, your timeline, and the kind of life you imagine. I’ll come back within a day with three opportunities, all off-market.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
               className="group inline-flex items-center gap-3 text-sm uppercase tracking-luxe bg-[#25D366] text-white px-8 py-5 rounded-full hover:bg-[#1ebe57] transition-all duration-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp Theo Now <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href={`mailto:${EMAIL}`}
               className="inline-flex items-center gap-3 text-sm uppercase tracking-luxe border border-[#1a1a1a] text-[#1a1a1a] px-8 py-5 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f1ea] transition-all duration-500">
              Email Theo <Mail size={14} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="md:col-span-5"
        >
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-10 rounded-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]">
            <p className="text-xs uppercase tracking-luxe text-[#8a5a3b] mb-8">The Process</p>
            {[
              { n: '01', t: 'Conversation', d: 'A 30-minute call. We discover the right kind of property for your life.' },
              { n: '02', t: 'Curation', d: 'Three to five opportunities, hand-selected and pre-vetted.' },
              { n: '03', t: 'Discovery Trip', d: 'I host you on the island. We visit, we sense, we choose.' },
              { n: '04', t: 'Acquisition', d: 'Notary, structure, contracts. White-glove from offer to keys.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 py-4 border-b border-black/10 last:border-0">
                <span className="font-serif italic text-2xl text-[#8a5a3b] w-8">{step.n}</span>
                <div>
                  <p className="font-serif text-lg mb-1">{step.t}</p>
                  <p className="text-sm text-[#2b2926]/70 leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#f5f1ea] px-6 md:px-12 pt-24 pb-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 pb-20 border-b border-[#f5f1ea]/10">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl md:text-5xl tracking-display mb-3">
              THEO <span className="italic font-light text-[#b5896a]">· jc bali</span>
            </p>
            <p className="text-xs uppercase tracking-luxe text-[#f5f1ea]/50 mb-6">Digital Marketing — Jaya Carita Bali Property</p>
            <p className="text-[#f5f1ea]/60 max-w-md leading-relaxed">
              Personal property guidance across Bali — from prime land in Cemagi and Babakan to villa investments in Uluwatu and Ubud. Backed by the full Jaya Carita Bali portfolio.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-luxe text-[#b5896a] mb-6">Explore</p>
            <ul className="space-y-3 text-[#f5f1ea]/80">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-[#b5896a] transition">{n.label}</a></li>
              ))}
              <li><a href="https://jcbaliproperty.com/" target="_blank" rel="noreferrer" className="hover:text-[#b5896a] transition">JC Bali Portfolio</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-luxe text-[#b5896a] mb-6">Direct line to Theo</p>
            <ul className="space-y-4 text-[#f5f1ea]/80">
              <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#b5896a] transition"><Phone size={14}/> {PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-[#b5896a] transition"><Mail size={14}/> {EMAIL}</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#b5896a] transition"><Instagram size={14}/> @Theo_JCPropertyagent</a></li>
              <li><a href={OFFICE_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-[#b5896a] transition"><MapPin size={14} className="mt-1 shrink-0"/> <span>{OFFICE_ADDR}</span></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f5f1ea]/40">
          <p>© {new Date().getFullYear()} Theo · Jaya Carita Bali Property. All listings sourced from <a href="https://jcbaliproperty.com/" target="_blank" rel="noreferrer" className="underline hover:text-[#b5896a]">jcbaliproperty.com</a></p>
          <p className="flex items-center gap-2">
            <TreePalm size={12} className="text-[#b5896a]" /> Crafted with stillness, in Bali.
          </p>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.6 }}
      href={WHATSAPP} target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      aria-label="WhatsApp Theo"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </motion.a>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */
function App() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Collection />
      <Lifestyle />
      <Invest />
      <Voices />
      <CTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

export default App
