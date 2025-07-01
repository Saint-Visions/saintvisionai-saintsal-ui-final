"use client"

import { ChatHelp } from "@/components/chat/chat-help"
import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatSettings } from "@/components/chat/chat-settings"
import { ChatUI } from "@/components/chat/chat-ui"
import { QuickSettings } from "@/components/chat/quick-settings"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import useHotkey from "@/lib/hooks/use-hotkey"
import { useTheme } from "next-themes"
import { useContext } from "react"

export default function ChatPage() {
  useHotkey("o", () => handleNewChat())
  useHotkey("l", () => {
    handleFocusChatInput()
  })

  const { chatMessages } = useContext(ChatbotUIContext)

  const { handleNewChat, handleFocusChatInput } = useChatHandler()

  const { theme } = useTheme()

  return (
    <>
      {chatMessages.length === 0 ? (
        <div className="relative flex h-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50% absolute mb-20 flex flex-col items-center">
            <Brand theme={theme === "dark" ? "dark" : "light"} compact />
            <div className="mt-4 text-center">
              <h2 className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent">
                SaintSal Assistant
              </h2>
              <p className="mt-2 text-lg font-medium text-yellow-400/80">
                Cookin' Knowledge
              </p>
            </div>
          </div>

          <div className="absolute left-2 top-2">
            <QuickSettings />
          </div>

          <div className="absolute right-2 top-2">
            <ChatSettings />
          </div>

          <div className="flex grow flex-col items-center justify-center" />

          <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
            <ChatInput />
          </div>

          <div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">
            <ChatHelp />
          </div>
        </div>
      ) : (
        <ChatUI />
      )}
    </>
  )
}
