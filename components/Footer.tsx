import Link from "next/link"
import { Pill, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-4">
              <Pill className="h-8 w-8" />
              <span>MediBridge</span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-6">
              AI-powered medicine substitute finder for Pakistan. Helping you find affordable and verified alternatives to your essential medicines.
            </p>
            <div className="text-sm text-slate-400 font-medium italic">
              "MediBridge is not a substitute for professional medical advice"
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-slate-500 hover:text-blue-600 transition-colors">Search</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-blue-600 transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-slate-500">Email: contact@medibridge.pk</li>
              <li className="text-slate-500">Location: Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 MediBridge. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by</span>
            <Link 
              href="https://cloudexify.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:underline"
            >
              Cloudexify
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
