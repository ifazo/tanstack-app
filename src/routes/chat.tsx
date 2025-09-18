import { ChatPage } from '@/components/chat-page'
import { useToast } from '@/hooks/useToast'
import { getUser } from '@/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = getUser()
  const { showWarning } = useToast()
  const navigate = useNavigate()

  if (!user) {
    showWarning('Not logged in', 'Please log in to view chat page.')
    navigate({ to: '/login' })
    return null
  }

  // const { data, isLoading, error } = useUserChat(user._id)
  // console.log(data, isLoading, error)
  // const { chatId } = useParams({ from: '/chat/$chatId' })
  //   console.log('chatId:', chatId)
  //   const { data, isLoading, error } = useChatMessages(chatId)

  return (
    <div>
      <ChatPage />
    </div>
  )
}
