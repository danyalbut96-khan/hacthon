"use client"

import { motion } from "framer-motion"
import { AlertCircle, RefreshCw, Search } from "lucide-react"

interface ErrorStateProps {
  message: string
  suggestions?: string[]
  onRetry?: () => void
}

export default function ErrorState({ message, suggestions, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card mx-auto max-w-2xl border border-rose-500/20 bg-slate-950/60 p-12 text-center shadow-[0_40px_120px_rgba(244,63,94,0.1)]"
    >
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-rose-500/10 text-rose-500 shadow-lg shadow-rose-500/5">
        <AlertCircle className="h-12 w-12" />
      </div>
      
      <h3 className="text-3xl font-black text-white mb-4">Something went wrong</h3>
      <p className="text-lg text-slate-300 mb-10 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-black text-slate-950 transition hover:bg-cyan-50 shadow-lg shadow-white/10"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-black text-white transition hover:bg-white/10"
        >
          <Search className="h-5 w-5" />
          New Search
        </button>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Try searching for these common medicines:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.slice(0, 4).map((s) => (
              <span key={s} className="px-4 py-2 rounded-full bg-slate-900/50 border border-white/5 text-slate-400 text-sm font-bold">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
