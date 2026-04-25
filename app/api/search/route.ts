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

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "your_openrouter_key_here") {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured. Please add it to your environment variables." },
        { status: 500 }
      )
    }

    const prompt = `You are an expert pharmacist in Pakistan.
    
Search for this medicine: "${medicineName}"

If the name is slightly misspelled (like "pandol", "panadol", "augmetin"), correct it to the actual medicine available in Pakistan.

Provide the response in EXACTLY this JSON format:
{
  "originalMedicine": {
    "name": "Corrected Name",
    "genericName": "Generic Name",
    "salt": "Active Ingredient",
    "uses": "Primary uses",
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
      "note": "Description"
    }
  ],
  "warning": "Medical warning",
  "disclaimer": "Consult a doctor"
}

Rules:
1. Only Pakistani medicines.
2. 4-5 substitutes.
3. Valid JSON only.
4. If the medicine is completely unknown, return: {"error": "Medicine not found in Pakistan database."}

Response:`

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
    let rawText = data.choices[0]?.message?.content || ""
    console.log("AI Raw Response:", rawText)

    // More robust JSON cleaning
    rawText = rawText.replace(/```json\s?/, "").replace(/```/, "").trim()
    
    // Find the first { and last } to extract JSON if there's extra text
    const firstBrace = rawText.indexOf("{")
    const lastBrace = rawText.lastIndexOf("}")
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      rawText = rawText.substring(firstBrace, lastBrace + 1)
    }

    try {
      const parsed = JSON.parse(rawText)

      if (parsed.error) {
        return NextResponse.json(
          { error: parsed.error },
          { status: 404 }
        )
      }

      return NextResponse.json(parsed)
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw text:", rawText)
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
