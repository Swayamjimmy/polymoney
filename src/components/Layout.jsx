import { NavLink, Outlet } from 'react-router'

function Layout() {
  // Dynamic class function: returns different Tailwind classes based on active state
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">SpendWise AI</h1>
        <nav className="flex gap-2">
          <NavLink to="/" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/add" className={linkClass}>Add Expense</NavLink>
          <NavLink to="/insights" className={linkClass}>AI Insights</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout