import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "./api";

export function usePosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts(),
    })
}

export function usePost(id: number) {
    return useQuery({
        queryKey: ["post", id],
        queryFn: () => getPost(id),
    })
}