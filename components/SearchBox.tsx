"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBoxProps {
  initialValue?: string
  className?: string
  large?: boolean
}

export default function SearchBox({ initialValue = "", className, large = false }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form 
      onSubmit={handleSearch}
      className={cn(
        "relative w-full max-w-2xl mx-auto",
        className
      )}
    >
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter medicine name e.g. Panadol, Augmentin..."
          className={cn(
            "w-full bg-white border-2 border-slate-200 rounded-2xl transition-all duration-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
            large ? "py-5 px-14 text-lg" : "py-3 px-12 text-base"
          )}
        />
        <Search className={cn(
          "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors",
          large ? "h-6 w-6" : "h-5 w-5"
        )} />
        <button
          type="submit"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95",
            large ? "px-6 py-2.5" : "px-4 py-1.5"
          )}
        >
          {large ? "Find Substitutes" : "Find"}
        </button>
      </div>
    </form>
  )
}
