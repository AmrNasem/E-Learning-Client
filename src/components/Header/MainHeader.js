import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import HeaderContext from "../../store/header-context";
import Cart from "../Cart/Cart";
import Categories from "../categories/Categories";
import classes from "./Header.module.css";
import SearchIcon from "../Icons/SearchIcon";
import CartIcon from "../Icons/CartIcon";
import Button from "../UI/Button";

const MainHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const headerCtx = useContext(HeaderContext);

  const toggleCategoriesHandler = (e) => {
    headerCtx.setVisibleCategories((prevState) => !prevState);
    e.stopPropagation();
  };
  return (
    <header className={classes["main-header"]}>
      <div className={classes.logo}>
        <Link to="/" className={classes.logolink}>E-Learning</Link>
      </div>
      <button
        onClick={toggleCategoriesHandler}
        className={`${classes.categories} ${
          headerCtx.visibleCategories && classes.active
        }`}
      >
        Categories
      </button>
      <Categories
        className={`${classes["main-categories"]} ${
          headerCtx.visibleCategories && classes["show-categories"]
        }`}
      />
      <form className={classes.search}>
        <button className={classes["search-icon"]}>
          <SearchIcon />
        </button>
        <input type="search" placeholder="Search for anything" />
      </form>
      <div
        onClick={() => dispatch(cartActions.toggleCart())}
        className={classes.cart}
      >
        <CartIcon />
        <span className={classes.amount}>{totalAmount}</span>
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
