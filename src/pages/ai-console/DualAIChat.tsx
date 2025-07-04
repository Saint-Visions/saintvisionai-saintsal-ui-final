import React, { useState, useRef, useEffect } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireInput,
  EmpireBadge,
  EmpireGrid
} from "../../components/index"

interface Message {
  id: string
  content: string
  sender: "user" | "saintvision" | "empire"
  timestamp: Date
  type?: "text" | "code" | "analysis"
}

interface AIPersonality {
  name: string
  role: string
  status: "active" | "thinking" | "offline"
  expertise: string[]
  personality: string
  color: string
}

export default function DualAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "SaintVision AI online. Ready for strategic analysis and market intelligence.",
      sender: "saintvision",
      timestamp: new Date(),
      type: "text"
    },
    {
      id: "2",
      content:
        "Empire AI activated. Deployment systems and operational management ready.",
      sender: "empire",
      timestamp: new Date(),
      type: "text"
    }
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [activeAI, setActiveAI] = useState<"both" | "saintvision" | "empire">(
    "both"
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aiPersonalities: Record<string, AIPersonality> = {
    saintvision: {
      name: "SaintVision AI",
      role: "Strategic Intelligence",
      status: "active",
      expertise: [
        "Market Analysis",
        "Strategic Planning",
        "Vision Intelligence",
        "Competitive Analysis"
      ],
      personality: "Analytical, strategic, forward-thinking",
      color: "blue"
    },
    empire: {
      name: "Empire AI",
      role: "Operational Command",
      status: "active",
      expertise: [
        "Deployment Management",
        "System Operations",
        "Performance Optimization",
        "Resource Management"
      ],
      personality: "Direct, efficient, results-focused",
      color: "yellow"
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")

    // Simulate AI responses
    setTimeout(() => {
      if (activeAI === "both" || activeAI === "saintvision") {
        const saintVisionResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getSaintVisionResponse(inputMessage),
          sender: "saintvision",
          timestamp: new Date(),
          type: "analysis"
        }
        setMessages(prev => [...prev, saintVisionResponse])
      }
    }, 1000)

    setTimeout(() => {
      if (activeAI === "both" || activeAI === "empire") {
        const empireResponse: Message = {
          id: (Date.now() + 2).toString(),
          content: getEmpireResponse(inputMessage),
          sender: "empire",
          timestamp: new Date(),
          type: "text"
        }
        setMessages(prev => [...prev, empireResponse])
      }
    }, 1500)
  }

  const getSaintVisionResponse = (input: string): string => {
    const responses = [
      "Analyzing market trends... Strategic recommendation: Focus on emerging markets with 23% growth potential.",
      "Vision Intelligence suggests a multi-vector approach. Primary targets identified with 89% success probability.",
      "Competitive analysis complete. Market gap identified in enterprise AI solutions - opportunity rating: HIGH.",
      "Strategic forecast indicates optimal timing for expansion. Risk assessment: LOW, ROI projection: 340%.",
      "Intelligence synthesis: Three critical success factors identified for empire scaling operations."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getEmpireResponse = (input: string): string => {
    const responses = [
      "Deployment systems ready. Infrastructure scaled to handle 10x capacity. All systems green.",
      "Operational efficiency at 97.3%. Resource allocation optimized. Ready for empire expansion.",
      "Performance metrics exceeded targets. Server fleet expanded. Deployment pipeline automated.",
      "System operations nominal. Backup systems active. Empire infrastructure fully operational.",
      "Deployment successful. Monitoring systems active. Ready for next operational directive."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getMessageStyling = (sender: string) => {
    switch (sender) {
      case "saintvision":
        return "bg-blue-900/30 border-l-4 border-blue-400"
      case "empire":
        return "bg-yellow-900/30 border-l-4 border-yellow-400"
      default:
        return "bg-gray-800 border border-gray-700"
    }
  }

  const getMessageIcon = (sender: string) => {
    switch (sender) {
      case "saintvision":
        return "🧠"
      case "empire":
        return "⚡"
      default:
        return "👤"
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          DUAL-AI <span className="text-yellow-400">CHAT CONSOLE</span>
        </h1>
        <p className="text-xl text-gray-300">
          Strategic intelligence meets operational command • Real-time AI
          collaboration
        </p>
      </div>

      <EmpireGrid columns={4} gap="lg" className="mb-8">
        {/* AI Status Cards */}
        {Object.entries(aiPersonalities).map(([key, ai]) => (
          <EmpireCard key={key} variant="bordered" padding="md">
            <div className="text-center">
              <div className="text-2xl mb-2">
                {key === "saintvision" ? "🧠" : "⚡"}
              </div>
              <h3 className="font-bold text-white mb-1">{ai.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{ai.role}</p>
              <EmpireBadge variant="success" size="sm">
                {ai.status}
              </EmpireBadge>
            </div>
          </EmpireCard>
        ))}

        {/* AI Mode Selector */}
        <EmpireCard variant="glow" padding="md">
          <div className="text-center">
            <h3 className="font-bold text-white mb-3">Active Mode</h3>
            <div className="space-y-2">
              <EmpireButton
                variant={activeAI === "both" ? "primary" : "ghost"}
                size="sm"
                fullWidth
                onClick={() => setActiveAI("both")}
              >
                Both AIs
              </EmpireButton>
              <EmpireButton
                variant={activeAI === "saintvision" ? "primary" : "ghost"}
                size="sm"
                fullWidth
                onClick={() => setActiveAI("saintvision")}
              >
                SaintVision
              </EmpireButton>
              <EmpireButton
                variant={activeAI === "empire" ? "primary" : "ghost"}
                size="sm"
                fullWidth
                onClick={() => setActiveAI("empire")}
              >
                Empire
              </EmpireButton>
            </div>
          </div>
        </EmpireCard>

        {/* Quick Commands */}
        <EmpireCard variant="bordered" padding="md">
          <div className="text-center">
            <h3 className="font-bold text-white mb-3">Quick Commands</h3>
            <div className="space-y-2">
              <EmpireButton
                variant="outline"
                size="sm"
                fullWidth
                onClick={() =>
                  setInputMessage("Analyze current market conditions")
                }
              >
                Market Analysis
              </EmpireButton>
              <EmpireButton
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setInputMessage("Deploy system updates")}
              >
                Deploy Updates
              </EmpireButton>
              <EmpireButton
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setInputMessage("System performance report")}
              >
                Performance
              </EmpireButton>
            </div>
          </div>
        </EmpireCard>
      </EmpireGrid>

      {/* Chat Interface */}
      <EmpireCard variant="glow" padding="none">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${getMessageStyling(message.sender)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getMessageIcon(message.sender)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-white">
                      {message.sender === "user"
                        ? "You"
                        : message.sender === "saintvision"
                          ? "SaintVision AI"
                          : "Empire AI"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type && message.type !== "text" && (
                      <EmpireBadge variant="info" size="sm">
                        {message.type}
                      </EmpireBadge>
                    )}
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-700 p-6">
          <div className="flex gap-4">
            <EmpireInput
              placeholder="Enter your command or query..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <EmpireButton
              variant="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
            >
              Send Command
            </EmpireButton>
          </div>
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-400">
              Speaking to:{" "}
              {activeAI === "both"
                ? "Both AIs"
                : activeAI === "saintvision"
                  ? "SaintVision AI"
                  : "Empire AI"}
            </span>
          </div>
        </div>
      </EmpireCard>

      {/* AI Capabilities */}
      <div className="mt-8">
        <h2 className="text-2xl font-black text-white mb-6">
          AI <span className="text-yellow-400">Capabilities</span>
        </h2>
        <EmpireGrid columns={2} gap="lg">
          {Object.entries(aiPersonalities).map(([key, ai]) => (
            <EmpireCard key={key} variant="bordered" padding="lg">
              <h3 className="text-xl font-bold text-white mb-4">{ai.name}</h3>
              <p className="text-gray-300 mb-4">{ai.personality}</p>
              <div className="space-y-2">
                {ai.expertise.map((skill, index) => (
                  <EmpireBadge
                    key={index}
                    variant="secondary"
                    className="mr-2 mb-2"
                  >
                    {skill}
                  </EmpireBadge>
                ))}
              </div>
            </EmpireCard>
          ))}
        </EmpireGrid>
      </div>
    </div>
  )
}
