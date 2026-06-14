import { createContext, useContext, useReducer, useEffect } from 'react'

const ExpenseContext = createContext()
const ExpenseDispatchContext = createContext()

// Load saved expenses from localStorage, or start with an empty array
const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || []

// Reducer handles all expense state changes
function expenseReducer(expenses, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...expenses, action.payload]
    case 'DELETE_EXPENSE':
      return expenses.filter(expense => expense.id !== action.payload)
    default:
      return expenses
  }
}

export function ExpenseProvider({ children }) {
  const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses)

  // Persist expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  return (
    <ExpenseContext value={expenses}>
      <ExpenseDispatchContext value={dispatch}>
        {children}
      </ExpenseDispatchContext>
    </ExpenseContext>
  )
}

// Custom hooks for easy access in any component
export function useExpenses() {
  return useContext(ExpenseContext)
}

export function useExpenseDispatch() {
  return useContext(ExpenseDispatchContext)
}