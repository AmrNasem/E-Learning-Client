import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useRef } from "react";
import { useCallback } from "react";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartRef = useRef();
  const {
    totalPrice,
    items: cartItems,
    error,
  } = useSelector((state) => state.cart);

  const closeCartHandler = useCallback(() => {
    cartRef.current.classList.add(classes["list-out"]);
    const timeout = setTimeout(() => {
      dispatch(cartActions.toggleCart(false));
    }, 399);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  return (
    <Modal onClick={closeCartHandler} className={classes.cart} ref={cartRef}>
      {!cartItems && !error ? (
        <LoadingSpinner side={50} />
      ) : (
        <div className={classes["cart-list"]}>
          {cartItems.map((course, index) => (
            <CartItem key={index} {...course} />
          ))}
        </div>
      )}

      <div className={classes["total-price"]}>
        <h3>Total Price</h3>
        <span>
          <strong>${totalPrice}</strong>
        </span>
      </div>
      <div className={classes.actions}>
        <Button onClick={closeCartHandler} className={classes.cancel}>
          Cancel
        </Button>
        <Button className={classes.checkout}>Checkout</Button>
      </div>
    </Modal>
  );
};

export default Cart;
