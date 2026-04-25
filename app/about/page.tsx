import { ShieldCheck, Users, Target, Pill } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Mission</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            MediBridge is dedicated to making healthcare more accessible and affordable for everyone in Pakistan. 
            We believe that no one should suffer because they can't find or afford their essential medicines.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Verified Data</h3>
            <p className="text-slate-500">
              Our database is powered by official medical registries and verified by healthcare professionals.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">AI Precision</h3>
            <p className="text-slate-500">
              We use advanced algorithms to match active ingredients and ensure therapeutic equivalence.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Community Focused</h3>
            <p className="text-slate-500">
              Built for the people of Pakistan, considering local availability and economic factors.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">How MediBridge Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="text-blue-400 text-5xl font-black opacity-30">01</div>
              <h4 className="text-xl font-bold">Data Aggregation</h4>
              <p className="text-slate-400">We collect medicine data from various licensed pharmaceutical companies across Pakistan.</p>
            </div>
            <div className="space-y-4">
              <div className="text-blue-400 text-5xl font-black opacity-30">02</div>
              <h4 className="text-xl font-bold">Formula Matching</h4>
              <p className="text-slate-400">Our AI analyzes the chemical composition and salt formula to find identical substitutes.</p>
            </div>
            <div className="space-y-4">
              <div className="text-blue-400 text-5xl font-black opacity-30">03</div>
              <h4 className="text-xl font-bold">User Access</h4>
              <p className="text-slate-400">You search for a medicine and instantly get a list of affordable, available alternatives.</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-red-50 p-6 rounded-2xl">
              <Pill className="h-12 w-12 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Medical Disclaimer</h3>
              <p className="text-slate-600 leading-relaxed">
                The information provided on MediBridge is for educational and informational purposes only. 
                It is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider with any questions 
                you may have regarding a medical condition or switching medications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
