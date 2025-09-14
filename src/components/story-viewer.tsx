"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface Story {
  id: string
  username: string
  avatar: string
  content: string
  type: "photo" | "video"
  timestamp: string
}

interface StoryViewerProps {
  isOpen: boolean
  onClose: () => void
  stories: Story[]
  initialStoryIndex: number
}

export function StoryViewer({ isOpen, onClose, stories, initialStoryIndex }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  const currentStory = stories[currentIndex]
  const duration = currentStory?.type === "video" ? 15000 : 5000 // 15s for video, 5s for photo

  useEffect(() => {
    if (!isOpen || isPaused) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1)
            return 0
          } else {
            onClose()
            return 0
          }
        }
        return prev + 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isOpen, isPaused, currentIndex, stories.length, duration, onClose])

  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setProgress(0)
    }
  }

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (currentStory?.type === "video") {
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  if (!currentStory) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-black border-0 h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-2 right-2 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src={currentStory.avatar || "/placeholder.svg"} />
                <AvatarFallback>{currentStory.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-white font-medium text-sm">{currentStory.username}</span>
                <span className="text-white/70 text-xs ml-2">{currentStory.timestamp}</span>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Story content */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            {currentStory.type === "photo" ? (
              <img
                src={currentStory.content || "/placeholder.svg"}
                alt="Story"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={currentStory.content}
                className="max-w-full max-h-full object-contain"
                autoPlay={isVideoPlaying}
                muted
                loop
              />
            )}
          </div>

          {/* Navigation areas */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 cursor-pointer" onClick={goToPrevious} />
            <div className="flex-1 cursor-pointer" onClick={goToNext} />
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={togglePause}>
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </Button>

            {currentIndex > 0 && (
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={goToPrevious}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}

            {currentIndex < stories.length - 1 && (
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={goToNext}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
