import { useContext, useEffect } from "react";
import { Context } from "./context";
import Layout from "./components/Layout";
import Card from "./components/Card";

import "./App.css";

function App() {
  const { state, read } = useContext(Context);

  // const count = useMemo(() => {
  //   return `you have ${state.items.length} image${
  //     state.items.length > 1 ? "s" : ""
  //   }`;
  // }, [state.items]);

  const count = `you have ${state.items.length} image${
    state.items.length > 1 ? "s" : ""
  }`;

  useEffect(() => {
    read().then(console.log);
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Gallery</h1>
      {count}
      <div className="row">
        {state.items.map((item, index) => {
          return <Card {...item} key={index} />;
        })}
      </div>
    </Layout>
  );
}

export default App;
