"use client"

import { Substitute } from "@/types"
import { Star, TrendingDown, TrendingUp, Minus, CheckCircle2, Share2, Pill, Droplet, Syringe, Container } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/LanguageContext"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface SubstituteCardProps {
  substitute: Substitute
  originalId: string
}

export default function SubstituteCard({ substitute, originalId }: SubstituteCardProps) {
  const { t } = useLanguage()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem("compareList")
      if (saved) {
        const list = JSON.parse(saved)
        setIsChecked(list.some((item: any) => item.id === substitute.id))
      } else {
        setIsChecked(false)
      }
    }
    window.addEventListener("compare-update", handleUpdate)
    handleUpdate()
    return () => window.removeEventListener("compare-update", handleUpdate)
  }, [substitute.id])

  const toggleCompare = () => {
    const saved = localStorage.getItem("compareList")
    let list = saved ? JSON.parse(saved) : []
    
    if (isChecked) {
      list = list.filter((item: any) => item.id !== substitute.id)
    } else {
      if (list.length >= 3) {
        alert("You can compare up to 3 medicines only.")
        return
      }
      list.push({
        id: substitute.id,
        name: substitute.name,
        price: substitute.price,
        manufacturer: substitute.manufacturer,
        availability: substitute.availability,
        rating: substitute.rating
      })
    }
    
    localStorage.setItem("compareList", JSON.stringify(list))
    window.dispatchEvent(new Event("compare-update"))
  }

  const shareInfo = () => {
    const text = `I found substitutes for this medicine on MediBridge 💊\nCheapest option: ${substitute.name} at PKR ${substitute.price}\nFind yours at medbridge.vercel.app`
    navigator.clipboard.writeText(text)
    alert("Medicine info copied to clipboard!")
  }

  const TypeIcon = {
    tablet: <Pill className="h-5 w-5 text-blue-500" />,
    syrup: <Droplet className="h-5 w-5 text-amber-500" />,
    injection: <Syringe className="h-5 w-5 text-red-500" />,
    cream: <Container className="h-5 w-5 text-purple-500" />,
  }[substitute.type as string] || <Pill className="h-5 w-5 text-blue-500" />

  const priceColor = {
    cheaper: "text-green-600 bg-green-50",
    same: "text-slate-600 bg-slate-50",
    expensive: "text-red-600 bg-red-50"
  }[substitute.priceComparison]

  const priceIcon = {
    cheaper: <TrendingDown className="h-4 w-4" />,
    same: <Minus className="h-4 w-4" />,
    expensive: <TrendingUp className="h-4 w-4" />
  }[substitute.priceComparison]

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={cn(
        "bg-white border-2 rounded-[2.5rem] p-6 transition-all group relative overflow-hidden",
        isChecked ? "border-blue-500 shadow-xl" : "border-slate-100 shadow-sm hover:border-blue-200"
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
            {TypeIcon}
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {substitute.name}
            </h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{substitute.manufacturer}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-black">
            <Star className="h-3 w-3 fill-amber-600" />
            {substitute.rating}
          </div>
          <button 
            onClick={shareInfo}
            className="p-2 bg-slate-50 hover:bg-blue-50 rounded-full text-slate-400 hover:text-blue-600 transition-all"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <motion.span 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-black text-slate-900"
          >
            PKR {substitute.price}
          </motion.span>
          <span className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tight",
            priceColor
          )}>
            {priceIcon}
            {t(substitute.priceComparison as any)}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>{t("availability_high")}</span>
            <span>{substitute.availability === 'high' ? '100%' : substitute.availability === 'medium' ? '50%' : '25%'}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: substitute.availability === 'high' ? '100%' : substitute.availability === 'medium' ? '50%' : '25%' 
              }}
              className={cn(
                "h-full rounded-full",
                substitute.availability === 'high' ? 'bg-green-500' : substitute.availability === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex-grow flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-4 py-3 rounded-2xl cursor-pointer transition-all border border-transparent active:scale-95">
          <input 
            type="checkbox" 
            checked={isChecked}
            onChange={toggleCompare}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
          />
          <span className="text-sm font-bold text-slate-600">{t("compare")}</span>
        </label>
        <Link 
          href={`/result/${originalId}?subId=${substitute.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <ArrowRightLeft className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  )
}

function ArrowRightLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  )
}
