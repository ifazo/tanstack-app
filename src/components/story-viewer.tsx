'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { timeAgo } from '@/lib/time'

interface FriendStory {
  userId: string
  user: {
    name: string
    username: string
    image: string
  }
  stories: Array<{
    _id: string
    type: 'photo' | 'video'
    media: string
    createdAt: string
  }>
  updatedAt: string
}

interface StoryViewerProps {
  isOpen: boolean
  onClose: () => void
  stories: FriendStory[]
  initialStoryIndex: number
}

export function StoryViewer({
  isOpen,
  onClose,
  stories,
  initialStoryIndex,
}: StoryViewerProps) {
  const [currentFriendIndex, setCurrentFriendIndex] =
    useState(initialStoryIndex)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [duration, setDuration] = useState(5000)

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const currentFriend = stories[currentFriendIndex]
  const currentStory = currentFriend?.stories[currentStoryIndex]

  useEffect(() => {
    if (!isOpen || !currentStory) return

    setProgress(0) // reset progress on story change

    if (currentStory.type === 'photo') {
      setDuration(5000)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            goToNext()
            return 0
          }
          return prev + 100 / (5000 / 100)
        })
      }, 100)

      return () => clearInterval(interval)
    } else if (currentStory.type === 'video') {
      const vid = videoRef.current
      if (!vid) return

      const updateProgress = () => {
        if (vid.duration > 0) {
          setProgress((vid.currentTime / vid.duration) * 100)
        }
      }

      vid.addEventListener('timeupdate', updateProgress)

      return () => {
        vid.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [isOpen, currentStoryIndex, currentFriendIndex, currentStory])

  useEffect(() => {
    if (!isOpen || !currentStory) return

    if (currentStory.type === 'photo') {
      // Photo: use interval
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNext()
            return 0
          }
          return prev + 100 / (duration / 100)
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      const vid = videoRef.current
      if (!vid) return

      const updateProgress = () => {
        if (vid.duration > 0) {
          setProgress((vid.currentTime / vid.duration) * 100)
        }
      }

      vid.addEventListener('timeupdate', updateProgress)
      return () => {
        vid.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [isOpen, currentStoryIndex, currentFriendIndex, currentStory, duration])

  const goToPrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    } else if (currentFriendIndex > 0) {
      setCurrentFriendIndex(currentFriendIndex - 1)
      setCurrentStoryIndex(stories[currentFriendIndex - 1].stories.length - 1)
    } else {
      onClose()
    }
  }

  const goToNext = () => {
    if (currentStoryIndex < currentFriend.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else if (currentFriendIndex < stories.length - 1) {
      setCurrentFriendIndex(currentFriendIndex + 1)
      setCurrentStoryIndex(0)
    } else {
      onClose()
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (currentStory?.type === 'video') {
      if (isVideoPlaying) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }

  if (!currentStory) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-black border-0 h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
            {currentFriend.stories.map((story, index) => (
              <div
                key={story._id}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width:
                      index < currentStoryIndex
                        ? '100%'
                        : index === currentStoryIndex
                          ? `${progress}%`
                          : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-2 right-2 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage
                  src={currentFriend.user.image || '/placeholder.svg'}
                />
                <AvatarFallback>
                  {currentFriend.user.name?.[0]?.toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-white font-medium text-sm">
                  {currentFriend.user.username}
                </span>
                <span className="text-white/70 text-xs ml-2">
                  {timeAgo(currentStory.createdAt)}
                </span>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Story content */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            {currentStory.type === 'photo' ? (
              <img
                src={currentStory.media || '/placeholder.svg'}
                alt="Story"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentStory.media}
                className="max-w-full max-h-full object-contain"
                autoPlay
                muted={isMuted}
                onLoadedMetadata={(e) => {
                  const vid = e.currentTarget
                  setDuration(vid.duration * 1000)
                }}
                onEnded={goToNext}
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
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={togglePause}
            >
              {isPaused ? (
                <Play className="w-5 h-5" />
              ) : (
                <Pause className="w-5 h-5" />
              )}
            </Button>

            {currentStory.type === 'video' && (
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            )}

            {(currentStoryIndex > 0 || currentFriendIndex > 0) && (
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}

            {(currentStoryIndex < currentFriend.stories.length - 1 ||
              currentFriendIndex < stories.length - 1) && (
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
