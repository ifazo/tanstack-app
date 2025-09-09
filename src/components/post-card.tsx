"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  images: string[]
  mentions?: string[]
  tags?: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const imageWidth = scrollContainerRef.current.clientWidth
      const newIndex = Math.round(scrollLeft / imageWidth)
      setCurrentImageIndex(newIndex)
    }
  }

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground text-sm">{post.user.name}</h3>
              <p className="text-muted-foreground text-xs">{post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-card-foreground text-sm leading-relaxed">{post.content}</p>
          {(post.mentions && post.mentions.length > 0) || (post.tags && post.tags.length > 0) ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.mentions?.map((mention, index) => (
                <span
                  key={`mention-${index}`}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  @{mention}
                </span>
              ))}
              {post.tags?.map((tag, index) => (
                <span
                  key={`tag-${index}`}
                  className="text-green-600 hover:text-green-800 cursor-pointer text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Post Image */}
        {post.images && post.images.length > 0 && (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onScroll={handleScroll}
              style={{ scrollBehavior: "smooth" }}
            >
              {post.images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-start">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-96 object-cover select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {post.images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const newIndex = Math.max(0, currentImageIndex - 1)
                      scrollContainerRef.current.scrollTo({
                        left: newIndex * scrollContainerRef.current.clientWidth,
                        behavior: "smooth",
                      })
                    }
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  style={{ display: currentImageIndex > 0 ? "block" : "none" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const newIndex = Math.min(post.images.length - 1, currentImageIndex + 1)
                      scrollContainerRef.current.scrollTo({
                        left: newIndex * scrollContainerRef.current.clientWidth,
                        behavior: "smooth",
                      })
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  style={{ display: currentImageIndex < post.images.length - 1 ? "block" : "none" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {post.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{post.images.length}
              </div>
            )}

            {post.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                {post.images.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentImageIndex ? "bg-white" : "bg-white/50",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="px-4 py-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{likesCount} likes</span>
            <div className="flex gap-4">
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "flex-1 gap-2 text-muted-foreground hover:text-primary",
              isLiked && "text-red-500 hover:text-red-600",
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            Like
          </Button>

          <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary">
            <MessageCircle className="w-4 h-4" />
            Comment
          </Button>

          <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary">
            <Share className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
