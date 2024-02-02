import { Store } from "@tanstack/react-store";
import { Product, State } from "../types";

const store = new Store<State>({
  wishlist: [],
  cart: [],
  user: {
    email: "",
  },
});

export const profile = (email: string) => {
  store.setState((state) => ({
    ...state,
    user: {
      email,
    },
  }));
};

export const addToWishlist = (product: Product) => {
  store.setState((state) => ({
    ...state,
    wishlist: [...state.wishlist, product],
  }));
};

export const removeFromWishlist = (product: Product) => {
  store.setState((state) => ({
    ...state,
    wishlist: state.wishlist.filter((p) => p !== product),
  }));
};

export const addToCart = (product: Product) => {
  store.setState((state) => {
    const existingProductIndex = state.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase quantity
      const updatedCart = [...state.cart];
      if (updatedCart[existingProductIndex].quantity) {
        updatedCart[existingProductIndex].quantity! += 1;
      }
      return {
        ...state,
        cart: updatedCart,
      };
    } else {
      // Product doesn't exist in the cart, add it
      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }
  });
};

export const removeFromCart = (product: Product) => {
  store.setState((state) => ({
    ...state,
    cart: state.cart.filter((p) => p !== product),
  }));
};

export const clearCart = () => {
  store.setState((state) => ({
    ...state,
    cart: [],
  }));
};

export default store;
