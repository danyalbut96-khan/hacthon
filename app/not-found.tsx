import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#07101f] px-4 text-center text-white">
      <div className="relative mb-8 inline-flex h-40 w-40 items-center justify-center rounded-full bg-cyan-500/10 shadow-[0_0_80px_rgba(14,165,233,0.25)]">
        <span className="text-[5rem]">💊</span>
      </div>
      <h2 className="text-4xl font-black mb-4 uppercase tracking-[0.2em]">Page not found</h2>
      <p className="max-w-xl text-slate-400 mb-10 text-lg leading-relaxed">
        The link you followed may be broken, or the page may have been removed. Let MediBridge guide you back to the search page.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-10 py-4 text-white font-black uppercase tracking-[0.2em] shadow-[0_20px_60px_rgba(14,165,233,0.35)] transition hover:opacity-95"
      >
        Return Home
      </Link>
    </div>
  )
}
