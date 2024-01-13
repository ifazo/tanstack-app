import { Link } from "@tanstack/react-router"
import { Post } from "../types"


export default function ProductCard({ product }: { product: Post }) {
  console.log(product)
  return (
    <div>
      <Link to="/products/$postId" params={{ postId: product.id.toString() }} preload="intent">
        {product.title}
      </Link>
    </div>
  )
}
