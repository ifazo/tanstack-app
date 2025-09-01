import { Post, User } from "@/types";
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

export const getPosts = () => api.get("/posts");

export const getPost = (id: number) => api.get(`/posts/${id}`);

export const createPost = (data: Post) => api.post("/posts", data);

export const updatePost = (id: number, data: Partial<Post>) => api.patch(`/posts/${id}`, data);

export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export const postComment = (postId: number, data: any) => api.post(`/posts/${postId}/comments`, data);

export const editComment = (postId: number, commentId: number, data: any) => api.patch(`/posts/${postId}/comments/${commentId}`, data);

export const deleteComment = (postId: number, commentId: number) => api.delete(`/posts/${postId}/comments/${commentId}`);

export default api;