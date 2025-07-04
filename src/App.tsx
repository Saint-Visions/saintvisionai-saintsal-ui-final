import React from "react"
import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashboardMain from "./pages/DashboardMain"

// Simple fallback pages for basic functionality
function SimpleBuilder() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-6">🏗️</div>
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Builder.io CMS
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Visual Content Management System
        </p>
        <div className="bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Ready for Content Creation
          </h2>
          <p className="mb-6">
            Your Builder.io integration is live and ready to use!
          </p>
          <a
            href="https://builder.io/content"
            target="_blank"
            className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400"
          >
            🌐 Open Builder.io Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/get-started" element={<SignUp />} />

        {/* Dashboard (Protected) */}
        <Route path="/dashboard" element={<DashboardMain />} />

        {/* Simple Pages */}
        <Route path="/builder" element={<SimpleBuilder />} />

        {/* Redirects */}
        <Route path="/solutions" element={<Landing />} />
        <Route path="/pricing" element={<Landing />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/contact" element={<Landing />} />
        <Route path="/demo" element={<Landing />} />
        <Route path="/chat" element={<DashboardMain />} />
        <Route path="/console" element={<DashboardMain />} />
        <Route path="/analytics" element={<DashboardMain />} />
        <Route path="/team" element={<DashboardMain />} />
        <Route path="/projects" element={<DashboardMain />} />
        <Route path="/upgrade" element={<DashboardMain />} />
        <Route path="/activity" element={<DashboardMain />} />
      </Routes>
    </div>
  )
}
