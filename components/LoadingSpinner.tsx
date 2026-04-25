"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pill } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

export default function LoadingSpinner() {
  const { t } = useLanguage()
  const [messageIdx, setMessageIdx] = useState(0)
  
  const messages = [
    "Searching medicine database...",
    "Checking 10,000+ medicines...",
    "Finding best alternatives...",
    "Almost done..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      <div className="relative mb-12">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-blue-600 p-8 rounded-[2rem] shadow-2xl shadow-blue-600/30 relative z-10"
        >
          <Pill className="h-16 w-16 text-white" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-blue-400 rounded-full -z-10 blur-xl"
        />
      </div>
      
      <div className="h-8 mb-4">
        <AnimatePresence mode="wait">
          <motion.h3
            key={messageIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-black text-slate-900"
          >
            {messages[messageIdx]}
          </motion.h3>
        </AnimatePresence>
      </div>
      
      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
        {t("loading_text")}
      </p>
    </div>
  )
}
