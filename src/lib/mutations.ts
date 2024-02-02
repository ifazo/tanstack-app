import { useMutation } from "@tanstack/react-query";
import { createProduct, deleteProduct, updateProduct } from "./supabase";
import { queryClient } from "../main";
import { Product } from "../types";

export function useCreateProduct() {
    return useMutation({
        mutationFn: (product: Product) => createProduct(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export function useUpdateProduct() {
    return useMutation({
        mutationFn: (product: Product) => updateProduct(product.id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export function useDeleteProduct() {
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.error(error);
        }
    });
}