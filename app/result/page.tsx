"use client"

import { useEffect, useState, useRef } from "react"
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
  ShieldAlert,
  Printer,
  Share2,
  MessageCircle,
  Pill
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/LanguageContext"
import SubstituteCard from "@/components/SubstituteCard"
import CompareDrawer from "@/components/CompareDrawer"

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
    priceComparison: "cheaper" | "same" | "expensive"
    availability: "high" | "medium" | "low"
    rating: number
    note: string
  }>
  warning: string
  disclaimer: string
}

export default function AIResultPage() {
  const [data, setData] = useState<AIMedicineResult | null>(null)
  const router = useRouter()
  const { t, isRTL } = useLanguage()
  const printRef = useRef<HTMLDivElement>(null)

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

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (!data) return
    const text = `I found substitutes for ${data.originalMedicine.name} on MediBridge 💊\nCheapest option: ${data.substitutes.sort((a,b) => a.estimatedPrice - b.estimatedPrice)[0].name} at PKR ${data.substitutes.sort((a,b) => a.estimatedPrice - b.estimatedPrice)[0].estimatedPrice}\nFind yours at medbridge.vercel.app`
    navigator.clipboard.writeText(text)
    alert("Results copied to clipboard!")
  }

  const handleWhatsAppShare = () => {
    if (!data) return
    const text = `I found substitutes for ${data.originalMedicine.name} on MediBridge 💊\nCheapest option: ${data.substitutes.sort((a,b) => a.estimatedPrice - b.estimatedPrice)[0].name} at PKR ${data.substitutes.sort((a,b) => a.estimatedPrice - b.estimatedPrice)[0].estimatedPrice}\nFind yours at https://medbridge.vercel.app`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <ShieldAlert className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t("no_result")}</h2>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            {t("search_another")}
          </Link>
        </div>
      </div>
    )
  }

  const { originalMedicine, substitutes, warning, disclaimer } = data

  return (
    <div className="min-h-screen pt-12 pb-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:hidden">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("search_another")}
          </Link>
          <div className="flex flex-wrap gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Printer className="h-4 w-4" />
              {t("print")}
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Share2 className="h-4 w-4" />
              {t("share")}
            </button>
            <button onClick={handleWhatsAppShare} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-green-700 transition-all">
              <MessageCircle className="h-4 w-4" />
              {t("whatsapp")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" ref={printRef}>
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            <div className="hidden print:flex items-center gap-3 mb-12">
              <Pill className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-black text-blue-600">MediBridge</span>
            </div>
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">{t("original_medicine")}</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Prescribed</span>
                    </div>
                    <h3 className="text-5xl font-black text-slate-900 mb-3 leading-tight">{originalMedicine.name}</h3>
                    <p className="text-blue-600 font-black text-xl mb-10 capitalize tracking-tight">{originalMedicine.type}</p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-5">
                        <div className="bg-blue-50 p-3 rounded-2xl">
                          <Info className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{t("active_salt")}</p>
                          <p className="text-slate-900 font-black text-lg">{originalMedicine.salt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-5">
                        <div className="bg-green-50 p-3 rounded-2xl">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">{t("manufacturer")}</p>
                          <p className="text-slate-900 font-black text-lg">{originalMedicine.manufacturer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 text-center flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                      <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{t("price_pkr")}</span>
                      <span className="text-6xl font-black">PKR {originalMedicine.estimatedPrice}</span>
                      <span className="text-slate-500 text-[10px] mt-6 uppercase font-black tracking-widest">Local Market Avg</span>
                    </div>
                    
                    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                      <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">{t("uses")}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{originalMedicine.uses}</p>
                    </div>
                  </div>
                </div>
                
                {originalMedicine.sideEffects.length > 0 && (
                  <div className="mt-12 pt-12 border-t border-slate-50">
                    <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-[0.2em]">{t("side_effects")}</h4>
                    <div className="flex flex-wrap gap-3">
                      {originalMedicine.sideEffects.map((effect, i) => (
                        <span key={i} className="bg-white text-slate-600 px-5 py-2.5 rounded-2xl text-xs font-bold border border-slate-200 shadow-sm">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t("substitutes_found")}</h2>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  <span className="text-blue-700 text-xs font-black uppercase tracking-widest">{substitutes.length} Results</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {substitutes.map((sub, idx) => (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <SubstituteCard substitute={sub} originalId={originalMedicine.name} />
                    </motion.div>
                  ))}
                </AnimatePresence>
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
