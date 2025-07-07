'use client'

import { FC } from 'react'

interface ChatModelSelectorProps {
  // Add any props you need
}

const ChatModelSelector: FC<ChatModelSelectorProps> = () => {
  return (
    <div>
      {/* Replace with actual model selection UI */}
      <label htmlFor="model">Model:</label>
      <select id="model" className="border p-2 rounded">
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
      </select>
    </div>
  )
}

export default ChatModelSelector
