import { Substitute } from "@/types"
import { Star, TrendingDown, TrendingUp, Minus, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface SubstituteCardProps {
  substitute: Substitute
  originalId: string
}

export default function SubstituteCard({ substitute, originalId }: SubstituteCardProps) {
  const priceColor = {
    cheaper: "text-green-600 bg-green-50",
    same: "text-slate-600 bg-slate-50",
    expensive: "text-red-600 bg-red-50"
  }[substitute.priceComparison]

  const priceIcon = {
    cheaper: <TrendingDown className="h-4 w-4" />,
    same: <Minus className="h-4 w-4" />,
    expensive: <TrendingUp className="h-4 w-4" />
  }[substitute.priceComparison]

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {substitute.name}
          </h4>
          <p className="text-sm text-slate-500">{substitute.manufacturer}</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-xs font-bold">
          <Star className="h-3 w-3 fill-amber-600" />
          {substitute.rating}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-slate-900">PKR {substitute.price}</span>
          <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight ${priceColor}`}>
            {priceIcon}
            {substitute.priceComparison}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className={`h-4 w-4 ${substitute.availability === 'high' ? 'text-green-500' : 'text-amber-500'}`} />
          <span className="text-xs font-medium text-slate-600">
            {substitute.availability === 'high' ? 'High Availability' : 'Limited Stock'}
          </span>
        </div>
      </div>

      <Link 
        href={`/result/${originalId}?subId=${substitute.id}`}
        className="block w-full text-center py-2.5 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 font-bold rounded-xl transition-all"
      >
        View Details
      </Link>
    </div>
  )
}
