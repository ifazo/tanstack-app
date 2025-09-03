import { getToken } from "@/store";
import { Auth, Post, User } from "@/types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

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

export const getUser = (userId: string) => api.get(`/users/${userId}`);

export const updateUser = (userId: string, data: Partial<User>) => api.patch(`/users/${userId}`, data);

export const deleteUser = (userId: string) => api.delete(`/users/${userId}`);

export const getPosts = () => api.get("/posts");

export const createPost = (data: Post) => api.post("/posts", data);

export const getPost = (postId: string) => api.get(`/posts/${postId}`);

export const updatePost = (postId: string, data: Partial<Post>) => api.patch(`/posts/${postId}`, data);

export const deletePost = (postId: string) => api.delete(`/posts/${postId}`);

export const getComments = (postId: string) => api.get(`/posts/${postId}/comments`);

export const addComment = (postId: string, data: any) => api.post(`/posts/${postId}/comments`, data);

export const editComment = (postId: string, commentId: string, data: any) => api.patch(`/posts/${postId}/comments/${commentId}`, data);

export const deleteComment = (postId: string, commentId: string) => api.delete(`/posts/${postId}/comments/${commentId}`);

export const userChat = () => api.get(`/chats/user`);

export const chatMessages = (chatId: string) => api.get(`/chats/${chatId}/messages`);

export const sendMessage = (chatId: string, data: any) => api.post(`/chats/${chatId}/messages`, data);

export default api;