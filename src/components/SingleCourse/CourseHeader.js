import classes from "./CourseHeader.module.css";
import { Link } from "react-router-dom";

const CourseHeader = (props) => {
  const { course } = props;

  return (
    <div className={classes["course-header"]}>
      <h5>
        <Link to={`/category/${course.categoryId}`}>{course.category}</Link>
      </h5>
      <h1>{course.title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        fugit sapiente explicabo dicta, eaque laudantium et minus vitae aliquam
        facere minima consectetur corrupti voluptatum veniam error, amet porro
        ea ipsum.
      </p>
      <div className={classes.info}>
        <span className={classes.badge}>Bestseller</span>
        <span className={classes.rates}>
          <a href="/">(275,583 ratings)</a>
        </span>
        <span className={classes.students}>933,032 students</span>
      </div>
      <p>
        Created by <a href="/">{course.instructor}</a>
      </p>
    </div>
  );
};

export default CourseHeader;
