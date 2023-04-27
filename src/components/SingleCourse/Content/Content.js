import React from "react";
import classes from "./Content.module.css";
import Section from "./Section";
import { useSelector } from "react-redux";

const Content = (props) => {
  const course = useSelector((state) => state.course.course);

  if (!course.sections) return; // Because this compnent renders multiple times without course content existence

  const numOfLectures = course.sections
    .map((section) => section.lectures.length)
    .reduce((previous, current) => previous + current);

  return (
    <div className={classes.content}>
      <h2>Course content</h2>
      <p className={classes.info}>
        {course.sections.length} sections &bull; {numOfLectures} lectures &bull;
        65h 33m total length
      </p>
      <div>
        {course.sections.map((section, index) => (
          <Section key={index} id={index} {...section} />
        ))}
      </div>
      <button>32 more sections</button>
    </div>
  );
};

export default Content;
