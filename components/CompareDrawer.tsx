"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRightLeft } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"

interface ComparisonItem {
  id: string
  name: string
  estimatedPrice: number
  manufacturer: string
  availability: string
  rating: number
}

export default function CompareDrawer() {
  const [selected, setSelected] = useState<ComparisonItem[]>([])
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem("compareList")
      if (saved) setSelected(JSON.parse(saved))
    }
    
    window.addEventListener("compare-update", handleUpdate)
    handleUpdate()
    
    return () => window.removeEventListener("compare-update", handleUpdate)
  }, [])

  const removeItem = (id: string) => {
    const newList = selected.filter(i => i.id !== id)
    localStorage.setItem("compareList", JSON.stringify(newList))
    window.dispatchEvent(new Event("compare-update"))
  }

  const clearAll = () => {
    localStorage.removeItem("compareList")
    window.dispatchEvent(new Event("compare-update"))
  }

  if (selected.length < 2) return null

  const cheapest = [...selected].sort((a, b) => a.estimatedPrice - b.estimatedPrice)[0]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t-4 border-blue-600 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[3rem]"
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <ArrowRightLeft className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">{t("compare")}</h3>
            </div>
            <button
              onClick={clearAll}
              className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              {t("clear_comparison")}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left border-b-2 border-slate-50"></th>
                  {selected.map((item) => (
                    <th key={item.id} className="p-4 text-center border-b-2 border-slate-50 min-w-[200px]">
                      <div className="relative group">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-2 -right-2 bg-slate-100 hover:bg-red-500 hover:text-white p-1 rounded-full text-slate-400 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <span className="text-lg font-black text-slate-900">{item.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 font-bold text-slate-400 uppercase text-xs tracking-widest">{t("price_pkr")}</td>
                  {selected.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      <div className={cn(
                        "inline-block px-4 py-2 rounded-2xl font-black text-xl",
                        item.id === cheapest.id ? "bg-green-100 text-green-700 ring-2 ring-green-500/20" : "text-slate-900"
                      )}>
                        PKR {item.estimatedPrice}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-400 uppercase text-xs tracking-widest">{t("manufacturer")}</td>
                  {selected.map((item) => (
                    <td key={item.id} className="p-4 text-center text-slate-600 font-bold">{item.manufacturer}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Rating</td>
                  {selected.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-black text-sm">
                        ★ {item.rating}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
