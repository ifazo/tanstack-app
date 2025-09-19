'use client'

import { PostCard } from '@/components/post-card'
import { useGetPosts } from '@/lib/queries'
import { PostCardSkeleton } from './post-card-skeleton'

export function PostFeed() {
  const { data, isLoading } = useGetPosts()

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {data?.posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}
