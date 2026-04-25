import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { medicineName } = await request.json()

    if (!medicineName || medicineName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid medicine name" },
        { status: 400 }
      )
    }

    const prompt = `You are a professional pharmacist in Pakistan with 20 years of experience.
     
Find complete information and substitutes for this medicine: "${medicineName}" 

Respond ONLY in valid JSON format, no markdown, no extra text, no backticks: 

{
  "originalMedicine": {
    "name": "exact medicine name",
    "genericName": "scientific/generic name",
    "salt": "active ingredient with strength",
    "uses": "what conditions it treats",
    "sideEffects": ["side effect 1", "side effect 2", "side effect 3"],
    "manufacturer": "company name",
    "estimatedPrice": 50,
    "type": "tablet"
  },
  "substitutes": [
    {
      "id": "sub_1",
      "name": "substitute medicine name",
      "salt": "same active ingredient",
      "manufacturer": "Pakistani pharma company",
      "estimatedPrice": 35,
      "strength": "500mg",
      "type": "tablet",
      "priceComparison": "cheaper",
      "availability": "high",
      "rating": 4.2,
      "note": "widely available at all pharmacies"
    }
  ],
  "warning": "any important medical warning or empty string",
  "disclaimer": "Always consult a doctor before switching medicines"
}

Rules:
- Give exactly 4 to 5 substitutes
- Only medicines available in Pakistan
- priceComparison must be: cheaper, same, or expensive
- availability must be: high, medium, or low
- type must be: tablet, syrup, injection, cream, or drops
- estimatedPrice in Pakistani Rupees as number only
- rating between 3.0 and 5.0
- If medicine completely unknown, return: {"error": "Medicine not found. Please check spelling."}`

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
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenRouter Error:", errorData)
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 500 }
      )
    }

    const data = await response.json()
    const rawText = data.choices[0]?.message?.content || ""

    // Clean and parse JSON
    const cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const parsed = JSON.parse(cleanText)

    if (parsed.error) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 404 }
      )
    }

    return NextResponse.json(parsed)

  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
