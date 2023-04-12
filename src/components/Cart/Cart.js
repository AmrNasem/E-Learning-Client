import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartList from "./CartList";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <Modal
      onClick={() => dispatch(cartActions.toggleCart())}
      className={classes.cart}
    >
      <CartList />
      <div className={classes["total-price"]}>
        <h3>Total Price</h3>
        <span>
          <strong>${totalPrice}</strong>
        </span>
      </div>
      <div className={classes.actions}>
        <Button
          onClick={() => dispatch(cartActions.toggleCart())}
          className={classes.cancel}
        >
          Cancel
        </Button>
        <Button className={classes.checkout}>Checkout</Button>
      </div>
    </Modal>
  );
};

export default Cart;
