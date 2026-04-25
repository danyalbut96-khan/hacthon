"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Pill, Globe, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ur" : "en")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09111f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-white transition hover:opacity-90">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-500 shadow-lg shadow-cyan-500/20">
              <Pill className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">MediBridge</p>
              <p className="text-xl font-black text-white">Medicine Alternative AI</p>
            </div>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-200">
              <Link href="#search" className="transition hover:text-cyan-300">Home</Link>
              <Link href="/about" className="transition hover:text-cyan-300">About</Link>
            </nav>

            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-300"
            >
              {language === "en" ? "اردو" : "English"}
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <Globe className="h-4 w-4" />
              Pakistan
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-[#08101f]/95 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.3)] md:hidden">
            <Link href="#search" onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-cyan-300">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-cyan-300">
              About
            </Link>
            <button
              type="button"
              onClick={() => {
                toggleLanguage()
                setIsOpen(false)
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/10 hover:text-cyan-300"
            >
              {language === "en" ? "اردو" : "English"}
            </button>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Pakistan
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
