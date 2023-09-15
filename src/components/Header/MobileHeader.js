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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MobileHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const authedUser = useSelector((state) => state.auth.user);
  const headerCtx = useContext(HeaderContext);
  const [openedSearch, setOpenedSearch] = useState(false);

  const toggleAsideHandler = (e) => {
    e.stopPropagation();
    headerCtx.setVisibleCategories((prevState) => !prevState);
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
      <MenuBarIcon onClick={toggleAsideHandler} />
      {headerCtx.visibleCategories && <div className={styles.outlayer}></div>}
      <aside className={headerCtx.visibleCategories ? styles.show : ""}>
        {authedUser ? (
          <div
            className={`py-3 px-2 w-100 d-flex gap-2 align-items-center ${styles["user-info"]}`}
          >
            <button
              className={`text-white border-0 fw-bold overflow-hidden rounded-circle d-flex align-items-center justify-content-center ${styles.avatar}`}
            >
              {authedUser.avatarUrl ? (
                <img className="w-100" src={authedUser.avatarUrl} alt="" />
              ) : (
                authedUser.fullname.split(" ")[0][0]
              )}
            </button>
            <div className="flex-grow-1">
              <h5 className="mb-0">Hi, {authedUser.fullname.split(" ")[0]}</h5>
              <p className="mb-0">Welcome back!</p>
            </div>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="position-absolute fs-5 me-2 text-dark end-0"
            />
          </div>
        ) : (
          <div className={classes.actions}>
            <Button
              onClick={() => navigate("/login")}
              className={classes.login}
            >
              Log in
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className={classes.signup}
            >
              Sign up
            </Button>
          </div>
        )}
        {authedUser && (
          <button
            onClick={() => navigate("instructor")}
            className={`btn my-3 border-0 py-2 rounded-0 ${styles.instructor}`}
          >
            {authedUser.role === "instructor"
              ? "Switch to teacher view"
              : "Become a teacher"}
          </button>
        )}
        <hr className="my-0" />
        <Categories className={styles["mobile-categories"]} />
      </aside>
      <div className={`${classes.logo} ${styles["mobile-logo"]}`}>
        <Link to="/">E-Learning</Link>
      </div>
      <button
        onClick={() => setOpenedSearch(true)}
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
        <span className={classes.amount}>{totalAmount}</span>
      </div>
      {isCartOpened && <Cart />}
    </header>
  );
};

export default MobileHeader;
