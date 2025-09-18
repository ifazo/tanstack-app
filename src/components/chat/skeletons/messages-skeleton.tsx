import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MessagesSkeleton() {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => {
            const isOwn = i % 3 === 0
            return (
              <div key={i} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div className="space-y-2">
                  <Skeleton className={`h-10 ${isOwn ? "w-48" : "w-40"} rounded-2xl`} />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
