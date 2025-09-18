"use client"
import { Plus, MessageCircle, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/lib/time"
import { ChatListSkeleton } from "./skeletons/chat-list-skeleton"

interface Chat {
  _id: string
  name: string
  image?: string
  lastMessage?: {
    text: string
    createdAt: string
  }
  isOnline?: boolean
}

interface ChatListProps {
  chats: Chat[]
  selectedChat: Chat | null
  onChatSelect: (chat: Chat) => void
  onNewChatClick: () => void
  isLoading: boolean
}

export function ChatList({ chats, selectedChat, onChatSelect, onNewChatClick, isLoading }: ChatListProps) {
  if (isLoading) {
    return <ChatListSkeleton />
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-medium text-sidebar-foreground">Chats</h2>
        <Button size="sm" variant="outline" onClick={onNewChatClick}>
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>
      <ScrollArea className="h-full">
        <div className="p-2">
          {chats?.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No chats available</p>
              <p className="text-xs text-muted-foreground mt-1">Start a new conversation</p>
            </div>
          ) : (
            chats?.map((chat: Chat) => (
              <div
                key={chat._id}
                onClick={() => onChatSelect(chat)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-input",
                  selectedChat?._id === chat?._id && "bg-input",
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {(chat.name && chat.name.charAt(0)) || <User2 className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sidebar-foreground truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessage?.createdAt ? timeAgo(chat.lastMessage.createdAt) : "---"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage?.text ? chat.lastMessage.text : "No messages yet"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
