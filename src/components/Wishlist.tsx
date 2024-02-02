import { useStore } from "@tanstack/react-store";
import store, { addToCart } from "../store";
import toast from "react-hot-toast";

export default function Wishlist() {
  const products = useStore(store, (state) => state.wishlist);
  if (products.length === 0) {
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
          <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">Your Wishlist</h1>
          <div className="mt-12">
            <p className="text-center text-sm font-medium text-gray-500">
              Your wishlist is empty
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Your wishlist</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">${product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product)
                    toast.success("Added to cart")
                  }}
                  className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
