import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#10161C] text-white p-4 space-y-4">
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:text-yellow-500">Dashboard</Link>
        <Link to="/chat" className="hover:text-yellow-500">Chat</Link>
        <Link to="/pricing" className="hover:text-yellow-500">Pricing</Link>
        <Link to="/crm" className="hover:text-yellow-500">CRM</Link>
        <Link to="/upgrade" className="hover:text-yellow-500">Upgrade</Link>
        <Link to="/builder" className="hover:text-yellow-500">Builder</Link>
      </nav>
    </aside>
  )
}
