import { useState } from "react";

export function useChatSettings() {
  const [chatSettings, setChatSettings] = useState({ model: "default-model" });
  return { chatSettings, setChatSettings };
}
