"use client"

import React, { useEffect, useState } from "react"
import { X, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"

interface SearchHistoryProps {
  onSelect: (query: string) => void
}

export default function SearchHistory({ onSelect }: SearchHistoryProps) {
  const [history, setHistory] = useState<string[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const removeFromHistory = (item: string) => {
    const newHistory = history.filter((h) => h !== item)
    setHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  const clearAll = () => {
    setHistory([])
    localStorage.removeItem("searchHistory")
  }

  if (history.length === 0) return null

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-wider">
          <Clock className="h-4 w-4" />
          <span>{t("recent_searches")}</span>
        </div>
        <button
          onClick={clearAll}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {t("clear_all")}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {history.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <span 
                onClick={() => onSelect(item)}
                className="text-sm font-medium text-slate-700"
              >
                {item}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromHistory(item)
                }}
                className="text-slate-400 hover:text-red-500 p-0.5 rounded-full hover:bg-slate-100 transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
