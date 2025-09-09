import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Story {
  id: string
  username: string
  avatar: string
  hasNewStory: boolean
}

const mockStories: Story[] = [
  {
    id: "2",
    username: "sarah_j",
    avatar: "/woman-profile.png",
    hasNewStory: true,
  },
  {
    id: "3",
    username: "mike_dev",
    avatar: "/man-profile.png",
    hasNewStory: true,
  },
  {
    id: "4",
    username: "alex_photo",
    avatar: "/diverse-user-avatars.png",
    hasNewStory: false,
  },
  {
    id: "5",
    username: "emma_art",
    avatar: "/woman-profile.png",
    hasNewStory: true,
  },
  {
    id: "6",
    username: "john_travel",
    avatar: "/man-profile.png",
    hasNewStory: false,
  },
  {
    id: "2",
    username: "sarah_j",
    avatar: "/woman-profile.png",
    hasNewStory: true,
  },
  {
    id: "3",
    username: "mike_dev",
    avatar: "/man-profile.png",
    hasNewStory: true,
  },
  {
    id: "4",
    username: "alex_photo",
    avatar: "/diverse-user-avatars.png",
    hasNewStory: false,
  },
  {
    id: "5",
    username: "emma_art",
    avatar: "/woman-profile.png",
    hasNewStory: true,
  },
  {
    id: "6",
    username: "john_travel",
    avatar: "/man-profile.png",
    hasNewStory: false,
  },
]

export function StoriesSection() {
  return (
    <div className="mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* Your Story Card */}
        <div className="flex-shrink-0">
          <Card className="relative w-20 h-28 bg-gradient-to-b from-muted/50 to-muted border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center justify-center h-full p-2">
              <div className="relative mb-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <span className="text-xs font-medium text-center leading-tight text-foreground">Your Story</span>
            </div>
          </Card>
        </div>

        {/* Friends' Stories */}
        {mockStories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <Card className="relative w-20 h-28 bg-gradient-to-b from-primary/10 to-primary/5 border-0 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${story.avatar})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              </div>

              <div className="relative h-full flex flex-col justify-between p-2">
                <div className="flex justify-center">
                  <div
                    className={`p-0.5 rounded-full ${story.hasNewStory ? "bg-gradient-to-r from-pink-500 to-orange-500" : "bg-muted-foreground/30"}`}
                  >
                    <Avatar className="w-10 h-10 border-2 border-background">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-black/40 rounded-md px-1 py-0.5 backdrop-blur-sm">
                    <span
                      className="text-xs font-medium text-white leading-tight"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {story.username}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
