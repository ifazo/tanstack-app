import { ProfilePage } from '@/components/profile-page'
import { useToast } from '@/hooks/useToast'
import { getUser } from '@/store'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = getUser()
  const { showWarning } = useToast()
  const navigate = useNavigate()

  if (!user) {
    showWarning('Not logged in', 'Please log in to view profile page.')
    navigate({ to: '/login' })
    return null
  }
  
  return (
    <div>
      <ProfilePage />
    </div>
  )
}
