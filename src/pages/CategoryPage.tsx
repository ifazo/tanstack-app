import { Link, useParams } from "@tanstack/react-router"
import { useProductByCategory } from "../lib/queries"
import { Product } from "../types"

export default function CategoryPage() {
    const { category } = useParams({ strict: false })
    const { data, error } = useProductByCategory(category)
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>Loading...</div>
    const products = data.data.products
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900">Collection of {category.toUpperCase()}</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {
                            products.map((product: Product) => (
                                <div key={product.title} className="group relative py-4">
                                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        <Link
                                            to="/products/$productId"
                                            params={{ productId: product.id.toString() }}
                                        >
                                            <span className="absolute inset-0" />
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">
                                        {product.description}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
