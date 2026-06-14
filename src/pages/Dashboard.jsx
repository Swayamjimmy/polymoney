import { useExpenses } from '../context/ExpenseContext.jsx'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4']

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other']

function Dashboard() {
  const expenses = useExpenses()

  const totalSpending = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const totalTransactions = expenses.length

  const categoryData = CATEGORIES.map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0)
  })).filter(d => d.value > 0)

  const monthlyData = expenses.reduce((acc, e) => {
    const month = e.date.slice(0, 7)
    acc[month] = (acc[month] || 0) + Number(e.amount)
    return acc
  }, {})

  const barData = Object.entries(monthlyData).map(([month, total]) => ({ month, total })).sort((a, b) => a.month.localeCompare(b.month))

  const topCategory = categoryData.length > 0 ? categoryData.reduce((a, b) => a.value > b.value ? a : b).name : 'N/A'

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Total Spending</p>
          <p className="text-2xl font-bold text-white">₹{totalSpending.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Transactions</p>
          <p className="text-2xl font-bold text-white">{totalTransactions}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Top Category</p>
          <p className="text-2xl font-bold text-white">{topCategory}</p>
        </div>
      </div>

      {expenses.length === 0 ? (
        <p className="text-gray-400 text-center py-12">No expenses yet. Add some to see your charts!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Spending</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard