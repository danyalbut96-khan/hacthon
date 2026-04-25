"use client"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Something went wrong!</h2>
      <p className="text-slate-500 mb-8 max-w-md font-medium">
        We encountered an unexpected error while processing your request. Please try again.
      </p>
      <button 
        onClick={reset} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95"
      >
        Try Again
      </button>
    </div>
  )
}
