"use client"

import { PostCard } from "@/components/post-card"

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "/woman-profile.png",
    },
    content:
      "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️",
    image: "/majestic-mountain-vista.png",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Alex Chen",
      username: "@alexc",
      avatar: "/man-profile.png",
    },
    content:
      "Working on a new project today. The creative process is so rewarding when everything starts coming together!",
    timestamp: "4 hours ago",
    likes: 15,
    comments: 5,
    shares: 2,
    isLiked: true,
  },
  {
    id: "3",
    user: {
      name: "Maya Patel",
      username: "@mayap",
      avatar: "/diverse-woman-smiling.png",
    },
    content: "Coffee and code - the perfect combination for a productive morning! ☕️",
    image: "/coffee-and-laptop.png",
    timestamp: "6 hours ago",
    likes: 42,
    comments: 12,
    shares: 7,
    isLiked: false,
  },
  {
    id: "4",
    user: {
      name: "David Kim",
      username: "@davidk",
      avatar: "/casual-man.png",
    },
    content:
      "Excited to share my latest photography work! This sunset shot took hours of waiting, but it was worth every minute.",
    image: "/beautiful-sunset.png",
    timestamp: "8 hours ago",
    likes: 67,
    comments: 18,
    shares: 12,
    isLiked: true,
  },
]

export function PostFeed() {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
