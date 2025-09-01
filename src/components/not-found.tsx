import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600 mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}