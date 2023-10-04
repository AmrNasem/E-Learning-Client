import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Header.module.css";
import styles from "./Aside.module.css";
import { OutLayer } from "../UI/Modal";
import Categories from "./Categories";
import { faAngleRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Learning from "./Learning";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import { categoriesActions } from "../../store/categories-slice";

const Aside = (props) => {
  const authedUser = useSelector((state) => state.auth.user);
  const areCategoriesOpen = useSelector((state) => state.categories.isOpen);
  const [isLearningOpen, setLearningIsOpen] = useState(false);
  const [isUserInfoOpen, setUserInfoIsOpen] = useState(false);
  const { isLoading, sendRequest: becomeInstructor } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = useCallback(() => {
    dispatch(categoriesActions.toggleCategories(false));
    navigate("/login");
  }, [navigate, dispatch]);

  const signupHandler = useCallback(() => {
    dispatch(categoriesActions.toggleCategories(false));
    navigate("/signup");
  }, [navigate, dispatch]);

  const instructorUIHandler = (e) => {
    if (authedUser.role !== "instructor") {
      becomeInstructor(
        { endPoint: "users/becomeInstructor", method: "PUT" },
        (payload) => {
          dispatch(authActions.setUser(payload.user));
          navigate("/instructor");
        }
      );
    } else navigate("/instructor");
  };

  const toggleUserInfoHandler = useCallback(() => setUserInfoIsOpen(true), []);

  return (
    <OutLayer onClick={props.toggleAsideHandler}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`overflow-hidden ${areCategoriesOpen && styles.show}`}
      >
        <div
          className={`${styles.holder} position-relative end-0 ${
            (isLearningOpen || isUserInfoOpen) && "end-100"
          } d-flex`}
        >
          <div className={`w-100`}>
            {authedUser ? (
              <Avatar onClick={toggleUserInfoHandler} mobile />
            ) : (
              <div className={classes.actions}>
                <Button onClick={loginHandler} className={classes.login}>
                  Log in
                </Button>
                <Button onClick={signupHandler} className={classes.signup}>
                  Sign up
                </Button>
              </div>
            )}
            {authedUser && (
              <button
                onClick={instructorUIHandler}
                className={`btn my-3 border-0 py-2 text-dark rounded-0 ${
                  styles.instructor
                } ${isLoading && "w-100"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner side={30} />
                ) : authedUser.role === "instructor" ? (
                  "Switch to teacher view"
                ) : (
                  "Become a teacher"
                )}
              </button>
            )}
            <hr className="my-1" />
            {authedUser && (
              <>
                <div className="p-2">
                  <h6 className="text-secondary">Learn</h6>
                  <button
                    onClick={() => setLearningIsOpen(true)}
                    className={`d-flex gap-3 align-items-center justify-content-between w-100 border-0 bg-transparent p-2 ps-0 ${classes["header-button"]}`}
                  >
                    <span>My learning</span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
                <hr className="my-1" />
              </>
            )}
            <div>
              <h6 className="text-secondary mx-2 my-3">Categories</h6>
              <Categories propagate className={styles["mobile-categories"]} />
            </div>
          </div>
          <div className={`w-100`}>
            <button
              onClick={() => {
                if (isLearningOpen) setLearningIsOpen(false);
                else if (isUserInfoOpen) setUserInfoIsOpen(false);
              }}
              className="border-0 px-3 mb-2 py-3 w-100 text-start text-secondary"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="ms-2 d-inline-block">Menu</span>
            </button>
            {isLearningOpen && <Learning propagate />}
            {isUserInfoOpen && <UserInfo propagate mobile />}
          </div>
        </div>
      </aside>
    </OutLayer>
  );
};

export default Aside;
