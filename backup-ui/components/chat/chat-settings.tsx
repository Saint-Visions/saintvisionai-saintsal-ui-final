'use client'

import { useRef } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
// Update the import path if the file is located elsewhere, for example:
import { useChatSettings } from "../../hooks/use-chat-settings"

import { useModels } from "../../hooks/use-models"

import { useTranslation } from "react-i18next"
import ChatModelSelector from "./chat-model-selector"
import ChatTemperatureSlider from "./chat-temperature-slider"

const ChatSettings = () => {
  const buttonRef = useRef(null)
  const { chatSettings } = useChatSettings()
  const { allModels } = useModels()
  const { t } = useTranslation()

  const fullModel = allModels.find(llm => llm.modelId === chatSettings.model)

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          ref={buttonRef}
          className="flex w-full items-center justify-between gap-2"
        >
          {t("Model")}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[260px] p-4">
        <ChatModelSelector />
        <Separator className="my-4" />
        <Label className="mb-1 text-xs font-medium">Temperature</Label>
        <ChatTemperatureSlider />
      </PopoverContent>
    </Popover>
  )
}

export default ChatSettings
