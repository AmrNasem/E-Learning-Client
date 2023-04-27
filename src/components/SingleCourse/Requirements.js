import React from "react";
import classes from "./Requirements.module.css";
import { useSelector } from "react-redux";

const Requirements = (props) => {
  const course = useSelector((state) => state.course.course);
  if (!course.requirements) return; // Because this compnent renders multiple times without course content existence

  return (
    <div className={classes.requirements}>
      <h2>Requirements</h2>
      <ul>
        {course.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Requirements);
