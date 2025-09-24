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
  MonitorPlay,
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
import { timeAgo } from '@/lib/time'
import { ReactionType } from './reactions-popup'
import { PostCard } from './post-card'

const reactionEmojis: Record<ReactionType, string> = {
  like: '👍',
  love: '❤️',
  haha: '😂',
  wow: '😮',
  sad: '😢',
  angry: '😡',
}

export function ProfilePage() {
  const currentUser = getUser()
  const { data: user } = useGetUser(currentUser._id)
  const { data: userPosts } = useGetPostsByUser(user?._id)
  const { data: userReactions } = useGetUserReactions(user?._id)
  const { data: userComments } = useGetUserComments(user?._id)
  const { data: userSaves } = useGetUserSaves(user?._id)
  const { data: userStories } = useGetUserStories(user?._id)
  // console.log('Posts by user:', userPosts)
  // console.log('User reactions:', userReactions)
  // console.log('User comments:', userComments)
  // console.log('User saves:', userSaves)
  // console.log('User stories:', userStories)

  const [activeTab, setActiveTab] = useState('posts')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [isStoryFullscreen, setIsStoryFullscreen] = useState(false)

  const [editedProfile, setEditedProfile] = useState({
    name: user?.name,
    username: user?.username,
    bio: user?.bio,
    location: user?.location,
    country: user?.country,
    phone: user?.phone?.replace(/^\\+\\d+\\s/, ''),
    phoneCountryCode: user?.phone?.match(/^(\\+\\d+)\\s/)?.[1],
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
    const profileLink = `${window.location.origin}/profile/${editedProfile.username}`
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
            src={user?.cover_image || '/default-cover.jpg'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-lg animate-pulse-hover">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="text-2xl font-semibold bg-secondary text-primary-foreground">
                  {(user?.name && user?.name.charAt(0)) ||
                    <User2 className="w-8 h-8" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-3">
                  {user?.name || 'Unnamed'}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <AtSign className="w-4 h-4" />
                    {user?.username || 'unknown'}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user?.location || 'Not set'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Earth className="w-4 h-4" />
                    {user?.country || 'Not set'}
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
                      : 'Unknown'}
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    <strong className="text-primary">
                      {user.friendsCount || 0}
                    </strong>{' '}
                    Friends
                  </span>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    <strong className="text-primary">
                      {user.followersCount || 0}
                    </strong>{' '}
                    Followers
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
                          value={editedProfile.username}
                          onChange={(e) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              username: e.target.value,
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
                          src={user?.image}
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
                          @{editedProfile.username}
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
                          value={`${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${editedProfile.username}`}
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
              {user?.bio || 'No bio available.'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger
              value="posts"
              className="flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Posts</span>
            </TabsTrigger>
            <TabsTrigger
              value="reacts"
              className="flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Reacts</span>
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
              <h2 className="text-2xl font-bold">My Posts</h2>
              <Badge variant="secondary">{userPosts?.length} total</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts?.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Reacts
              </h2>
              <Badge variant="secondary">{userReactions?.length} total</Badge>
            </div>
            <div className="space-y-3">
              {userReactions?.map((post: any) => (
                <Card key={post._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.postUser.image} />
                        <AvatarFallback>
                          {(post.postUser.name &&
                            post.postUser.name.charAt(0)) || (
                            <User2 className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">
                            {post.postUser.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(post.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.post.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {
                            reactionEmojis[
                              post.react as keyof typeof reactionEmojis
                            ]
                          }
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {post.react}
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
                My Comments
              </h2>
              <Badge variant="secondary">{userComments?.length} total</Badge>
            </div>

            <div className="space-y-3">
              {userComments?.map((comment: any) => (
                <Card
                  key={comment._id}
                  className="overflow-hidden hover:shadow-md transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.postUser?.image} />
                        <AvatarFallback>
                          {(comment.postUser?.name &&
                            comment.postUser.name.charAt(0)) || (
                            <User2 className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* user + time */}
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">
                            {comment.postUser?.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>

                        {/* post text */}
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {comment.post?.text}
                        </p>

                        {/* comment text */}
                        <div className="bg-muted/30 rounded-lg p-3 border-l-4 border-blue-500">
                          <p className="text-sm text-foreground leading-relaxed">
                            {comment.text}
                          </p>
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
                Saved Posts
              </h2>
              <Badge variant="secondary">{userSaves?.length} total</Badge>
            </div>

            <div className="space-y-3">
              {userSaves?.map((post: any) => (
                <Card key={post._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* avatar */}
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.postUser.image} />
                        <AvatarFallback>
                          {(post.postUser.name &&
                            post.postUser.name.charAt(0)) || (
                            <User2 className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      {/* post content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">
                            {post.postUser.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(post.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.post.text}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-green-600"
                      >
                        <Bookmark className="w-5 h-5" />
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
                My Stories
              </h2>
              <Badge variant="secondary">{userStories?.length} total</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {userStories?.map((story: any) => (
                <Card
                  key={story._id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 aspect-[3/4]"
                  onClick={() => openStoryFullscreen(story)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      <img
                        src={story.media}
                        alt={story.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      <div className="absolute top-2 right-2">
                        {story.type === 'video' ? (
                          <div className="bg-black/80 text-white rounded-full p-1">
                            <MonitorPlay className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="bg-black/80 text-white rounded-full p-1">
                            <Camera className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        {/* <p className="text-xs font-medium mb-1 line-clamp-2">
                          {story.caption}
                        </p> */}
                        <div className="flex items-center justify-between text-xs opacity-80">
                          <span>{timeAgo(story.createdAt)}</span>
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
              {/* Render video OR image */}
              {selectedStory.type === 'video' ? (
                <video
                  src={selectedStory.media}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedStory.media}
                  alt={selectedStory.caption}
                  className="w-full h-full object-cover"
                />
              )}

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
