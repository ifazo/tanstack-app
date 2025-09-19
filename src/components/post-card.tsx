'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageCircle,
  Share,
  MoreHorizontal,
  ThumbsUp,
  User2,
  Bookmark,
  Send,
  Copy,
  Facebook,
  Twitter,
} from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/lib/time'
import { ReactionsPopup, type ReactionType } from './reactions-popup'
import type { PostRes } from '@/types'
import {
  useCheckSave,
  useGetPostComments,
  useGetPostReactionByUser,
} from '@/lib/queries'
import {
  useAddPostComment,
  useAddReaction,
  useAddSave,
  useRemoveReaction,
  useRemoveSave,
} from '@/lib/mutations'
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

function CommentItem({ comment }: { comment: any }) {
  const [isLiked, setIsLiked] = useState(comment.isLiked)
  const [likes, setLikes] = useState(comment.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <div className="flex gap-3 py-3">
      {/* Avatar */}
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.user.image} />
        <AvatarFallback>
          {comment.user.name.charAt(0) || <User2 className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Comment Body */}
      <div className="flex-1">
        <div className="bg-muted rounded-lg px-3 py-2">
          {/* Name + Time + More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-foreground">
                {comment.user.name}
              </h4>
              <span className="text-xs text-muted-foreground">
                {timeAgo(comment.createdAt)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Comment Text */}
          <p className="text-sm text-foreground mt-1">{comment.text}</p>
        </div>
      </div>

      {/* Like Button (icon on top, text below) */}
      <div className="flex flex-col items-center justify-center ml-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className={cn(
            'w-7 h-7 p-0 hover:text-primary',
            isLiked && 'text-blue-500'
          )}
        >
          <ThumbsUp className="w-4 h-4" />
        </Button>
        <span className="text-[10px] text-muted-foreground mt-1">
          Like {likes > 0 && `(${likes})`}
        </span>
      </div>
    </div>
  )
}

function ShareDialog({ post }: { post: PostRes }) {
  const [copied, setCopied] = useState(false)
  const postUrl = `${window.location.origin}/post/${post._id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      action: handleCopyLink,
      description: 'Copy link to clipboard',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
        ),
      description: 'Share on Facebook',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.text)}`,
        ),
      description: 'Share on Twitter',
    },
  ]

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share Post</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        {shareOptions.map((option) => (
          <Button
            key={option.name}
            variant="outline"
            className="w-full justify-start gap-3 h-12 bg-transparent"
            onClick={option.action}
          >
            <option.icon className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium">{option.name}</div>
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            </div>
            {option.name === 'Copy Link' && copied && (
              <span className="ml-auto text-green-600 text-sm">Copied!</span>
            )}
          </Button>
        ))}
      </div>
    </DialogContent>
  )
}

export function PostCard({ post }: { post: PostRes }) {
  const user = getUser()
  const { showSuccess, showError, showWarning } = useToast()

  const addReactionMutation = useAddReaction()
  const removeReactionMutation = useRemoveReaction()

  const addPostComment = useAddPostComment()

  const addSaveMutation = useAddSave()
  const removeSaveMutation = useRemoveSave()

  const { data: commentsData } = useGetPostComments(post?._id)
  // console.log('commentsData', commentsData)
  const { data: saveData } = useCheckSave(post?._id, user?._id)
  const { data } = useGetPostReactionByUser(post?._id, user?._id)
  const userReact = data?.react ?? null

  const [isSaved, setIsSaved] = useState(false)
  const [comments, setComments] = useState<any[]>(commentsData)
  const [newComment, setNewComment] = useState('')
  const [userReaction, setUserReaction] = useState<ReactionType | null>(
    (userReact as ReactionType) ?? null,
  )

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData)
    }
  }, [commentsData])

  useEffect(() => {
    if (saveData?.isSaved !== undefined) {
      setIsSaved(saveData.isSaved)
    }
  }, [saveData])

  useEffect(() => {
    setUserReaction((user ? (userReact as ReactionType) : null) ?? null)
  }, [data, user])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReactions, setShowReactions] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSubmitComment = () => {
    if (!user) {
      showWarning('Not logged in', 'Please log in to comment!')
      return
    }
    if (!newComment.trim()) return

    const commentData = { text: newComment.trim() }

    addPostComment.mutate(
      { postId: post?._id, data: commentData },
      {
        onSuccess: () => {
          showSuccess('Success', 'Comment added successfully.')
          // const comment = {
          //   _id: res.data._id,
          //   user: { name: user.name, image: user.image },
          //   text: newComment,
          //   createdAt: new Date().toISOString(),
          //   likes: 0,
          //   isLiked: false,
          // }
          // setComments([comment, ...comments])
          setNewComment('')
        },
        onError: () => {
          showError('Error', 'Failed to add comment. Please try again.')
        },
      },
    )
  }

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

  const handleSave = () => {
    if (!user) {
      showWarning('Not logged in', 'Please log in to save post!')
      return
    }
    if (isSaved) {
      setIsSaved(false)
      removeSaveMutation.mutate(post._id, {
        onError: () => setIsSaved(true),
      })
    } else {
      setIsSaved(true)
      addSaveMutation.mutate(post._id, {
        onError: () => setIsSaved(false),
      })
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
              <AvatarImage src={post?.user?.image || '/placeholder.svg'} />
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

          <Drawer>
            <DrawerTrigger asChild>
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
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Comments ({comments?.length || 0})</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4 overflow-y-auto">
                {/* Comment input */}
                <div className="flex gap-3 mb-4 sticky top-0 bg-background pb-3 border-b">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || <User2 className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[40px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmitComment()
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Comments list */}
                <div className="space-y-1">
                  {comments?.length > 0 ? (
                    comments.map((comment) => (
                      <CommentItem key={comment._id} comment={comment} />
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No comments yet. Be the first to comment!
                    </div>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-2 text-muted-foreground hover:text-primary"
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
            </DialogTrigger>
            <ShareDialog post={post} />
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2 text-muted-foreground hover:text-primary"
            onClick={handleSave}
          >
            {isSaved ? (
              <Bookmark className="w-4 h-4 fill-current text-blue-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
