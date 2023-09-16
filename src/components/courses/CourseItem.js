import classes from "./CourseItem.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

const CourseItem = React.forwardRef((props, ref) => {
  const { className, id, thumbnailUrl, title, price, teacherNames } = props;

  return (
    <Card ref={ref && ref} className={`${classes.course} ${className}`}>
      <Link to={`/course/${id}`} className="text-decoration-none">
        <Card.Img
          variant="top"
          className={classes.thumbnail}
          src={thumbnailUrl}
          alt="Thumbnail"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{teacherNames}</Card.Text>
          <span>${price}</span>
        </Card.Body>
      </Link>
    </Card>
  );
});

export default CourseItem;
