import { User } from "@/types";
import axios from "axios";

const baseUrl = "https://tanstack-server.vercel.app/api";

const api = axios.create({
  baseURL: baseUrl,
});

export const loginUser = (data: Partial<User>) =>
  api.post("/auth/login", data);

export const createUser = (data: User) =>
  api.post("/users", data);

export const getUsers = () => api.get("/users");

export const getUser = (id: number) => api.get(`/users/${id}`);

export const updateUser = (id: number, data: Partial<User>) => api.patch(`/users/${id}`, data);

export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export default api;