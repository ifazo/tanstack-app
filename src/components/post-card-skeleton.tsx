import { Card, CardContent } from '@/components/ui/card'

export function PostCardSkeleton() {
  return (
    <Card className="bg-card border-border animate-pulse">
      <CardContent className="p-0">
        {/* Header skeleton */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full" />
            <div>
              <div className="h-4 bg-muted rounded w-24 mb-1" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          </div>
          <div className="w-8 h-8 bg-muted rounded" />
        </div>

        {/* Content skeleton */}
        <div className="px-4 pb-3">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full h-96 bg-muted" />

        {/* Actions skeleton */}
        <div className="flex items-center justify-around pt-2 px-3 border-t border-border">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1 flex justify-center py-2">
              <div className="h-8 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
