// AI Streaming Service for SaintSal Empire
export type AIModel = "saintvision" | "empire"

export interface StreamMessage {
  id: string
  content: string
  role: "user" | "saintvision" | "empire"
  timestamp: Date
  metadata?: {
    model?: string
    tokens?: number
    latency?: number
    confidence?: number
  }
}

export interface StreamConfig {
  model: AIModel
  preferredModel?: "gpt-4" | "azure" | "gpt-3.5"
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

class AIStreamService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl =
      import.meta.env.VITE_AI_API_URL || "https://api.openai.com/v1"
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || ""
  }

  async *streamResponse(
    messages: StreamMessage[],
    config: StreamConfig
  ): AsyncGenerator<string, void, unknown> {
    const systemPrompts = {
      saintvision: `You are SaintVision AI, a strategic intelligence assistant for the SaintSal Empire.
      Your role is to provide market analysis, strategic planning, competitive intelligence, and vision-driven insights.
      You are analytical, forward-thinking, and focus on strategic opportunities and market positioning.
      Always provide actionable intelligence that helps build and expand the empire.`,

      empire: `You are Empire AI, an operational command assistant for the SaintSal Empire.
      Your role is to handle deployment management, system operations, resource optimization, and tactical execution.
      You are direct, efficient, results-focused, and prioritize operational excellence and performance.
      Always provide clear, actionable operational guidance that ensures empire dominance.`
    }

    const getModelName = () => {
      if (config.preferredModel === "azure") return "gpt-4" // Azure endpoint
      if (config.preferredModel === "gpt-3.5") return "gpt-3.5-turbo"
      return "gpt-4" // Default to GPT-4
    }

    const payload = {
      model: getModelName(),
      messages: [
        { role: "system", content: systemPrompts[config.model] },
        ...messages.map(msg => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        }))
      ],
      temperature: config.temperature || 0.7,
      max_tokens: config.maxTokens || 1000,
      stream: true
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body reader available")
      }

      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") return

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                yield content
              }
            } catch (e) {
              console.warn("Failed to parse streaming response:", e)
            }
          }
        }
      }
    } catch (error) {
      console.error("AI streaming error:", error)
      throw error
    }
  }

  async getSingleResponse(
    messages: StreamMessage[],
    config: StreamConfig
  ): Promise<StreamMessage> {
    let fullContent = ""
    const startTime = Date.now()

    for await (const chunk of this.streamResponse(messages, config)) {
      fullContent += chunk
    }

    const endTime = Date.now()

    return {
      id: crypto.randomUUID(),
      content: fullContent,
      role: config.model,
      timestamp: new Date(),
      metadata: {
        model: config.model,
        latency: endTime - startTime,
        tokens: fullContent.split(" ").length
      }
    }
  }

  // Simulate AI responses for demo purposes
  async *simulateStream(
    model: AIModel,
    prompt: string
  ): AsyncGenerator<string, void, unknown> {
    const responses = {
      saintvision: [
        "Analyzing market conditions... ",
        "Strategic assessment indicates ",
        "strong growth potential in emerging sectors. ",
        "Recommend focusing on AI-driven expansion ",
        "with emphasis on competitive positioning. ",
        "Market intelligence suggests optimal timing ",
        "for empire scaling operations."
      ],
      empire: [
        "Operational systems engaged... ",
        "Deployment pipeline optimized. ",
        "Resource allocation at 97% efficiency. ",
        "Infrastructure scaling initiated. ",
        "Performance metrics exceed targets. ",
        "Empire operations nominal. ",
        "Ready for next directive."
      ]
    }

    const chunks = responses[model]

    for (const chunk of chunks) {
      await new Promise(resolve =>
        setTimeout(resolve, 100 + Math.random() * 200)
      )
      yield chunk
    }
  }
}

export const aiStream = new AIStreamService()
