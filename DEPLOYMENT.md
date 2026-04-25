# Deployment Guide

## Step 1 — Push to GitHub
git init
git add .
git commit -m "🚀 Initial commit — MediBridge v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medibridge.git
git push -u origin main

## Step 2 — Deploy on Vercel
1. Go to vercel.com
2. Click "New Project"
3. Import from GitHub — select medibridge repo
4. Add Environment Variables:
   - Name: OPENROUTER_API_KEY
     Value: your_actual_api_key
   - Name: NEXT_PUBLIC_APP_URL
     Value: https://medbridge.vercel.app
5. Click Deploy
6. Done! 🎉

## Step 3 — Custom Domain (Optional)
- In Vercel dashboard → Settings → Domains
- Add: medbridge.vercel.app (free)
  or your own domain
