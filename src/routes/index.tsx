import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import store from '@/store'
import { useStore } from '@tanstack/react-store'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const token = useStore(store, (state) => state.token)
  const user = useStore(store, (state) => state.user)

  return (
    <div className="text-center">
      <Button>Click me</Button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Stored Data</h2>
        <p>
          <strong>Token:</strong> {token || 'No token stored'}
        </p>
        <p>
          <strong>User:</strong>{' '}
          {user ? JSON.stringify(user, null, 2) : 'No user stored'}
        </p>
      </div>
    </div>
  )
}
