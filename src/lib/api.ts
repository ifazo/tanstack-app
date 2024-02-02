import axios from "axios";

const baseUrl = "https://dummyjson.com";

const api = axios.create({
  baseURL: baseUrl,
});

export const getProducts = () => api.get("/products");

export const getProductsByPage = (limit: number, skip: number) =>
  api.get(`/products?limit=${limit}&skip=${skip}`);

export const getProductsByCategory = (category: string) =>
  api.get(`/products/category/${category}`);

export const getProduct = (id: number) => api.get(`/products/${id}`);

export const getCategories = () => api.get("/products/categories");

export const getCategory = (id: number) => api.get(`/categories/${id}`);

export default api;
