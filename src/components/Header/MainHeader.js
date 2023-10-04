import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import Cart from "../Cart/Cart";
import Categories from "./Categories";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../store/auth-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { categoriesActions } from "../../store/categories-slice";
import Learning from "./Learning";
import UserInfo from "./UserInfo";

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartRef = useRef();
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const { isOpened: isCartOpened, totalAmount } = useSelector(
    (state) => state.cart
  );
  const areCategoriesOpen = useSelector((state) => state.categories.isOpen);
  const authedUser = useSelector((state) => state.auth.user);
  const { isLoading, sendRequest: becomeInstructor } = useHttp();

  // Cart toggler animation
  useEffect(() => {
    cartRef.current.classList.add(classes.refresh);
    const timeout = setTimeout(() => {
      cartRef.current.classList.remove(classes.refresh);
    }, 500);
    return () => clearTimeout(timeout);
  }, [totalAmount]);

  // Window events
  useEffect(() => {
    const closeState = () => {
      setIsLearningOpen(false);
      setIsUserInfoOpen(false);
    };
    window.addEventListener("click", closeState);
    return () => window.removeEventListener("click", closeState);
  }, []);

  useEffect(() => {
    const closeCategories = () =>
      dispatch(categoriesActions.toggleCategories(false));
    window.addEventListener("click", closeCategories);
    return () => window.removeEventListener("click", closeCategories);
  }, [dispatch]);

  // Handlers
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
    e.stopPropagation();
    dispatch(
      categoriesActions.toggleCategories(areCategoriesOpen ? false : true)
    );
  };

  return (
    <header className={classes["main-header"]}>
      <div className={classes.logo}>
        <Link to="/" className={classes.logolink}>
          E-Learning
        </Link>
      </div>
      <div className="position-relative">
        <button
          onClick={toggleCategoriesHandler}
          className={`btn px-1 border-0 ${classes["header-button"]} ${
            areCategoriesOpen && classes.active
          }`}
        >
          Categories
        </button>
        {areCategoriesOpen && (
          <Categories className={`${classes["main-categories"]}`} />
        )}
      </div>
      <form className={classes.search}>
        <button className={classes["search-icon"]}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input type="search" placeholder="Search for anything" />
      </form>
      {authedUser && (
        <div className="position-relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLearningOpen((prevState) => !prevState);
            }}
            className={`btn px-1 border-0 ${classes["header-button"]} ${
              isLearningOpen && classes.active
            }`}
          >
            My learning
          </button>
          {isLearningOpen && (
            <Learning
              className={`position-absolute end-0 bg-white z-3 overflow-auto ${classes.learnings}`}
            />
          )}
        </div>
      )}
      {authedUser && (
        <button
          onClick={instructorUIHandler}
          className={`btn px-1 border-0 ${classes["header-button"]}`}
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
        onClick={() =>
          dispatch(cartActions.toggleCart(isCartOpened ? false : true))
        }
        className={classes.cart}
        ref={cartRef}
      >
        <FontAwesomeIcon className="me-2" icon={faCartShopping} />
        <span className={classes.amount}>{totalAmount}</span>
      </div>
      {isCartOpened && <Cart />}
      {authedUser ? (
        <div className="position-relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsUserInfoOpen((prevState) => !prevState);
            }}
            className={`overflow-hidden border-0 text-white fw-bold rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
          >
            {authedUser.avatarUrl ? (
              <img className="w-100" src={authedUser.avatarUrl} alt="" />
            ) : (
              authedUser.fullname.split(" ")[0][0]
            )}
          </button>
          {isUserInfoOpen && (
            <UserInfo
              className={`position-absolute end-0 z-3 ${classes["user-info"]}`}
            />
          )}
        </div>
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
