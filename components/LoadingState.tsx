"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pill, Sparkles } from "lucide-react"

export default function LoadingState() {
  const [messageIdx, setMessageIdx] = useState(0)
  
  const messages = [
    "Analyzing active ingredients...",
    "Scanning Pakistani pharma database...",
    "Comparing brand prices...",
    "Generating health insights...",
    "Almost there..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIdx((prev) => (prev + 1) % messages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="relative mb-16">
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-cyan-500 to-blue-600 p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(6,182,212,0.3)] relative z-10"
        >
          <Pill className="h-20 w-20 text-white" />
        </motion.div>
        
        <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />
        
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cyan-400 rounded-full -z-10 blur-[60px]"
        />
      </div>
      
      <div className="space-y-4 max-w-md">
        <div className="h-10">
          <AnimatePresence mode="wait">
            <motion.h3
              key={messageIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-3xl font-black text-white tracking-tight"
            >
              {messages[messageIdx]}
            </motion.h3>
          </AnimatePresence>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-cyan-400/60 font-black uppercase tracking-[0.4em] text-[10px]">
          <Sparkles className="h-3 w-3" />
          AI ENGINE ACTIVE
          <Sparkles className="h-3 w-3" />
        </div>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          MediBridge is currently using advanced AI models to find the most accurate and affordable substitutes for your medicine.
        </p>
      </div>
    </div>
  )
}
