import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useSelector } from "react-redux";
import { forwardRef } from "react";
import { memo } from "react";

export const OutLayer = (props) => {
  useEffect(() => {
    document.body.classList.add(classes["block-scrolling"]);
    return () => document.body.classList.remove(classes["block-scrolling"]);
  }, []);

  return (
    <div
      onClick={props.onClick}
      className={`${classes.outlayer} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

const PopupBox = forwardRef((props, ref) => {
  return (
    <div onClick={props.onClick} ref={ref && ref} className={classes.container}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${classes["popup-box"]} ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
});

const Modal = forwardRef((props, ref) => {
  const isCartOpen = useSelector((state) => state.cart.isOpened);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <OutLayer onClick={props.onClick} isOpen={isCartOpen} />,
        document.getElementById("outlayer-root")
      )}
      {ReactDOM.createPortal(
        <PopupBox
          onClick={props.onClick}
          ref={ref && ref}
          className={props.className}
        >
          {props.children}
        </PopupBox>,
        document.getElementById("popup-root")
      )}
    </Fragment>
  );
});

export default memo(Modal);
