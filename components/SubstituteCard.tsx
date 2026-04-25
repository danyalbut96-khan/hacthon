"use client"

import { useEffect, useState } from "react"
import { Star, TrendingDown, TrendingUp, Minus, Share2, Pill, Droplet, Syringe, Container } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import { Substitute } from "@/types/medicine"

interface SubstituteCardProps {
  substitute: Substitute
}

const typeIcons = {
  tablet: <Pill className="h-5 w-5 text-cyan-500" />,
  syrup: <Droplet className="h-5 w-5 text-amber-400" />,
  injection: <Syringe className="h-5 w-5 text-rose-500" />,
  cream: <Container className="h-5 w-5 text-violet-500" />,
  drops: <Droplet className="h-5 w-5 text-sky-500" />,
}

const priceVariants = {
  cheaper: { classes: "text-emerald-600 bg-emerald-100", icon: <TrendingDown className="h-3 w-3" /> },
  same: { classes: "text-slate-600 bg-slate-100", icon: <Minus className="h-3 w-3" /> },
  expensive: { classes: "text-amber-700 bg-amber-100", icon: <TrendingUp className="h-3 w-3" /> },
} as const

export default function SubstituteCard({ substitute }: SubstituteCardProps) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const syncSelected = () => {
      const saved = localStorage.getItem("compareList")
      const list: Array<{ id: string }> = saved ? JSON.parse(saved) : []
      setSelected(list.some((item) => item.id === substitute.id))
    }

    syncSelected()
    window.addEventListener("compare-update", syncSelected)
    return () => window.removeEventListener("compare-update", syncSelected)
  }, [substitute.id])

  const toggleCompare = () => {
    const saved = localStorage.getItem("compareList")
    const list: Array<{ id: string; name: string; estimatedPrice: number; manufacturer: string; availability: string; rating: number }> = saved
      ? JSON.parse(saved)
      : []

    if (selected) {
      const updated = list.filter((item) => item.id !== substitute.id)
      localStorage.setItem("compareList", JSON.stringify(updated))
      window.dispatchEvent(new Event("compare-update"))
      setSelected(false)
      return
    }

    if (list.length >= 3) {
      window.alert("You can compare up to 3 medicines only.")
      return
    }

    list.push({
      id: substitute.id,
      name: substitute.name,
      estimatedPrice: substitute.estimatedPrice,
      manufacturer: substitute.manufacturer,
      availability: substitute.availability,
      rating: substitute.rating,
    })
    localStorage.setItem("compareList", JSON.stringify(list))
    window.dispatchEvent(new Event("compare-update"))
    setSelected(true)
  }

  const shareInfo = async () => {
    const message = `${t("share_text")}\n${substitute.name} — PKR ${substitute.estimatedPrice} — ${substitute.manufacturer}`
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(message)
      window.alert("Substitute details copied to clipboard.")
    }
  }

  const pricing = priceVariants[substitute.priceComparison]

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={cn(
        "glass-card rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-7 shadow-[0_35px_90px_rgba(0,0,0,0.25)] transition-all",
        selected ? "border-cyan-400/40 shadow-cyan-500/20" : "hover:border-cyan-300/30"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/70 text-cyan-300 shadow-lg shadow-cyan-500/10">
            {typeIcons[substitute.type] ?? <Pill className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{substitute.name}</h3>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{substitute.manufacturer}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={shareInfo}
          className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-white/10 text-slate-200 transition hover:bg-white/15"
          aria-label="Share substitute"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 rounded-[2rem] bg-slate-900/80 p-6 text-white shadow-inner shadow-slate-950/20">
        <p className="text-4xl font-black">PKR {substitute.estimatedPrice}</p>
        <span className={cn("mt-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.25em]", pricing.classes)}>
          {pricing.icon}
          {t(substitute.priceComparison as any)}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">{t("active_salt")}</p>
          <p className="mt-2 text-sm text-slate-200">{substitute.salt}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
            <span>{t("avail_high")}</span>
            <span className="font-black text-white">{substitute.availability === "high" ? "High" : substitute.availability === "medium" ? "Medium" : "Low"}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-900">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: substitute.availability === "high" ? "100%" : substitute.availability === "medium" ? "60%" : "25%" }}
              className={cn(
                "h-full rounded-full",
                substitute.availability === "high" ? "bg-emerald-400" : substitute.availability === "medium" ? "bg-amber-400" : "bg-rose-500"
              )}
            />
          </div>
        </div>

        {substitute.note && (
          <div className="rounded-[1.75rem] bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
            {substitute.note}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleCompare}
          className={cn(
            "flex-1 rounded-3xl border px-4 py-3 text-sm font-black uppercase tracking-[0.15em] transition",
            selected ? "border-cyan-400 bg-cyan-500/10 text-cyan-300" : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/40 hover:bg-white/10"
          )}
        >
          {t("compare")}
        </button>
      </div>
    </motion.article>
  )
}
