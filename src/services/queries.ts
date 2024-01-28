import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "./api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}
