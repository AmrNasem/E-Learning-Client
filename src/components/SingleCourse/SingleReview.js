import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import classes from "./SingleReview.module.css";

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
  const diff = new Date().getTime() - new Date(props.date).getTime();
  const secs = Math.floor(diff / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const units = [
    { val: secs, unit: "Seconds" },
    { val: mins, unit: "Minutes" },
    { val: hours, unit: "Hours" },
    { val: days, unit: "Days" },
    { val: months, unit: "Months" },
    { val: years, unit: "Years" },
  ];
  let commentDate = units.pop();
  while (commentDate.val <= 0) {
    commentDate = units.pop();
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
          <h5>{props.name}.</h5>
          <div className="d-flex align-items-center gap-3">
            <div className={classes.stars}>{stars}</div>
            <p className={`fw-bold m-0 ${classes.period}`}>
              {commentDate.val} {commentDate.unit} ago
            </p>
          </div>
        </div>
      </div>
      <p>{props.comment}</p>
    </div>
  );
};

export default SingleReview;
