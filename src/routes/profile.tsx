import { ProfilePage } from '@/components/profile-page'
import { getUser } from '@/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = getUser()
  const navigate = useNavigate()
  
  if (!user) {
    navigate({ to: '/login' })
    return null
  }
  return (
    <div>
      <ProfilePage />
    </div>
  )
}
