import React, { useState, useRef, useEffect } from "react"
import {
  EmpireCard,
  EmpireButton,
  EmpireInput,
  EmpireBadge,
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  PreferenceDropdown,
  StatusPanel,
  AIModelPreference
} from "../components/index"
import { aiStream, StreamMessage, AIModel } from "../lib/ai-stream"
import { supabase, getCurrentUser } from "../lib/supabase"
import { crmService } from "../lib/crm-service"

export default function Chat() {
  const [messages, setMessages] = useState<StreamMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [activeAI, setActiveAI] = useState<AIModel>("saintvision")
  const [modelPreference, setModelPreference] =
    useState<AIModelPreference>("gpt-4")
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initializeSession()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const initializeSession = async () => {
    try {
      const user = await getCurrentUser()
      if (user) {
        // Create or get existing customer
        let customer = await crmService
          .getCustomerById(user.id)
          .catch(() => null)
        if (!customer) {
          customer = await crmService.createCustomer({
            id: user.id,
            email: user.email || "",
            name: user.user_metadata?.name || "Anonymous"
          })
        }

        // Create new chat session
        const session = await crmService.createChatSession(user.id, "both")
        setCurrentSession(session.id)
      }
    } catch (error) {
      console.error("Failed to initialize session:", error)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return

    const userMessage: StreamMessage = {
      id: crypto.randomUUID(),
      content: inputMessage,
      role: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsStreaming(true)

    try {
      // Save user message to database
      if (currentSession) {
        await crmService.addChatMessage(currentSession, inputMessage, "user")
      }

      // Stream AI response
      const aiMessage: StreamMessage = {
        id: crypto.randomUUID(),
        content: "",
        role: activeAI,
        timestamp: new Date(),
        metadata: { model: modelPreference }
      }

      setMessages(prev => [...prev, aiMessage])

      let fullResponse = ""

      // Use real AI streaming if API key is available, otherwise simulate
      const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY

      if (hasApiKey) {
        for await (const chunk of aiStream.streamResponse(
          [...messages, userMessage],
          { model: activeAI, preferredModel: modelPreference }
        )) {
          fullResponse += chunk
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessage.id ? { ...msg, content: fullResponse } : msg
            )
          )
        }
      } else {
        // Fallback to simulation
        for await (const chunk of aiStream.simulateStream(
          activeAI,
          inputMessage
        )) {
          fullResponse += chunk
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessage.id ? { ...msg, content: fullResponse } : msg
            )
          )
        }
      }

      // Save AI response to database
      if (currentSession) {
        await crmService.addChatMessage(
          currentSession,
          fullResponse,
          activeAI,
          {
            model: activeAI,
            tokens: fullResponse.split(" ").length
          }
        )
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: "Sorry, I encountered an error. Please try again.",
          role: activeAI,
          timestamp: new Date()
        }
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const getMessageStyling = (role: string) => {
    switch (role) {
      case "saintvision":
        return "bg-blue-900/30 border-l-4 border-blue-400"
      case "empire":
        return "bg-yellow-900/30 border-l-4 border-yellow-400"
      default:
        return "bg-gray-800 border border-gray-700"
    }
  }

  const getMessageIcon = (role: string) => {
    switch (role) {
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-4">
            AI <span className="text-yellow-400">CHAT</span>
          </h1>
          <p className="text-xl text-gray-300">
            Chat with SaintVision AI (Strategic) or Empire AI (Operational)
          </p>
        </div>

        {/* AI Selection */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex gap-4">
            <EmpireButton
              variant={activeAI === "saintvision" ? "primary" : "outline"}
              onClick={() => setActiveAI("saintvision")}
            >
              🧠 SaintVision AI
            </EmpireButton>
            <EmpireButton
              variant={activeAI === "empire" ? "primary" : "outline"}
              onClick={() => setActiveAI("empire")}
            >
              ⚡ Empire AI
            </EmpireButton>
          </div>
          <div>
            <PreferenceDropdown
              value={modelPreference}
              onChange={setModelPreference}
            />
          </div>
        </div>

        {/* Chat Interface */}
        <EmpireCard variant="glow" padding="none">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                <div className="text-4xl mb-4">
                  {activeAI === "saintvision" ? "🧠" : "⚡"}
                </div>
                <p>
                  {activeAI === "saintvision"
                    ? "SaintVision AI ready for strategic analysis"
                    : "Empire AI ready for operational commands"}
                </p>
              </div>
            )}

            {messages.map(message => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${getMessageStyling(message.role)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getMessageIcon(message.role)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">
                        {message.role === "user"
                          ? "You"
                          : message.role === "saintvision"
                            ? "SaintVision AI"
                            : "Empire AI"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.metadata?.latency && (
                        <EmpireBadge variant="info" size="sm">
                          {message.metadata.latency}ms
                        </EmpireBadge>
                      )}
                    </div>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isStreaming && (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                <span>
                  {activeAI === "saintvision" ? "SaintVision" : "Empire"} AI is
                  thinking...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-6">
            <div className="flex gap-4">
              <EmpireInput
                placeholder={`Message ${activeAI === "saintvision" ? "SaintVision" : "Empire"} AI...`}
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                disabled={isStreaming}
                className="flex-1"
              />
              <EmpireButton
                variant="primary"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isStreaming}
              >
                {isStreaming ? "Sending..." : "Send"}
              </EmpireButton>
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm text-gray-400">
                Chatting with{" "}
                {activeAI === "saintvision"
                  ? "SaintVision AI (Strategic Intelligence)"
                  : "Empire AI (Operational Command)"}
              </span>
            </div>
          </div>
        </EmpireCard>
      </div>
    </div>
  )
}
