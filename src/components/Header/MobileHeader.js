import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import HeaderContext from "../../store/header-context";
import Cart from "../Cart/Cart";
import Categories from "../categories/Categories";
import classes from "./Header.module.css";
import styles from "./MobileHeader.module.css";
import SearchIcon from "../Icons/SearchIcon";
import CloseIcon from "../Icons/CloseIcon";
import CartIcon from "../Icons/CartIcon";
import FormInput from "../UI/FormInput";
import Button from "../UI/Button";
import MenuBarIcon from "../Icons/MenuBarIcon";

const MobileHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const headerCtx = useContext(HeaderContext);
  const [openedSearch, setOpenedSearch] = useState(false);

  const displaySearchHandler = () => {
    setOpenedSearch(true);
  };

  const searchBar = (
    <div className={styles["search-content"]}>
      <form className={`${styles["mobile-search"]}`}>
        <button className={classes["search-icon"]}>
          <SearchIcon />
        </button>
        <FormInput autoFocus type="search" placeholder="Search for anything" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenedSearch(false);
          }}
          className={styles["close-icon"]}
        >
          <CloseIcon />
        </button>
      </form>
      <div className={classes.suggestions}></div>
    </div>
  );

  return (
    <header className={styles["mobile-header"]}>
      <MenuBarIcon />
      {headerCtx.visibleCategories && <div className={styles.outlayer}></div>}
      <aside className={headerCtx.visibleCategories ? styles.show : ""}>
        <div className={classes.actions}>
          <Button onClick={() => navigate("/login")} className={classes.login}>
            Log in
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className={classes.signup}
          >
            Sign up
          </Button>
        </div>
        <hr />
        <Categories className={styles["mobile-categories"]} />
      </aside>
      <div className={`${classes.logo} ${styles["mobile-logo"]}`}>
        <Link to="/">E-Learning</Link>
      </div>
      <button onClick={displaySearchHandler} className={classes["search-icon"]}>
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
