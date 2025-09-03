'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Edit,
  MapPin,
  Calendar,
  MessageSquare,
  Heart,
  Bookmark,
  Share2,
  MoreHorizontal,
  UserPlus,
  Edit3,
  CornerUpRight,
  AtSign,
} from 'lucide-react'

// Mock data for the profile
const profileData = {
  user: {
    id: '1',
    name: 'Sarah Johnsony',
    username: 'sarah.johnson',
    bio: 'UX Designer passionate about creating meaningful digital experiences. Coffee enthusiast ☕ | Travel lover 🌍',
    avatar: '/diverse-woman-portrait.png',
    coverImage: '/abstract-gradient.png',
    location: 'San Francisco, CA',
    joinDate: 'March 2020',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    isOnline: true,
    friendsCount: 342,
    groupsCount: 28,
    postsCount: 156,
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
  groups: [
    {
      id: '1',
      name: 'UX Designers Network',
      members: 1240,
      avatar: '/diverse-group-meeting.png',
      isJoined: true,
    },
    {
      id: '2',
      name: 'San Francisco Tech',
      members: 856,
      avatar: '/diverse-family-portrait.png',
      isJoined: true,
    },
    {
      id: '3',
      name: 'Coffee Lovers United',
      members: 2341,
      avatar: '/diverse-group-meeting.png',
      isJoined: true,
    },
    {
      id: '4',
      name: 'Travel Photography',
      members: 567,
      avatar: '/diverse-family-portrait.png',
      isJoined: true,
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
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('friends')
  const [isEditing, setIsEditing] = useState(false)
  const [editedBio, setEditedBio] = useState(profileData.user.bio)

  const handleSaveBio = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <img
            src={profileData.user.coverImage}
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
                  src={profileData.user.avatar || '/placeholder.svg'}
                  alt={profileData.user.name}
                />
                <AvatarFallback className="text-2xl font-semibold">
                  {profileData.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-3xl font-bold text-foreground">
                    {profileData.user.name}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <AtSign className="w-4 h-4" />
                    {profileData.user.username}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.user.location}
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
                    <strong>{profileData.user.groupsCount}</strong> Groups
                  </span>
                  <span>
                    <strong>{profileData.user.postsCount}</strong> Posts
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <CornerUpRight className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveBio}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-foreground leading-relaxed">
                {profileData.user.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger
              value="friends"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <UserPlus className="w-4 h-4" /> Friends
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <UserPlus className="w-4 h-4" /> Groups
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Edit3 className="w-4 h-4" /> Posts
            </TabsTrigger>
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
              <MessageSquare className="w-4 h-4" /> Comments
            </TabsTrigger>
            <TabsTrigger
              value="saves"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Bookmark className="w-4 h-4" /> Saved
            </TabsTrigger>
            <TabsTrigger
              value="shares"
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Share2 className="w-4 h-4" /> Shared
            </TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Friends ({profileData.friends.length})
              </h2>
              <Input placeholder="Search friends..." className="max-w-xs" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.friends.map((friend) => (
                <Card
                  key={friend.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={friend.avatar || '/placeholder.svg'}
                            alt={friend.name}
                          />
                          <AvatarFallback>
                            {friend.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{friend.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {friend.mutualFriends} mutual friends
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Groups ({profileData.groups.length})
              </h2>
              <Input placeholder="Search groups..." className="max-w-xs" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.groups.map((group) => (
                <Card
                  key={group.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={group.avatar || '/placeholder.svg'}
                          alt={group.name}
                        />
                        <AvatarFallback>
                          {group.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {group.members.toLocaleString()} members
                        </p>
                      </div>
                      <Badge variant={group.isJoined ? 'default' : 'outline'}>
                        {group.isJoined ? 'Joined' : 'Join'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

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
                          src={profileData.user.avatar || '/placeholder.svg'}
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
                  <Bookmark className="w-5 h-5 text-yellow-500" />
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

          <TabsContent value="shares" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-green-500" />
                  Shared Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Posts you've shared will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
