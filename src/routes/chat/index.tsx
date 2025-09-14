import { ChatPage } from '@/components/chat-page'
import { useUserChat } from '@/lib/queries'
import { getUser } from '@/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = getUser()
    const navigate = useNavigate()
    
    if (!user) {
      navigate({ to: '/login' })
      return null
    }

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
