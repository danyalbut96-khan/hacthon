"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ShieldCheck, Sparkles, Users, Pill } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import type { MedicineResult } from "@/types/medicine"
import Hero from "@/components/Hero"
import ResultCard from "@/components/ResultCard"
import SubstituteCard from "@/components/SubstituteCard"
import LoadingState from "@/components/LoadingState"
import ErrorState from "@/components/ErrorState"
import SearchHistory from "@/components/SearchHistory"
import CompareDrawer from "@/components/CompareDrawer"

const popularMedicines = [
  "Panadol",
  "Brufen",
  "Augmentin",
  "Disprin",
  "Flagyl",
  "Risek",
  "Nexium",
  "Amoxil",
]

const pillTypes = [
  { value: "all", label: "All" },
  { value: "tablet", label: "Tablet" },
  { value: "syrup", label: "Syrup" },
  { value: "injection", label: "Injection" },
  { value: "cream", label: "Cream" },
  { value: "drops", label: "Drops" },
] as const

type PillType = (typeof pillTypes)[number]["value"]
const SEARCH_HISTORY_KEY = "medibridge.history"

export default function HomePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<PillType>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicineResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const resultRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const savedHistory = typeof window !== "undefined" ? window.localStorage.getItem(SEARCH_HISTORY_KEY) : null
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (err) {
        console.error("Failed to parse search history", err)
      }
    }
  }, [])

  const saveHistory = (query: string) => {
    const normalized = query.trim()
    const nextHistory = [normalized, ...searchHistory.filter((item) => item !== normalized)].slice(0, 5)
    setSearchHistory(nextHistory)
    window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory))
  }

  const handleSearch = async (query: string) => {
    const normalized = query.trim()
    if (normalized.length < 2) {
      setError("Please enter at least two characters")
      setResult(null)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: normalized }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "AI service unavailable. Please try again.")
      }

      saveHistory(normalized)
      setResult(data as MedicineResult)

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSubstitutes = useMemo(() => {
    if (!result) return []
    return result.substitutes.filter((substitute) => typeFilter === "all" || substitute.type === typeFilter)
  }, [result, typeFilter])

  const clearHistory = () => {
    setSearchHistory([])
    window.localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.12),_transparent_30%),#0A0F1E] animate-meshMove" />

      <Hero
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        onQueryChange={setSearchQuery}
        onTypeChange={setTypeFilter}
        onSearch={handleSearch}
        isLoading={isLoading}
        popularMedicines={popularMedicines}
        onSelectPopular={(value) => {
          setSearchQuery(value)
          handleSearch(value)
        }}
        history={searchHistory}
        onSelectHistory={(value) => {
          setSearchQuery(value)
          handleSearch(value)
        }}
        onRemoveHistory={(value) => {
          const nextHistory = searchHistory.filter((item) => item !== value)
          setSearchHistory(nextHistory)
          window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory))
        }}
        onClearHistory={clearHistory}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div ref={resultRef} className="pt-10" />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="mb-12"
            >
              <LoadingState />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="mb-12"
            >
              <ErrorState
                message={error}
                suggestions={popularMedicines}
                onRetry={() => handleSearch(searchQuery)}
              />
            </motion.div>
          ) : result ? (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
                <ResultCard medicine={result.originalMedicine} warning={result.warning} disclaimer={result.disclaimer} />

                <div className="space-y-6">
                  <div className="glass-card border border-white/10 p-8 shadow-[0_35px_120px_rgba(14,165,233,0.08)]">
                    <div className="flex items-center gap-3 text-slate-200">
                      <Pill className="h-6 w-6 text-cyan-300" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Quick Summary</p>
                        <h2 className="text-2xl font-black text-white">{filteredSubstitutes.length} alternatives</h2>
                      </div>
                    </div>
                    <div className="mt-8 grid gap-4">
                      <div className="rounded-3xl bg-slate-950/70 p-5 border border-white/10">
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-400 mb-3">Availability</p>
                        <div className="grid gap-3">
                          <div className="flex justify-between text-slate-200 text-sm font-bold">
                            <span>High</span>
                            <span>{result.substitutes.filter((item) => item.availability === "high").length}</span>
                          </div>
                          <div className="flex justify-between text-slate-200 text-sm font-bold">
                            <span>Medium</span>
                            <span>{result.substitutes.filter((item) => item.availability === "medium").length}</span>
                          </div>
                          <div className="flex justify-between text-slate-200 text-sm font-bold">
                            <span>Low</span>
                            <span>{result.substitutes.filter((item) => item.availability === "low").length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/70 p-5 border border-white/10">
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-400 mb-3">Pricing signal</p>
                        <div className="flex items-center justify-between gap-4">
                          <div className="rounded-3xl bg-cyan-500/10 px-4 py-3 text-cyan-200 font-black">Cheaper</div>
                          <div className="rounded-3xl bg-slate-700 px-4 py-3 text-slate-200 font-black">Same</div>
                          <div className="rounded-3xl bg-amber-500/10 px-4 py-3 text-amber-200 font-black">Expensive</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card border border-white/10 p-8 shadow-[0_35px_120px_rgba(14,165,233,0.08)]">
                    <div className="flex items-center gap-3 text-slate-200 mb-4">
                      <ShieldCheck className="h-6 w-6 text-emerald-300" />
                      <h3 className="text-lg font-black text-white">Safety first</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      Review each substitute carefully and consult your local pharmacist. MediBridge is designed to help you compare medicines, not to replace professional diagnosis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-black">{t("found")}</p>
                    <h2 className="text-3xl font-black text-white">{filteredSubstitutes.length} substitutes found</h2>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-slate-950/70 px-5 py-3 border border-white/10 shadow-lg shadow-cyan-500/10">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                    <span className="text-slate-200 font-bold">{typeFilter === "all" ? "All medicine types" : `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} only`}</span>
                  </div>
                </div>

                {showNoSubstitutes ? (
                  <div className="glass-card border border-white/10 p-12 text-center text-slate-300">
                    No substitutes match the selected type. Try a different filter or search another medicine.
                  </div>
                ) : (
                  <div className="grid gap-6 xl:grid-cols-2">
                    {filteredSubstitutes.map((substitute) => (
                      <SubstituteCard key={substitute.id} substitute={substitute} />
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        {!result && !error && !isLoading && (
          <section className="mt-16 pb-20">
            <div className="rounded-[3rem] border border-white/10 bg-slate-950/60 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Type Medicine Name",
                    description: "Enter any branded or generic medicine available in Pakistan.",
                  },
                  {
                    number: "02",
                    title: "AI Analyzes Instantly",
                    description: "The system checks active ingredients and local availability.",
                  },
                  {
                    number: "03",
                    title: "Get Affordable Alternatives",
                    description: "Compare substitute prices, brands and availability immediately.",
                  },
                ].map((item) => (
                  <div key={item.number} className="glass-card border border-white/10 p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-500 text-white text-xl font-black shadow-lg shadow-cyan-500/20">
                      {item.number}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <CompareDrawer />
    </main>
  )
}
