import { useSelector } from "react-redux";
import classes from "./CartList.module.css";
import CartItem from "./CartItem";
import jsonFile from "../../assets/dummy.json";
import thumbnail from "../../assets/desktop.jfif";

const CartList = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className={classes["cart-list"]}>
      {cartItems.map((course) => (
        <CartItem
          key={course}
          {...course}
          thumbnail={thumbnail}
          instructor={
            jsonFile.instructors.find((i) => i.id === course.instructor).name
          }
        />
      ))}
    </div>
  );
};

export default CartList;
