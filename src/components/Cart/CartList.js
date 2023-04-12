import { useSelector } from "react-redux";
import classes from "./CartList.module.css";
import CartItem from "./CartItem";
import jsonFile from "../../assets/dummy.json";
import thumbnail from "../../assets/landing-page.jfif";

const CartList = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className={classes["cart-list"]}>
      {Object.keys(cartItems).map((itemKey) => (
        <CartItem
          key={itemKey}
          {...cartItems[itemKey]}
          thumbnail={thumbnail}
          instructor={jsonFile.instructors[cartItems[itemKey].instructor].name}
        />
      ))}
    </div>
  );
};

export default CartList;
