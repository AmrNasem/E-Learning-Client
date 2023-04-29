import React, { useState } from "react";
import classes from "./Content.module.css";
import Section from "./Section";
import { useSelector } from "react-redux";

const Content = (props) => {
  const course = useSelector((state) => state.course.course);
  const [isMore, setIsMore] = useState(false);

  if (!course.sections) return; // Because this compnent renders multiple times without course content existence

  const numOfLectures = course.sections
    .map((section) => section.lectures.length)
    .reduce((previous, current) => previous + current);

  let sections = [];
  let remainingSections = 0;
  if (isMore) {
    sections = course.sections.map((section, index) => (
      <Section key={index} id={index} {...section} />
    ));
  } else {
    sections = course.sections.map((section, index) => {
      if (index >= 10) return false;
      return <Section key={index} id={index} {...section} />;
    });
    remainingSections = course.sections.length - 10;
  }

  return (
    <div className={classes.content}>
      <h2>Course content</h2>
      <p className={classes.info}>
        {course.sections.length} sections &bull; {numOfLectures} lectures &bull;
        65h 33m total length
      </p>
      <div>{sections}</div>
      {remainingSections > 0 && (
        <button onClick={() => setIsMore(true)}>
          {remainingSections} more{" "}
          {remainingSections === 1 ? "section" : "sections"}
        </button>
      )}
    </div>
  );
};

export default Content;
