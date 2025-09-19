'use client'

import { useState } from 'react'
import {
  Search,
  UserPlus,
  MessageCircle,
  Check,
  X,
  Users,
  UserCheck,
  User2,
  UserMinus,
  User,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  useGetFriendRequests,
  useGetFriends,
  useGetFriendSuggestions,
  useGetSentFriendRequests,
} from '@/lib/queries'
import {
  useSendFriendRequest,
  useAcceptFriendRequest,
  useDeclineFriendRequest,
  useCancelFriendRequest,
} from '@/lib/mutations'
import { getUser } from '@/store'
import { useToast } from '@/hooks/useToast'
import { timeAgo } from '@/lib/time'

export function FriendsPage() {
  const user = getUser()
  const { showSuccess, showError } = useToast()

  const { data: friendsData } = useGetFriends(user?._id)
  const { data: requestsData } = useGetFriendRequests(user?._id)
  const { data: sentRequestsData } = useGetSentFriendRequests(user?._id)
  const { data: suggestionsData } = useGetFriendSuggestions(user?._id)

  const sendRequest = useSendFriendRequest()
  const acceptRequest = useAcceptFriendRequest()
  const declineRequest = useDeclineFriendRequest()
  const cancelRequest = useCancelFriendRequest()

  const [sendingIds, setSendingIds] = useState<string[]>([])
  const [acceptingIds, setAcceptingIds] = useState<string[]>([])
  const [decliningIds, setDecliningIds] = useState<string[]>([])
  const [cancellingIds, setCancellingIds] = useState<string[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('friends')

  const filteredFriends = friendsData?.filter((friend: any) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const mark = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
    flag: boolean,
  ) => {
    setter((prev) => {
      if (flag) {
        if (prev.includes(id)) return prev
        return [...prev, id]
      } else {
        return prev.filter((i) => i !== id)
      }
    })
  }

  const handleSendRequest = (targetUserId: string) => {
    if (!targetUserId) return

    mark(setSendingIds, targetUserId, true)
    sendRequest.mutate(targetUserId, {
      onSuccess: () => {
        showSuccess('Friend request sent!')
      },
      onError: (error: any) => {
        showError(error?.response?.data?.message || 'Failed to send request')
      },
      onSettled: () => {
        mark(setSendingIds, targetUserId, false)
      },
    })
  }

  const handleAccept = (requestId: string) => {
    if (!requestId) return

    mark(setAcceptingIds, requestId, true)
    acceptRequest.mutate(requestId, {
      onSuccess: () => {
        showSuccess('Friend request accepted!')
      },
      onError: (error: any) => {
        showError(error?.response?.data?.message || 'Failed to accept request')
      },
      onSettled: () => {
        mark(setAcceptingIds, requestId, false)
      },
    })
  }

  const handleDecline = (requestId: string) => {
    if (!requestId) return

    mark(setDecliningIds, requestId, true)
    declineRequest.mutate(requestId, {
      onSuccess: () => {
        showSuccess('Friend request declined!')
      },
      onError: (error: any) => {
        showError(error?.response?.data?.message || 'Failed to decline request')
      },
      onSettled: () => {
        mark(setDecliningIds, requestId, false)
      },
    })
  }

  const handleCancel = (requestId: string) => {
    if (!requestId) return

    mark(setCancellingIds, requestId, true)
    cancelRequest.mutate(requestId, {
      onSuccess: () => {
        showSuccess('Friend request cancelled!')
      },
      onError: (error: any) => {
        showError(error?.response?.data?.message || 'Failed to cancel request')
      },
      onSettled: () => {
        mark(setCancellingIds, requestId, false)
      },
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex gap-4">
            <h1 className="text-2xl font-bold text-foreground">Friends</h1>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search friends online..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends
                {activeTab === 'friends' ? (
                  <Badge variant="default" className="ml-1">
                    {filteredFriends?.length}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-1">
                    {filteredFriends?.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Requests
                {activeTab === 'requests' ? (
                  <Badge variant="default" className="ml-1">
                    {requestsData?.length}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-1">
                    {requestsData?.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <UserMinus className="h-4 w-4" />
                Pending
                {activeTab === 'pending' ? (
                  <Badge variant="default" className="ml-1">
                    {sentRequestsData?.length}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-1">
                    {sentRequestsData?.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Suggestions
                {activeTab === 'suggestions' ? (
                  <Badge variant="default" className="ml-1">
                    {suggestionsData?.length}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-1">
                    {suggestionsData?.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Friends List */}
            <TabsContent value="friends" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {filteredFriends?.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No friends found
                    </p>
                  ) : (
                    filteredFriends?.map((friend: any) => (
                      <Card key={friend.id} className="p-0">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={friend?.image} />
                                <AvatarFallback>
                                  {(friend?.name && friend.name.charAt(0)) || (
                                    <User2 className="w-4 h-4" />
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">
                                  {friend.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  @{friend.username}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  active 12 mins ago
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button size="sm">
                                <MessageCircle className="h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                <User2 className="h-4 w-4" />
                                Profile
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Friend Requests */}
            <TabsContent value="requests" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {requestsData?.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No requests now
                    </p>
                  ) : (
                    requestsData?.map((request: any) => {
                      const reqId = request._id ?? request.id
                      const isAccepting = acceptingIds.includes(reqId)
                      const isDeclining = decliningIds.includes(reqId)
                      return (
                        <Card key={reqId} className="p-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={request.image} />
                                  <AvatarFallback>
                                    {(request?.name &&
                                      request.name.charAt(0)) || (
                                      <User2 className="w-4 h-4" />
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {request.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    @{request.username}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Received {timeAgo(request?.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleAccept(reqId)}
                                  disabled={isAccepting}
                                >
                                  <Check className="h-4 w-4" />
                                  {isAccepting ? 'Accepting...' : 'Accept'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDecline(reqId)}
                                  disabled={isDeclining}
                                >
                                  <X className="h-4 w-4" />
                                  {isDeclining ? 'Declining...' : 'Decline'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            {/* Sent Friend Requests */}
            <TabsContent value="pending" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {sentRequestsData?.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No requests now
                    </p>
                  ) : (
                    sentRequestsData?.map((request: any) => {
                      const reqId = request._id ?? request.id
                      const isCancelling = cancellingIds.includes(reqId)
                      return (
                        <Card key={reqId} className="p-0">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={request?.to.image} />
                                  <AvatarFallback>
                                    {(request?.to.name &&
                                      request.to.name.charAt(0)) || (
                                      <User2 className="w-4 h-4" />
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {request?.to.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    @{request?.to.username}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Sent {timeAgo(request?.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleCancel(reqId)}
                                  disabled={isCancelling}
                                >
                                  <X className="h-4 w-4" />
                                  Withdraw
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                >
                                  <User className="h-4 w-4" />
                                  Profile
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Friend Suggestions */}
            <TabsContent value="suggestions" className="h-full">
              <ScrollArea className="h-full">
                {suggestionsData?.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No suggestions available
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {suggestionsData?.map((suggestion: any) => {
                      const sugId = suggestion._id ?? suggestion.id
                      const isSending = sendingIds.includes(sugId)
                      return (
                        <Card
                          key={sugId}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="text-center">
                              <Avatar className="h-16 w-16 mx-auto mb-3">
                                <AvatarImage src={suggestion.image} />
                                <AvatarFallback>
                                  {(suggestion?.name &&
                                    suggestion.name.charAt(0)) || (
                                    <User2 className="w-4 h-4" />
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium text-foreground mb-1">
                                {suggestion.name}
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                @{suggestion.username}
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">
                                {suggestion.mutualFriends.length} mutual friends
                              </p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Profile
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="flex-1"
                                  onClick={() => handleSendRequest(sugId)}
                                  disabled={isSending}
                                >
                                  <UserPlus className="h-4 w-4" />
                                  {isSending ? 'Sending...' : 'Add Friend'}
                                </Button>
                                <Button variant="outline" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
