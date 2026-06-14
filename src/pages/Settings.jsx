import { useBudgets, useBudgetDispatch } from '../context/ExpenseContext.jsx'

// Same category list used across the app
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other']

function Settings() {
  const budgets = useBudgets()
  const dispatch = useBudgetDispatch()

  // Dispatch SET_BUDGET for each category as the user types
  function handleChange(category, value) {
    dispatch({
      type: 'SET_BUDGET',
      payload: { category, limit: Number(value) || 0 }
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Budget Settings</h2>
      <p className="text-gray-400 mb-6">Set monthly spending limits for each category.</p>
      <div className="space-y-4">
        {CATEGORIES.map(cat => (
          <div key={cat} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <label className="text-gray-300">{cat}</label>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">$</span>
              <input
                type="number"
                value={budgets[cat] || ''}
                onChange={(e) => handleChange(cat, e.target.value)}
                className="w-24 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-indigo-500"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Settings