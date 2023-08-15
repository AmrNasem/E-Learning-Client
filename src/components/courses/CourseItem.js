import classes from "./CourseItem.module.css";
import thumbnail from "../../assets/desktop.jfif";
import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";
import jsonFile from "../../assets/dummy.json";

const CourseItem = React.forwardRef((props, ref) => {
  const instructors = jsonFile.instructors;
  const { className, id, src, title, sections, price, available, instructor } =
    props;

  return (
    <Card ref={ref && ref} className={`${classes.course} ${className}`}>
      <Link
        to={
          available
            ? `/course/${id}/preview/${sections[0].lectures[0].id}`
            : `/course/${id}`
        }
        className="text-decoration-none"
      >
        <Card.Img variant="top" src={src || thumbnail} alt="Thumbnail" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {instructors.find((i) => i.id === instructor).name}
          </Card.Text>
          <span>${price}</span>
        </Card.Body>
      </Link>
    </Card>
  );
});

export default CourseItem;
