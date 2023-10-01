import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import classes from "./SingleReview.module.css";
import useDate from "../../hooks/use-date";
import React from "react";

const SingleReview = (props) => {
  const { date, unit } = useDate(props.createdAt);
  // Avatar
  const arr = props.name ? props.name.split(" ") : "No name".split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Rating
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < props.rate) {
      stars.push(
        <FontAwesomeIcon className="text-warning" icon={solidStar} key={i} />
      );
    } else {
      stars.push(
        <FontAwesomeIcon className="text-warning" icon={regularStar} key={i} />
      );
    }
  }

  return (
    <div className={classes.review}>
      <div className="d-flex align-items-center gap-4 my-4">
        <span
          className={`text-white rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
        >
          {avatar}
        </span>
        <div>
          <h5>{props.name || "No name"}.</h5>
          <div className="d-flex align-items-center gap-3">
            <div className={classes.stars}>{stars}</div>
            <p className={`fw-bold m-0 ${classes.period}`}>
              {date} {date > 1 ? unit : unit.slice(0, unit.length - 1)} ago
            </p>
          </div>
        </div>
      </div>
      <p>{props.comment}</p>
    </div>
  );
};

export default React.memo(SingleReview);
