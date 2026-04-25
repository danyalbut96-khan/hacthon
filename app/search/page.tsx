import { Suspense } from "react"
import SearchResults from "./search-results"
import SearchBox from "@/components/SearchBox"

export default function SearchPage() {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Search Results</h1>
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBox className="mx-0 max-w-full" />
          </Suspense>
        </div>
        
        <Suspense fallback={<SearchSkeleton />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 h-64 border border-slate-100 shadow-sm" />
      ))}
    </div>
  )
}
