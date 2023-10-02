import { Link } from "react-router-dom";
import classes from "./LearningItem.module.css";

const LearningItem = (props) => {
  return (
    <Link
      className={`d-flex text-decoration-none ${classes.learning} border-bottom border-1 p-3 gap-3`}
      to={`/course/${props.id}`}
    >
      <div className={classes.thumbnail}>
        <img
          className="w-100 h-100 object-fit-cover"
          src={require("../../assets/desktop.jfif")}
          alt=""
        />
      </div>
      <div className={classes["learning-body"]}>
        <h6 className="mb-1 text-dark">
          The complete guide to react The complete guide to react
        </h6>
        <button className="border-0 bg-transparent">Start learning</button>
      </div>
    </Link>
  );
};

export default LearningItem;
