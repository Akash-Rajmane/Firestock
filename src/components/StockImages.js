import List from "./List";
import { Context } from "../context/FirestoreContext";
import { useAuthContext } from "../context/AuthContext";
import { useMemo, useContext } from "react";

const StockImages = () => {
  const { state } = useContext(Context);
  const { currentUser } = useAuthContext();

  const items = useMemo(() => {
    const filtered = state.items.filter((item) => {
      const useremail = currentUser?.email;
      return item.useremail === useremail;
    });
    return currentUser ? filtered : [];
  }, [state.items, currentUser]);
  return (
    <>
      <h1>My Stock Images</h1>
      <List items={items} />
    </>
  );
};
export default StockImages;
