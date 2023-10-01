import ReactDOM from "react-dom";
import classes from "./ReviewsModal.module.css";
import { OutLayer } from "./Modal";
import React from "react";

const ReviewsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OutLayer onClick={props.onClick}>
          <div
            className={`px-4 py-2 rounded-3 bg-white mx-auto my-5 w-fit-content ${classes.dialog}`}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </OutLayer>,
        document.getElementById("outlayer-root")
      )}
    </>
  );
};
export default React.memo(ReviewsModal);
