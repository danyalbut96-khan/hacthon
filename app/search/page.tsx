"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchBox from "@/components/SearchBox"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function SearchPage() {
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/?q=${encodeURIComponent(query)}`
    }
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen pt-12 pb-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">Search</h1>
          <Suspense fallback={<div className="h-20 bg-slate-900 rounded-3xl animate-pulse" />}>
            <SearchBox 
              query={query}
              typeFilter={filter}
              onQueryChange={setQuery}
              onTypeChange={setFilter}
              onSubmit={handleSearch}
              isLoading={isLoading}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
