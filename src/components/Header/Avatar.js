import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Avatar.module.css";
import { useSelector } from "react-redux";

const Avatar = (props) => {
  const authedUser = useSelector((state) => state.auth.user);

  return (
    <div
      onClick={props.onClick}
      className={`py-3 px-2 w-100 d-flex gap-2 position-relative align-items-center ${classes["user-info"]} ${props.className}`}
    >
      <button
        className={`text-white border-0 fw-bold overflow-hidden rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
      >
        {authedUser.avatarUrl ? (
          <img className="w-100" src={authedUser.avatarUrl} alt="" />
        ) : (
          authedUser.fullname.split(" ")[0][0]
        )}
      </button>
      <div className="flex-grow-1">
        <h5 className="mb-0">
          {props.mobile
            ? `Hi, ${authedUser.fullname.split(" ")[0]}`
            : authedUser.fullname}
        </h5>
        <p className="mb-0">
          {props.mobile ? "Welcome back!" : authedUser.email}
        </p>
      </div>
      {props.mobile && (
        <FontAwesomeIcon
          icon={faAngleRight}
          className="position-absolute me-3 text-dark end-0"
        />
      )}
    </div>
  );
};

export default Avatar;
