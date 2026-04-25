import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const SYSTEM_PROMPT = `You are an expert pharmacist and medical AI assistant in Pakistan.
    
Search for the medicine provided by the user.

If the name is slightly misspelled (like "pandol", "panadol", "augmetin", "brufin"), correct it to the actual medicine available in Pakistan.

Provide the response in EXACTLY this JSON format:
{
  "originalMedicine": {
    "name": "Corrected Name",
    "genericName": "Generic Name",
    "salt": "Active Ingredient",
    "uses": "Primary uses in detail",
    "sideEffects": ["Effect 1", "Effect 2"],
    "manufacturer": "Company Name",
    "estimatedPrice": 100,
    "type": "tablet"
  },
  "substitutes": [
    {
      "id": "1",
      "name": "Substitute Name",
      "salt": "Same Active Ingredient",
      "manufacturer": "Pakistani Company",
      "estimatedPrice": 80,
      "strength": "500mg",
      "type": "tablet",
      "priceComparison": "cheaper",
      "availability": "high",
      "rating": 4.5,
      "note": "A short note about this brand"
    }
  ],
  "warning": "Critical medical warning regarding this salt/medicine",
  "disclaimer": "Always consult a doctor before changing medications. Information is for educational purposes.",
  "healthInsights": ["Brief tip 1", "Brief tip 2"]
}

Rules:
1. Focus ONLY on Pakistani pharmaceutical market.
2. Provide 4-6 high-quality substitutes.
3. Ensure estimated prices are current approximate PKR values.
4. If the medicine is completely unknown or not available in Pakistan, return: {"error": "Medicine not found in Pakistan database."}
5. Valid JSON only, no conversational text.`

async function callOpenRouter(medicineName: string) {
  if (!process.env.OPENROUTER_API_KEY) return null

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://medbridge.vercel.app",
      "X-Title": "MediBridge"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [{ role: "user", content: `Medicine: ${medicineName}\n\n${SYSTEM_PROMPT}` }],
      temperature: 0.2,
      max_tokens: 1500
    })
  })

  if (!response.ok) return null
  const data = await response.json()
  return data.choices[0]?.message?.content || null
}

async function callGemini(medicineName: string) {
  if (!process.env.GEMINI_API_KEY) return null

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nMedicine: ${medicineName}`)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini Error:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { medicineName } = await request.json()

    if (!medicineName || medicineName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid medicine name" },
        { status: 400 }
      )
    }

    let aiResponse = null
    
    // Strategy: Try Gemini first, fallback to OpenRouter
    aiResponse = await callGemini(medicineName)
    
    if (!aiResponse) {
      console.log("Gemini failed or skipped, trying OpenRouter...")
      aiResponse = await callOpenRouter(medicineName)
    }

    if (!aiResponse) {
      return NextResponse.json(
        { error: "AI services are currently unavailable. Please try again later." },
        { status: 503 }
      )
    }

    // JSON Cleaning
    let cleanedText = aiResponse.replace(/```json\s?/, "").replace(/```/, "").trim()
    const firstBrace = cleanedText.indexOf("{")
    const lastBrace = cleanedText.lastIndexOf("}")
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanedText = cleanedText.substring(firstBrace, lastBrace + 1)
    }

    try {
      const parsed = JSON.parse(cleanedText)
      if (parsed.error) {
        return NextResponse.json({ error: parsed.error }, { status: 404 })
      }
      return NextResponse.json(parsed)
    } catch (parseError) {
      console.error("Parse Error. Raw text:", aiResponse)
      return NextResponse.json(
        { error: "Invalid response from AI. Please try again." },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
