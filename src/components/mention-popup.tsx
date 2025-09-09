"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Check } from "lucide-react"

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
}

interface MentionPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (mentions: string[]) => void
  selectedMentions: string[]
}

const mockFriends: Friend[] = [
  { id: "1", name: "Sarah Johnson", username: "sarah_j", avatar: "/woman-profile.png" },
  { id: "2", name: "Mike Chen", username: "mike_chen", avatar: "/man-profile.png" },
  { id: "3", name: "Emma Wilson", username: "emma_w", avatar: "/diverse-user-avatars.png" },
  { id: "4", name: "Alex Rodriguez", username: "alex_rod", avatar: "/man-profile.png" },
  { id: "5", name: "Lisa Park", username: "lisa_park", avatar: "/woman-profile.png" },
  { id: "6", name: "David Kim", username: "david_k", avatar: "/man-profile.png" },
  { id: "7", name: "Rachel Green", username: "rachel_g", avatar: "/woman-profile.png" },
  { id: "8", name: "Tom Anderson", username: "tom_a", avatar: "/man-profile.png" },
]

export function MentionPopup({ isOpen, onClose, onSelect, selectedMentions }: MentionPopupProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selected, setSelected] = useState<string[]>(selectedMentions)

  const filteredFriends = mockFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleSelection = (username: string) => {
    setSelected((prev) => (prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]))
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mention Friends</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
                onClick={() => toggleSelection(friend.username)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">@{friend.username}</p>
                </div>
                {selected.includes(friend.username) && <Check className="w-4 h-4 text-primary" />}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Mention ({selected.length})</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
