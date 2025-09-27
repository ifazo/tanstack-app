import { CreatePost } from '@/components/create-post'
import { PostFeed } from '@/components/post-feed'
import { StoriesSection } from '@/components/stories-section'
import {
  MobileTrendingSection,
  TrendingSection,
} from '@/components/trending-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <StoriesSection />
            <CreatePost />
            <div className="lg:hidden mb-6">
              <MobileTrendingSection />
            </div>
            <PostFeed />
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="fixed top-20 bottom-4 w-full max-w-sm">
              <TrendingSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
