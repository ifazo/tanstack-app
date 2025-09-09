"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, AtSign, Hash, X } from "lucide-react"
import { MentionPopup } from "./mention-popup"
import { TagPopup } from "./tag-popup"

export function CreatePost() {
  const [content, setContent] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [mentions, setMentions] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [showMentionPopup, setShowMentionPopup] = useState(false)
  const [showTagPopup, setShowTagPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating post:", { content, photos, mentions, tags })
    setContent("")
    setPhotos([])
    setMentions([])
    setTags([])
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos((prev) => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <Card className="mb-6 bg-card border-border">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 min-h-[80px] resize-none border-0 bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {photos.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(mentions.length > 0 || tags.length > 0) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {mentions.map((mention, index) => (
                <span
                  key={`mention-${index}`}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  @{mention}
                  <button
                    type="button"
                    onClick={() => setMentions((prev) => prev.filter((_, i) => i !== index))}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {tags.map((tag, index) => (
                <span
                  key={`tag-${index}`}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setTags((prev) => prev.filter((_, i) => i !== index))}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Photo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowMentionPopup(true)}
              >
                <AtSign className="w-4 h-4 mr-1" />
                Mention
              </Button>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowTagPopup(true)}
              >
                <Hash className="w-4 h-4 mr-1" />
                Tag
              </Button>
            </div>

            <Button
              type="submit"
              disabled={!content.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Post
            </Button>
          </div>
        </form>

        <MentionPopup
          isOpen={showMentionPopup}
          onClose={() => setShowMentionPopup(false)}
          onSelect={setMentions}
          selectedMentions={mentions}
        />

        <TagPopup isOpen={showTagPopup} onClose={() => setShowTagPopup(false)} onSelect={setTags} selectedTags={tags} />
      </CardContent>
    </Card>
  )
}
