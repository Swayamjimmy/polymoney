import { Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddExpense from './pages/AddExpense.jsx'
import Insights from './pages/Insights.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App