"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Clock, X } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

interface SearchHistoryProps {
  history: string[]
  onSelect: (query: string) => void
  onRemove: (query: string) => void
  onClear: () => void
}

export default function SearchHistory({ history, onSelect, onRemove, onClear }: SearchHistoryProps) {
  const { t } = useLanguage()

  if (history.length === 0) {
    return null
  }

  return (
    <div className="glass-card border border-white/10 bg-slate-950/70 p-5 shadow-[0_35px_90px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-cyan-300">
          <Clock className="h-4 w-4" />
          <span>{t("recent")}</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
        >
          {t("clear_all")}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <AnimatePresence>
          {history.map((item) => (
            <motion.button
              key={item}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => onSelect(item)}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-500/10"
            >
              <span>{item}</span>
              <X
                className="h-3 w-3 text-slate-400 transition group-hover:text-amber-300"
                onClick={(event) => {
                  event.stopPropagation()
                  onRemove(item)
                }}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
