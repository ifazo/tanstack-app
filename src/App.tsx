import './App.css'
import { RouterProvider } from '@tanstack/react-router'
import router from './routes/rootRoute'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
