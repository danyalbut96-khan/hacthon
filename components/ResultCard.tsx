"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Info, Pill, Building2, FlaskConical, Banknote } from "lucide-react"
import { Medicine } from "@/types/medicine"

interface ResultCardProps {
  medicine: Medicine
  warning?: string
  disclaimer?: string
}

export default function ResultCard({ medicine, warning, disclaimer }: ResultCardProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card overflow-hidden border border-white/10 bg-slate-950/60 shadow-[0_40px_120px_rgba(0,0,0,0.3)]"
      >
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 px-8 py-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Pill className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">{medicine.name}</h2>
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mt-1">Searched Medicine</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-full bg-slate-900/80 px-4 py-2 border border-white/10 text-slate-300 text-sm font-bold">
                {medicine.type.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <FlaskConical className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Active Salt / Formulation</span>
              </div>
              <p className="text-xl font-bold text-white bg-slate-900/50 p-4 rounded-2xl border border-white/5">{medicine.salt}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <Building2 className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Manufacturer</span>
              </div>
              <p className="text-lg text-slate-200 font-medium">{medicine.manufacturer}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <Banknote className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Approximate Price</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">PKR {medicine.estimatedPrice}</span>
                <span className="text-slate-500 text-sm font-medium">/ pack</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <Info className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Primary Uses</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">{medicine.uses}</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
           <div className="flex flex-wrap gap-2">
              {medicine.sideEffects.map((effect, index) => (
                <span key={index} className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/5 text-slate-400 text-xs font-medium">
                  • {effect}
                </span>
              ))}
           </div>
        </div>
      </motion.div>

      {warning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-6 flex gap-4"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
          <div>
            <h4 className="text-amber-200 font-black text-sm uppercase tracking-widest mb-1">Medical Warning</h4>
            <p className="text-amber-200/80 text-sm leading-relaxed">{warning}</p>
          </div>
        </motion.div>
      )}

      {disclaimer && (
        <p className="text-center text-slate-500 text-xs px-10 italic">
          Disclaimer: {disclaimer}
        </p>
      )}
    </div>
  )
}
