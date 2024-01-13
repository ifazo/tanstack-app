import ProductCard from "../components/ProductCard"
import { usePosts } from "../services/queries"
import { Post } from "../types"


export default function ProductsPage() {
    const products = usePosts()
    const { data, isLoading, isError, error } = products
    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
                    isError ? <div>Error: {error.message}</div> :
                        (Array.isArray(data?.data)) && data?.data?.map((product: Post) => {
                            return <ProductCard key={product.id} product={product} />
                        })
            }
        </div>
    )
}
