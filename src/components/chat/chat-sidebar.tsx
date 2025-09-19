'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { OnlineUsers } from './online-users'
import { ChatList } from './chat-list'
import { useUserChat } from '@/lib/queries'

interface ChatSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onlineUsers: any[]
  user: any
  selectedChat: any
  onChatSelect: (chat: any) => void
  onNewChatClick: () => void
}

export function ChatSidebar({
  searchQuery,
  onSearchChange,
  onlineUsers,
  user,
  selectedChat,
  onChatSelect,
  onNewChatClick,
}: ChatSidebarProps) {
  const { data: userChatData, isLoading } = useUserChat(user?._id)
  console.log('User Chat Data:', userChatData)
  const chats = userChatData?.filter((chat: any) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      {/* Online Users */}
      <OnlineUsers users={onlineUsers} />

      {/* Chat List */}
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        onChatSelect={onChatSelect}
        onNewChatClick={onNewChatClick}
        isLoading={isLoading}
      />
    </div>
  )
}
