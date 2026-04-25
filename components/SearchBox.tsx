"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBoxProps {
  initialValue?: string
  className?: string
  large?: boolean
}

export default function SearchBox({ initialValue = "", className, large = false }: SearchBoxProps) {
  const [query, setQuery] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medicineName: query.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch medicine data")
      }

      localStorage.setItem("medicineResult", JSON.stringify(data))
      router.push("/result")
    } catch (err: any) {
      console.error("Search Error:", err)
      setError(err.message || "Something went wrong. Please try again.")
      alert(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Enter medicine name e.g. Panadol, Augmentin..."
            className={cn(
              "w-full bg-white border-2 border-slate-200 rounded-2xl transition-all duration-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:cursor-not-allowed",
              large ? "py-5 px-14 text-lg" : "py-3 px-12 text-base"
            )}
          />
          {isLoading ? (
            <Loader2 className={cn(
              "absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 animate-spin",
              large ? "h-6 w-6" : "h-5 w-5"
            )} />
          ) : (
            <Search className={cn(
              "absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors",
              large ? "h-6 w-6" : "h-5 w-5"
            )} />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:bg-slate-400 disabled:scale-100",
              large ? "px-6 py-2.5" : "px-4 py-1.5"
            )}
          >
            {isLoading ? "Analyzing..." : (large ? "Find Substitutes" : "Find")}
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-500 text-center font-medium">{error}</p>
      )}
    </div>
  )
}
