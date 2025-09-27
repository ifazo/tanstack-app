'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plus, User2 } from 'lucide-react'
import { StoryUpload } from './story-upload'
import { StoryViewer } from './story-viewer'
import { getUser } from '@/store'
import { useToast } from '@/hooks/useToast'
import { useGetFriendsStories } from '@/lib/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@tanstack/react-router'

interface Story {
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

export function StoriesSection() {
  const user = getUser()
  const { showWarning } = useToast()

  const { data, isLoading } = useGetFriendsStories(user?._id)

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)

  const handleStoryUpload = (file: File, type: 'photo' | 'video') => {
    const newStory = {
      type,
      media: URL.createObjectURL(file),
    }
    console.log('[v0] Story uploaded:', newStory)
  }

  const handleStoryClick = (userId: string) => {
    const friendIndex = data?.findIndex((f: Story) => f.userId === userId)
    if (friendIndex !== undefined && friendIndex !== -1) {
      setSelectedStoryIndex(friendIndex)
      setIsViewerOpen(true)
    }
  }

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Skeleton for "Your Story" */}
          <div className="flex-shrink-0">
            <Card className="relative w-20 h-28 flex items-center justify-center">
              <Skeleton className="w-12 h-12 rounded-full mb-2" />
              <Skeleton className="h-3 w-12 rounded" />
            </Card>
          </div>
          {/* Skeletons for friends’ stories */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <Card className="relative w-20 h-28 flex flex-col items-center justify-between p-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-3 w-14 rounded mt-2" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mb-6 flex items-center justify-center rounded-full bg-muted px-4 py-1 text-sm text-muted-foreground">
        <Link
          to="/login"
          className="flex items-center font-medium"
        >
          Log in to view and create stories
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* Your Story Card */}
        <div className="flex-shrink-0">
          <Card
            className="relative w-20 h-28 bg-gradient-to-b from-muted/50 to-muted border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => {
              if (!user) {
                showWarning('Not logged in', 'Please log in to create stories.')
                return
              }
              setIsUploadOpen(true)
            }}
          >
            <div className="flex flex-col items-center justify-center h-full p-2">
              <div className="relative mb-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.image || ''} />
                  <AvatarFallback>
                    {user?.name ? (
                      user.name[0].toUpperCase()
                    ) : (
                      <User2 className="w-6 h-6" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <span className="text-xs font-medium text-center leading-tight text-foreground">
                Your Story
              </span>
            </div>
          </Card>
        </div>

        {/* Friends' Stories */}
        {data.map((friend: Story) => {
          const latestStory = friend.stories[0] // backend sorted
          return (
            <div key={friend.userId} className="flex-shrink-0">
              <Card
                className="relative w-20 h-28 bg-gradient-to-b from-primary/10 to-primary/5 border-0 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleStoryClick(friend.userId)}
              >
                {latestStory?.type === 'photo' ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${latestStory.media})` }}
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={latestStory?.media}
                    muted
                    loop
                    controls={false}
                    poster="/placeholder-video.jpg"
                  />
                )}
                <div className="relative h-full flex flex-col justify-between p-2">
                  <div className="flex justify-center">
                    <Avatar className="w-10 h-10 border-2 border-background">
                      <AvatarImage src={friend.user.image || ''} />
                      <AvatarFallback>
                        {friend.user.name ? (
                          friend.user.name[0].toUpperCase()
                        ) : (
                          <User2 className="w-6 h-6" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <div className="bg-black/40 rounded-md px-1 py-0.5 backdrop-blur-sm">
                      <span
                        className="text-xs font-medium text-white leading-tight"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                      >
                        {friend.user.username}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      <StoryUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleStoryUpload}
        userId={user?._id}
      />

      <StoryViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        stories={data as Story[]}
        initialStoryIndex={selectedStoryIndex}
      />
    </div>
  )
}
