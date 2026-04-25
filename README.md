# 💊 MediBridge
### AI-Powered Medicine Substitute Finder for Pakistan

![MediBridge Banner](public/banner.png)

## 🚀 Live Demo
`https://medbridge.vercel.app`

## 🎯 Problem We Solve
In Pakistan, prescribed medicines are often:
- Unavailable at local pharmacies
- Too expensive for average families
- Discontinued without alternatives

MediBridge uses AI to instantly find verified, 
affordable medicine substitutes available in Pakistan.

## ✨ Features
- 🤖 AI-powered substitute finder (Gemini 1.5 Flash)
- 🇵🇰 Pakistan-specific medicine database
- 💰 Real-time price comparison
- 🌐 Bilingual — English & Urdu
- 📱 Fully mobile responsive
- 🖨️ Print & WhatsApp share results
- 📋 Search history
- ⚖️ Side-by-side medicine comparison

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **AI:** Google Gemini 1.5 Flash
- **UI:** shadcn/ui, Framer Motion
- **Deployment:** Vercel

## 跑 Locally

git clone https://github.com/YOUR_USERNAME/medibridge
cd medibridge
npm install
cp .env.example .env.local
# Add your Gemini API key to .env.local
npm run dev

## 🔑 Get Gemini API Key
1. Go to `https://aistudio.google.com`
2. Click "Get API Key"
3. Copy and paste in .env.local

## 📁 Project Structure
medibridge/
├── app/
│   ├── api/search/     # Gemini API route
│   ├── result/         # Results page
│   ├── search/         # Search page
│   └── about/          # About page
├── components/         # Reusable components
├── lib/                # Utilities & translations
└── public/             # Static assets

## 🌍 Roadmap
- [ ] Real pharmacy database integration
- [ ] Doctor verification system
- [ ] Mobile app (React Native)
- [ ] More Pakistani languages (Pashto, Sindhi)
- [ ] Nearby pharmacy locator
- [ ] Medicine reminder feature

## ⚠️ Disclaimer
MediBridge is not a substitute for professional 
medical advice. Always consult a doctor before 
switching medicines.

## 👨‍💻 Built By
Made with ❤️ by `https://cloudexify.site`
