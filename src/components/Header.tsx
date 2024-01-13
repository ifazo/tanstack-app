import { Link } from "@tanstack/react-router";


export default function Header() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>
      <Link to="/sign-in" className="[&.active]:font-bold">
        Sign In
      </Link>
    </div>
  )
}
