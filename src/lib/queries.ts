import { useQuery } from "@tanstack/react-query";
import { getUsers, getUser } from "./api";

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