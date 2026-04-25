"use client"

import { useParams, useSearchParams } from "next/navigation"
import { medicines, substitutes } from "@/lib/mock-data"
import MedicineCard from "@/components/MedicineCard"
import SubstituteCard from "@/components/SubstituteCard"
import { motion } from "framer-motion"
import { AlertTriangle, Info, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResultDetailPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const subId = searchParams.get("subId")

  const medicine = medicines.find((m) => m.id === id)
  const allSubstitutes = substitutes[id as string] || []
  const selectedSubstitute = allSubstitutes.find((s) => s.id === subId)

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Medicine not found</h2>
          <Link href="/" className="text-blue-600 hover:underline">Return to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/search?q=${medicine.name}`}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Medicine Overview</h2>
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{medicine.name}</h3>
                    <p className="text-blue-600 font-bold text-lg mb-6">{medicine.strength} {medicine.type}</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Info className="h-5 w-5 text-blue-500" />
                        <span>Generic: <span className="font-bold text-slate-900">{medicine.genericName}</span></span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Salt: <span className="font-bold text-slate-900">{medicine.salt}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-slate-500 text-sm mb-1 uppercase tracking-wider font-bold">Average Price</span>
                    <span className="text-4xl font-black text-slate-900">PKR {medicine.estimatedPrice}</span>
                    <span className="text-slate-400 text-xs mt-2">Price may vary by pharmacy</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Price Comparison Table</h2>
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Medicine</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Manufacturer</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Price</th>
                      <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Saving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="bg-blue-50/30">
                      <td className="px-6 py-4 font-bold text-slate-900">{medicine.name} (Original)</td>
                      <td className="px-6 py-4 text-slate-600">{medicine.manufacturer}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">PKR {medicine.estimatedPrice}</td>
                      <td className="px-6 py-4 text-slate-400">-</td>
                    </tr>
                    {allSubstitutes.map((sub) => (
                      <tr key={sub.id} className={sub.id === subId ? "bg-green-50" : ""}>
                        <td className="px-6 py-4 font-semibold text-slate-700">{sub.name}</td>
                        <td className="px-6 py-4 text-slate-500">{sub.manufacturer}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">PKR {sub.estimatedPrice}</td>
                        <td className="px-6 py-4 font-bold text-green-600">
                          {medicine.estimatedPrice - sub.estimatedPrice > 0 ? `Save PKR ${medicine.estimatedPrice - sub.estimatedPrice}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8">
              <div className="flex gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Usage Warnings & Precautions</h3>
                  <ul className="list-disc list-inside text-amber-800 space-y-2 text-sm md:text-base">
                    <li>Consult your doctor before switching to any substitute medicine.</li>
                    <li>Ensure the active ingredient (salt) and strength exactly match your prescription.</li>
                    <li>Do not exceed the recommended dosage.</li>
                    <li>Keep out of reach of children. Store in a cool, dry place.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Other Substitutes */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Other Alternatives</h2>
            <div className="space-y-6">
              {allSubstitutes.map((sub) => (
                <SubstituteCard key={sub.id} substitute={sub} originalId={medicine.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
