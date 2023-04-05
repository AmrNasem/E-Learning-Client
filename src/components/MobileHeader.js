import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart-slice";
import HeaderContext from "../store/header-context";
import Cart from "./Cart/Cart";
import Categories from "./categories/Categories";
import classes from "./Header.module.css";
import SearchIcon from "./SearchIcon";
import CloseIcon from "./CloseIcon";
import CartIcon from "./Cart/CartIcon";
import FormInput from "./UI/FormInput";
import Button from "./UI/Button";

const MobileHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const headerCtx = useContext(HeaderContext);
  const [openedSearch, setOpenedSearch] = useState(false);

  const searchBar = (
    <div className={classes["search-content"]}>
      <form className={`${classes["mobile-search"]}`}>
        <button className={classes["search-icon"]}>
          <SearchIcon />
        </button>
        <FormInput type="search" placeholder="Search for anything" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenedSearch(false);
          }}
          className={classes["close-icon"]}
        >
          <CloseIcon />
        </button>
      </form>
      <div className={classes.suggestions}></div>
    </div>
  );

  const aside = (
    <aside className={headerCtx.visibleCategories ? classes.show : ""}>
      <div className={classes.actions}>
        <Button onClick={() => navigate("/login")} className={classes.login}>
          Log in
        </Button>
        <Button onClick={() => navigate("/signup")} className={classes.signup}>
          Sign up
        </Button>
      </div>
      <hr />
      <Categories className={classes["mobile-categories"]} />
    </aside>
  );

  const toggleMenuBarHandler = (e) => {
    e.stopPropagation();
    headerCtx.setVisibleCategories((prevState) => !prevState);
  };
  return (
    <header className={classes["mobile-header"]}>
      <div
        onClick={toggleMenuBarHandler}
        className={`${classes["menu-bar"]} ${
          headerCtx.visibleCategories && classes["mob-active"]
        }`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {headerCtx.visibleCategories && <div className={classes.outlayer}></div>}
      {aside}
      <div className={`${classes.logo} ${classes["mobile-logo"]}`}>
        <Link to="/">E-Learning</Link>
      </div>
      <button
        onClick={() => {
          setOpenedSearch(true);
        }}
        className={classes["search-icon"]}
      >
        <SearchIcon />
      </button>
      {openedSearch && searchBar}
      <div
        onClick={() => dispatch(cartActions.toggleCart())}
        className={classes.cart}
      >
        <CartIcon />
        <span className={classes.amount}>0</span>
      </div>
      {isCartOpened && <Cart />}
    </header>
  );
};

export default MobileHeader;
