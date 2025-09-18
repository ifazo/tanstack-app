import { Skeleton } from "@/components/ui/skeleton"

export function OnlineUsersSkeleton() {
  return (
    <div className="px-4 py-2 border-b border-sidebar-border flex-shrink-0">
      <Skeleton className="h-4 w-20 mb-3" />
      <div className="flex overflow-x-auto pb-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}
