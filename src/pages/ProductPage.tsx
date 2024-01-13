import { useQuery } from "@tanstack/react-query"

export default function ProductPage() {
    const id = 1
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: [ 'post', id ],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    if (isFetching) return 'Updating...'
    console.log(data)
    return (
        <div>
            <p>Product Details of : id</p>
        </div>
    )
}
