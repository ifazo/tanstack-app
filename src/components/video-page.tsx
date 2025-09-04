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
  TrendingUp,
  Clock,
  Users,
  Upload,
  Eye,
  BadgeCheck,
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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-card rounded-2xl shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Video Gallery</h1>
              {/* <p className="text-muted-foreground mt-1">Discover {filteredVideos.length} amazing videos</p> */}
            </div>
            <Button className="shadow-lg hover:shadow-xl transition-all duration-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl"
            />
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap rounded-xl transition-all duration-200"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="group bg-card border hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-muted-foreground ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-3 right-3 bg-black/80 text-white border-0 rounded-lg">
                    {video.duration}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-muted">
                      <AvatarImage src={video.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-muted text-muted-foreground">{video.author.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2 text-base leading-snug transition-colors duration-200">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground font-medium truncate">{video.author.name}</span>
                        {video.author.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike(video.id)
                        }}
                        className="h-9 px-3 rounded-lg transition-colors"
                      >
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-sm font-medium">{video.likes.toLocaleString()}</span>
                      </Button>
                        <span>•</span>
                      <Button variant="ghost" size="sm" className="h-9 px-3 rounded-lg transition-colors">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{video.comments}</span>
                      </Button>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg transition-colors">
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
          <div className="bg-card rounded-2xl shadow-sm border p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No videos found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
