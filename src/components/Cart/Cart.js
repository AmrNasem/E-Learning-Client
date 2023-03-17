import classes from "./Cart.module.css";
import Button from "../UI/Button";
import CartList from "./CartList";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();
  return (
    <Modal
      onClick={() => dispatch(cartActions.toggleCart())}
      className={classes.cart}
    >
      <CartList />
      <div className={classes["total-price"]}>
        <h3>Total Price</h3>
        <span>
          <strong>$0</strong>
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
