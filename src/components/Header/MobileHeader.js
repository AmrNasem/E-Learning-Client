import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Cart from "../Cart/Cart";
import classes from "./Header.module.css";
import styles from "./MobileHeader.module.css";
import FormInput from "../UI/FormInput";
import MenuBarIcon from "../Icons/MenuBarIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { categoriesActions } from "../../store/categories-slice";
import Aside from "./Aside";

const MobileHeader = () => {
  const dispatch = useDispatch();
  const cartRef = useRef();
  const { isOpened: isCartOpened, totalAmount } = useSelector(
    (state) => state.cart
  );
  const areCategoriesOpen = useSelector((state) => state.categories.isOpen);
  const [openedSearch, setOpenedSearch] = useState(false);

  useEffect(() => {
    cartRef.current.classList.add(classes.refresh);
    const timeout = setTimeout(() => {
      cartRef.current.classList.remove(classes.refresh);
    }, 500);
    return () => clearTimeout(timeout);
  }, [totalAmount]);

  const toggleAsideHandler = (e) => {
    e.stopPropagation();
    dispatch(
      categoriesActions.toggleCategories(areCategoriesOpen ? false : true)
    );
  };

  const searchBar = (
    <div className={styles["search-content"]}>
      <form className={`${styles["mobile-search"]}`}>
        <button className={classes["search-icon"]}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <FormInput autoFocus type="search" placeholder="Search for anything" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenedSearch(false);
          }}
          className={styles["close-icon"]}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </form>
      <div className={classes.suggestions}></div>
    </div>
  );

  return (
    <header className={styles["mobile-header"]}>
      <MenuBarIcon onClick={toggleAsideHandler} />
      {areCategoriesOpen && <Aside toggleAsideHandler={toggleAsideHandler} />}
      <div className={`${classes.logo} ${styles["mobile-logo"]}`}>
        <Link to="/">E-Learning</Link>
      </div>
      <button
        onClick={() => setOpenedSearch(true)}
        className={classes["search-icon"]}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {openedSearch && searchBar}
      <div
        ref={cartRef}
        onClick={() =>
          dispatch(cartActions.toggleCart(isCartOpened ? false : true))
        }
        className={classes.cart}
      >
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
        <span className={classes.amount}>{totalAmount}</span>
      </div>
      {isCartOpened && <Cart />}
    </header>
  );
};

export default MobileHeader;
