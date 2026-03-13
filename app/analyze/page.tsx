"use client"

import { useState } from "react"
import { MealUploader } from "@/components/meal-uploader"
import { NutritionResults } from "@/components/nutrition-results"

export default function AnalyzePage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (imageData: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Analysis failed")
      }
      const data = await response.json()
      console.log("[v0] Analysis successful:", data)
      setResults(data.data)
    } catch (error) {
      console.error("[v0] Error analyzing meal:", error)
      alert(`Failed to analyze meal: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Analyze Your Meal</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Upload or capture a photo to get instant nutrition breakdown
          </p>
        </div>

        {!results ? (
          <MealUploader onAnalyze={handleAnalyze} loading={loading} />
        ) : (
          <>
            <NutritionResults results={results} />
            <button
              onClick={() => setResults(null)}
              className="mt-8 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
            >
              Analyze Another Meal
            </button>
          </>
        )}
      </div>
    </div>
  )
}
