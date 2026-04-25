import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { medicineName } = await request.json()
    
    if (!medicineName) {
      return NextResponse.json(
        { error: "Medicine name is required" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `
    You are a professional pharmacist in Pakistan with 20 years of experience.
    Find substitutes for this medicine: "${medicineName}"
    
    Respond ONLY in this exact JSON format, no markdown, no extra text:
    {
      "originalMedicine": {
        "name": "",
        "genericName": "",
        "salt": "",
        "uses": "",
        "sideEffects": [],
        "manufacturer": "",
        "estimatedPrice": 0,
        "type": ""
      },
      "substitutes": [
        {
          "id": "",
          "name": "",
          "salt": "",
          "manufacturer": "",
          "estimatedPrice": 0,
          "strength": "",
          "type": "",
          "priceComparison": "",
          "availability": "",
          "rating": 0,
          "note": ""
        }
      ],
      "warning": "",
      "disclaimer": "Always consult a doctor before switching medicines"
    }
    `
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean response and parse JSON
    const cleanText = text.replace(/```json|```/g, "").trim()
    const data = JSON.parse(cleanText)
    
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("Gemini API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch medicine data. Please try again." },
      { status: 500 }
    )
  }
}
