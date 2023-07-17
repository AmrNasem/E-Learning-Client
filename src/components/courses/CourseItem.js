import classes from "./CourseItem.module.css";
import thumbnail from "../../assets/desktop.jfif";
import { Link } from "react-router-dom";
import React from "react";

const CourseItem = React.forwardRef((props, ref) => {
  const { className, id, course, available, instructor } = props;

  return (
    <div ref={ref && ref} className={`${classes.course} ${className}`}>
      <Link to={available ? `/course/${id}/preview` : `/course/${id}`}>
        <div className={classes.thumbnail}>
          <img src={course.src || thumbnail} alt="thumbnail" />
        </div>
        <h3>{course.title}</h3>
        <p>{instructor.name}</p>
        <span>${course.price}</span>
      </Link>
    </div>
  );
});

export default CourseItem;
