import { useQuery } from "@tanstack/react-query";
import { getCategories, getProduct, getProducts, getProductsByCategory, getProductsByPage } from "./api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useProductsByPage(limit: number, skip: number) {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => getProductsByPage(limit, skip),
  });
}

export function useProductByCategory(category: string) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
