"use client"

import { Suspense, useState, useEffect } from "react"
import SearchResults from "./search-results"
import SearchBox from "@/components/SearchBox"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function SearchPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">Search Results</h1>
          <Suspense fallback={<div className="h-20 bg-slate-100 rounded-3xl animate-pulse" />}>
            <SearchBox className="mx-0 max-w-full" />
          </Suspense>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}
