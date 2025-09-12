"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry"

interface ReactionsPopupProps {
  onReactionSelect: (reaction: ReactionType) => void
  isVisible: boolean
}

const reactions = [
  { type: "like" as ReactionType, emoji: "👍", label: "Like" },
  { type: "love" as ReactionType, emoji: "❤️", label: "Love" },
  { type: "haha" as ReactionType, emoji: "😂", label: "Haha" },
  { type: "wow" as ReactionType, emoji: "😮", label: "Wow" },
  { type: "sad" as ReactionType, emoji: "😢", label: "Sad" },
  { type: "angry" as ReactionType, emoji: "😡", label: "Angry" },
]

export function ReactionsPopup({ onReactionSelect, isVisible }: ReactionsPopupProps) {
  const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null)
  if (!isVisible) return null

  return (
    <div className="absolute bottom-full left-0 mb-2 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-full shadow-2xl border border-border/20 p-3 flex gap-2 animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm">
        {reactions.map((reaction) => (
          <div
            key={reaction.type}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredReaction(reaction.type)}
            onMouseLeave={() => setHoveredReaction(null)}
          >
            {hoveredReaction === reaction.type && (
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap animate-in fade-in-0 slide-in-from-bottom-1 duration-200 z-50">
                {reaction.label}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={`w-12 h-12 p-0 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                hoveredReaction === reaction.type ? "scale-150 -translate-y-2" : "scale-100 hover:scale-110"
              }`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onReactionSelect(reaction.type)
              }}
            >
              <span className="text-2xl filter drop-shadow-sm">{reaction.emoji}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
