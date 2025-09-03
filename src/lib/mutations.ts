import { useMutation } from "@tanstack/react-query";
import {
  signUp,
  signInWithEmail,
  signInWithGoogle,
  signInWithGithub,
  signOut,
} from "./firebase";
import { createPost, createUser, deleteComment, deletePost, editComment, loginUser, addComment, updatePost, sendMessage } from "./api";
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

export function useAddComment() {
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: Comment }) =>
      addComment(postId, data).then(res => res.data),
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
      postId,
      commentId,
      data,
    }: {
      postId: string;
      commentId: string;
      data: Partial<Comment>;
    }) => editComment(postId, commentId, data).then(res => res.data),
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
    mutationFn: ({ postId, commentId }: { postId: string; commentId: string }) =>
      deleteComment(postId, commentId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("❌ Delete comment failed:", error);
    },
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: any }) =>
      sendMessage(chatId, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.error("❌ Send message failed:", error);
    },
  });
}