import { NextResponse } from "next/server"

// Dynamically get available Gemini model
async function getAvailableModel(apiKey: string): Promise<string> {
  try {
    console.log("[v0] Fetching available models...")

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    )

    if (!response.ok) {
      console.warn("[v0] Failed to list models, using fallback")
      return "gemini-1.5-flash"
    }

    const data = await response.json()

    const supportedModel = data.models?.find(
      (model: any) =>
        model.supportedGenerationMethods?.includes("generateContent") &&
        model.name.includes("gemini")
    )

    if (supportedModel) {
      const modelName = supportedModel.name.split("/")[1]
      console.log("[v0] Selected model:", modelName)
      return modelName
    }

    return "gemini-1.5-flash"
  } catch (error) {
    console.warn("[v0] Model fetch error:", error)
    return "gemini-1.5-flash"
  }
}

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const base64Data = image.includes(",") ? image.split(",")[1] : image

    let apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Configuration Error",
          message: "GOOGLE_GENERATIVE_AI_KEY missing in environment",
        },
        { status: 500 }
      )
    }

    apiKey = apiKey.trim()

    const selectedModel = await getAvailableModel(apiKey)

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/${selectedModel}:generateContent?key=${apiKey}`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this meal photo and return ONLY valid JSON.

STRICT RULES:
- No markdown
- No explanation
- Only JSON

FORMAT:

{
  "food":[
    {
      "name":"food item",
      "quantity":"portion",
      "calories":0,
      "protein":0,
      "carbs":0,
      "fat":0
    }
  ],
  "total":{
    "calories":0,
    "protein":0,
    "carbs":0,
    "fat":0
  }
}`,
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    }

    console.log("[v0] Sending request to Gemini")

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text()

      return NextResponse.json(
        {
          error: "Gemini API failed",
          details: errText,
        },
        { status: geminiResponse.status }
      )
    }

    const geminiData = await geminiResponse.json()

    const responseText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ""

    if (!responseText) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      )
    }

    // ✅ SAFE JSON PARSING (FIXED)
    let nutritionData

    try {
      let cleanedText = responseText.trim()

      // remove markdown if exists
      cleanedText = cleanedText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

      const start = cleanedText.indexOf("{")
      const end = cleanedText.lastIndexOf("}")

      if (start === -1 || end === -1) {
        throw new Error("No valid JSON found")
      }

      const jsonString = cleanedText.substring(start, end + 1)

      nutritionData = JSON.parse(jsonString)
    } catch (error) {
      console.error("[v0] JSON Parse Failed:", responseText)

      return NextResponse.json(
        {
          error: "Parse Error",
          message: "AI returned invalid JSON",
          raw: responseText.substring(0, 300),
        },
        { status: 500 }
      )
    }

    if (!nutritionData.food || !Array.isArray(nutritionData.food)) {
      return NextResponse.json(
        { error: "Invalid data structure" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        status: "success",
        food: nutritionData.food,
        total: nutritionData.total || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        },
      },
    })
  } catch (error) {
    console.error("[v0] Server error:", error)

    return NextResponse.json(
      {
        error: "Server Error",
        message:
          error instanceof Error ? error.message : "Unexpected error occurred",
      },
      { status: 500 }
    )
  }
}
