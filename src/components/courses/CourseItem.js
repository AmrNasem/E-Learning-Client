import classes from "./CourseItem.module.css";
import thumbnail from "../../assets/landing-page.jfif";
import { Link } from "react-router-dom";

const CourseItem = (props) => {
  return (
    <div className={`${classes.course} ${props.className}`}>
      <Link to={`course/${props.id}`}>
        <div className={classes.thumbnail}>
          <img src={props.src || thumbnail} alt="thumbnail" />
        </div>
        <h3>{props.title}</h3>
        <p>{props.instructor}</p>
        <span>${props.price}</span>
      </Link>
    </div>
  );
};

export default CourseItem;
