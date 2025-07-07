'use client'

import { FC } from 'react'

interface ChatTemperatureSliderProps {
  value?: number
  onChange?: (val: number) => void
}

const ChatTemperatureSlider: FC<ChatTemperatureSliderProps> = ({
  value = 0.7,
  onChange = () => {}
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <span className="text-xs text-muted">Temperature: {value}</span>
    </div>
  )
}

export default ChatTemperatureSlider
