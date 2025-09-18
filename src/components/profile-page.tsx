'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Edit,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  Bookmark,
  Share2,
  MoreHorizontal,
  Save,
  X,
  Copy,
  Check,
  Edit3,
  Eye,
  AtSign,
  Earth,
  Loader,
  Sparkles,
  User2,
  MonitorPlay as TvMinimalPlay,
  Play,
  Clock,
  ThumbsUp,
  Star,
  Camera,
} from 'lucide-react'
import {
  useGetPostsByUser,
  useGetUser,
  useGetUserComments,
  useGetUserReactions,
  useGetUserSaves,
  useGetUserStories,
} from '@/lib/queries'
import { getUser } from '@/store'

const profileData = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarah.johnson',
    userName: 'sarah-johnson',
    bio: 'UX Designer passionate about creating meaningful digital experiences. Coffee enthusiast ☕ | Travel lover 🌍',
    image: '/professional-woman-designer.png',
    coverImage: '/abstract-gradient-design-background.jpg',
    location: 'San Francisco, CA',
    country: 'United States',
    joinDate: 'March 2020',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    isOnline: true,
    followersCount: 232,
    friendsCount: 42,
    likesCount: 968,
  },
  posts: [
    {
      id: '1',
      content:
        'Just finished an amazing design sprint! The collaborative energy was incredible 🚀 Working with such talented people always pushes me to think outside the box. @alexchen @mariagarcia thanks for the amazing collaboration!',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 18,
      shares: 7,
      images: [
        '/design-sprint-whiteboard-collaboration.jpg',
        '/abstract-gradient-design-background.jpg',
      ],
      tags: ['#design', '#collaboration', '#innovation'],
      mentions: ['@alexchen', '@mariagarcia'],
    },
    {
      id: '2',
      content:
        "Beautiful sunset from my morning hike. Nature always inspires the best designs 🌅 There's something magical about golden hour that sparks creativity.",
      timestamp: '1 day ago',
      likes: 245,
      comments: 32,
      shares: 15,
      images: ['/beautiful-sunset-mountain-hike-golden-hour.jpg'],
      tags: ['#nature', '#inspiration', '#photography'],
      mentions: [],
    },
    {
      id: '3',
      content:
        "Excited to share my latest project - a mobile app for sustainable living! 🌱 It's been months of research, design, and iteration. Can't wait to see how it helps people make eco-friendly choices. Special thanks to @davidkim for the amazing development work!",
      timestamp: '3 days ago',
      likes: 367,
      comments: 45,
      shares: 28,
      images: [
        '/mobile-app-sustainable-living-eco-friendly.jpg',
        '/cozy-coffee-shop-sketching-design-notebook.jpg',
      ],
      tags: ['#sustainability', '#mobileapp', '#design'],
      mentions: ['@davidkim'],
    },
    {
      id: '4',
      content:
        'Coffee shop vibes ☕ Perfect spot for sketching new ideas. Sometimes the best inspiration comes from watching people interact with the world around them.',
      timestamp: '5 days ago',
      likes: 89,
      comments: 12,
      shares: 4,
      images: [],
      tags: ['#coffee', '#sketching', '#inspiration'],
      mentions: [],
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Design Thinking Workshop - Complete Guide',
      thumbnail: '/design-thinking-workshop-presentation.jpg',
      url: '#',
      length: '15:30',
      author: 'Sarah Johnson',
      views: 12500,
      like: 1200,
      comment: 89,
      share: 45,
      createdAt: '2023-10-01',
      description:
        'A comprehensive guide to running effective design thinking workshops',
    },
    {
      id: '2',
      title: "UI/UX Trends 2024 - What's Next?",
      thumbnail: '/ui-ux-trends-2024-modern-interface.jpg',
      url: '#',
      length: '10:45',
      author: 'Sarah Johnson',
      views: 8900,
      like: 950,
      comment: 67,
      share: 23,
      createdAt: '2023-09-15',
      description: 'Exploring the latest trends shaping user experience design',
    },
    {
      id: '3',
      title: 'Prototyping with Figma - Advanced Tips',
      thumbnail: '/figma-prototyping-advanced-tips-design.jpg',
      url: '#',
      length: '12:20',
      author: 'Sarah Johnson',
      views: 15600,
      like: 1500,
      comment: 120,
      share: 67,
      createdAt: '2023-08-30',
      description: 'Master advanced prototyping techniques in Figma',
    },
    {
      id: '4',
      title: 'User Research Basics - Getting Started',
      thumbnail: '/user-research-interview-basics.jpg',
      url: '#',
      length: '08:50',
      author: 'Sarah Johnson',
      views: 6800,
      like: 680,
      comment: 34,
      share: 18,
      createdAt: '2023-07-20',
      description: 'Essential user research methods for beginners',
    },
    {
      id: '5',
      title: 'Color Theory in Digital Design',
      thumbnail: '/color-theory-digital-design-palette.jpg',
      url: '#',
      length: '14:15',
      author: 'Sarah Johnson',
      views: 9200,
      like: 890,
      comment: 56,
      share: 29,
      createdAt: '2023-06-10',
      description:
        'Understanding color psychology and application in digital interfaces',
    },
    {
      id: '6',
      title: 'Mobile-First Design Strategy',
      thumbnail: '/mobile-first-design-strategy-responsive.jpg',
      url: '#',
      length: '11:30',
      author: 'Sarah Johnson',
      views: 7400,
      like: 720,
      comment: 41,
      share: 22,
      createdAt: '2023-05-25',
      description: 'Why mobile-first approach is crucial for modern web design',
    },
  ],
  likedPosts: [
    {
      id: '1',
      author: 'Alex Chen',
      authorAvatar: '/professional-man-designer.jpg',
      content:
        'Amazing typography work! The contrast and hierarchy are perfect 👌',
      timestamp: '4 hours ago',
      reaction: 'like',
      reactionIcon: '❤️',
    },
    {
      id: '2',
      author: 'Maria Garcia',
      authorAvatar: '/professional-woman-artist.jpg',
      content:
        'This color palette is absolutely stunning! Saved for inspiration 🎨',
      timestamp: '1 day ago',
      reaction: 'love',
      reactionIcon: '😍',
    },
    {
      id: '3',
      author: 'David Kim',
      authorAvatar: '/professional-man-developer.png',
      content:
        'Clean and minimal interface design. Love the attention to detail!',
      timestamp: '2 days ago',
      reaction: 'wow',
      reactionIcon: '😮',
    },
    {
      id: '4',
      author: 'Emma Wilson',
      authorAvatar: '/professional-woman-designer.png',
      content:
        'The way light plays in this architectural photography is mesmerizing ✨',
      timestamp: '3 days ago',
      reaction: 'like',
      reactionIcon: '❤️',
    },
    {
      id: '5',
      author: 'John Doe',
      authorAvatar: '/professional-man-designer.jpg',
      content:
        'This new branding project is absolutely incredible! The attention to detail and creative execution is outstanding.',
      timestamp: '1 week ago',
      reaction: 'laugh',
      reactionIcon: '😂',
    },
    {
      id: '6',
      author: 'Lisa Thompson',
      authorAvatar: '/professional-woman-artist.jpg',
      content:
        'Website redesign case study - the user journey improvements are game-changing!',
      timestamp: '2 weeks ago',
      reaction: 'wow',
      reactionIcon: '😮',
    },
  ],
  comments: [
    {
      id: '1',
      postAuthor: 'John Doe',
      postTitle: 'New branding project reveal',
      postImage: '/placeholder.svg?height=60&width=60',
      myComment:
        'Absolutely love the color choices! The brand feels so authentic and modern. Great work! 🎯',
      timestamp: '2 hours ago',
      likes: 23,
      replies: 5,
    },
    {
      id: '2',
      postAuthor: 'Lisa Thompson',
      postTitle: 'Website redesign case study',
      postImage: '/placeholder.svg?height=60&width=60',
      myComment:
        'The user journey improvements are incredible. This is exactly what good UX looks like! The before/after comparison really shows the impact.',
      timestamp: '5 hours ago',
      likes: 45,
      replies: 12,
    },
    {
      id: '3',
      postAuthor: 'Mike Rodriguez',
      postTitle: 'Mobile app animation showcase',
      postImage: '/placeholder.svg?height=60&width=60',
      myComment:
        'These micro-interactions are so smooth! What tool did you use for the animations?',
      timestamp: '1 day ago',
      likes: 18,
      replies: 3,
    },
    {
      id: '4',
      postAuthor: 'Anna Chen',
      postTitle: 'Illustration series - Nature',
      postImage: '/placeholder.svg?height=60&width=60',
      myComment:
        'Your illustration style keeps getting better! The way you capture light in these nature scenes is magical ✨',
      timestamp: '2 days ago',
      likes: 67,
      replies: 8,
    },
  ],
  savedPosts: [
    {
      id: '1',
      title: 'Design System Best Practices',
      author: 'Design Weekly',
      content:
        'A comprehensive guide to building scalable design systems that work across teams and products. Learn the essential principles and methodologies.',
      category: 'Design Systems',
      readTime: '8 min read',
      savedDate: '2 days ago',
      tags: ['Design Systems', 'Components', 'Guidelines'],
    },
    {
      id: '2',
      title: 'The Psychology of Color in UX',
      author: 'UX Collective',
      content:
        'Understanding how colors affect user behavior and decision-making in digital interfaces. Explore the science behind color psychology.',
      category: 'Color Theory',
      readTime: '12 min read',
      savedDate: '1 week ago',
      tags: ['Color Theory', 'Psychology', 'UX'],
    },
    {
      id: '3',
      title: 'Accessibility in Modern Web Design',
      author: 'A11y Project',
      content:
        'Making the web accessible for everyone. Learn about WCAG guidelines, screen readers, and inclusive design principles.',
      category: 'Accessibility',
      readTime: '15 min read',
      savedDate: '2 weeks ago',
      tags: ['Accessibility', 'Inclusive Design', 'Web'],
    },
    {
      id: '4',
      title: 'Figma Advanced Prototyping',
      author: 'Figma Community',
      content:
        'Master advanced prototyping techniques in Figma. Create interactive prototypes that feel like real applications.',
      category: 'Tools',
      readTime: '20 min read',
      savedDate: '3 weeks ago',
      tags: ['Figma', 'Prototyping', 'Tools'],
    },
    {
      id: '5',
      title: 'Mobile Design Patterns 2024',
      author: 'Mobile UX',
      content:
        "Latest mobile design patterns and trends. Discover what's working in mobile app design this year.",
      category: 'Mobile Design',
      readTime: '10 min read',
      savedDate: '1 month ago',
      tags: ['Mobile', 'Patterns', 'Trends'],
    },
    {
      id: '6',
      title: 'Typography Hierarchy Guide',
      author: 'Type Weekly',
      content:
        'Creating effective typography hierarchies that guide users through your content seamlessly.',
      category: 'Typography',
      readTime: '7 min read',
      savedDate: '1 month ago',
      tags: ['Typography', 'Hierarchy', 'Design'],
    },
  ],
  stories: [
    {
      id: '1',
      type: 'image',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '2 hours ago',
      views: 89,
      caption: 'Morning coffee ritual ☕',
    },
    {
      id: '2',
      type: 'video',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '5 hours ago',
      views: 156,
      caption: 'Design process timelapse 🎨',
    },
    {
      id: '3',
      type: 'image',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '8 hours ago',
      views: 234,
      caption: 'City sunset inspiration 🌅',
    },
    {
      id: '4',
      type: 'image',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '12 hours ago',
      views: 67,
      caption: 'New design books arrived! 📚',
    },
    {
      id: '5',
      type: 'video',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '1 day ago',
      views: 298,
      caption: 'Workspace tour 🏠',
    },
    {
      id: '6',
      type: 'image',
      content: '/placeholder.svg?height=400&width=300',
      timestamp: '1 day ago',
      views: 145,
      caption: 'Team brainstorming session 💡',
    },
  ],
}

export function ProfilePage() {
  const currentUser = getUser()
  const { data: user } = useGetUser(currentUser._id)
  // const { data: postsData } = useGetPostsByUser(user?._id)
  // const { data: userReactionsData } = useGetUserReactions(user?._id)
  // const { data: userCommentsData } = useGetUserComments(user?._id)
  // const { data: userSavesData } = useGetUserSaves(user?._id)
  // const { data: userStoriesData } = useGetUserStories(user?._id)
  // console.log('Posts by user:', postsData)
  // console.log('User reactions:', userReactionsData)
  // console.log('User comments:', userCommentsData)
  // console.log('User saves:', userSavesData)
  // console.log('User stories:', userStoriesData)

  const [activeTab, setActiveTab] = useState('posts')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [isStoryFullscreen, setIsStoryFullscreen] = useState(false)

  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || profileData.user.name,
    userName: user?.userName || profileData.user.userName,
    bio: user?.bio || profileData.user.bio,
    location: user?.location || profileData.user.location,
    country: user?.country || profileData.user.country,
    phone: user?.phone?.replace(/^\\+\\d+\\s/, '') || '',
    phoneCountryCode: user?.phone?.match(/^(\\+\\d+)\\s/)?.[1] || '+1',
  })

  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [countries, setCountries] = useState<any[]>([])
  const [phoneCountries, setPhoneCountries] = useState<any[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)

  const posts = profileData?.posts || []
  const videos = profileData?.videos || []
  const likedPosts = profileData?.likedPosts || []
  const comments = profileData?.comments || []
  const savedPosts = profileData?.savedPosts || []
  const stories = profileData?.stories || []

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true)
      try {
        const response = await fetch('/countries.json')
        const data = await response.json()

        const formattedCountriesByName = data
          .filter(
            (country: any) =>
              country.idd?.root && country.idd?.suffixes?.length > 0,
          )
          .map((country: any) => ({
            name: country.name.common,
            flag: country.flags.svg,
            code: country.cca2,
            dialCode: country.idd.root + (country.idd.suffixes[0] || ''),
          }))
          .sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name),
          )

        const formattedCountriesByDialCode = formattedCountriesByName
          .filter((c: any) => c.dialCode)
          .sort((a: any, b: any) => {
            const aNum =
              parseInt(String(a.dialCode).replace(/\D/g, ''), 10) || 0
            const bNum =
              parseInt(String(b.dialCode).replace(/\D/g, ''), 10) || 0
            if (aNum === bNum) return a.name.localeCompare(b.name)
            return aNum - bNum
          })

        setCountries(formattedCountriesByName)
        setPhoneCountries(formattedCountriesByDialCode)
      } catch (error) {
        console.error('Error loading countries.json:', error)
        setCountries([])
        setPhoneCountries([])
      } finally {
        setIsLoadingCountries(false)
      }
    }

    fetchCountries()
  }, [])

  const getDeviceLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
            )
            const data = await response.json()
            const locationString = `${data.city}, ${data.principalSubdivision}`
            const matchedCountry = phoneCountries.find(
              (c) => c.name.toLowerCase() === data.countryName.toLowerCase(),
            )

            setEditedProfile((prev) => ({
              ...prev,
              location: locationString,
              country: data.countryName,
              phoneCountryCode: matchedCountry?.dialCode,
            }))
          } catch (error) {
            console.error('Error getting location:', error)
            setEditedProfile((prev) => ({
              ...prev,
              location: 'Unknown',
            }))
          } finally {
            setIsGettingLocation(false)
          }
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsGettingLocation(false)
          setEditedProfile((prev) => ({
            ...prev,
            location: 'Unknown',
          }))
        },
      )
    } else {
      setIsGettingLocation(false)
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleSaveProfile = () => {
    console.log('Saving profile:', editedProfile)
    // Here you would typically save to backend
    setIsEditDialogOpen(false)
  }

  const copyProfileLink = async () => {
    const profileLink = `${window.location.origin}/profile/${editedProfile.userName}`
    try {
      await navigator.clipboard.writeText(profileLink)
      setIsLinkCopied(true)
      setTimeout(() => setIsLinkCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const openStoryFullscreen = (story: any) => {
    setSelectedStory(story)
    setIsStoryFullscreen(true)
  }

  const closeStoryFullscreen = () => {
    setSelectedStory(null)
    setIsStoryFullscreen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <img
            src={user?.cover_image || profileData.user.coverImage}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg animate-pulse-hover">
                <AvatarImage src={user?.image || profileData.user.image} />
                <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                  {(user?.name && user?.name.charAt(0)) ||
                    profileData.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  {user?.name || profileData.user.name}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <AtSign className="w-4 h-4" />
                    {user?.userName || profileData.user.username}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user?.location || profileData.user.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Earth className="w-4 h-4" />
                    {user?.country || profileData.user.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined{' '}
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : profileData.user.joinDate}
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    <strong className="text-primary">
                      {profileData.user.friendsCount}
                    </strong>{' '}
                    Friends
                  </span>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    <strong className="text-primary">
                      {profileData.user.followersCount}
                    </strong>{' '}
                    Followers
                  </span>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    <strong className="text-primary">
                      {profileData.user.likesCount}
                    </strong>{' '}
                    Likes
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={editedProfile.name}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <Input
                          value={editedProfile.userName}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              userName: e.target.value,
                            }))
                          }
                          placeholder="Enter username"
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={editedProfile.location}
                          readOnly
                          placeholder="Automatically detect location"
                          className="flex-1"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Country</label>
                        <div className="flex gap-2">
                          <Select
                            value={editedProfile.country}
                            onValueChange={(value) =>
                              setEditedProfile((prev) => ({
                                ...prev,
                                country: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {isLoadingCountries ? (
                                <SelectItem value="loading" disabled>
                                  Loading countries...
                                </SelectItem>
                              ) : (
                                countries.map((country) => (
                                  <SelectItem
                                    key={country.code}
                                    value={country.name}
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="w-6 h-4"
                                      />
                                      <span>{country.name}</span>
                                    </div>
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={getDeviceLocation}
                            disabled={isGettingLocation}
                          >
                            {isGettingLocation ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <Select
                          value={editedProfile.phoneCountryCode}
                          onValueChange={(value) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              phoneCountryCode: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoadingCountries ? (
                              <SelectItem value="loading" disabled>
                                <Loader className="w-4 h-4 animate-spin mr-2" />{' '}
                                Loading...
                              </SelectItem>
                            ) : (
                              phoneCountries.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.dialCode}
                                >
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={country.flag}
                                      className="w-6 h-4"
                                    />
                                    <span>{country.dialCode}</span>
                                    <span className="text-sm text-muted-foreground">
                                      {country.name}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <Input
                          value={editedProfile.phone}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Enter phone number"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        value={editedProfile.bio}
                        onChange={(e) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        placeholder="Tell us about yourself..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button onClick={handleSaveProfile} className="w-full">
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        className="w-full"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isShareDialogOpen}
                onOpenChange={setIsShareDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={user?.image || profileData.user.image}
                          alt={editedProfile.name}
                        />
                        <AvatarFallback>
                          {(editedProfile.name &&
                            editedProfile.name.charAt(0)) || (
                            <User2 className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {editedProfile.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          @{editedProfile.userName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {editedProfile.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Profile Link
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${editedProfile.userName}`}
                          readOnly
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyProfileLink}
                          className="flex-shrink-0 bg-transparent"
                        >
                          {isLinkCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      {isLinkCopied && (
                        <p className="text-sm text-green-600">
                          Link copied to clipboard!
                        </p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-foreground leading-relaxed">
              {user?.bio || profileData.user.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger
              value="posts"
              className="flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="flex items-center justify-center gap-2"
            >
              <TvMinimalPlay className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Likes</span>
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Comments</span>
            </TabsTrigger>
            <TabsTrigger
              value="saves"
              className="flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger
              value="stories"
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Stories</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Posts ({posts.length})</h2>
              <Badge variant="secondary">
                {posts.reduce((acc, post) => acc + (post.likes || 0), 0)} Total
                Likes
              </Badge>
            </div>
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={profileData.user.image || '/placeholder.svg'}
                          alt={profileData.user.name}
                        />
                        <AvatarFallback>
                          {profileData.user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {profileData.user.name}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            •
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="leading-relaxed mb-3">{post.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {(post.tags || []).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {(post.images || []).length > 0 && (
                      <div
                        className={`mb-4 rounded-lg overflow-hidden ${
                          post.images.length === 1
                            ? ''
                            : post.images.length === 2
                              ? 'grid grid-cols-2 gap-2'
                              : 'grid grid-cols-2 gap-2'
                        }`}
                      >
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || '/placeholder.svg'}
                            alt={`Post image ${index + 1}`}
                            className={`w-full object-cover ${post.images.length === 1 ? 'h-64' : 'h-48'}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="font-medium">{post.likes || 0}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-blue-500"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {post.comments || 0}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-green-500"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        <span className="font-medium">{post.shares || 0}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Videos ({videos.length})</h2>
              <Badge variant="secondary">
                {videos
                  .reduce((acc, video) => acc + (video.views || 0), 0)
                  .toLocaleString()}{' '}
                Total Views
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={video.thumbnail || '/placeholder.svg'}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {video.length}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/90 text-primary-foreground rounded-full p-3 backdrop-blur-sm">
                          <Play className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>Uploaded: {video.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">
                            {(video.views || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="font-medium">{video.like || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">
                            {video.comment || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Reactions ({likedPosts.length})
              </h2>
              <Badge variant="secondary">Facebook-style reactions</Badge>
            </div>
            <div className="space-y-3">
              {likedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={post.authorAvatar || '/placeholder.svg'}
                          alt={post.author}
                        />
                        <AvatarFallback>
                          {post.author
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{post.author}</p>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{post.reactionIcon}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {post.reaction}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                My Comments ({comments.length})
              </h2>
              <Badge variant="secondary">
                {comments.reduce(
                  (acc, comment) => acc + (comment.likes || 0),
                  0,
                )}{' '}
                Comment Likes
              </Badge>
            </div>
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card
                  key={comment.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={comment.postImage || '/placeholder.svg'}
                          alt={comment.postTitle}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-foreground">
                              {comment.postTitle}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              by {comment.postAuthor} • {comment.timestamp}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3 mb-3 border-l-4 border-blue-500">
                          <p className="text-foreground leading-relaxed">
                            {comment.myComment}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              {comment.likes || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span className="font-medium">
                              {comment.replies || 0} replies
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saves" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bookmark className="w-6 h-6 text-green-500" />
                Saved Posts ({savedPosts.length})
              </h2>
              <Badge variant="secondary">Reading List</Badge>
            </div>
            <div className="space-y-3">
              {savedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {post.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>by {post.author}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>Saved {post.savedDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(post.tags || []).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                My Stories ({stories.length})
              </h2>
              <Badge variant="secondary">
                {stories.reduce((acc, story) => acc + (story.views || 0), 0)}{' '}
                Total Views
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stories.map((story) => (
                <Card
                  key={story.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 aspect-[3/4]"
                  onClick={() => openStoryFullscreen(story)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      <img
                        src={story.content || '/placeholder.svg'}
                        alt={story.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      <div className="absolute top-2 right-2">
                        {story.type === 'video' ? (
                          <div className="bg-black/80 text-white rounded-full p-1">
                            <TvMinimalPlay className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="bg-black/80 text-white rounded-full p-1">
                            <Camera className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-xs font-medium mb-1 line-clamp-2">
                          {story.caption}
                        </p>
                        <div className="flex items-center justify-between text-xs opacity-80">
                          <span>{story.timestamp}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{story.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isStoryFullscreen && selectedStory && (
        <Dialog open={isStoryFullscreen} onOpenChange={closeStoryFullscreen}>
          <DialogContent className="max-w-md h-[80vh] p-0 bg-black border-0">
            <div className="relative h-full">
              <img
                src={selectedStory.content || '/placeholder.svg'}
                alt={selectedStory.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeStoryFullscreen}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10 ring-2 ring-white/20">
                    <AvatarImage
                      src={profileData.user.image || '/placeholder.svg'}
                      alt={profileData.user.name}
                    />
                    <AvatarFallback>
                      {profileData.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{profileData.user.name}</p>
                    <p className="text-sm opacity-80">
                      {selectedStory.timestamp}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-2">{selectedStory.caption}</p>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Eye className="w-4 h-4" />
                  <span>{selectedStory.views || 0} views</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
