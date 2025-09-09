"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Check } from "lucide-react"

interface TagPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (tags: string[]) => void
  selectedTags: string[]
}

const popularTags = [
  "photography",
  "travel",
  "food",
  "fitness",
  "technology",
  "art",
  "music",
  "nature",
  "lifestyle",
  "fashion",
  "business",
  "motivation",
  "health",
  "education",
  "sports",
]

export function TagPopup({ isOpen, onClose, onSelect, selectedTags }: TagPopupProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selected, setSelected] = useState<string[]>(selectedTags)
  const [customTags, setCustomTags] = useState<string[]>([])

  const allTags = [...popularTags, ...customTags]
  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleSelection = (tag: string) => {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const createCustomTag = () => {
    const trimmedTag = searchTerm.trim().toLowerCase()
    if (trimmedTag && !allTags.includes(trimmedTag)) {
      setCustomTags((prev) => [...prev, trimmedTag])
      setSelected((prev) => [...prev, trimmedTag])
      setSearchTerm("")
    }
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
  }

  const showCreateButton = searchTerm.trim() && !allTags.includes(searchTerm.trim().toLowerCase())

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search or create tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && showCreateButton) {
                  e.preventDefault()
                  createCustomTag()
                }
              }}
            />
          </div>

          {showCreateButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={createCustomTag}
              className="w-full justify-start bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create "{searchTerm.trim()}"
            </Button>
          )}

          <div className="max-h-60 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selected.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 hover:text-primary flex items-center gap-1"
                  onClick={() => toggleSelection(tag)}
                >
                  #{tag}
                  {selected.includes(tag) && <Check className="w-3 h-3" />}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Add Tags ({selected.length})</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
