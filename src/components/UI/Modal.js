import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useSelector } from "react-redux";

export const OutLayer = (props) => {
  useEffect(() => {
    if (props.isOpen) {
      document.body.classList.add(classes["block-scrolling"]);
    } else {
      document.body.classList.remove(classes["block-scrolling"]);
    }
    return () => document.body.classList.remove(classes["block-scrolling"]);
  }, [props.isOpen]);
  return (
    <div onClick={props.onClick} className={classes.outlayer}>
      {props.children}
    </div>
  );
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
  const isCartOpen = useSelector((state) => state.cart.isOpened);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <OutLayer onClick={props.onClick} isOpen={isCartOpen} />,
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
