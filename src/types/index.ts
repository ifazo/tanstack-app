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
  quantity?: number;
  user?: User;
};

type Category = {
  id: number;
  name: string;
};

type User = {
  email: string;
  name?: string;
};

type Order = {
  products: Product[];
  user: User;
};

type State = {
  wishlist: Product[];
  cart: Product[];
  user: User;
};

export type { Product, Category, State, User,Order };
