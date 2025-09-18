import { Phone, Video, Info, MoreHorizontal, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatHeaderSkeleton } from "./skeletons/chat-header-skeleton"

interface ChatHeaderProps {
  selectedChat: {
    name: string
    image?: string
    isOnline?: boolean
  }
  isLoading?: boolean
}

export function ChatHeader({ selectedChat, isLoading }: ChatHeaderProps) {
  if (isLoading) {
    return <ChatHeaderSkeleton />
  }

  return (
    <div className="p-3 border-b border-border bg-sidebar flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedChat.image || "/placeholder.svg"} />
              <AvatarFallback>
                {(selectedChat.name && selectedChat.name.charAt(0)) || <User2 className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            {selectedChat.isOnline && (
              <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-card rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-card-foreground">{selectedChat.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedChat.isOnline ? "Active now" : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Info className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
