import { useExpenses, useBudgets } from '../context/ExpenseContext.jsx'
import { useGemini } from '../hooks/useGemini.js'

function Insights() {
  const expenses = useExpenses()
  const budgets = useBudgets()
  const { insights, loading, error, getInsights } = useGemini()

  // Only call getInsights when there are expenses to analyze
  function handleRefresh() {
    if (expenses.length > 0) {
      getInsights(expenses, budgets)
    }
  }

  return (
    <div>
      {/* Header with title and action button aligned to opposite ends */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">AI Insights</h2>
        <button
          onClick={handleRefresh}
          disabled={loading || expenses.length === 0}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Analyzing...' : 'Get Insights'}
        </button>
      </div>

      {/* Empty state when no expenses exist */}
      {expenses.length === 0 && (
        <p className="text-gray-400 text-center py-12">Add some expenses first to get AI insights.</p>
      )}

      {/* Error message from failed API call */}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Loading skeleton with pulsing animation */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* AI results displayed in color-coded cards */}
      {insights && !loading && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-400 mb-3">Spending Patterns</h3>
            <ul className="space-y-2">
              {insights.patterns.map((pattern, i) => (
                <li key={i} className="text-gray-300">{pattern}</li>
              ))}
            </ul>
          </div>

          {insights.warnings.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 border border-red-900">
              <h3 className="text-lg font-semibold text-red-400 mb-3">Warnings</h3>
              <ul className="space-y-2">
                {insights.warnings.map((warning, i) => (
                  <li key={i} className="text-gray-300">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-3">Suggestions</h3>
            <ul className="space-y-2">
              {insights.suggestions.map((suggestion, i) => (
                <li key={i} className="text-gray-300">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Insights