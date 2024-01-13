import { useParams } from "@tanstack/react-router"
import { usePost } from "../services/queries"

export default function ProductPage() {
    const { postId } = useParams({ strict: false })
    const product = usePost(Number(postId))
    const { data, isLoading, isError, error } = product
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>
    console.log(data?.data)
    return (
        <div>
            <p>Product Details of : {data?.data.title}</p>
        </div>
    )
}
