import React from "react"
import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Pricing from "./pages/pricing"
import Upgrade from "./pages/upgrade"
import Chat from "./pages/chat"
import Dashboard from "./pages/dashboard"
import Builder from "./pages/builder"
import Crm from "./pages/crm"
import EmpireDemo from "./pages/empire-demo"
import ConsoleHomepage from "./pages/console-homepage"

// AI Console imports
import MasterConsole from "./pages/ai-console/MasterConsole"
import DualAIChat from "./pages/ai-console/DualAIChat"
import AIAnalytics from "./pages/ai-console/AIAnalytics"
import DeploymentManager from "./pages/ai-console/DeploymentManager"
import ConsoleSettings from "./pages/ai-console/ConsoleSettings"
import GHLIntegration from "./pages/ghl-integration"

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
          <Route path="/empire" element={<EmpireDemo />} />

          {/* AI Console Routes */}
          <Route path="/console" element={<MasterConsole />} />
          <Route path="/console/master" element={<MasterConsole />} />
          <Route path="/console/dual-chat" element={<DualAIChat />} />
          <Route path="/console/analytics" element={<AIAnalytics />} />
          <Route path="/console/deployment" element={<DeploymentManager />} />
          <Route path="/console/settings" element={<ConsoleSettings />} />
          <Route path="/ghl" element={<GHLIntegration />} />
          <Route path="/empire-demo" element={<EmpireDemo />} />

          <Route path="/" element={<ConsoleHomepage />} />
        </Routes>
      </main>
    </div>
  )
}
