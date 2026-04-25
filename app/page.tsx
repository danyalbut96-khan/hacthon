import Hero from "@/components/Hero"

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Additional landing sections can go here */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How it Works</h2>
          <p className="text-slate-500 mb-16 max-w-xl mx-auto">
            Finding a substitute is as easy as 1-2-3. Follow these steps to find the best alternative.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Search Medicine",
                desc: "Type the name of the medicine you can't find or want a substitute for."
              },
              {
                step: "02",
                title: "Compare Formulas",
                desc: "Our AI analyzes the active salts and finds identical formulas from top companies."
              },
              {
                step: "03",
                title: "Get Results",
                desc: "View a list of verified substitutes with price comparisons and availability."
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-slate-50 absolute -top-8 left-1/2 -translate-x-1/2 -z-0">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
