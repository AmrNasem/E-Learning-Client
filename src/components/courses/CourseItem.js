import classes from "./CourseItem.module.css";
import thumbnail from "../../assets/landing-page.jfif";
import { Link } from "react-router-dom";

const CourseItem = (props) => {
  const { className, id, course, instructor } = props;

  return (
    <div className={`${classes.course} ${className}`}>
      <Link to={`/course/${id}`}>
        <div className={classes.thumbnail}>
          <img src={course.src || thumbnail} alt="thumbnail" />
        </div>
        <h3>{course.title}</h3>
        <p>{instructor.name}</p>
        <span>${course.price}</span>
      </Link>
    </div>
  );
};

export default CourseItem;
