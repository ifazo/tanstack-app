type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type Category = {
  id: number;
  name: string;
};

type User = {
  name: string;
  email: string;
};

type State = {
  dogs: number;
  cats: number;
  cart: Product[];
  user: User;
};

export type { Product, Category, State, User };
