import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/lib/LanguageContext"

export const metadata: Metadata = {
  title: "MediBridge — AI Medicine Substitute Finder Pakistan",
  description: "AI-powered medicine substitute finder for Pakistan. Discover verified alternatives and compare prices instantly.",
  keywords: "medicine substitute pakistan, generic medicine, cheap medicine, dawa, dawai alternative",
  openGraph: {
    title: "MediBridge — AI Medicine Substitute Finder",
    description: "Find affordable medicine alternatives in Pakistan",
    url: "https://medbridge.vercel.app",
    siteName: "MediBridge",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediBridge — AI Medicine Substitute Finder",
    description: "Find affordable medicine alternatives in Pakistan",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#0A0F1E] text-white selection:bg-cyan-400/30 selection:text-white">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
