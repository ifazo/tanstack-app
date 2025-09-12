import { useQuery } from "@tanstack/react-query";
import { getUsers, getUser, getPosts, getPost, getComments, userChat, chatMessages, getFriends, getFriendSuggestions, getFriendRequests, getUserReactions, getPostReactionByUser } from "./api";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then(res => res.data),
  });
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts().then(res => res.data),
  });
}

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useGetPostReactionByUser(postId: string) {
  return useQuery({
    queryKey: ["post", postId, "reaction"],
    queryFn: () => getPostReactionByUser(postId).then(res => res.data),
    enabled: !!postId,
  });
}

export function useGetUserReactions() {
  return useQuery({
    queryKey: ["user", "reactions"],
    queryFn: () => getUserReactions().then(res => res.data),
  });
}

export function useGetComments(postId: string) {
  return useQuery({
    queryKey: ["post", postId, "comments"],
    queryFn: () => getComments(postId).then(res => res.data),
    enabled: !!postId,
  });
}

export function useUserChat() {
  return useQuery({
    queryKey: ["user", "chats"],
    queryFn: () => userChat().then(res => res.data),
  });
}

export function useChatMessages(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId, "messages"],
    queryFn: () => chatMessages(chatId).then(res => res.data),
    enabled: !!chatId,
  });
}

export function useGetFriends() {
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends().then(res => res.data),
  });
}

export function useGetFriendSuggestions() {
  return useQuery({
    queryKey: ["friend", "suggestions"],
    queryFn: () => getFriendSuggestions().then(res => res.data),
  });
}

export function useGetFriendRequests() {
  return useQuery({
    queryKey: ["friend", "requests"],
    queryFn: () => getFriendRequests().then(res => res.data),
  });
}