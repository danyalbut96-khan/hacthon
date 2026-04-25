"use client"

import Hero from "@/components/Hero"
import { motion } from "framer-motion"
import { Search, Brain, Pill, ShieldCheck, Banknote, Target, Users, Zap, SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"

export default function Home() {
  const router = useRouter()
  const { t, isRTL } = useLanguage()

  const popularMedicines = [
    "Panadol", "Brufen", "Augmentin", "Disprin",
    "Flagyl", "Risek", "Nexium", "Clarinase"
  ]

  const handlePopularSearch = (name: string) => {
    router.push(`/search?q=${encodeURIComponent(name)}`)
  }

  return (
    <main>
      <Hero />
      
      {/* Popular Medicines Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{t("popular_medicines")}</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {popularMedicines.map((med) => (
              <motion.button
                key={med}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePopularSearch(med)}
                className="px-6 py-3 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm"
              >
                {med}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t("how_it_works")}</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">
              Finding a substitute is as easy as 1-2-3. Our AI does the heavy lifting for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 border-t-2 border-dashed border-slate-200 -z-0" />
            
            {[
              {
                icon: <SearchIcon className="h-8 w-8" />,
                title: "Type Medicine Name",
                desc: "Enter any medicine available in Pakistan and our system will identify it.",
                color: "bg-blue-600"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "AI Analyzes",
                desc: "Our AI searches thousands of medicines instantly to find matching active salts.",
                color: "bg-indigo-600"
              },
              {
                icon: <Pill className="h-8 w-8" />,
                title: "Get Substitutes",
                desc: "See affordable alternatives with prices, manufacturers and availability.",
                color: "bg-green-600"
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg",
                  step.color
                )}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{t("why_medibridge")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="text-amber-500" />, title: "Fast", desc: "Results in under 2 seconds" },
              { icon: <Target className="text-blue-500" />, title: "AI-Powered", desc: "Precise formula matching" },
              { icon: <ShieldCheck className="text-green-500" />, title: "Free", desc: "No charges, no subscription" },
              { icon: <Users className="text-indigo-500" />, title: "Pakistan-Focused", desc: "Local availability data" }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-blue-600 transition-all duration-300">
                <div className="bg-white p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-white mb-2">{item.title}</h4>
                <p className="text-slate-500 group-hover:text-blue-100 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
