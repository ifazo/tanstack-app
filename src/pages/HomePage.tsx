import { useStore } from "@tanstack/react-store";
import store from "../store";


export default function HomePage() {

  const Display = ({ animal }: { animal: string }) => {
    const count = useStore(store, (state) => state[animal]);
    return <div>{`${animal}: ${count}`}</div>;
  };

  const updateState = (animal: string) => {
    store.setState((state) => {
      return {
        ...state,
        [animal]: state[animal] + 1,
      };
    });
  };

  const Increment = ({ animal }: {animal: string}) => (
    <button onClick={() => updateState(animal)}>My Friend Likes {animal}</button>
  );

  return (
    <div>
      <h1>How many of your friends like cats or dogs?</h1>
      <p>
        Press one of the buttons to add a counter of how many of your friends
        like cats or dogs
      </p>
      <Increment animal="dogs" />
      <Display animal="dogs" />
      <Increment animal="cats" />
      <Display animal="cats" />
    </div>
  )
}
