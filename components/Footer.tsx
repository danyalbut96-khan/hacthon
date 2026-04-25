import Link from "next/link"
import { Pill, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060b16] text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20">
                <Pill className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">MediBridge</p>
                <p className="text-2xl font-black text-white">AI Medicine Substitute Finder</p>
              </div>
            </div>
            <p className="max-w-md leading-relaxed text-slate-400">
              Instant medicine substitute recommendations for Pakistan. Explore alternatives with price, availability and safety notes in one premium interface.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Quick links</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="#search" className="transition hover:text-cyan-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-cyan-300">About</Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-cyan-300">Search</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Disclaimer</h3>
            <p className="leading-relaxed text-slate-400">
              MediBridge is not a substitute for professional medical advice. Always consult a licensed doctor before changing any medication.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 MediBridge. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> by
            <Link href="https://cloudexify.site" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 transition hover:text-cyan-100">
              Cloudexify
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
