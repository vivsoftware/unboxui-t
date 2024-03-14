import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Overlay = () => {
  const { overlay } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const onHandleClick = () => {
    dispatch({ type: "OVERLAY", payload: false });
    dispatch({ type: "RESETOVERLAY" });
  };
  return (
    <div
      className={`bg-overlay${overlay ? " show" : ""}`}
      onClick={() => onHandleClick()}
    ></div>
  );
};
export default Overlay;
