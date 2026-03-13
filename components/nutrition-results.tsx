"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface FoodItem {
  name: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface NutritionTotal {
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface WebhookResponse {
  status: string
  food: FoodItem[]
  total: NutritionTotal
}

interface NutritionResultsProps {
  results: WebhookResponse
}

export function NutritionResults({ results }: NutritionResultsProps) {
  const { food, total } = results
  const totalMacros = total.protein + total.carbs + total.fat || 1

  // Calculate percentages
  const proteinPercent = Math.round((total.protein / totalMacros) * 100)
  const carbsPercent = Math.round((total.carbs / totalMacros) * 100)
  const fatPercent = Math.round((total.fat / totalMacros) * 100)

  // Chart data
  const chartData = [
    { name: "Protein", value: total.protein, color: "#10B981" },
    { name: "Carbs", value: total.carbs, color: "#F97316" },
    { name: "Fat", value: total.fat, color: "#8B5CF6" },
  ]

  // Calculate health score based on macronutrient balance
  const getHealthScore = () => {
    if (total.calories === 0) return 0
    const proteinRatio = total.protein / (total.calories / 4)
    if (proteinRatio > 0.3 && carbsPercent < 60 && fatPercent < 35) return 9
    if (proteinRatio > 0.25 && carbsPercent < 65 && fatPercent < 40) return 8
    if (proteinRatio > 0.2 && carbsPercent < 70 && fatPercent < 45) return 7
    if (proteinRatio > 0.15) return 6
    return 5
  }

  const healthScore = getHealthScore()

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return "bg-emerald-500"
    if (score >= 6) return "bg-green-500"
    if (score >= 4) return "bg-amber-500"
    return "bg-rose-500"
  }

  const getHealthScoreText = (score: number) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    if (score >= 4) return "Fair"
    return "Poor"
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-green-200 dark:border-slate-700 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-slate-800/50 dark:to-slate-900/50 p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />

        <div className="space-y-4 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analysis Result</h2>
            <p className="text-slate-600 dark:text-slate-400">{food.length} items identified</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                Total Calories
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {Math.round(total.calories)}
                </p>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400 italic">kcal</p>
              </div>
            </div>

            <div
              className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-lg shadow-green-500/10 ${getHealthScoreColor(healthScore)} text-white transform hover:scale-105 transition-transform duration-300`}
            >
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80">Health Score</p>
              <p className="text-3xl sm:text-4xl font-black">
                {healthScore}
                <span className="text-lg opacity-60">/10</span>
              </p>
              <p className="text-[10px] sm:text-xs font-bold mt-1 px-2 py-0.5 bg-white/20 rounded-full">
                {getHealthScoreText(healthScore)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Macronutrients Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6 border-green-200 dark:border-slate-700 bg-green-50 dark:bg-slate-800/50">
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Protein</p>
            <p className="text-3xl font-bold text-green-600 mb-1">{total.protein.toFixed(1)}g</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">{proteinPercent}% of macros</p>
          </div>
        </Card>

        <Card className="p-6 border-orange-200 dark:border-slate-700 bg-orange-50 dark:bg-slate-800/50">
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Carbs</p>
            <p className="text-3xl font-bold text-orange-500 mb-1">{total.carbs.toFixed(1)}g</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">{carbsPercent}% of macros</p>
          </div>
        </Card>

        <Card className="p-6 border-purple-200 dark:border-slate-700 bg-purple-50 dark:bg-slate-800/50">
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Fat</p>
            <p className="text-3xl font-bold text-purple-600 mb-1">{total.fat.toFixed(1)}g</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">{fatPercent}% of macros</p>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6 border-green-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Macronutrient Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: `1px solid var(--color-border)`,
                borderRadius: "8px",
              }}
              formatter={(value) => `${value.toFixed(1)}g`}
            />
            <Bar dataKey="value" fill="var(--color-primary)">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Food Items List */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-green-500 rounded-full" />
          Detected Items
        </h3>
        <div className="space-y-3">
          {food.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-100 dark:hover:border-green-900/30 transition-colors shadow-sm"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 dark:text-white">{Math.round(item.calories)} cal</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  P: {item.protein.toFixed(1)}g | C: {item.carbs.toFixed(1)}g | F: {item.fat.toFixed(1)}g
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Nutrition Tips */}
      <Card className="p-6 border-blue-200 dark:border-slate-700 bg-blue-50 dark:bg-slate-800/50">
        <div className="flex gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Nutritional Insight</h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
              {healthScore >= 8
                ? "Excellent meal choice! Well-balanced with good protein content and controlled carbs."
                : healthScore >= 6
                  ? "Good meal composition. Consider increasing protein intake for better satiety."
                  : "This meal is calorie-dense. Balance with more vegetables and lean proteins for next meal."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
