import { createContext, useContext, useReducer, useEffect } from 'react'

const ExpenseContext = createContext()
const ExpenseDispatchContext = createContext()
const BudgetContext = createContext()
const BudgetDispatchContext = createContext()

const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || []
const initialBudgets = JSON.parse(localStorage.getItem('budgets')) || {}

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

function budgetReducer(budgets, action) {
  switch (action.type) {
    case 'SET_BUDGET':
      return { ...budgets, [action.payload.category]: action.payload.limit }
    default:
      return budgets
  }
}

export function ExpenseProvider({ children }) {
  const [expenses, expenseDispatch] = useReducer(expenseReducer, initialExpenses)
  const [budgets, budgetDispatch] = useReducer(budgetReducer, initialBudgets)

  // Persist expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Persist budgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  return (
    <ExpenseContext value={expenses}>
      <ExpenseDispatchContext value={expenseDispatch}>
        <BudgetContext value={budgets}>
          <BudgetDispatchContext value={budgetDispatch}>
            {children}
          </BudgetDispatchContext>
        </BudgetContext>
      </ExpenseDispatchContext>
    </ExpenseContext>
  )
}

export function useExpenses() {
  return useContext(ExpenseContext)
}

export function useExpenseDispatch() {
  return useContext(ExpenseDispatchContext)
}

export function useBudgets() {
  return useContext(BudgetContext)
}

export function useBudgetDispatch() {
  return useContext(BudgetDispatchContext)
}