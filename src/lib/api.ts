import { getToken } from "@/store";
import { Auth, Post } from "@/types";
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

export const getUsers = () => api.get("/users/all");

export const getUser = () => api.get(`/users`);

export const updateUser = (data: any) => api.patch(`/users`, data);

export const deleteUser = () => api.delete(`/users`);

export const createPost = (data: Post) => api.post("/posts", data); 

export const getPosts = () => api.get("/posts");

export const getPostsByUser = () => api.get(`/posts/user`);

export const getPost = (postId: string) => api.get(`/posts/${postId}`);

export const updatePost = (postId: string, data: Partial<Post>) => api.patch(`/posts/${postId}`, data);

export const deletePost = (postId: string) => api.delete(`/posts/${postId}`);

export const addReaction = (postId: string, react: string) => api.post(`/reacts/posts/${postId}?react=${react}`);

export const getPostReactionByUser = (postId: string) => api.get(`/reacts/posts/${postId}`);

export const removeReaction = (postId: string) => api.delete(`/reacts/posts/${postId}`);

export const getUserReactions = () => api.get(`/reacts/posts/user`);

export const getUserComments = () => api.get(`/comments/user`);

export const addPostComment = (postId: string, data: any) => api.post(`/comments/post/${postId}`, data);

export const getPostComments = (postId: string) => api.get(`/comments/post/${postId}`);

export const editComment = (commentId: string, data: any) => api.patch(`/comments/${commentId}`, data);

export const deleteComment = (commentId: string) => api.delete(`/comments/${commentId}`);

export const addSave = (postId: string) => api.post(`/saves/posts/${postId}`);

export const removeSave = (postId: string) => api.delete(`/saves/posts/${postId}`);

export const checkSave = (postId: string) => api.get(`/saves/posts/${postId}`);

export const getUserSaves = () => api.get(`/saves/user`);

export const createStory = (data: any) => api.post(`/stories`, data);

export const getFriendsStories = () => api.get(`/stories/friends`);

export const getUserStories = () => api.get("/stories/user");

export const deleteStory = (storyId: string) => api.delete(`/stories/${storyId}`);

export const userChat = () => api.get(`/chats/user`);

export const createPersonalChat = (receiverId: string) => api.post(`/chats/personal?receiverId=${receiverId}`);

export const createGroupChat = (data: any) => api.post(`/chats/group`, data);

export const sendMessage = (chatId: string, data: any) => api.post(`/chats/${chatId}/messages`, data);

export const chatMessages = (chatId: string) => api.get(`/chats/${chatId}/messages`);

export const getFriends = () => api.get(`/friends`);

export const getFriendRequests = () => api.get(`/friends/requests`);

export const getSentFriendRequests = () => api.get(`/friends/requests/sent`);

export const getFriendSuggestions = () => api.get(`/friends/suggestions`);

export const sendFriendRequest = (userId: string) => api.post(`/friends/requests?toUserId=${userId}`);

export const acceptFriendRequest = (requestId: string) => api.post(`/friends/requests/${requestId}/accept`);

export const declineFriendRequest = (requestId: string) => api.post(`/friends/requests/${requestId}/decline`);

export const cancelFriendRequest = (requestId: string) => api.delete(`/friends/requests/${requestId}`);

export default api;