import { Store } from "@tanstack/react-store";

type State = {
  [key: string]: number;
};

const store = new Store<State>({
  dogs: 0,
  cats: 0,
});

export default store;
