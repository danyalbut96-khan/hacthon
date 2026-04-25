"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  ArrowLeft, 
  Star, 
  TrendingDown, 
  TrendingUp, 
  Minus,
  RefreshCcw,
  ShieldAlert
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AIMedicineResult {
  originalMedicine: {
    name: string
    genericName: string
    salt: string
    uses: string
    sideEffects: string[]
    manufacturer: string
    estimatedPrice: number
    type: string
  }
  substitutes: Array<{
    id: string
    name: string
    salt: string
    manufacturer: string
    estimatedPrice: number
    strength: string
    type: string
    priceComparison: string
    availability: string
    rating: number
    note: string
  }>
  warning: string
  disclaimer: string
}

export default function AIResultPage() {
  const [data, setData] = useState<AIMedicineResult | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedResult = localStorage.getItem("medicineResult")
    if (savedResult) {
      try {
        setData(JSON.parse(savedResult))
      } catch (err) {
        console.error("Error parsing saved result:", err)
      }
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <ShieldAlert className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No data found</h2>
          <p className="text-slate-500 mb-8">Please search for a medicine first to see results.</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const { originalMedicine, substitutes, warning, disclaimer } = data

  return (
    <div className="min-h-screen pt-12 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Search Another Medicine
          </Link>
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            <RefreshCcw className="h-4 w-4" />
            New Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Original Medicine</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Prescribed</span>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-2">{originalMedicine.name}</h3>
                    <p className="text-blue-600 font-bold text-xl mb-8 capitalize">{originalMedicine.type}</p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <Info className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Active Salt</p>
                          <p className="text-slate-900 font-bold">{originalMedicine.salt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-slate-50 p-2 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Manufacturer</p>
                          <p className="text-slate-900 font-bold">{originalMedicine.manufacturer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <div className="bg-slate-900 text-white rounded-[2rem] p-8 text-center flex flex-col justify-center shadow-xl">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Price</span>
                      <span className="text-5xl font-black">PKR {originalMedicine.estimatedPrice}</span>
                      <span className="text-slate-500 text-[10px] mt-4 uppercase font-bold">Local Market Avg</span>
                    </div>
                    
                    <div className="bg-blue-50/50 rounded-2xl p-6">
                      <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Common Uses</h4>
                      <p className="text-blue-800/80 text-sm leading-relaxed">{originalMedicine.uses}</p>
                    </div>
                  </div>
                </div>
                
                {originalMedicine.sideEffects.length > 0 && (
                  <div className="mt-10 pt-10 border-t border-slate-50">
                    <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Potential Side Effects</h4>
                    <div className="flex flex-wrap gap-2">
                      {originalMedicine.sideEffects.map((effect, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Verified Substitutes</h2>
                <p className="text-slate-400 text-sm font-medium">{substitutes.length} results found</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {substitutes.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:border-blue-200 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{sub.name}</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{sub.manufacturer}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-xs font-black">
                        <Star className="h-3 w-3 fill-amber-600" />
                        {sub.rating}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Price</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-slate-900">PKR {sub.estimatedPrice}</span>
                          <span className={cn(
                            "flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase",
                            sub.priceComparison === "cheaper" ? "bg-green-100 text-green-700" :
                            sub.priceComparison === "same" ? "bg-slate-200 text-slate-600" : "bg-red-100 text-red-700"
                          )}>
                            {sub.priceComparison === "cheaper" ? <TrendingDown className="h-3 w-3" /> : 
                             sub.priceComparison === "expensive" ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {sub.priceComparison}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Availability</span>
                        <div className="flex items-center gap-1.5">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            sub.availability === "high" ? "bg-green-500" :
                            sub.availability === "medium" ? "bg-amber-500" : "bg-red-500"
                          )} />
                          <span className="text-xs font-bold text-slate-700 capitalize">{sub.availability}</span>
                        </div>
                      </div>
                    </div>

                    {sub.note && (
                      <div className="mb-6 flex gap-2 items-start bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-800 leading-relaxed italic">{sub.note}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Salt</span>
                      <span className="text-[10px] font-bold text-slate-900 truncate">{sub.salt}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Alerts & Info */}
          <div className="space-y-8">
            <section className="bg-amber-50 border border-amber-100 rounded-[2.5rem] p-8 md:p-10 sticky top-24">
              <div className="flex gap-4 mb-6">
                <AlertTriangle className="h-10 w-10 text-amber-600 shrink-0" />
                <h3 className="text-xl font-black text-amber-900">Safety Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-3">AI Analysis Warning</h4>
                  <div className="bg-white/60 rounded-2xl p-5 text-amber-900 text-sm leading-relaxed border border-amber-200/50">
                    {warning}
                  </div>
                </div>

                <div className="pt-6 border-t border-amber-200/50">
                  <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-4">Final Disclaimer</h4>
                  <p className="text-amber-800/80 text-xs leading-relaxed italic">
                    {disclaimer}
                  </p>
                </div>

                <div className="bg-amber-600 text-white p-6 rounded-2xl shadow-lg shadow-amber-600/20">
                  <p className="text-xs font-bold leading-relaxed">
                    Always consult your doctor or a licensed pharmacist before switching to a substitute medicine.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
