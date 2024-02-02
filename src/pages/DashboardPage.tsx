import { Link } from "@tanstack/react-router";

export default function DashboardPage() {

  return (
    <div className="p-2 flex gap-2">
      <Link to="/dashboard/cart" className="[&.active]:font-bold">
        Cart
      </Link>
      <Link to="/dashboard/checkout" className="[&.active]:font-bold">
        Checkout
      </Link>
    </div>
  )
}
