'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Bed, Bath, Maximize, Phone, Mail, Instagram } from 'lucide-react'
import { WHATSAPP, EMAIL, INSTAGRAM, PHONE_DISPLAY, OFFICE_URL, OFFICE_ADDR, TRANSLATIONS } from '@/lib/data'

export default function PortfolioPage({ kind, listings }) {
  const [lang, setLang] = useState('en')
  const t = TRANSLATIONS[lang]
  const isVilla = kind === 'villa'

  return (
    <main className="bg-[#f5f1ea] min-h-screen text-[#1a1a1a]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#f5f1ea]/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-display leading-none">
            THEO <span className="italic font-light">· jc bali</span>
            <span className="block text-[9px] uppercase tracking-luxe mt-1 text-[#1a1a1a]/50 font-sans">Jaya Carita Bali Property</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-luxe">
              {['en','id','ru'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full transition ${lang===l ? 'bg-[#1a1a1a] text-[#f5f1ea]' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/" className="text-[11px] uppercase tracking-luxe hover:opacity-60">{t.back_home}</Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
               className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe px-5 py-3 rounded-full border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f1ea] transition-all">
              {t.wa_now} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Header */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-16">
        <div className="max-w-[1500px] mx-auto">
          <motion.span initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
            className="text-[11px] uppercase tracking-luxe text-[#8a5a3b] flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#8a5a3b]" />
            {isVilla ? t.nav_villas : t.nav_lands} · {listings.length} {t.total_properties}
          </motion.span>
          <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1, delay:0.1, ease:[0.22,1,0.36,1]}}
            className="font-serif text-5xl md:text-8xl tracking-display leading-[0.95]">
            {isVilla ? t.villas_title : t.lands_title}
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.9, delay:0.3}}
            className="mt-8 max-w-2xl text-lg text-[#2b2926]/75 leading-relaxed">
            {isVilla ? t.villas_sub : t.lands_sub}
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1500px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {listings.map((p, i) => (
            <motion.a key={p.id} href={p.href} target="_blank" rel="noreferrer"
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:0.1}}
              transition={{duration:0.7, delay:(i%3)*0.05}}
              className="group block">
              <div className="relative overflow-hidden aspect-[4/5] bg-[#1a1a1a]">
                <img src={p.img} alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/10" />
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-luxe bg-[#f5f1ea]/90 backdrop-blur text-[#1a1a1a] px-2.5 py-1">{p.tag}</span>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <p className="text-[10px] uppercase tracking-luxe flex items-center gap-1.5 mb-2 text-white/75">
                    <MapPin size={11} /> {p.loc}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl tracking-display leading-tight">{p.name}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#2b2926]/70">
                <div className="flex items-center gap-3">
                  {isVilla && p.beds && <span className="flex items-center gap-1"><Bed size={12}/>{p.beds}</span>}
                  {isVilla && p.baths && <span className="flex items-center gap-1"><Bath size={12}/>{p.baths}</span>}
                  <span className="flex items-center gap-1"><Maximize size={12}/>{p.sqm.toLocaleString()} m²</span>
                </div>
                <span className="font-serif italic text-[#8a5a3b] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View <ArrowUpRight size={12}/>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Mini footer */}
      <footer className="bg-[#1a1a1a] text-[#f5f1ea] px-6 md:px-12 py-16">
        <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="font-serif text-3xl md:text-4xl tracking-display">THEO <span className="italic font-light text-[#b5896a]">· jc bali</span></p>
            <p className="text-[#f5f1ea]/60 mt-4 max-w-md text-sm">Personal property guidance across Bali. Backed by the full Jaya Carita Bali portfolio.</p>
          </div>
          <ul className="space-y-3 text-[#f5f1ea]/80 text-sm">
            <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#b5896a]"><Phone size={14}/> {PHONE_DISPLAY}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-[#b5896a]"><Mail size={14}/> {EMAIL}</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#b5896a]"><Instagram size={14}/> @Theo_JCPropertyagent</a></li>
            <li><a href={OFFICE_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-[#b5896a]"><MapPin size={14} className="mt-0.5"/> {OFFICE_ADDR}</a></li>
          </ul>
        </div>
      </footer>
    </main>
  )
}
