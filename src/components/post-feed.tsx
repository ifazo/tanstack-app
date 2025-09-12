'use client'

import { PostCard } from '@/components/post-card'
import { useGetPosts } from '@/lib/queries'

export function PostFeed() {
  const { data, isLoading, error } = useGetPosts()
  // console.log(data, isLoading, error)
  return (
    <div className="space-y-6">
      {data?.posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
