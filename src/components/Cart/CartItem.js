import classes from "./CartItem.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToTheCourse = () => {
    navigate(`/course/${props.id}`);
    dispatch(cartActions.toggleCart());
  };

  const removeTheCourse = (e) => {
    e.stopPropagation();
    dispatch(cartActions.removeFromCart(props.id));
  };
  return (
    <div className={classes["cart-item"]}>
      <div onClick={goToTheCourse} className={classes.thumbnail}>
        <img src={props.thumbnail} alt="Thumbnail" />
      </div>
      <div className={classes.body}>
        <h3>{props.title}</h3>
        <span>{props.instructor}</span>
      </div>
      <div className={classes.footer}>
        <div className={classes.price}>
          <span className={classes["final-price"]}>
            ${(props.price * props.discount) / 100}
          </span>
          <span className={classes["initial-price"]}>
            <del>${props.price}</del>
          </span>
        </div>
        <Button onClick={removeTheCourse} className={classes.remove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
