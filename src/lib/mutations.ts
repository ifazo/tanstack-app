import { useMutation } from "@tanstack/react-query";
import {
  signUp,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  signOut,
} from "./firebase";
import { createPost, createUser, deleteComment, deletePost, editComment, loginUser, addPostComment, updatePost, sendMessage, sendFriendRequest, acceptFriendRequest, declineFriendRequest, addReaction, removeReaction, createStory, deleteStory, cancelFriendRequest, addSave, removeSave, createPersonalChat, createGroupChat, updateUser, deleteUser } from "./api";
import { queryClient } from "@/routes/__root";
import { saveToken, saveUser, clearAllStoredData } from "@/store";
import { Comment, Post } from "@/types";

export function useSignUp() {
  return useMutation({
    mutationFn: async ({
      name,
      image,
      email,
      password,
    }: {
      name: string;
      image: string;
      email: string;
      password: string;
    }) => {
      // Step 1: Firebase signup
      const fbUser = await signUp({ email, password });

      // Step 2: API create user
      const apiUser = await createUser({ email, password, name, image });
      return { fbUser, apiUser };
    },
    onSuccess: (data) => {
      if (data.apiUser?.data?.token) {
        saveToken(data.apiUser.data.token);
      }
      if (data.apiUser?.data?.user) {
        saveUser(data.apiUser.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Signup failed:", error);
    },
  });
}

export function useSignInWithEmail() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      // Step 1: Firebase login
      const fbUser = await signInWithEmail({ email, password });

      // Step 2: API login
      const apiUser = await loginUser({ email, password });
      return { fbUser, apiUser };
    },
    onSuccess: (data) => {
      if (data.apiUser?.data?.token) {
        saveToken(data.apiUser.data.token);
      }
      if (data.apiUser?.data?.user) {
        saveUser(data.apiUser.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Login failed:", error);
    },
  });
}

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: async () => {
      const fbUser = await signInWithGoogle();
      if (!fbUser.user.email) throw new Error("Google login failed: No user");
      const name = fbUser.user?.displayName || "";
      const image = fbUser.user?.photoURL || "";
      const email = fbUser.user?.email;
      const password = "social";

      const apiUser = await loginUser({ email, password, name, image });
      return { fbUser, apiUser };
    },
    onSuccess: (data) => {
      if (data.apiUser?.data?.token) {
        saveToken(data.apiUser.data.token);
      }
      if (data.apiUser?.data?.user) {
        saveUser(data.apiUser.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Google login failed:", error);
    },
  });
}

export function useSignInWithGithub() {
  return useMutation({
    mutationFn: async () => {
      const fbUser = await signInWithGithub();
      if (!fbUser.user.email) throw new Error("Github login failed: No user");
      const name = fbUser.user?.displayName || "";
      const image = fbUser.user?.photoURL || "";
      const email = fbUser.user?.email;
      const password = "social";

      const apiUser = await loginUser({ email, password, name, image });
      return { fbUser, apiUser };
    },
    onSuccess: (data) => {
      if (data.apiUser?.data?.token) {
        saveToken(data.apiUser.data.token);
      }
      if (data.apiUser?.data?.user) {
        saveUser(data.apiUser.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Github login failed:", error);
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      clearAllStoredData();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Sign out failed:", error);
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (data: any) => updateUser(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Update user failed:", error);
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: () => deleteUser().then(res => res.data),
    onSuccess: () => {
      clearAllStoredData();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("❌ Delete user failed:", error);
    },
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: Post) => createPost(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Create post failed:", error);
    },
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      updatePost(id, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Update post failed:", error);
    },
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: (id: string) => deletePost(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Delete post failed:", error);
    },
  });
}

export function useAddReaction() {
  return useMutation({
    mutationFn: ({ postId, react }: { postId: string; react: string }) =>
      addReaction(postId, react).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", "reactions"] });
    },
    onError: (error) => {
      console.error("❌ Add reaction failed:", error);
    },
  });
}

export function useRemoveReaction() {
  return useMutation({
    mutationFn: (postId: string) => removeReaction(postId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", "reactions"] });
    },
    onError: (error) => {
      console.error("❌ Remove reaction failed:", error);
    },
  });
}

export function useAddPostComment() {
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: any }) =>
      addPostComment(postId, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Create comment failed:", error);
    },
  });
}

export function useEditComment() {
  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      postId: string;
      commentId: string;
      data: Partial<Comment>;
    }) => editComment(commentId, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Update comment failed:", error);
    },
  });
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: ({ commentId }: { commentId: string }) =>
      deleteComment(commentId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Delete comment failed:", error);
    },
  });
}

export function useAddSave() {
  return useMutation({
    mutationFn: (postId: string) => addSave(postId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "saves"] });
    },
    onError: (error) => {
      console.error("❌ Add save failed:", error);
    },
  });
}

export function useRemoveSave() {
  return useMutation({
    mutationFn: (postId: string) => removeSave(postId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "saves"] });
    },
    onError: (error) => {
      console.error("❌ Remove save failed:", error);
    },
  });
}

export function useCreateStory() {
  return useMutation({
    mutationFn: (data: any) => createStory(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories", "user"] });
    },
    onError: (error) => {
      console.error("❌ Create story failed:", error);
    },
  });
}

export function useDeleteStory() {
  return useMutation({
    mutationFn: (storyId: string) => deleteStory(storyId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories", "user"] });
    },
    onError: (error) => {
      console.error("❌ Delete story failed:", error);
    },
  });
}

export function useCreatePersonalChat() {
  return useMutation({
    mutationFn: (receiverId: string) => createPersonalChat(receiverId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.error("❌ Create personal chat failed:", error);
    },
  });
}

export function useCreateGroupChat() {
  return useMutation({
    mutationFn: (data: any) => createGroupChat(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.error("❌ Create group chat failed:", error);
    },
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: any }) =>
      sendMessage(chatId, data).then(res => res.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["messages", variables.chatId] })
    },
    onError: (error) => {
      console.error("❌ Send message failed:", error);
    },
  });
}

export function useSendFriendRequest() {
  return useMutation({
    mutationFn: (userId: string) => sendFriendRequest(userId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "suggestions"] });
    },
    onError: (error) => {
      console.error("❌ Send friend request failed:", error);
    },
  });
}

export function useAcceptFriendRequest() {
  return useMutation({
    mutationFn: (requestId: string) => acceptFriendRequest(requestId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
    },
    onError: (error) => {
      console.error("❌ Accept friend request failed:", error);
    },
  });
}

export function useDeclineFriendRequest() {
  return useMutation({
    mutationFn: (requestId: string) => declineFriendRequest(requestId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
    },
    onError: (error) => {
      console.error("❌ Decline friend request failed:", error);
    },
  });
}

export function useCancelFriendRequest() {
  return useMutation({
    mutationFn: (requestId: string) => cancelFriendRequest(requestId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", "requests", "sent"] });
    },
    onError: (error) => {
      console.error("❌ Cancel friend request failed:", error);
    },
  });
}