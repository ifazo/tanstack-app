import { Store } from "@tanstack/react-store";
import { Product, State } from "../types";

const store = new Store<State>({
  dogs: 0,
  cats: 0,
  cart: [],
  user: {
    name: "",
    email: "",
  },
});

export const addToCart = (product: Product) => {
  store.setState((state) => ({
    ...state,
    cart: [...state.cart, product],
  }));
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
