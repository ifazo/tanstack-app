import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatListSkeleton() {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-16" />
      </div>
      <ScrollArea className="h-full">
        <div className="p-2 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
