import { MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/lib/time"
import { MessagesSkeleton } from "./skeletons/messages-skeleton"

interface Message {
  _id: string
  text: string
  userId: string
  createdAt: string
}

interface MessagesListProps {
  messages: Message[]
  user: any
  isLoading: boolean
}

export function MessagesList({ messages, user, isLoading }: MessagesListProps) {
  
  if (isLoading) {
    return <MessagesSkeleton />
  }

  if (messages?.length === 0) {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-card-foreground mb-2">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start the conversation by sending a message</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {messages?.map((message: Message) => {
            const isOwn = user?._id === message.userId

            return (
              <div key={message._id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
                    isOwn ? "bg-primary text-primary-foreground" : "bg-secondary text-card-foreground",
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={cn("text-xs mt-1", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {timeAgo(message.createdAt)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
