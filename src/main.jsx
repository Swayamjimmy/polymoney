import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import { ExpenseProvider } from './context/ExpenseContext.jsx'
import './index.css'

// BrowserRouter enables URL-based navigation
// ExpenseProvider gives all components access to expense state
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)