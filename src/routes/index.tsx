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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Home
                  </h1>
                  <p className="text-muted-foreground">
                    Stay connected with your friends and community
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleChangeImages} className="gap-2 bg-transparent">
                  <ImageIcon className="w-4 h-4" />
                  Change Images
                </Button>
              </div> */}
            </div>

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
