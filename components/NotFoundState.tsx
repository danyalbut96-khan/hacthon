"use client"

import { useLanguage } from "@/lib/LanguageContext"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFoundState({ query, suggestions }: { query: string, suggestions: string[] }) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-8xl mb-8"
      >
        💊
      </motion.div>
      <h3 className="text-3xl font-black text-slate-900 mb-4">{t("no_result")}</h3>
      <p className="text-slate-500 max-w-md mb-12 font-medium">
        We couldn't find any results for <span className="text-blue-600 font-bold">"{query}"</span>. 
        Try checking the spelling or search by generic salt name.
      </p>

      <div className="w-full max-w-lg">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Suggested Medicines</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => window.location.href = `/search?q=${encodeURIComponent(s)}`}
              className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
