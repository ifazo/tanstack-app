import { CreatePost } from '@/components/create-post'
import { HomeStories } from '@/components/home-stories'
import { PostFeed } from '@/components/post-feed'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Home</h1>
          <p className="text-muted-foreground">
            Stay connected with your friends and community
          </p>
        </div>
        <HomeStories />
        <CreatePost />
        <PostFeed />
      </div>
    </div>
  )
}
