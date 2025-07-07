import { useState } from "react"
import { ChatFilesDisplay } from "./chat-files-display"
import { ChatCommandInput } from "./chat-command-input"

const ChatInput = () => {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex flex-col flex-wrap justify-center gap-2">
      <ChatFilesDisplay />
      {files.length > 0 && (
        <div>{/* You may want to put actual file preview here */}</div>
      )}

      <div className="absolute bottom-[76px] left-0 max-h-[300px] w-full overflow-auto rounded-xl dark:border-none">
        <ChatCommandInput />
      </div>
    </div>
  )
}

export default ChatInput
