import { useQuery } from "@tanstack/react-query";
import { getCategories, getProduct, getProducts, getProductsByCategory, getProductsByPage } from "./api";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
}

export function useGetProductsByPage(limit: number, skip: number) {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => getProductsByPage(limit, skip),
  });
}

export function useGetProductByCategory(category: string) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });
}

export function useGetProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}
