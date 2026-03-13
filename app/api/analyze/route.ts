// Dynamically get available models
async function getAvailableModel(apiKey: string): Promise<string> {
  try {
    console.log("[v0] Fetching available models...")
    const listModelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    const response = await fetch(listModelsUrl)

    if (!response.ok) {
      console.warn("[v0] Failed to list models, using fallback")
      return "gemini-pro" // Fallback model
    }

    const data = await response.json()
    console.log("[v0] Available models response received")

    // Find a model that supports generateContent
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

    console.warn("[v0] No suitable model found, using fallback")
    return "gemini-pro"
  } catch (error) {
    console.warn("[v0] Error fetching models:", error)
    return "gemini-pro"
  }
}

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      console.error("[v0] No image provided in request")
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("[v0] Image received, length:", image.length)

    // Extract base64 data
    const base64Data = image.includes(",") ? image.split(",")[1] : image
    console.log("[v0] Base64 data extracted, length:", base64Data.length)

    let apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY
    if (!apiKey) {
      console.error("[v0] GOOGLE_GENERATIVE_AI_KEY not found in environment")
      return Response.json(
        {
          error: "Configuration Error",
          message:
            "Google Gemini API key not found. Please add GOOGLE_GENERATIVE_AI_KEY to your project environment variables in the 'Vars' section.",
        },
        { status: 500 },
      )
    }

    // Trim whitespace from API key
    apiKey = apiKey.trim()
    console.log("[v0] API key found and trimmed, length:", apiKey.length)

    // Get the first available model for this API key
    const selectedModel = await getAvailableModel(apiKey)
    console.log("[v0] Using model:", selectedModel)

    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/${selectedModel}:generateContent?key=${apiKey}`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this meal photo and provide a detailed nutritional breakdown. Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
{
  "food": [
    {
      "name": "food item name",
      "quantity": "estimated portion (e.g., 150g)",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number
    }
  ],
  "total": {
    "calories": total_number,
    "protein": total_number,
    "carbs": total_number,
    "fat": total_number
  }
}

Be accurate with quantities and nutritional values. If multiple food items are visible, list each one separately. Calculate totals by summing all items.`,
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
      // Add generation config for better JSON responses
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2048,
      },
    }

    console.log("[v0] Sending request to Gemini API...")
    console.log("[v0] Request URL:", geminiUrl.replace(apiKey, "***REDACTED***"))

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    console.log("[v0] Gemini API response status:", geminiResponse.status)

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text()
      console.error("[v0] Gemini API error response:", errorData)
      return Response.json(
        {
          error: "AI Analysis Failed",
          message: `Gemini API returned error: ${geminiResponse.status} - ${geminiResponse.statusText}. Please check your API key.`,
          details: errorData,
        },
        { status: geminiResponse.status },
      )
    }

    const geminiData = await geminiResponse.json()
    console.log("[v0] Gemini response structure:", JSON.stringify(geminiData, null, 2))

    // More robust response extraction
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      console.error("[v0] No candidates in Gemini response")
      return Response.json(
        { error: "Invalid AI Response", message: "No analysis results returned from AI" },
        { status: 500 },
      )
    }

    const responseText = geminiData.candidates[0]?.content?.parts?.[0]?.text
    if (!responseText) {
      console.error("[v0] No text in Gemini response parts")
      return Response.json({ error: "Invalid AI Response", message: "AI returned empty response" }, { status: 500 })
    }

    console.log("[v0] Raw AI response text:", responseText)

    // Enhanced JSON parsing with better error handling
    let nutritionData
    try {
      // Remove markdown code blocks if present
      let cleanedText = responseText.trim()
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/```\n?/g, "")
      }

      // Extract JSON object
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        console.error("[v0] No JSON object found in response")
        return Response.json(
          {
            error: "Parse Error",
            message: "Could not extract nutrition data from AI response",
            rawResponse: responseText.substring(0, 200),
          },
          { status: 500 },
        )
      }

      nutritionData = JSON.parse(jsonMatch[0])
      console.log("[v0] Parsed nutrition data:", nutritionData)
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      console.error("[v0] Failed text:", responseText.substring(0, 200))
      return Response.json(
        {
          error: "Parse Error",
          message: `Failed to parse AI response: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`,
          rawResponse: responseText.substring(0, 200),
        },
        { status: 500 },
      )
    }

    // Validate the structure
    if (!nutritionData.food || !Array.isArray(nutritionData.food)) {
      console.error("[v0] Invalid nutrition data structure - missing food array")
      return Response.json({ error: "Invalid Data", message: "AI response missing food items array" }, { status: 500 })
    }

    console.log("[v0] Analysis successful, returning data")

    return Response.json({
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
    console.error("[v0] Unexpected error in analyze route:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return Response.json(
      {
        error: "Server Error",
        message: error instanceof Error ? error.message : "An unexpected error occurred during analysis",
      },
      { status: 500 },
    )
  }
}
