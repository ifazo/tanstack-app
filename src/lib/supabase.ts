import { createClient } from "@supabase/supabase-js";
import { Order, Product } from "../types";
import toast from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select();
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
};

export const getProduct = async (id: number) => {
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) {
      toast.error("Error getting product");
      console.log(error);
  }
  return data;
}

export const getProductsByCategory = async (category: string) => {
  const { data, error } = await supabase.from("products").select().eq("category", category);
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
}

export const paginateProducts = async (category: string, page: number, perPage: number) => {
  const { data, error } = await supabase.from("products").select().eq("category", category).range((page - 1) * perPage, page * perPage - 1);
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
}

export const filterProducts = async (category: string, minPrice: number, maxPrice: number) => {
  const { data, error } = await supabase.from("products").select().eq("category", category).gte("price", minPrice).lte("price", maxPrice);
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
}

export const sortProducts = async (category: string, sortBy: string) => {
  const { data, error } = await supabase.from("products").select().eq("category", category).order(sortBy, { ascending: true });
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
}

export const mostPopularProducts = async () => {
  const { data, error } = await supabase.from("products").select().order("rating", { ascending: false });
  if (error) {
      toast.error("Error getting products");
      console.log(error);
  }
  return data;
}

export const createProduct = async (data: Product) => {
  const { error } = await supabase.from("products").insert(data);
  if (error) {
      toast.error("Error inserting product");
      console.log(error)
  }
  else toast.success("Product inserted successfully");
};

export const updateProduct = async (id: number, data: Product) => {
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) {
      toast.error("Error updating product");
      console.log(error);
  }
  else toast.success("Product updated successfully");
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
      toast.error("Error deleting product");
      console.log(error);
  }
  else toast.success("Product deleted successfully");
};

export const getOrders = async () => {
  const { data, error } = await supabase.from("orders").select();
  if (error) {
    toast.error("Error getting orders");
    console.log(error);
  }
  return data;
};

export const createOrder = async (data: Order) => {
  const { error } = await supabase.from("orders").insert(data);
  if (error) {
      toast.error("Error inserting order");
      console.log(error);
  }
  else toast.success("Order inserted successfully");
}

export default supabase;
