import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Pricing from './pages/pricing'
import Upgrade from './pages/upgrade'
import Chat from './pages/chat'
import Dashboard from './pages/dashboard'
import Builder from './pages/builder'
import Crm from './pages/crm'

export default function App() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black text-white">
        <Routes>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/crm" element={<Crm />} />
        </Routes>
      </main>
    </div>
  )
}
