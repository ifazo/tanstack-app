'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImageIcon, AtSign, Hash, X } from 'lucide-react'
import { MentionPopup } from './mention-popup'
import { TagPopup } from './tag-popup'
import { useCreatePost } from '@/lib/mutations'
import { useToast } from '@/hooks/useToast'
import { getUser } from '@/store'

export function CreatePost() {
  const user = getUser()
  const { showSuccess, showError, showWarning, showLoading } = useToast()
  const createPost = useCreatePost()

  const [text, setText] = useState('')
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [mentions, setMentions] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [showMentionPopup, setShowMentionPopup] = useState(false)
  const [showTagPopup, setShowTagPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY as string

  const uploadImage = async (file: File) => {
    if (!IMGBB_API_KEY) throw new Error('ImgBB API key not found')
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      },
    )
    const data = await res.json()
    if (!res.ok) throw new Error(data?.error?.message || 'Upload failed')
    return data.data.display_url as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      showWarning('Not logged in', 'Please log in to create a post.')
      return
    }
    showLoading("Posting...", "Your post is being created.")
    try {
      let uploadedUrls: string[] = []
      if (imageFiles.length > 0) {
        uploadedUrls = await Promise.all(
          imageFiles.map((file) =>
            uploadImage(file).catch((err) => {
              console.error('Image upload failed for file', file.name, err)
              throw err
            }),
          ),
        )
      }

      const payload = {
        text,
        images: uploadedUrls,
        mentions,
        tags,
      }
      // console.log('Create post payload:', payload)
      createPost.mutate(payload, {
        onSuccess: () => {
          setText("")
          setImageFiles([])
          setImagePreviews([])
          setMentions([])
          setTags([])
          showSuccess("Post created", "Your post was published")
        },
        onError: (err: any) => {
          console.error("Create post failed:", err)
          showError("Create post failed", err?.message || "Unknown error")
        },
      })
    } catch (err: any) {
      console.error('Upload error:', err)
      showError('Image upload failed', err?.message || 'Upload error')
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const arr = Array.from(files)
    setImageFiles((prev) => [...prev, ...arr])

    // generate previews
    arr.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => [...prev, event.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
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
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 min-h-[80px] resize-none border-0 bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap">
                {imagePreviews.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo || '/placeholder.svg'}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreviews((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                        setImageFiles((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }}
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
                    onClick={() =>
                      setMentions((prev) => prev.filter((_, i) => i !== index))
                    }
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
                    onClick={() =>
                      setTags((prev) => prev.filter((_, i) => i !== index))
                    }
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
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => {
                  if (!user) {
                    showWarning(
                      'Not logged in',
                      'Please log in to upload images.',
                    )
                    return
                  }
                  fileInputRef.current?.click()
                }}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Image
              </Button>
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
                onClick={() => {
                  if (!user) {
                    showWarning(
                      'Not logged in',
                      'Please log in to mention friends.',
                    )
                    return
                  }
                  setShowMentionPopup(true)
                }}
              >
                <AtSign className="w-4 h-4 mr-1" />
                Mention
              </Button>
              <MentionPopup
                isOpen={showMentionPopup}
                onClose={() => setShowMentionPopup(false)}
                onSelect={setMentions}
                selectedMentions={mentions}
              />

              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => {
                  if (!user) {
                    showWarning('Not logged in', 'Please log in to add tags.')
                    return
                  }
                  setShowTagPopup(true)
                }}
              >
                <Hash className="w-4 h-4 mr-1" />
                Tag
              </Button>
              <TagPopup
                isOpen={showTagPopup}
                onClose={() => setShowTagPopup(false)}
                onSelect={setTags}
                selectedTags={tags}
              />
            </div>

            <Button
              type="submit"
              disabled={
                (!text.trim() && imageFiles.length === 0) ||
                createPost.isPending
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {createPost.isPending ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
