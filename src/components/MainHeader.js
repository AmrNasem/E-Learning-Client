import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import HeaderContext from "../store/header-context";
import Cart from "./Cart/Cart";
import Categories from "./categories/Categories";
import classes from "./MainHeader.module.css";
import Button from "./UI/Button";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const headerCtx = useContext(HeaderContext);

  const toggleCategoriesHandler = (e) => {
    headerCtx.setVisibleCategories((prevState) => !prevState);
    e.stopPropagation();
  };
  return (
    <header>
      <div className={classes.logo}>
        <Link to="/">E-Learning</Link>
      </div>
      <button
        onClick={toggleCategoriesHandler}
        className={`${classes.categories} ${
          headerCtx.visibleCategories && classes.active
        }`}
      >
        Categories
      </button>
      {headerCtx.visibleCategories && <Categories />}
      <div className={classes.search}>
        <i></i>
        <form>
          <input type="search" placeholder="Search for anything" />
        </form>
      </div>
      <div
        onClick={() => dispatch(cartActions.toggleCart())}
        className={classes.cart}
      >
        <i></i>
        <span>Your Cart</span>
        <span>0</span>
      </div>
      {isCartOpened && <Cart />}
      <div className={classes.actions}>
        <Button onClick={() => navigate("/login")} className={classes.login}>
          Log in
        </Button>
        <Button onClick={() => navigate("/signup")} className={classes.signup}>
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
