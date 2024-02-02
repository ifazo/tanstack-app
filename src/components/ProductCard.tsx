import { Link } from "@tanstack/react-router";
import { Product } from "../types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { addToWishlist } from "../store";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div>
            <div className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Link to="/products/$productId" params={{ productId: product.id.toString() }} preload="intent" key={product.id}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-48 w-96 object-cover object-center group-hover:opacity-75"
                        />
                    </Link>
                </div>
                <div className="flex justify-between">
                    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                    <h3 className="mt-4 text-sm text-gray-700">{product.brand}</h3>
                </div>
                <div className="flex justify-between">
                    <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                    <button
                        type="button"
                        onClick={() => {
                            addToWishlist(product)
                            toast.success("Added to wishlist")
                        }}
                        className="flex items-center rounded-md bg-slate-900 p-1 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        <HeartIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}
