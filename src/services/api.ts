import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: baseUrl,
});

export const getPosts = () => api.get("/posts");

export const getPost = (id: number) => api.get(`/posts/${id}`);