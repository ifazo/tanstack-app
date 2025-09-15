'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  TvMinimalPlay,
  Eye,
  AtSign,
  Earth,
  Loader,
  Sparkles,
} from 'lucide-react'

// Mock data for the profile
const profileData = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarah.johnson',
    slug: 'sarah-johnson',
    bio: 'UX Designer passionate about creating meaningful digital experiences. Coffee enthusiast ☕ | Travel lover 🌍',
    image: '/diverse-woman-portrait.png',
    coverImage: '/abstract-gradient.png',
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
  friends: [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: '/thoughtful-man.png',
      isOnline: true,
      mutualFriends: 12,
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: '/diverse-woman-portrait.png',
      isOnline: false,
      mutualFriends: 8,
    },
    {
      id: '3',
      name: 'David Kim',
      avatar: '/thoughtful-man.png',
      isOnline: true,
      mutualFriends: 15,
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: '/diverse-woman-portrait.png',
      isOnline: false,
      mutualFriends: 6,
    },
    {
      id: '5',
      name: 'James Rodriguez',
      avatar: '/thoughtful-man.png',
      isOnline: true,
      mutualFriends: 9,
    },
    {
      id: '6',
      name: 'Lisa Thompson',
      avatar: '/diverse-woman-portrait.png',
      isOnline: false,
      mutualFriends: 11,
    },
  ],
  posts: [
    {
      id: '1',
      content:
        'Just finished an amazing design sprint! The collaborative energy was incredible 🚀',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: '2',
      content:
        'Beautiful sunset from my morning hike. Nature always inspires the best designs 🌅',
      timestamp: '1 day ago',
      likes: 45,
      comments: 12,
      shares: 7,
    },
    {
      id: '3',
      content:
        'Excited to share my latest project - a mobile app for sustainable living!',
      timestamp: '3 days ago',
      likes: 67,
      comments: 23,
      shares: 15,
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Design Thinking Workshop',
      thumbnail: '/video-thumb1.png',
      url: '#',
      length: '15:30',
      author: 'Sarah Johnson',
      views: 1200,
      like: 120,
      comment: 30,
      share: 10,
      createdAt: '2023-10-01',
    },
    {
      id: '2',
      title: 'UI/UX Trends 2024',
      thumbnail: '/video-thumb2.png',
      url: '#',
      length: '10:45',
      author: 'Sarah Johnson',
      views: 980,
      like: 95,
      comment: 20,
      share: 5,
      createdAt: '2023-09-15',
    },
    {
      id: '3',
      title: 'Prototyping with Figma',
      thumbnail: '/video-thumb3.png',
      url: '#',
      length: '12:20',
      author: 'Sarah Johnson',
      views: 1500,
      like: 150,
      comment: 40,
      share: 12,
      createdAt: '2023-08-30',
    },
    {
      id: '4',
      title: 'User Research Basics',
      thumbnail: '/video-thumb4.png',
      url: '#',
      length: '08:50',
      author: 'Sarah Johnson',
      views: 800,
      like: 80,
      comment: 15,
      share: 3,
      createdAt: '2023-07-20',
    },
  ],
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: profileData.user.name,
    slug: profileData.user.slug,
    bio: profileData.user.bio,
    location: profileData.user.location || 'Unknown',
    country: profileData.user.country || 'Unknown',
    phone: profileData.user.phone.replace(/^\+\d+\s/, ''), // Remove country code from display
    phoneCountryCode: '+1', // Default to US
  })

  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [countries, setCountries] = useState<any[]>([])
  const [phoneCountries, setPhoneCountries] = useState<any[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)

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
            // Use reverse geocoding to get location name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
            )
            const data = await response.json()
            const locationString = `${data.city}, ${data.principalSubdivision}`

            setEditedProfile((prev) => ({
              ...prev,
              location: locationString || 'Unknown', // Fallback to "Unknown"
              country: data.countryName,
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
    // Here you would typically save to backend
    // console.log('Saving profile:', editedProfile)
    setIsEditDialogOpen(false)
  }

  const handleCancelEdit = () => {
    // Reset to original values
    setEditedProfile({
      name: profileData.user.name,
      slug: profileData.user.slug,
      bio: profileData.user.bio,
      location: 'Unknown', // Reset to "Unknown"
      country: profileData.user.country,
      phone: profileData.user.phone.replace(/^\+\d+\s/, ''),
      phoneCountryCode: '+1',
    })
    setIsEditDialogOpen(false)
  }

  const copyProfileLink = async () => {
    const profileLink = `${window.location.origin}/profile/${editedProfile.slug}`
    try {
      await navigator.clipboard.writeText(profileLink)
      setIsLinkCopied(true)
      setTimeout(() => setIsLinkCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <img
            src={profileData.user.coverImage || '/placeholder.svg'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                <AvatarImage
                  src={profileData.user.image}
                  alt={editedProfile.name}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {editedProfile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  {editedProfile.name}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <AtSign className="w-4 h-4" />
                    {editedProfile.slug}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {editedProfile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Earth className="w-4 h-4" />
                    {editedProfile.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.user.joinDate}
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <span>
                    <strong>{profileData.user.friendsCount}</strong> Friends
                  </span>
                  <span>
                    <strong>{profileData.user.followersCount}</strong> Followers
                  </span>
                  <span>
                    <strong>{profileData.user.likesCount}</strong> Likes
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
                          value={editedProfile.slug}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              slug: e.target.value,
                            }))
                          }
                          placeholder="Enter username"
                        />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={editedProfile.location}
                          readOnly
                          placeholder="Location will be detected automatically"
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
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
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
                          src={profileData.user.image}
                          alt={editedProfile.name}
                        />
                        <AvatarFallback>
                          {editedProfile.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {editedProfile.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          @{editedProfile.slug}
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
                          value={`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${editedProfile.slug}`}
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
              {editedProfile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger
              value="posts"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Edit3 className="w-4 h-4" /> Posts
            </TabsTrigger>
            {/* <TabsTrigger
              value="videos"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <TvMinimalPlay className="w-4 h-4" /> Videos
            </TabsTrigger> */}
            <TabsTrigger
              value="likes"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Heart className="w-4 h-4 text-red-500" /> Likes
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4 text-blue-500" /> Comments
            </TabsTrigger>
            <TabsTrigger
              value="saves"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Bookmark className="w-4 h-4 text-green-500" /> Saved
            </TabsTrigger>
            <TabsTrigger
              value="stories"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" /> Stories
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Posts ({profileData.posts.length})
              </h2>
            </div>
            <div className="space-y-4">
              {profileData.posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={profileData.user.image}
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
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">
                            {profileData.user.name}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            {post.timestamp}
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          {/* <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Videos ({profileData.videos.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.videos.map((video) => (
                <Card
                  key={video.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-0">
                    <a href={video.url} className="block relative group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.length}
                      </div>
                    </a>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload at: {video.createdAt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          <Eye className="w-4 h-4 inline-block mr-1 mb-1" />
                          {video.views.toLocaleString()}
                        </span>
                        <span>•</span>
                        <span>
                          <Heart className="w-4 h-4 inline-block mr-1 mb-1" />
                          {video.like}
                        </span>
                        <span>•</span>
                        <span>
                          <MessageSquare className="w-4 h-4 inline-block mr-1 mb-1" />
                          {video.comment}
                        </span>
                        <span>•</span>
                        <span>
                          <Share2 className="w-4 h-4 inline-block mr-1 mb-1" />
                          {video.share}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}

          {/* Other Tabs with Placeholder Content */}
          <TabsContent value="likes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Liked Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Posts you've liked will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Commented Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Posts you've commented on will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saves" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-green-500" />
                  Saved Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Posts you've saved will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Your stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stories you've posted will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
