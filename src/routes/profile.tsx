import { getToken, getUser } from '@/store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = getUser()
  const token = getToken()
  return (
    <div>
      <h1>Hello "/profile"!</h1>
      <p>User: {JSON.stringify(user)}</p>
      <p>Token: {token}</p>
    </div>
  )
}
