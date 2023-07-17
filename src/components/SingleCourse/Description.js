import React from "react";
import classes from "./Description.module.css";
import { useSelector } from "react-redux";

const Description = (props) => {
  const course = useSelector((state) => state.course.course);

  return (
    <div className={classes.description}>
      <h2>Description</h2>
      <p>{course.description}</p>
    </div>
  );
};

export default React.memo(Description);
