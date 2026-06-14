import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'

// Initialize the Gemini SDK with your API key from .env
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export function useGemini() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getInsights(expenses) {
    setLoading(true)
    setError(null)

    // Format each expense into a readable string for the AI
    const expenseSummary = expenses.map(e => `${e.date} - ${e.category}: $${e.amount} (${e.description})`).join('\n')

    // Prompt instructs Gemini to return structured JSON with three arrays
    const prompt = `You are a personal finance assistant. Analyze these expenses and provide insights about spending habits, patterns, and suggestions to save money. Format your response as JSON with three arrays: "patterns" (3 observations about spending habits), "warnings" (any concerning trends), and "suggestions" (3 actionable tips to save money). The money currency is rupees. Only return valid JSON, no markdown.\n\nExpenses:\n${expenseSummary}`

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      })

      // Parse the JSON string from Gemini's response
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