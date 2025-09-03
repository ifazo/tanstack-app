import { ProfilePage } from '@/components/profile-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ProfilePage />
    </div>
  )
}
