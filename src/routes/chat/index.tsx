import { ChatPage } from '@/components/chat-page'
import { useUserChat } from '@/lib/queries'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useUserChat()
  console.log(data, isLoading, error)
  // if (!data) return <div>No chats available</div>
  // if (isLoading) return <div>Loading chats...</div>
  // if (error) return <div>Error loading chats: {error.message}</div>

  return (
    <div>
      <ChatPage />
    </div>
  )
}
