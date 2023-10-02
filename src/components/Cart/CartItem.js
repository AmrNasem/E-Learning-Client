import classes from "./CartItem.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import { memo } from "react";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest: removeFromCart, isLoading: removeFromCartLoading } =
    useHttp();
  const authedUser = useSelector((state) => state.auth.user);

  const price = props.price;

  const goToTheCourse = () => {
    navigate(`/course/${props.id}`);
    dispatch(cartActions.toggleCart(false));
  };

  const removeTheCourse = (e) => {
    e.stopPropagation();
    if (authedUser) {
      removeFromCart(
        { endPoint: `carts/deleteFromCart/${props.id}`, method: "DELETE" },
        () => {
          dispatch(cartActions.removeFromCart(props.id));
        }
      );
    } else dispatch(cartActions.removeFromCart(props.id));
  };

  return (
    <div className={classes["cart-item"]}>
      <div onClick={goToTheCourse} className={classes.thumbnail}>
        <img src={props.thumbnailUrl} alt="Thumbnail" />
      </div>
      <div className={classes.body}>
        <h3>{props.title}</h3>
        <span>{props.instructor || "No Instructor"}</span>
      </div>
      <div className={classes.footer}>
        <div className={classes.price}>
          <span className={classes["final-price"]}>
            ${price - (price * (props.discount || 10)) / 100}
          </span>
          <span className={classes["initial-price"]}>
            <del>${price || 0}</del>
          </span>
        </div>
        {removeFromCartLoading ? (
          <LoadingSpinner side={40} />
        ) : (
          <Button onClick={removeTheCourse} className={classes.remove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(CartItem);
