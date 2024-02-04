import { useParams } from "@tanstack/react-router"
import { useGetProduct } from "../lib/queries"
import ProductDetails from "../components/ProductDetails"
import Loader from "../components/Loader"

export default function ProductPage() {
    const { productId } = useParams({ strict: false }) as { productId: string }
    const response = useGetProduct(Number(productId))
    const { data, error } = response
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <Loader />
    const product = data.data
    // console.log(data?.data)
    return (
        <div>
            <ProductDetails product={product} />
        </div>
    )
}
