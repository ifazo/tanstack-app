"use client"
import { useState } from "react"
import { Search, Plus, MoreHorizontal, Phone, Video, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"

// Mock data for demonstration
const onlineUsers = [
  { id: 1, name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
  { id: 2, name: "Bob Smith", avatar: "/thoughtful-man.png" },
  { id: 3, name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
  { id: 4, name: "David Wilson", avatar: "/thoughtful-man.png" },
  { id: 5, name: "Emma Brown", avatar: "/diverse-woman-portrait.png" },
  { id: 1, name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
  { id: 2, name: "Bob Smith", avatar: "/thoughtful-man.png" },
  { id: 3, name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
  { id: 4, name: "David Wilson", avatar: "/thoughtful-man.png" },
  { id: 5, name: "Emma Brown", avatar: "/diverse-woman-portrait.png" },
]

const chatList = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/diverse-woman-portrait.png",
    lastMessage: "Hey! How are you doing today?",
    timestamp: "2m",
    unread: 2,
    isOnline: true,
    isGroup: false,
  },
  {
    id: 2,
    name: "Team Project",
    avatar: "/diverse-group-meeting.png",
    lastMessage: "Sarah: The deadline is tomorrow",
    timestamp: "5m",
    unread: 0,
    isOnline: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Bob Smith",
    avatar: "/thoughtful-man.png",
    lastMessage: "Thanks for the help!",
    timestamp: "1h",
    unread: 0,
    isOnline: true,
    isGroup: false,
  },
  {
    id: 4,
    name: "Family Group",
    avatar: "/diverse-family-portrait.png",
    lastMessage: "Mom: Dinner at 7pm",
    timestamp: "2h",
    unread: 1,
    isOnline: false,
    isGroup: true,
  },
  {
    id: 5,
    name: "Carol Davis",
    avatar: "/diverse-woman-portrait.png",
    lastMessage: "See you tomorrow!",
    timestamp: "1d",
    unread: 0,
    isOnline: false,
    isGroup: false,
  },
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/diverse-woman-portrait.png",
    lastMessage: "Hey! How are you doing today?",
    timestamp: "2m",
    unread: 2,
    isOnline: true,
    isGroup: false,
  },
  {
    id: 2,
    name: "Team Project",
    avatar: "/diverse-group-meeting.png",
    lastMessage: "Sarah: The deadline is tomorrow",
    timestamp: "5m",
    unread: 0,
    isOnline: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Bob Smith",
    avatar: "/thoughtful-man.png",
    lastMessage: "Thanks for the help!",
    timestamp: "1h",
    unread: 0,
    isOnline: true,
    isGroup: false,
  },
  {
    id: 4,
    name: "Family Group",
    avatar: "/diverse-family-portrait.png",
    lastMessage: "Mom: Dinner at 7pm",
    timestamp: "2h",
    unread: 1,
    isOnline: false,
    isGroup: true,
  },
  {
    id: 5,
    name: "Carol Davis",
    avatar: "/diverse-woman-portrait.png",
    lastMessage: "See you tomorrow!",
    timestamp: "1d",
    unread: 0,
    isOnline: false,
    isGroup: false,
  },
]

const messages = [
  {
    id: 1,
    text: "Hey! How are you doing today?",
    sender: "Alice Johnson",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    text: "I'm doing great! Just working on some projects. How about you?",
    sender: "You",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    text: "Same here! I've been busy with the new design system we discussed.",
    sender: "Alice Johnson",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  {
    id: 4,
    text: "That sounds exciting! I'd love to see what you've come up with.",
    sender: "You",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: 1,
    text: "Hey! How are you doing today?",
    sender: "Alice Johnson",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    text: "I'm doing great! Just working on some projects. How about you?",
    sender: "You",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    text: "Same here! I've been busy with the new design system we discussed.",
    sender: "Alice Johnson",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  {
    id: 4,
    text: "That sounds exciting! I'd love to see what you've come up with.",
    sender: "You",
    timestamp: "10:35 AM",
    isOwn: true,
  },
]

export function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(chatList[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chatList.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div style={{ height: 'calc(100vh - 64px)' }} className="flex bg-background overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-sidebar-foreground">Chats</h1>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            {/* Online Users */}
            <div className="p-4 border-b border-sidebar-border flex-shrink-0">
              <h2 className="text-sm font-medium text-sidebar-foreground mb-3">Active Now</h2>
              <div className="flex overflow-x-auto pb-2">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-sidebar rounded-full" />
                    </div>
                    <span className="text-xs text-sidebar-foreground truncate w-16 text-center">
                      {user.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-2">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-sidebar-accent",
                        selectedChat.id === chat.id && "bg-sidebar-accent",
                      )}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                          <AvatarFallback>
                            {chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-sidebar rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sidebar-foreground truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <Badge variant="default" className="ml-2 h-5 min-w-5 text-xs bg-primary">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Chat Panel */}
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full min-w-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                      <AvatarFallback>
                        {selectedChat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex", message.isOwn ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground",
                        )}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground",
                          )}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card flex-shrink-0">
              <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1 bg-input border-border" />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
