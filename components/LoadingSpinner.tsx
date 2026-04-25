"use client"

import { motion } from "framer-motion"
import { Pill } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative mb-8">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="bg-blue-100 p-6 rounded-full"
        >
          <Pill className="h-12 w-12 text-blue-600" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-blue-400 rounded-full -z-10"
        />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">AI is analyzing medicine database...</h3>
      <p className="text-slate-500 animate-pulse">Searching for identical formulas and affordable alternatives in Pakistan</p>
    </div>
  )
}
