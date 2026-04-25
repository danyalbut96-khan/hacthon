"use client"

import { motion } from "framer-motion"
import SearchBox from "./SearchBox"
import { Pill, ShieldCheck, Banknote } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            💊 100% Reliable Medicine Finder
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            {t("hero_title").split("?")[0]}? <br />
            <span className="text-blue-600">{t("hero_title").split("?")[1]}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            {t("hero_subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBox large className="mb-16" />
        </motion.div>
      </div>
    </section>
  )
}
