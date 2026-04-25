"use client"

import { useSearchParams } from "next/navigation"
import { medicines, substitutes } from "@/lib/mock-data"
import MedicineCard from "@/components/MedicineCard"
import SubstituteCard from "@/components/SubstituteCard"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")?.toLowerCase() || ""

  const filteredMedicines = medicines.filter(
    (m) => m.name.toLowerCase().includes(query) || m.salt.toLowerCase().includes(query)
  )

  if (filteredMedicines.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
        <AlertCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
        <p className="text-slate-500">We couldn't find any medicine matching "{query}". Please try a different name.</p>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      {filteredMedicines.map((medicine) => (
        <div key={medicine.id}>
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Original Medicine</h2>
            <div className="max-w-md">
              <MedicineCard medicine={medicine} />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Available Substitutes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {substitutes[medicine.id]?.map((sub, idx) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <SubstituteCard substitute={sub} originalId={medicine.id} />
                </motion.div>
              ))}
              {(!substitutes[medicine.id] || substitutes[medicine.id].length === 0) && (
                <div className="col-span-full py-8 text-slate-500 italic">
                  No substitutes found for this medicine yet.
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
