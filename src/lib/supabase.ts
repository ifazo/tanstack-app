import { createClient } from "@supabase/supabase-js";
import { Product } from "../types";
import toast from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const createProduct = async (data: Product) => {
  const { error } = await supabase.from("products").insert(data);
  if (error) {
      toast.error("Error inserting product");
      console.log(error)
  }
};

export const updateProduct = async (id: number, data: Product) => {
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) {
      toast.error("Error updating product");
      console.log(error);
  }
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
      toast.error("Error deleting product");
      console.log(error);
  }
};

export default supabase;
