import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from "lucide-react"
import { OnlineUsersSkeleton } from "./skeletons/online-users-skeleton"

interface OnlineUser {
  _id: number
  name: string
  avatar: string
}

interface OnlineUsersProps {
  users: OnlineUser[]
  isLoading?: boolean
}

export function OnlineUsers({ users, isLoading }: OnlineUsersProps) {
  if (isLoading) {
    return <OnlineUsersSkeleton />
  }

  return (
    <div className="px-4 py-2 border-b border-sidebar-border flex-shrink-0">
      <h2 className="text-sm font-medium text-sidebar-foreground mb-3">Active Now</h2>
      {users.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No active users</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-2">
          {users.map((user) => (
            <div key={user._id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{(user.name && user.name.charAt(0)) || <User2 className="w-4 h-4" />}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-primary border-2 border-sidebar rounded-full" />
              </div>
              <span className="text-xs text-sidebar-foreground truncate w-16 text-center">
                {user.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
