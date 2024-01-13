import { RouterProvider } from '@tanstack/react-router'
import './App.css'
import router from './routes/rootRoute'

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}