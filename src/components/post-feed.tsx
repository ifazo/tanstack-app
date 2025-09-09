'use client'

import { PostCard } from '@/components/post-card'
import { useGetPosts } from '@/lib/queries'

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: '/woman-profile.png',
    },
    content:
      'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️',
    images: ['/majestic-mountain-vista.png'],
    mentions: ['alexc', 'mayap'],
    tags: ['hiking', 'nature', 'mountains'],
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Alex Chen',
      username: '@alexc',
      avatar: '/man-profile.png',
    },
    content:
      'Working on a new project today. The creative process is so rewarding when everything starts coming together!',
    images: ['/majestic-mountain-vista.png'],
    tags: ['coding', 'creative', 'project'],
    timestamp: '4 hours ago',
    likes: 15,
    comments: 5,
    shares: 2,
    isLiked: true,
  },
  {
    id: '3',
    user: {
      name: 'Maya Patel',
      username: '@mayap',
      avatar: '/diverse-woman-smiling.png',
    },
    content:
      'Coffee and code - the perfect combination for a productive morning! ☕️',
    images: ['/coffee-and-laptop.png', '/majestic-mountain-vista.png'],
    mentions: ['davidk'],
    tags: ['coffee', 'coding', 'productivity'],
    timestamp: '6 hours ago',
    likes: 42,
    comments: 12,
    shares: 7,
    isLiked: false,
  },
  {
    id: '4',
    user: {
      name: 'David Kim',
      username: '@davidk',
      avatar: '/casual-man.png',
    },
    content:
      'Excited to share my latest photography work! This sunset shot took hours of waiting, but it was worth every minute.',
    images: ['/beautiful-sunset.png', '/woman-profile.png', '/man-profile.png'],
    mentions: ['sarahj', 'emmaw'],
    tags: ['photography', 'sunset', 'patience', 'art'],
    timestamp: '8 hours ago',
    likes: 67,
    comments: 18,
    shares: 12,
    isLiked: true,
  },
  {
    id: '5',
    user: {
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: '/diverse-user-avatars.png',
    },
    content:
      'Amazing day at the beach with friends! Here are some highlights from our trip 🏖️',
    images: [
      '/majestic-mountain-vista.png',
      '/woman-profile.png',
      '/man-profile.png',
      '/diverse-user-avatars.png',
      '/coffee-and-laptop.png',
    ],
    mentions: ['mayap', 'alexc', 'davidk'],
    tags: ['beach', 'friends', 'vacation', 'memories'],
    timestamp: '1 day ago',
    likes: 89,
    comments: 23,
    shares: 15,
    isLiked: false,
  },
]

export function PostFeed() {
  const { data, isLoading, error } = useGetPosts()
  console.log(data, isLoading, error)
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
