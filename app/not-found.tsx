import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="text-9xl mb-8 animate-bounce">💊</div>
      <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">Page Not Found</h2>
      <p className="text-slate-500 mb-10 max-w-md font-medium text-lg">
        The page you are looking for does not exist or has been moved to a new location.
      </p>
      <Link 
        href="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-[2rem] font-black shadow-xl shadow-blue-600/20 transition-all active:scale-95"
      >
        Go Home
      </Link>
    </div>
  )
}
