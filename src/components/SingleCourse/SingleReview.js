import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import classes from "./SingleReview.module.css";
import { useEffect, useMemo, useState } from "react";

const SingleReview = (props) => {
  // Avatar
  const arr = props.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Rating
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < props.rating) {
      stars.push(
        <FontAwesomeIcon className="text-warning" icon={solidStar} key={i} />
      );
    } else {
      stars.push(
        <FontAwesomeIcon className="text-warning" icon={regularStar} key={i} />
      );
    }
  }

  // Date
  const units = useMemo(
    () => [
      { val: 60, unit: "Seconds" },
      { val: 60, unit: "Minutes" },
      { val: 24, unit: "Hours" },
      { val: 30, unit: "Days" },
      { val: 12, unit: "Months" },
    ],
    []
  );

  const [date, setDate] = useState({
    val: (new Date().getTime() - new Date(props.date).getTime()) / 31104000000,
    unit: "Years",
  });

  useEffect(() => {
    if (Math.floor(date.val) === 0) {
      const unit = units.pop();
      if (unit)
        setDate((prevState) => {
          return { val: prevState.val * unit.val, unit: unit.unit };
        });
      else setDate({ val: 1, unit: "Seconds" });
    }
  }, [date, units]);

  return (
    <div className={classes.review}>
      <div className="d-flex align-items-center gap-4 my-4">
        <span
          className={`text-white rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
        >
          {avatar}
        </span>
        <div>
          <h5>{props.name}.</h5>
          <div className="d-flex align-items-center gap-3">
            <div className={classes.stars}>{stars}</div>
            <p className={`fw-bold m-0 ${classes.period}`}>
              {Math.floor(date.val)}{" "}
              {Math.floor(date.val) > 1
                ? date.unit
                : date.unit.slice(0, date.unit.length - 1)}{" "}
              ago
            </p>
          </div>
        </div>
      </div>
      <p>{props.comment}</p>
    </div>
  );
};

export default SingleReview;
