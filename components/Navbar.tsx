"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Pill, Languages } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ur" : "en")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              <Pill className="h-8 w-8" />
              <span>MediBridge</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About</Link>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all"
            >
              <Languages className="h-4 w-4" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700 border border-slate-200">
              <span>Pakistan</span>
              <span>🇵🇰</span>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 pb-4 px-4">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-blue-600 font-medium py-2">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-blue-600 font-medium py-2">About</Link>
            
            <button
              onClick={() => {
                toggleLanguage()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all w-fit"
            >
              <Languages className="h-4 w-4" />
              <span>{language === "en" ? "اردو" : "English"}</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700 w-fit">
              <span>Pakistan</span>
              <span>🇵🇰</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
