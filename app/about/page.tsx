import { ShieldCheck, Users, Target, Pill } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#08101f] px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.12),_transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl text-white">
        <header className="mb-20 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 mb-4">Built for Pakistan 🇵🇰</p>
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl leading-tight">MediBridge brings medicine alternatives to life with premium AI design.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-slate-300 text-lg leading-relaxed">
            We help Pakistani patients, caregivers and pharmacists discover verified substitutes, compare prices and decide with confidence.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3 mb-20">
          {[
            {
              icon: <ShieldCheck className="h-8 w-8 text-cyan-300" />,
              title: "Trusted by local users",
              text: "Built for real Pakistani medicine needs with quality and context.",
            },
            {
              icon: <Target className="h-8 w-8 text-emerald-300" />,
              title: "AI that understands salts",
              text: "We match active ingredients and local brands for real substitute suggestions.",
            },
            {
              icon: <Users className="h-8 w-8 text-amber-300" />,
              title: "Designed for accessibility",
              text: "Dark mode, Urdu support, and simplified medicine comparison for every user.",
            },
          ].map((card) => (
            <div key={card.title} className="glass-card border border-white/10 p-8 rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-cyan-500/20">
                {card.icon}
              </div>
              <h2 className="text-2xl font-black mb-3">{card.title}</h2>
              <p className="text-slate-300 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[3rem] border border-white/10 bg-slate-950/70 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-black">How it works</h2>
              <p className="text-slate-300 leading-relaxed">
                Enter any medicine name and let MediBridge match it with affordable Pakistani alternatives. The AI is tuned to local brands, salts and prices so you can make faster decisions.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Search any medicine brand or generic name.",
                "AI analyzes salt composition and availability.",
                "Compare substitutes, price, and availability instantly.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-3xl bg-slate-900/90 p-6 border border-slate-800">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">✓</span>
                  <p className="text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
            <h3 className="text-2xl font-black mb-4">Tech Stack</h3>
            <ul className="space-y-3 text-slate-300">
              <li>Next.js 14</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>OpenRouter AI (Llama 3.1)</li>
            </ul>
          </div>
          <div className="rounded-[2.5rem] border-l-4 border-amber-400 bg-amber-500/10 p-10 shadow-[0_30px_90px_rgba(255,159,11,0.15)]">
            <h3 className="text-2xl font-black mb-4">Medical Disclaimer</h3>
            <p className="text-slate-300 leading-relaxed">
              MediBridge is a guidance tool and not a replacement for professional medical advice. Always consult a licensed healthcare provider before switching medicines.
            </p>
          </div>
        </section>

        <footer className="mt-20 rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-10 text-slate-400">
          <p className="text-sm leading-relaxed">
            Want to share feedback? Visit Cloudexify or use the main page to search another medicine. Our mission is to reduce medicine friction across Pakistan.
          </p>
        </footer>
      </div>
    </div>
  )
}
