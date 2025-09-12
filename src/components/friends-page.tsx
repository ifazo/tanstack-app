"use client"

import { useState } from "react"
import { Search, UserPlus, MessageCircle, Check, X, Users, UserCheck, Edit3, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const friends = [
  { id: 1, name: "Sarah Johnson", avatar: "/diverse-woman-portrait.png", status: "online", mutualFriends: 12 },
  { id: 2, name: "Mike Chen", avatar: "/thoughtful-man.png", status: "offline", mutualFriends: 8 },
  { id: 3, name: "Emily Davis", avatar: "/diverse-woman-portrait.png", status: "online", mutualFriends: 15 },
  { id: 4, name: "Alex Rodriguez", avatar: "/thoughtful-man.png", status: "away", mutualFriends: 6 },
  { id: 5, name: "Jessica Kim", avatar: "/diverse-woman-portrait.png", status: "online", mutualFriends: 20 },
]

const friendRequests = [
  { id: 1, name: "David Wilson", avatar: "/thoughtful-man.png", mutualFriends: 5, requestTime: "2 hours ago" },
  { id: 2, name: "Lisa Thompson", avatar: "/diverse-woman-portrait.png", mutualFriends: 3, requestTime: "1 day ago" },
  { id: 3, name: "James Brown", avatar: "/thoughtful-man.png", mutualFriends: 8, requestTime: "3 days ago" },
]

const suggestions = [
  {
    id: 1,
    name: "Rachel Green",
    avatar: "/diverse-woman-portrait.png",
    mutualFriends: 12,
    reason: "Works at TechCorp",
  },
  { id: 2, name: "Tom Anderson", avatar: "/thoughtful-man.png", mutualFriends: 7, reason: "Mutual friends" },
  { id: 3, name: "Maria Garcia", avatar: "/diverse-woman-portrait.png", mutualFriends: 9, reason: "Same university" },
  { id: 4, name: "Chris Lee", avatar: "/thoughtful-man.png", mutualFriends: 4, reason: "Lives nearby" },
]

const groups = [
  { id: 1, name: "Gaming Buddies", avatar: "/group-avatar1.png", members: 24 },
  { id: 2, name: "Book Club", avatar: "/group-avatar2.png", members: 15 },
  { id: 3, name: "Hiking Enthusiasts", avatar: "/group-avatar3.png", members: 30 },
]

export function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("friends")

  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-accent"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-muted-foreground"
      default:
        return "bg-muted-foreground"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Friends</h1>
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Friends
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="friends" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Friends
                <Badge variant="secondary" className="ml-1">
                  {friends.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Requests
                <Badge variant="destructive" className="ml-1">
                  {friendRequests.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <Globe className="h-4 w-4" />
                Groups
                {/* <Badge variant="secondary" className="ml-1">
                  {friends.filter((f) => f.status === "online").length}
                </Badge> */}
              </TabsTrigger>
            </TabsList>

            {/* Friends List */}
            <TabsContent value="friends" className="h-full">
              <ScrollArea className="h-full">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{friend.name}</p>
                            <p className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm">
                            Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Friend Requests */}
            <TabsContent value="requests" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={request.avatar} />
                              <AvatarFallback>
                                {request.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{request.name}</p>
                              <p className="text-sm text-muted-foreground">{request.mutualFriends} mutual friends</p>
                              <p className="text-xs text-muted-foreground">{request.requestTime}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Check className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Friend Suggestions */}
            <TabsContent value="suggestions" className="h-full">
              <ScrollArea className="h-full">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {suggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Avatar className="h-16 w-16 mx-auto mb-3">
                            <AvatarImage src={suggestion.avatar} />
                            <AvatarFallback>
                              {suggestion.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-foreground mb-1">{suggestion.name}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {suggestion.mutualFriends} mutual friends
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">{suggestion.reason}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="flex-1">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Friend
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Friends groups */}
            <TabsContent value="groups" className="h-full">
              <ScrollArea className="h-full">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {groups.map((group) => (
                    <Card key={group.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Avatar className="h-16 w-16 mx-auto mb-3">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>
                              {group.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-foreground mb-1">{group.name}</p>
                          <p className="text-sm text-muted-foreground mb-4">{group.members} members</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              View Group
                            </Button>
                            <Button variant="outline" size="sm">
                              Leave
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
