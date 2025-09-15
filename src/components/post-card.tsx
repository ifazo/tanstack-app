'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MessageCircle,
  Share,
  MoreHorizontal,
  ThumbsUp,
  User2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/lib/time'
import { ReactionsPopup, ReactionType } from './reactions-popup'
import { PostRes } from '@/types'
import { useGetPostReactionByUser } from '@/lib/queries'
import { useAddReaction, useRemoveReaction } from '@/lib/mutations'
import { getUser } from '@/store'
import { useToast } from '@/hooks/useToast'
import { Badge } from './ui/badge'

const reactionEmojis: Record<ReactionType, string> = {
  like: '👍',
  love: '❤️',
  haha: '😂',
  wow: '😮',
  sad: '😢',
  angry: '😡',
}

export function PostCard({ post }: { post: PostRes }) {
  const user = getUser()
  const { showWarning } = useToast()
  const addReactionMutation = useAddReaction()
  const removeReactionMutation = useRemoveReaction()

  const { data } = useGetPostReactionByUser(post?._id, user?._id)
  const userReact = data?.react ?? null

  const [userReaction, setUserReaction] = useState<ReactionType | null>(
    (userReact as ReactionType) ?? null,
  )

  useEffect(() => {
    setUserReaction((user ? (userReact as ReactionType) : null) ?? null)
  }, [data, user])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReactions, setShowReactions] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleReaction = (reactionType: ReactionType) => {
    if (!user) {
      showWarning('Not logged in', 'Please log in to react post!')
      return
    }

    if (reactionType === userReaction) {
      setUserReaction(null)
      removeReactionMutation.mutate(post?._id)
    } else {
      setUserReaction(reactionType)
      addReactionMutation.mutate({ postId: post?._id, react: reactionType })
    }
  }

  const handleReactionClick = () => {
    if (userReaction) {
      handleReaction(userReaction)
    } else {
      handleReaction('like')
    }
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
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post?.user?.image} />
              <AvatarFallback>
                {(post?.user?.name && post?.user?.name.charAt(0)) || (
                  <User2 className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-card-foreground text-sm">
                {post?.user?.name || 'Unknown'}
              </h3>
              <p className="text-muted-foreground text-xs">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-card-foreground text-sm leading-relaxed">
            {post.text}
          </p>
          {(post?.mentions && post.mentions.length > 0) ||
          (post.tags && post.tags.length > 0) ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.mentions?.map((mention: string) => (
                <span
                  key={mention}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  @{mention}
                </span>
              ))}
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-green-600 hover:text-green-800 cursor-pointer text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Post Image */}
        {post?.images && post.images.length > 0 && (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onScroll={handleScroll}
              style={{ scrollBehavior: 'smooth' }}
            >
              {post.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-start">
                  <img
                    src={image || '/placeholder.svg'}
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
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  style={{ display: currentImageIndex > 0 ? 'block' : 'none' }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const newIndex = Math.min(
                        post.images.length - 1,
                        currentImageIndex + 1,
                      )
                      scrollContainerRef.current.scrollTo({
                        left: newIndex * scrollContainerRef.current.clientWidth,
                        behavior: 'smooth',
                      })
                    }
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  style={{
                    display:
                      currentImageIndex < post.images.length - 1
                        ? 'block'
                        : 'none',
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
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
                {post.images?.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50',
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-around pt-2 px-3 border-t border-border">
          <div
            className="relative flex-1"
            onMouseEnter={() => {
              if (reactionTimeoutRef.current) {
                clearTimeout(reactionTimeoutRef.current)
              }
              reactionTimeoutRef.current = setTimeout(() => {
                setShowReactions(true)
              }, 500)
            }}
            onMouseLeave={() => {
              if (reactionTimeoutRef.current) {
                clearTimeout(reactionTimeoutRef.current)
              }
              reactionTimeoutRef.current = setTimeout(() => {
                setShowReactions(false)
              }, 100)
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReactionClick}
              className={cn(
                'w-full gap-2 text-muted-foreground hover:text-primary',
                userReaction && 'text-blue-500 hover:text-blue-600',
              )}
            >
              {userReaction ? (
                <span className="text-base">
                  {reactionEmojis[userReaction]}
                </span>
              ) : (
                <ThumbsUp className="w-4 h-4" />
              )}
              {userReaction
                ? userReaction.charAt(0).toUpperCase() + userReaction.slice(1)
                : 'Like'}

              {post.reactionsCount > 0 && (
                <Badge variant="outline" className="ml-1">
                  {post.reactionsCount}
                </Badge>
              )}
            </Button>

            <ReactionsPopup
              isVisible={showReactions}
              onReactionSelect={handleReaction}
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="w-4 h-4" />
            Comment
            {post.commentsCount > 0 && (
              <Badge variant="outline" className="ml-1">
                {post.commentsCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-muted-foreground hover:text-primary"
          >
            <Share className="w-4 h-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
