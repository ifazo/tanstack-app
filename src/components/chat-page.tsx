"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { getUser } from "@/store"
import { useChatMessages } from "@/lib/queries"
import { useCreateGroupChat, useCreatePersonalChat, useSendMessage } from "@/lib/mutations"
import { useToast } from "@/hooks/useToast"
import { ChatSidebar } from "./chat/chat-sidebar"
import { ChatHeader } from "./chat/chat-header"
import { MessagesList } from "./chat/messages-list"
import { MessageInput } from "./chat/message-input"
import { NewChatDialog } from "./chat/new-chat-dialog"

const onlineUsers = [
  { _id: 1, name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
  { _id: 2, name: "Bob Smith", avatar: "/thoughtful-man.png" },
  { _id: 3, name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
  { _id: 4, name: "David Wilson", avatar: "/thoughtful-man.png" },
  { _id: 5, name: "Emma Brown", avatar: "/diverse-woman-portrait.png" },
]

export function ChatPage() {
  const user = getUser()
  const { showSuccess, showError } = useToast()

  const createPersonalChatMutation = useCreatePersonalChat()
  const createGroupChatMutation = useCreateGroupChat()
  const sendMessageMutation = useSendMessage()

  const [selectedChat, setSelectedChat] = useState<any | null>(null)
  const { data: userChatMessagesData, isLoading } = useChatMessages(selectedChat?._id ?? null)

  const [searchQuery, setSearchQuery] = useState("")
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [messageText, setMessageText] = useState("")

  const handlePersonalChat = (friendId: string) => {
    createPersonalChatMutation.mutate(friendId)
    setIsNewChatOpen(false)
  }

  const handleCreateGroup = (groupData: { name: string; image: string; participants: string[] }) => {
    createGroupChatMutation.mutate(groupData, {
      onSuccess: () => {
        setIsNewChatOpen(false)
        showSuccess("Group created", "Your group was created")
      },
      onError: (err: any) => {
        console.error("Create group failed:", err)
        showError("Create group failed", err?.message || "Unknown error")
      },
    })
  }

  const handleSendMessage = () => {
    if (!selectedChat || !selectedChat._id) return
    if (!messageText.trim()) return

    const payload = { text: messageText }
    setMessageText("")
    sendMessageMutation.mutate(
      { chatId: selectedChat._id, data: payload },
      {
        onError: (err: any) => {
          console.error("Send message failed:", err)
          showError("Send message failed", err?.message || "Unknown error")
        },
      },
    )
  }

  return (
    <div className="flex bg-background overflow-hidden h-[calc(100vh-136px)] md:h-[calc(100vh-68px)]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar Panel */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <ChatSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onlineUsers={onlineUsers}
            user={user}
            selectedChat={selectedChat}
            onChatSelect={setSelectedChat}
            onNewChatClick={() => setIsNewChatOpen(true)}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Chat Panel */}
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full min-w-0">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <ChatHeader selectedChat={selectedChat} />

                {/* Messages */}
                <MessagesList messages={userChatMessagesData?.messages || []} user={user} isLoading={isLoading} />

                {/* Message Input */}
                <MessageInput
                  messageText={messageText}
                  onMessageChange={setMessageText}
                  onSendMessage={handleSendMessage}
                />
              </>
            ) : (
              // When no chat selected
              <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold text-muted-foreground">Select a chat to message</h2>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        user={user}
        onPersonalChat={handlePersonalChat}
        onCreateGroup={handleCreateGroup}
        isCreatingGroup={createGroupChatMutation.isPending}
      />
    </div>
  )
}
