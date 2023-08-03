import classes from "./CourseItem.module.css";
import thumbnail from "../../assets/desktop.jfif";
import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

const CourseItem = React.forwardRef((props, ref) => {
  const { className, id, course, available, instructor } = props;

  return (
    <Card ref={ref && ref} className={`${classes.course} ${className}`}>
      <Link
        to={available ? `/course/${id}/preview` : `/course/${id}`}
        className="text-decoration-none"
      >
        <Card.Img variant="top" src={course.src || thumbnail} alt="Thumbnail" />
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{instructor.name}</Card.Text>
          <span>${course.price}</span>
        </Card.Body>
      </Link>
    </Card>
  );
});

export default CourseItem;
