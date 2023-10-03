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
import { useState } from "react";
import Learning from "./Learning";

const Aside = (props) => {
  const authedUser = useSelector((state) => state.auth.user);
  const areCategoriesOpen = useSelector((state) => state.categories.isOpen);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, sendRequest: becomeInstructor } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <OutLayer onClick={props.toggleAsideHandler}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`overflow-hidden ${areCategoriesOpen && styles.show}`}
      >
        <div
          className={`${styles.holder} position-relative end-0 ${
            isOpen && "end-100"
          } d-flex`}
        >
          <div className={`${isOpen ? "w-100" : "w-50"}`}>
            {authedUser ? (
              <div
                className={`py-3 px-2 w-100 d-flex gap-2 position-relative align-items-center ${styles["user-info"]}`}
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
                  <h5 className="mb-0">
                    Hi, {authedUser.fullname.split(" ")[0]}
                  </h5>
                  <p className="mb-0">Welcome back!</p>
                </div>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="position-absolute me-3 text-dark end-0"
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
            <div className="p-2">
              <h6 className="text-secondary">Learn</h6>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className={`d-flex gap-3 align-items-center justify-content-between w-100 border-0 bg-transparent p-2 ps-0 ${classes["header-button"]}`}
              >
                <span>My learning</span>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
            <hr className="my-1" />
            <div>
              <h6 className="text-secondary mx-2 my-3">Categories</h6>
              <Categories className={styles["mobile-categories"]} />
            </div>
          </div>
          {isOpen && (
            <div className={`w-100`}>
              <button
                onClick={(e) => setIsOpen(false)}
                className="border-0 bg-transparent p-2 mx-1"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="ms-2 d-inline-block">Back</span>
              </button>
              <Learning isOpen={isOpen} />
            </div>
          )}
        </div>
      </aside>
    </OutLayer>
  );
};

export default Aside;
