"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Tag, AtSign } from "lucide-react"

export function CreatePost() {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post creation
    console.log("Creating post:", content)
    setContent("")
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

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                <ImageIcon className="w-4 h-4" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                <AtSign className="w-4 h-4" />
                Mension
              </Button>
              <Button variant="ghost" size="sm" type="button" className="text-muted-foreground hover:text-primary">
                <Tag className="w-4 h-4" />
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
      </CardContent>
    </Card>
  )
}
