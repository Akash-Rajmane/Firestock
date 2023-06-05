import { useContext, useEffect } from "react";
import { Context } from "./context/FirestoreContext";
import List from "./components/List";

import "./App.css";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { state, read } = useContext(Context);
  const { authenticate } = useAuthContext();

  // const count = useMemo(() => {
  //   return `you have ${state.items.length} image${
  //     state.items.length > 1 ? "s" : ""
  //   }`;
  // }, [state.items]);

  const count = `you have ${state.items.length} image${
    state.items.length > 1 ? "s" : ""
  }`;

  useEffect(() => {
    read();
    authenticate();
  }, []);

  return (
    <>
      <h1 className="text-center">Gallery</h1>
      {count}
      <List items={state.items} />
    </>
  );
}

export default App;
