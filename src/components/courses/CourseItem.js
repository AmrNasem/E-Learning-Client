import classes from "./CourseItem.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

const CourseItem = React.forwardRef((props, ref) => {
  const { className, id, thumbnailUrl, title, price, teacherNames, available } =
    props;

  return (
    <Card ref={ref && ref} className={`${classes.course} ${className}`}>
      <Link
        to={`/course/${id}${available ? "/preview/1" : ""}`}
        className="text-decoration-none"
      >
        <Card.Img
          variant="top"
          className={classes.thumbnail}
          src={thumbnailUrl}
          alt="Thumbnail"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{teacherNames || "No Instructor"}</Card.Text>
          <span>{price ? `$${price}` : "Free"}</span>
        </Card.Body>
      </Link>
    </Card>
  );
});

export default CourseItem;
