import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Hash } from 'lucide-react'

export function TrendingSection() {
  const trendingTopics = [
    { tag: 'ReactJS', posts: '125K posts', category: 'Technology' },
    { tag: 'WebDevelopment', posts: '89K posts', category: 'Technology' },
    { tag: 'TailwindCSS', posts: '67K posts', category: 'Design' },
    { tag: 'NextJS', posts: '54K posts', category: 'Technology' },
    { tag: 'TypeScript', posts: '43K posts', category: 'Programming' },
    { tag: 'JavaScript', posts: '98K posts', category: 'Programming' },
    { tag: 'CSS', posts: '76K posts', category: 'Design' },
    { tag: 'NodeJS', posts: '65K posts', category: 'Backend' },
    { tag: 'Python', posts: '87K posts', category: 'Programming' },
    { tag: 'AI', posts: '112K posts', category: 'Technology' },
  ]

  return (
    <div className="hidden lg:block h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pb-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium text-sm">#{topic.tag}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.posts}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function MobileTrendingSection() {
  const trendingTopics = [
    { tag: 'ReactJS', posts: '125K posts' },
    { tag: 'WebDevelopment', posts: '89K posts' },
    { tag: 'TailwindCSS', posts: '67K posts' },
    { tag: 'NextJS', posts: '54K posts' },
    { tag: 'TypeScript', posts: '43K posts' },
  ]

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 px-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Trending Topics</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {trendingTopics.map((topic, index) => (
          <Card key={index} className="flex-shrink-0">
            <CardContent className="px-4">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">#{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
