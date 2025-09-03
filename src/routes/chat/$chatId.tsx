import { useChatMessages } from '@/lib/queries'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/chat/$chatId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { chatId } = useParams({ from: '/chat/$chatId' })
  console.log('chatId:', chatId) 
  const { data, isLoading, error } = useChatMessages(chatId)
  console.log(data)
  if (!data) return <div>No messages available</div>
  if (isLoading) return <div>Loading messages...</div>
  if (error) return <div>Error loading messages: {error.message}</div>

  return (
    <div>
      <h1>Chat Messages: {chatId}</h1>
      <ul>
        {data.messages.map((message: any) => (
          <li key={message._id}>{message.text}</li>
        ))}
      </ul>
    </div>
  )
}
