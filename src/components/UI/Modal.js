import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

export const OutLayer = (props) => {
  return <div onClick={props.onClick} className={classes.outlayer}></div>;
};

const PopupBox = (props) => {
  return (
    <div onClick={props.onClick} className={classes.container}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${classes["popup-box"]} ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <OutLayer onClick={props.onClick} />,
        document.getElementById("outlayer-root")
      )}
      {ReactDOM.createPortal(
        <PopupBox onClick={props.onClick} className={props.className}>
          {props.children}
        </PopupBox>,
        document.getElementById("popup-root")
      )}
    </Fragment>
  );
};

export default Modal;
