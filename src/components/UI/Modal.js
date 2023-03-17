import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const OutLayer = (props) => {
  return <div onClick={props.onClick} className={classes.outlayer}></div>;
};

const PopupBox = (props) => {
  return (
    <div className={`${classes["popup-box"]} ${props.className}`}>
      {props.children}
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
        <PopupBox className={props.className}>{props.children}</PopupBox>,
        document.getElementById("popup-root")
      )}
    </Fragment>
  );
};

export default Modal;
