"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Clock,
  Users,
  Upload,
} from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  likes: number
  comments: number
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  uploadedAt: string
  category: string
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Amazing Sunset Timelapse in the Mountains",
    thumbnail: "/sunset-mountain-timelapse.jpg",
    duration: "3:45",
    views: "125K",
    likes: 2400,
    comments: 89,
    author: {
      name: "Nature Explorer",
      avatar: "/nature-photographer.jpg",
      verified: true,
    },
    uploadedAt: "2 hours ago",
    category: "Nature",
  },
  {
    id: "2",
    title: "Cooking the Perfect Pasta - Italian Style",
    thumbnail: "/italian-pasta-cooking.png",
    duration: "8:22",
    views: "89K",
    likes: 1800,
    comments: 156,
    author: {
      name: "Chef Marco",
      avatar: "/italian-chef.png",
      verified: true,
    },
    uploadedAt: "5 hours ago",
    category: "Cooking",
  },
  {
    id: "3",
    title: "Modern Web Development Tutorial - React & Next.js",
    thumbnail: "/web-development-coding.png",
    duration: "15:30",
    views: "234K",
    likes: 4200,
    comments: 312,
    author: {
      name: "CodeMaster",
      avatar: "/software-developer-workspace.png",
      verified: false,
    },
    uploadedAt: "1 day ago",
    category: "Technology",
  },
  {
    id: "4",
    title: "Urban Photography Tips for Beginners",
    thumbnail: "/urban-street-photography.png",
    duration: "6:18",
    views: "67K",
    likes: 1200,
    comments: 78,
    author: {
      name: "Street Lens",
      avatar: "/street-photographer.png",
      verified: false,
    },
    uploadedAt: "3 days ago",
    category: "Photography",
  },
  {
    id: "5",
    title: "Meditation and Mindfulness for Daily Life",
    thumbnail: "/peaceful-nature-meditation.png",
    duration: "12:45",
    views: "156K",
    likes: 3100,
    comments: 203,
    author: {
      name: "Zen Master",
      avatar: "/serene-meditation-teacher.png",
      verified: true,
    },
    uploadedAt: "1 week ago",
    category: "Wellness",
  },
  {
    id: "6",
    title: "Electric Guitar Solo - Blues Improvisation",
    thumbnail: "/electric-guitar-blues-music.jpg",
    duration: "4:56",
    views: "92K",
    likes: 2800,
    comments: 145,
    author: {
      name: "Blues Legend",
      avatar: "/blues-guitarist.jpg",
      verified: true,
    },
    uploadedAt: "4 days ago",
    category: "Music",
  },
]

const categories = [
  "All",
  "Trending",
  "Recent",
  "Popular",
  "Nature",
  "Cooking",
  "Technology",
  "Photography",
  "Wellness",
  "Music",
]

export function VideoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [videos, setVideos] = useState(mockVideos)

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (videoId: string) => {
    setVideos((prev) => prev.map((video) => (video.id === videoId ? { ...video, likes: video.likes + 1 } : video)))
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Videos</h1>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category === "Trending" && <TrendingUp className="h-3 w-3 mr-1" />}
                  {category === "Recent" && <Clock className="h-3 w-3 mr-1" />}
                  {category === "Popular" && <Users className="h-3 w-3 mr-1" />}
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Video Grid */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-t-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <Badge variant="secondary" className="absolute bottom-2 right-2 text-xs">
                        {video.duration}
                      </Badge>
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={video.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{video.author.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{video.title}</h3>
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs text-muted-foreground">{video.author.name}</span>
                            {video.author.verified && (
                              <div className="h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                                <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span>{video.uploadedAt}</span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(video.id)
                            }}
                            className="h-8 px-2 text-muted-foreground hover:text-primary"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-xs">{video.likes}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-primary"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="text-xs">{video.comments}</span>
                          </Button>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No videos found</div>
                <div className="text-sm text-muted-foreground">Try adjusting your search or filters</div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
