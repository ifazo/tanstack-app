import { FriendsPage } from '@/components/friends-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/friends')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><FriendsPage /></div>
}
