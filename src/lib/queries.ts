import { useQuery } from "@tanstack/react-query";
import { getUsers, getUser, getPosts, getPost } from "./api";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then(res => res.data),
  });
}

export function useGetUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts().then(res => res.data),
  });
}

export function useGetPost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id).then(res => res.data),
    enabled: !!id,
  });
}