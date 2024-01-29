import axios from "axios";
import { Product } from "../types";

const baseUrl = "https://dummyjson.com";

const api = axios.create({
  baseURL: baseUrl,
});

export const getProducts = () => api.get("/products");

export const getProductsByPage = (limit: number, skip: number) =>
  api.get(`/products?limit=${limit}&skip=${skip}`);

export const getProductsByCategory = (category: string) =>
  api.get(`/products?category=${category}`);

export const createProduct = (data: Product) => api.post("/products", data);

export const updateProduct = (id: number, data: Product) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

export const getProduct = (id: number) => api.get(`/products/${id}`);

export const getCategories = () => api.get("/products/categories");

export const getCategory = (id: number) => api.get(`/categories/${id}`);

export default api;
