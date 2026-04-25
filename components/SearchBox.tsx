"use client"

import { Search, ArrowRight, Loader2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/LanguageContext"

interface SearchBoxProps {
  query: string
  typeFilter: string
  onQueryChange: (value: string) => void
  onTypeChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

const filterOptions = [
  { value: "all", label: "All" },
  { value: "tablet", label: "Tablet" },
  { value: "syrup", label: "Syrup" },
  { value: "injection", label: "Injection" },
  { value: "cream", label: "Cream" },
  { value: "drops", label: "Drops" },
]

export default function SearchBox({ query, typeFilter, onQueryChange, onTypeChange, onSubmit, isLoading }: SearchBoxProps) {
  const { t } = useLanguage()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="space-y-4"
    >
      <div className="glass-card flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_35px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-300" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full rounded-[1.5rem] border border-white/10 bg-transparent py-4 pl-14 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
          />
        </div>

        <div className="flex items-center gap-4 md:w-[220px]">
          <label className="sr-only">Type</label>
          <div className="relative flex-1 rounded-[1.5rem] border border-white/10 bg-slate-950/30 py-4 pl-4 pr-10 text-white shadow-inner">
            <select
              value={typeFilter}
              onChange={(event) => onTypeChange(event.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-white outline-none appearance-none"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#0A0F1E] text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-slate-950 shadow-[0_20px_50px_rgba(14,165,233,0.25)] transition hover:opacity-95 active:scale-[0.98]",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {t("search_btn")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-slate-400">Press Enter to search</p>
    </form>
  )
}
