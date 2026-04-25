import { Medicine } from "@/types"
import { Badge } from "lucide-react"

interface MedicineCardProps {
  medicine: Medicine
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  return (
    <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{medicine.name}</h3>
          <p className="text-blue-600 font-semibold">{medicine.strength}</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Original
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-slate-50">
          <span className="text-slate-500 text-sm">Active Salt</span>
          <span className="text-slate-900 font-medium">{medicine.salt}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-50">
          <span className="text-slate-500 text-sm">Manufacturer</span>
          <span className="text-slate-900 font-medium">{medicine.manufacturer}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-50">
          <span className="text-slate-500 text-sm">Type</span>
          <span className="text-slate-900 font-medium capitalize">{medicine.type}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-slate-500 text-sm">Average Price</span>
          <span className="text-2xl font-bold text-slate-900">PKR {medicine.price}</span>
        </div>
      </div>
    </div>
  )
}
