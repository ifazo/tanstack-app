import { getToken } from "@/store";
import { Auth, Post, User } from "@/types";
import axios from "axios";

const baseUrl = "https://tanstack-server.vercel.app/api";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.includes('/auth')) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (data: Partial<Auth>) =>
  api.post("/auth/login", data);

export const createUser = (data: Auth) =>
  api.post("/auth/signup", data);

export const getUsers = () => api.get("/users");

export const getUser = (userId: number) => api.get(`/users/${userId}`);

export const updateUser = (userId: number, data: Partial<User>) => api.patch(`/users/${userId}`, data);

export const deleteUser = (userId: number) => api.delete(`/users/${userId}`);

export const getPosts = () => api.get("/posts");

export const createPost = (data: Post) => api.post("/posts", data);

export const getPost = (postId: number) => api.get(`/posts/${postId}`);

export const updatePost = (postId: number, data: Partial<Post>) => api.patch(`/posts/${postId}`, data);

export const deletePost = (postId: number) => api.delete(`/posts/${postId}`);

export const getComments = (postId: number) => api.get(`/posts/${postId}/comments`);

export const addComment = (postId: number, data: any) => api.post(`/posts/${postId}/comments`, data);

export const editComment = (postId: number, commentId: number, data: any) => api.patch(`/posts/${postId}/comments/${commentId}`, data);

export const deleteComment = (postId: number, commentId: number) => api.delete(`/posts/${postId}/comments/${commentId}`);

export const userChat = (userId: number) => api.get(`/user/${userId}/chat`);

export const chatMessages = (chatId: number) => api.get(`/chat/${chatId}/messages`);

export default api;