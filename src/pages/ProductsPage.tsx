import { Link } from "@tanstack/react-router"
import { useProducts } from "../services/queries"
import { Product } from "../types"

export default function ProductsPage() {
    const responce = useProducts()
    const { data, isLoading, isError, error } = responce
    if (!data) {
        return <div>No products found!!!</div>
    }
    else if (isLoading) {
        return <div>Loading...</div>
    }
    else if (isError) {
        return <div>Error: {error.message}</div>
    }
    const { products } = data.data
    // console.log(data.data.products)
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {
                        (Array.isArray(products)) && products.map((product: Product) => {
                            return (
                                <Link to="/products/$postId" params={{ postId: product.id.toString() }} preload="intent">
                                    <div className="group">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
