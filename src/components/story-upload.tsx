'use client'

import type React from 'react'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Upload, Camera, Video, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useCreateStory } from '@/lib/mutations'
import { useToast } from '@/hooks/useToast'

interface StoryUploadProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File, type: 'photo' | 'video') => void
  userId: string | null
}

export function StoryUpload({ isOpen, onClose, onUpload, userId }: StoryUploadProps) {
  const createStory = useCreateStory()
  const { showSuccess, showError, showWarning } = useToast()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<'photo' | 'video' | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!userId) {
      showWarning('Not logged in', 'Please log in to create stories.')
      return
    }
    if (!selectedFile || !fileType) return

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('upload_preset', 'tanstack')

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      const uploadData = await uploadRes.json()
      if (!uploadData.secure_url) {
        throw new Error('Cloudinary upload failed')
      }

      await createStory.mutateAsync(
        {
          media: uploadData.secure_url,
          type: fileType,
        },
        {
          onSuccess: () => {
            onUpload(selectedFile, fileType)
            showSuccess('Story created', 'Your story published successfully!')
          },
          onError: (err: any) => {
            console.error('Create story failed:', err)
            showError('Create story failed', err?.message || 'Unknown error')
          },
        },
      )
    } catch (err: any) {
      console.error('Create story error:', err)
      showError('Story create failed', err?.message || 'Create story error')
    } finally {
      handleClose()
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setFileType(file.type.startsWith('video/') ? 'video' : 'photo')
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileType(null)
    onClose()
  }

  const triggerFileInput = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept
      fileInputRef.current.click()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Your Story</DialogTitle>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <Card
              className="p-6 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => triggerFileInput('image/*')}
            >
              <div className="flex flex-col items-center gap-2">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <span className="font-medium">Upload Photo</span>
                <span className="text-sm text-muted-foreground">
                  JPG, PNG up to 10MB
                </span>
              </div>
            </Card>

            <Card
              className="p-6 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => triggerFileInput('video/*')}
            >
              <div className="flex flex-col items-center gap-2">
                <Video className="w-8 h-8 text-muted-foreground" />
                <span className="font-medium">Upload Video</span>
                <span className="text-sm text-muted-foreground">
                  MP4, MOV up to 100MB
                </span>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-[9/16] max-w-[220px] sm:max-w-[280px] mx-auto bg-black rounded-lg overflow-hidden">
              {fileType === 'photo' ? (
                <img
                  src={previewUrl! || '/placeholder.svg'}
                  alt="Story preview"
                  className="w-full h-full object-certain"
                />
              ) : (
                <video
                  src={previewUrl!}
                  className="w-full h-full object-certain"
                  controls
                />
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => {
                  setSelectedFile(null)
                  setPreviewUrl(null)
                  setFileType(null)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handleUpload} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
