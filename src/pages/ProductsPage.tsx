import { useQuery } from "@tanstack/react-query"
import ProductCard from "../components/ProductCard"


export default function ProductsPage() {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: [ 'posts' ],
        queryFn: () =>
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if (isFetching) return 'Updating...'
    
    return (
        <div>
            {
                data?.map((product: any) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}
