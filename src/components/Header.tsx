import { Link, MatchRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import store from "../store";
import Spinner from "./Spinner";


export default function Header() {
  const user = useStore(store, (state) => state.user);
  console.log(user)
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/products" className="[&.active]:font-bold">
        Product
      </Link>
      <Link to="/categories" className="[&.active]:font-bold">
        Category
      </Link>
      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>
      <Link to="/sign-in" className="[&.active]:font-bold">
        Sign In
        <MatchRoute to="/sign-in" pending>
          <Spinner />
        </MatchRoute>
      </Link>
    </div>
  )
}
