"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Pill, ShieldCheck, Banknote, Sparkles, Star } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import SearchBox from "./SearchBox"
import SearchHistory from "./SearchHistory"

interface HeroProps {
  searchQuery: string
  typeFilter: string
  onQueryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onSearch: (query: string) => void
  isLoading: boolean
  popularMedicines: string[]
  onSelectPopular: (value: string) => void
  history: string[]
  onSelectHistory: (value: string) => void
  onRemoveHistory: (value: string) => void
  onClearHistory: () => void
}

export default function Hero({
  searchQuery,
  typeFilter,
  onQueryChange,
  onTypeChange,
  onSearch,
  isLoading,
  popularMedicines,
  onSelectPopular,
  history,
  onSelectHistory,
  onRemoveHistory,
  onClearHistory,
}: HeroProps) {
  const { t } = useLanguage()

  return (
    <section id="search" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-80 bg-[linear-gradient(135deg,_rgba(14,165,233,0.18)_0%,_rgba(16,185,129,0.16)_35%,_rgba(245,158,11,0.12)_75%,_rgba(10,15,30,1)_100%)]" />
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-10 top-24 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200 shadow-[0_24px_60px_rgba(14,165,233,0.12)]">
              <Pill className="h-5 w-5 text-cyan-300" />
              Live AI substitute discovery
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {t("hero_title")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {t("hero_subtitle")}
              </p>
              <p className="max-w-2xl text-base leading-7 text-slate-400 font-medium urdu">
                پاکستان کے لیے اے آئی سے چلنے والا دوائی متبادل فائنڈر
              </p>
            </div>

            <div className="space-y-6">
              <SearchBox
                query={searchQuery}
                typeFilter={typeFilter}
                onQueryChange={onQueryChange}
                onTypeChange={onTypeChange}
                onSubmit={() => onSearch(searchQuery)}
                isLoading={isLoading}
              />
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="font-bold uppercase tracking-[0.3em] text-cyan-300">Popular:</span>
                {popularMedicines.map((medicine) => (
                  <button
                    key={medicine}
                    type="button"
                    onClick={() => onSelectPopular(medicine)}
                    className="glass-card rounded-full border border-white/10 px-4 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    {medicine}
                  </button>
                ))}
              </div>
            </div>

            {history.length > 0 && (
              <SearchHistory
                history={history}
                onSelect={onSelectHistory}
                onRemove={onRemoveHistory}
                onClear={onClearHistory}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "10,000+", description: "medicines" },
                { label: "500+", description: "pharma brands" },
                { label: "Free", description: "forever" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-[2rem] border border-white/10 px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                  <p className="text-3xl font-black text-white">{item.label}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[420px] w-full max-w-md">
              <div className="absolute inset-0 rounded-[3rem] bg-slate-900/60 shadow-[0_50px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl" />
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl" />

              <div className="pill-3d absolute left-1/2 top-1/3 -translate-x-1/2 rotate-12 shadow-[0_35px_90px_rgba(14,165,233,0.25)]"></div>
              <div className="pill-3d absolute left-10 top-32 h-24 w-52 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_30px_60px_rgba(245,158,11,0.22)] animate-pulse-slow"></div>
              <div className="pill-3d absolute right-10 top-24 h-16 w-36 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_25px_45px_rgba(16,185,129,0.25)] animate-pulse-fast"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
