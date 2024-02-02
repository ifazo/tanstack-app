import { useParams } from "@tanstack/react-router"
import { useProduct } from "../lib/queries"
import ProductDetails from "../components/ProductDetails"

export default function ProductPage() {
    const { productId } = useParams({ strict: false })
    const response = useProduct(productId)
    const { data, error } = response
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>Loading...</div>
    const product = data.data
    // console.log(data?.data)
    return (
        <div>
            <ProductDetails product={product} />
        </div>
    )
}
