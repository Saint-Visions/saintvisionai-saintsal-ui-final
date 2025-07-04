import React from "react"
import { Routes, Route } from "react-router-dom"
import EmpireMainLayout from "./components/layout/EmpireMainLayout"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

// Dashboard & Console Pages
import DashboardMain from "./pages/DashboardMain"
import MasterConsole from "./pages/ai-console/MasterConsole"
import DualAIChat from "./pages/ai-console/DualAIChat"
import AIAnalytics from "./pages/ai-console/AIAnalytics"
import DeploymentManager from "./pages/ai-console/DeploymentManager"
import ConsoleSettings from "./pages/ai-console/ConsoleSettings"

// Empire Pages
import EmpireHome from "./pages/empire-home"
import EmpireLive from "./pages/empire-live"
import EmpireShowcase from "./pages/empire-showcase"
import EmpireAnalytics from "./pages/empire-analytics"
import EmpireAdmin from "./pages/empire-admin"
import EmpireStatus from "./pages/empire-status"
import EmpireDemo from "./pages/empire-demo"

// Feature Pages
import BuilderDemo from "./pages/builder-demo"
import BuilderDynamic from "./pages/builder-dynamic"
import Pricing from "./pages/pricing"
import Chat from "./pages/chat"
import CRM from "./pages/crm"
import GHLIntegration from "./pages/ghl-integration"
import Upgrade from "./pages/upgrade"

// Simple Builder.io Page
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
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
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
    <div className="min-h-screen bg-black">
      <Routes>
        {/* Public Pages (No Layout) */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/get-started" element={<SignUp />} />

        {/* Protected Pages with Empire Layout */}
        <Route
          path="/dashboard"
          element={
            <EmpireMainLayout>
              <DashboardMain />
            </EmpireMainLayout>
          }
        />

        {/* AI Console Routes */}
        <Route
          path="/console"
          element={
            <EmpireMainLayout>
              <MasterConsole />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/console/dual-chat"
          element={
            <EmpireMainLayout>
              <DualAIChat />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/console/analytics"
          element={
            <EmpireMainLayout>
              <AIAnalytics />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/console/deployment"
          element={
            <EmpireMainLayout>
              <DeploymentManager />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/console/settings"
          element={
            <EmpireMainLayout>
              <ConsoleSettings />
            </EmpireMainLayout>
          }
        />

        {/* Empire Core Routes */}
        <Route
          path="/empire"
          element={
            <EmpireMainLayout>
              <EmpireHome />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-live"
          element={
            <EmpireMainLayout>
              <EmpireLive />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-showcase"
          element={
            <EmpireMainLayout>
              <EmpireShowcase />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-analytics"
          element={
            <EmpireMainLayout>
              <EmpireAnalytics />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-admin"
          element={
            <EmpireMainLayout>
              <EmpireAdmin />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-status"
          element={
            <EmpireMainLayout>
              <EmpireStatus />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/empire-demo"
          element={
            <EmpireMainLayout>
              <EmpireDemo />
            </EmpireMainLayout>
          }
        />

        {/* Feature Pages */}
        <Route
          path="/chat"
          element={
            <EmpireMainLayout>
              <Chat />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <EmpireMainLayout>
              <Pricing />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/crm"
          element={
            <EmpireMainLayout>
              <CRM />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/ghl"
          element={
            <EmpireMainLayout>
              <GHLIntegration />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/upgrade"
          element={
            <EmpireMainLayout>
              <Upgrade />
            </EmpireMainLayout>
          }
        />

        {/* Builder.io Routes */}
        <Route path="/builder" element={<SimpleBuilder />} />
        <Route
          path="/builder-demo"
          element={
            <EmpireMainLayout>
              <BuilderDemo />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/builder-dynamic"
          element={
            <EmpireMainLayout>
              <BuilderDynamic />
            </EmpireMainLayout>
          }
        />

        {/* Legacy Redirects */}
        <Route path="/solutions" element={<Landing />} />
        <Route path="/about" element={<Landing />} />
        <Route path="/contact" element={<Landing />} />
        <Route path="/demo" element={<Landing />} />
        <Route
          path="/analytics"
          element={
            <EmpireMainLayout>
              <EmpireAnalytics />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/team"
          element={
            <EmpireMainLayout>
              <DashboardMain />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <EmpireMainLayout>
              <DashboardMain />
            </EmpireMainLayout>
          }
        />
        <Route
          path="/activity"
          element={
            <EmpireMainLayout>
              <DashboardMain />
            </EmpireMainLayout>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <EmpireMainLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h1 className="text-4xl font-bold text-yellow-400 mb-4">
                    SAINTSAL™ EMPIRE
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Page not found - Return to Empire
                  </p>
                  <a
                    href="/empire"
                    className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Return to Empire Home
                  </a>
                </div>
              </div>
            </EmpireMainLayout>
          }
        />
      </Routes>
    </div>
  )
}
