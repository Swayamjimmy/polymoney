import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export function useGemini() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getInsights(expenses, budgets = {}) {
    setLoading(true)
    setError(null)

    const expenseSummary = expenses.map(e => `${e.date} - ${e.category}: $${e.amount} (${e.description})`).join('\n')
    const budgetSummary = Object.entries(budgets).filter(([, limit]) => limit > 0).map(([cat, limit]) => `${cat}: $${limit}/month`).join('\n')

    const prompt = `You are a personal finance assistant. Analyze these expenses and provide insights. ${budgetSummary ? `The user has set these monthly budget limits:\n${budgetSummary}\nFlag any categories where spending is approaching (>=80%) or exceeding the limit in the warnings array.` : ''} Format your response as JSON with three arrays: "patterns" (3 observations about spending habits), "warnings" (any concerning trends or budget alerts), and "suggestions" (3 actionable tips to save money). Only return valid JSON, no markdown.\n\nExpenses:\n${expenseSummary}`

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      })

      const parsed = JSON.parse(response.text)
      setInsights(parsed)
    } catch (err) {
      setError('Failed to get AI insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { insights, loading, error, getInsights }
}