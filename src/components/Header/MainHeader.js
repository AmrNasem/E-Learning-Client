import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import HeaderContext from "../../store/header-context";
import Cart from "../Cart/Cart";
import Categories from "../categories/Categories";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../store/auth-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useEffect } from "react";

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartRef = useRef();
  const isCartOpened = useSelector((state) => state.cart.isOpened);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const authedUser = useSelector((state) => state.auth.user);
  const { isLoading, sendRequest: becomeInstructor } = useHttp();

  useEffect(() => {
    cartRef.current.classList.add(classes.refresh);
    const timeout = setTimeout(() => {
      cartRef.current.classList.remove(classes.refresh);
    }, 500);
    return () => clearTimeout(timeout);
  }, [totalAmount]);

  const headerCtx = useContext(HeaderContext);

  const instructorUIHandler = () => {
    if (authedUser.role !== "instructor") {
      becomeInstructor(
        { endPoint: "users/becomeInstructor", method: "PUT" },
        (payload) => {
          const user = localStorage.getItem("user");
          if (user)
            localStorage.setItem(
              "user",
              JSON.stringify({ user: payload.user, loginDate: user.loginDate })
            );
          dispatch(authActions.setUser(payload.user));
          navigate("/instructor");
        }
      );
    } else navigate("/instructor");
  };

  const toggleCategoriesHandler = (e) => {
    headerCtx.setVisibleCategories((prevState) => !prevState);
    e.stopPropagation();
  };
  return (
    <header className={classes["main-header"]}>
      <div className={classes.logo}>
        <Link to="/" className={classes.logolink}>
          E-Learning
        </Link>
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
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input type="search" placeholder="Search for anything" />
      </form>
      {authedUser && (
        <button
          onClick={instructorUIHandler}
          className={`btn border-0 ${classes.instructor}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner side={30} />
          ) : authedUser.role === "instructor" ? (
            "Instructor"
          ) : (
            "Become a teacher"
          )}
        </button>
      )}
      <div
        onClick={() => dispatch(cartActions.toggleCart())}
        className={classes.cart}
        ref={cartRef}
      >
        <FontAwesomeIcon className="me-2" icon={faCartShopping} />
        <span className={classes.amount}>{totalAmount}</span>
      </div>
      {isCartOpened && <Cart />}
      {authedUser ? (
        <button
          className={`overflow-hidden border-0 text-white fw-bold rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
        >
          {authedUser.avatarUrl ? (
            <img className="w-100" src={authedUser.avatarUrl} alt="" />
          ) : (
            authedUser.fullname.split(" ")[0][0]
          )}
        </button>
      ) : (
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
      )}
    </header>
  );
};

export default MainHeader;
