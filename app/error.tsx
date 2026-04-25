"use client"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#07101f] px-4 text-center text-white">
      <div className="mb-6 inline-flex h-28 w-28 items-center justify-center rounded-full bg-amber-500/10 shadow-[0_0_80px_rgba(245,158,11,0.24)]">
        <span className="text-5xl">⚠️</span>
      </div>
      <h2 className="text-3xl font-black mb-4 uppercase tracking-[0.15em]">Something went wrong</h2>
      <p className="max-w-xl text-slate-400 mb-8 leading-relaxed">
        We hit a snag while loading the page. Refresh or try again in a moment and your medicine search will be ready.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-10 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_24px_80px_rgba(14,165,233,0.24)] transition hover:opacity-95"
      >
        Reload Page
      </button>
    </div>
  )
}
