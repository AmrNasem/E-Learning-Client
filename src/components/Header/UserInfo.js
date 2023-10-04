import classes from "./UserInfo.module.css";
import Avatar from "./Avatar";
import useHttp from "../../hooks/use-http";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesActions } from "../../store/categories-slice";

const UserInfo = (props) => {
  const { isLoading, sendRequest: logout } = useHttp();
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.stopPropagation();
    logout({ endPoint: "users/logout" }, () => {
      localStorage.removeItem("user");
      dispatch(authActions.setUser(null));
    });
  };

  return (
    <div className={`bg-white ${props.className}`}>
      {!props.mobile && (
        <Avatar className={`bg-transparent gap-3 ${classes.avatar}`} />
      )}
      <div className="border-1 border-bottom">
        <h6
          onClick={(e) => e.stopPropagation()}
          className="text-secondary px-3 my-2 py-2"
        >
          Account
        </h6>
        <button
          onClick={() =>
            props.propagate &&
            dispatch(categoriesActions.toggleCategories(false))
          }
          className={`border-0 bg-transparent w-100 text-start px-3 py-2 ${classes.button}`}
        >
          Account settings
        </button>
      </div>
      <div className="border-1 border-bottom">
        <h6
          onClick={(e) => e.stopPropagation()}
          className="text-secondary px-3 my-2 py-2"
        >
          Profile
        </h6>
        <button
          onClick={() => {
            if (props.propagate)
              dispatch(categoriesActions.toggleCategories(false));
            navigate(`/user/${authedUser.id}`);
          }}
          className={`border-0 bg-transparent w-100 text-start px-3 py-2 ${classes.button}`}
        >
          Public profile
        </button>
        <button
          className={`border-0 bg-transparent w-100 text-start px-3 py-2 ${classes.button}`}
        >
          Edit profile
        </button>
      </div>
      <div>
        <button
          disabled={isLoading}
          onClick={logoutHandler}
          className="border-0 bg-transparent w-100 text-start p-3 text-danger"
        >
          {isLoading ? <LoadingSpinner side={30} /> : "Logout"}
        </button>
      </div>
    </div>
  );
};
export default memo(UserInfo);
