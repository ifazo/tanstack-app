'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

// Example user data
const initialUsers = [
  { id: '1', name: 'Alice', active: true, lastMessage: 'Hey there!' },
  { id: '2', name: 'Bob', active: false, lastMessage: 'See you tomorrow.' },
  { id: '3', name: 'Charlie', active: true, lastMessage: 'What’s up?' },
  { id: '4', name: 'David', active: false, lastMessage: 'Typing…' },
]

export default function ChatPage() {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState('')

  // Filter & sort users: active users on top
  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return
    setMessages([...messages, { sender: 'me', text: input }])
    setInput('')
  }

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (User list) */}
      <Card className="w-72 border-r flex flex-col">
        <CardHeader>
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-full">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted transition',
                  selectedUser === user.id && 'bg-muted'
                )}
              >
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.lastMessage}
                  </span>
                </div>
                {user.active && (
                  <span className="ml-auto h-3 w-3 rounded-full bg-green-500" />
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="border-b px-4 py-3 font-medium">
              Chat with {users.find((u) => u.id === selectedUser)?.name}
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      'max-w-xs px-3 py-2 rounded-lg',
                      msg.sender === 'me'
                        ? 'ml-auto bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-3 flex gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  )
}
