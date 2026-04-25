"use client"

import { motion } from "framer-motion"
import SearchBox from "./SearchBox"
import { Pill, ShieldCheck, Banknote } from "lucide-react"

export default function Hero() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Can't find your medicine? <br />
            <span className="text-blue-600">We'll find an alternative.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            AI-powered medicine substitute finder for Pakistan. Find identical formulas, compare prices, and stay healthy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBox large className="mb-16" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {[
            {
              icon: <Pill className="h-8 w-8 text-blue-600" />,
              title: "Same Salt Formula",
              desc: "Find medicines with identical active ingredients for reliable treatment.",
              color: "bg-blue-50"
            },
            {
              icon: <Banknote className="h-8 w-8 text-green-600" />,
              title: "Price Comparison",
              desc: "Always find the most affordable option and save on your medical bills.",
              color: "bg-green-50"
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-indigo-600" />,
              title: "Verified Alternatives",
              desc: "Every substitute is medically reviewed and from trusted manufacturers.",
              color: "bg-indigo-50"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md transition-all"
            >
              <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-slate-900 text-white py-6 px-8 rounded-3xl inline-flex flex-wrap justify-center gap-8 md:gap-16 items-center shadow-xl"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">10,000+</div>
            <div className="text-slate-400 text-sm">Medicines</div>
          </div>
          <div className="w-px h-8 bg-slate-700 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-slate-400 text-sm">Companies</div>
          </div>
          <div className="w-px h-8 bg-slate-700 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl font-bold">Trusted</div>
            <div className="text-slate-400 text-sm">by Doctors</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
