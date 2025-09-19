import { useQuery } from "@tanstack/react-query";
import { getUsers, getUser, getPosts, getPost, getPostComments, userChat, chatMessages, getFriends, getFriendSuggestions, getFriendRequests, getUserReactions, getPostReactionByUser, getFriendsStories, getUserStories, getSentFriendRequests, getPostsByUser, getUserComments, getUserSaves, checkSave } from "./api";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then(res => res.data),
  });
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser().then(res => res.data),
    enabled: !!id,
  });
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts().then(res => res.data),
  });
}

export function useGetPostsByUser(userId: string) {
  return useQuery({
    queryKey: ["posts", "user"],
    queryFn: () => getPostsByUser().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useGetPostReactionByUser(postId: string, userId: string) {
  return useQuery({
    queryKey: ["post", postId, "reaction", userId],
    queryFn: () => getPostReactionByUser(postId).then(res => res.data),
    enabled: !!userId && !!postId,
  });
}

export function useGetUserReactions(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "reactions"],
    queryFn: () => getUserReactions().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetPostComments(postId: string) {
  return useQuery({
    queryKey: ["post", postId, "comments"],
    queryFn: () => getPostComments(postId).then(res => res.data),
    enabled: !!postId,
  });
}

export function useGetUserComments(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "comments"],
    queryFn: () => getUserComments().then(res => res.data),
    enabled: !!userId,
  });
}

export const useCheckSave = (postId: string, userId: string) => {
  return useQuery({
    queryKey: ["post", postId, "save", userId],
    queryFn: () => checkSave(postId).then(res => res.data),
    enabled: !!postId && !!userId,
  });
};

export function useGetUserSaves(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "saves"],
    queryFn: () => getUserSaves().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetFriendsStories(userId: string) {
  return useQuery({
    queryKey: ["stories", "friends", userId],
    queryFn: () => getFriendsStories().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetUserStories(userId: string) {
  return useQuery({
    queryKey: ["stories", "user", userId],
    queryFn: () => getUserStories().then(res => res.data),
    enabled: !!userId,
  });
}

export function useUserChat(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "chats"],
    queryFn: () => userChat().then(res => res.data),
    enabled: !!userId,
  });
}

export function useChatMessages(chatId: string) {
  return useQuery({
    queryKey: ["chat", chatId, "messages"],
    queryFn: () => chatMessages(chatId).then(res => res.data),
    enabled: !!chatId,
  });
}

export function useGetFriends(userId: string) {
  return useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriends().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetFriendRequests(userId: string) {
  return useQuery({
    queryKey: ["friend", "requests", userId],
    queryFn: () => getFriendRequests().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetSentFriendRequests(userId: string) {
  return useQuery({
    queryKey: ["friend", "requests", "sent", userId],
    queryFn: () => getSentFriendRequests().then(res => res.data),
    enabled: !!userId,
  });
}

export function useGetFriendSuggestions(userId: string) {
  return useQuery({
    queryKey: ["friend", "suggestions", userId],
    queryFn: () => getFriendSuggestions().then(res => res.data),
    enabled: !!userId,
  });
}
