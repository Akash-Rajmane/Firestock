import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/FirestoreContext";
//import Card from "./Card";
import { useContext } from "react";

function Single() {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const { state: routerState } = useLocation();
  const item = state.items.find((item) => item.id === routerState.id);
  return (
    <>
      <button className="btn btn-link" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="d-flex justify-content-center mb-5">
        {/* <Card {...item} /> */}
        <img src={item.path} alt={item.title} width={"100%"} height={"100%"} />
      </div>
    </>
  );
}
export default Single;
