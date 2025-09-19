'use client'

import { useState } from 'react'
import {
  Search,
  MessageCircle,
  Users,
  SendHorizontal,
  Camera,
  User2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { FriendsListSkeleton } from './skeletons/friends-list-skeleton'
import { useGetFriends } from '@/lib/queries'

interface Friend {
  _id: string
  name: string
  image?: string
  isOnline?: boolean
}

interface NewChatDialogProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onPersonalChat: (friendId: string) => void
  onCreateGroup: (groupData: {
    name: string
    image: string
    participants: string[]
  }) => void
  isCreatingGroup?: boolean
}

export function NewChatDialog({
  isOpen,
  onClose,
  user,
  onPersonalChat,
  onCreateGroup,
  isCreatingGroup = false,
}: NewChatDialogProps) {
  const { data: friends, isLoading: isLoadingFriends } = useGetFriends(user?._id)
  console.log("friends:", friends)
  const [friendSearchQuery, setFriendSearchQuery] = useState('')
  const [groupName, setGroupName] = useState('')
  const [groupImage, setGroupImage] = useState('')
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

  const filteredFriends = friends?.filter((friend: Friend) =>
    friend.name.toLowerCase().includes(friendSearchQuery.toLowerCase()),
  )

  const toggleFriendSelection = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId],
    )
  }

  const handleCreateGroup = () => {
    if (groupName && selectedFriends.length > 0) {
      onCreateGroup({
        name: groupName,
        image: groupImage,
        participants: selectedFriends,
      })
      setGroupName('')
      setGroupImage('')
      setSelectedFriends([])
      setFriendSearchQuery('')
    }
  }

  const handleClose = () => {
    onClose()
    setFriendSearchQuery('')
    setGroupName('')
    setGroupImage('')
    setSelectedFriends([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Start Chat
            </TabsTrigger>
            <TabsTrigger value="group" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Create Group
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={friendSearchQuery}
                onChange={(e) => setFriendSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {isLoadingFriends ? (
              <FriendsListSkeleton />
            ) : (
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredFriends?.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {friendSearchQuery
                          ? 'No friends found'
                          : 'No friends available'}
                      </p>
                    </div>
                  ) : (
                    filteredFriends?.map((friend: Friend) => (
                      <div
                        key={friend._id}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors"
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={friend.image}
                            />
                            <AvatarFallback>
                              {(friend.name && friend.name.charAt(0)) || (
                                <User2 className="w-4 h-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          {friend.isOnline && (
                            <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {friend.isOnline ? 'Online' : 'Offline'}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onPersonalChat(friend._id)}
                          className="ml-auto"
                        >
                          Start
                          <SendHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="group" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Group Name</label>
                <Input
                  placeholder="Enter group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Group Image (optional)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Image URL..."
                    value={groupImage}
                    onChange={(e) => setGroupImage(e.target.value)}
                  />
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Add Friends</label>
                {selectedFriends.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {selectedFriends.length} selected
                  </span>
                )}
              </div>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search friends..."
                  value={friendSearchQuery}
                  onChange={(e) => setFriendSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {isLoadingFriends ? (
                <FriendsListSkeleton />
              ) : (
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {filteredFriends?.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {friendSearchQuery
                            ? 'No friends found'
                            : 'No friends available'}
                        </p>
                      </div>
                    ) : (
                      filteredFriends?.map((friend: Friend) => (
                        <div
                          key={friend._id}
                          onClick={() => toggleFriendSelection(friend._id)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                            selectedFriends.includes(friend._id)
                              ? 'bg-primary/10 border border-primary'
                              : 'hover:bg-accent',
                          )}
                        >
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={friend.image || '/placeholder.svg'}
                              />
                              <AvatarFallback>
                                {(friend.name && friend.name.charAt(0)) || (
                                  <User2 className="w-4 h-4" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                              <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-background rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{friend.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {friend.isOnline ? 'Online' : 'Offline'}
                            </p>
                          </div>
                          {selectedFriends.includes(friend._id) && (
                            <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                              <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              )}
            </div>

            <Button
              onClick={handleCreateGroup}
              disabled={
                !groupName || selectedFriends.length === 0 || isCreatingGroup
              }
              className="w-full"
            >
              {isCreatingGroup
                ? 'Creating Group...'
                : `Create Group (${selectedFriends.length} members)`}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
