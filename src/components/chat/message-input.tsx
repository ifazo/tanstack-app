"use client"

import type React from "react"

import { SendHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MessageInputProps {
  messageText: string
  onMessageChange: (text: string) => void
  onSendMessage: () => void
}

export function MessageInput({ messageText, onMessageChange, onSendMessage }: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <div className="p-4 border-t border-border bg-card flex-shrink-0">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          className="flex-1 bg-input border-border"
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onSendMessage}>
          Send
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
