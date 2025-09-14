"use client"

import { useState, useEffect } from "react"
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

export function TagPopup({ isOpen, onClose, onSelect, selectedTags }: TagPopupProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selected, setSelected] = useState<string[]>(selectedTags || [])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSelected(selectedTags || [])
  }, [selectedTags])

  useEffect(() => {
    let mounted = true
    const fetchTags = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/tags", { cache: "no-store" })
        if (!res.ok) {
          setTags([])
          return
        }
        const data = await res.json()
        if (mounted) setTags(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching tags:", err)
        if (mounted) setTags([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchTags()
    return () => { mounted = false }
  }, [])

  const allTags = tags
  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleSelection = (tag: string) => {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const createCustomTag = async () => {
    const trimmedTag = searchTerm.trim().toLowerCase()
    if (!trimmedTag || allTags.includes(trimmedTag)) return

    try {
      setLoading(true)
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: trimmedTag }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Unknown error" }))
        throw new Error(err?.message || `Failed to create tag (${res.status})`)
      }

      const tagsRes = await fetch("/api/tags", { cache: "no-store" })
      const updated = (await tagsRes.json()) || []
      setTags(Array.isArray(updated) ? updated : [])
      setSelected((prev) => (prev.includes(trimmedTag) ? prev : [...prev, trimmedTag]))
      setSearchTerm("")
    } catch (err: any) {
      console.error("Create tag failed:", err)
    } finally {
      setLoading(false)
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
              disabled={loading}
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
            {loading && <div className="text-xs text-muted-foreground mt-2">Loading…</div>}
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