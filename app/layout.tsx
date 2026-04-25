import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoUrdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-noto-urdu" });

export const metadata: Metadata = {
  title: "MediBridge — AI Medicine Substitute Finder Pakistan",
  description: "Find affordable medicine substitutes in Pakistan using AI. Compare prices, check availability, get alternatives instantly.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.variable} ${notoUrdu.variable} min-h-screen bg-slate-50 flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
