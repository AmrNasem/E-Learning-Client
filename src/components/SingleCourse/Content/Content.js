import React, { useState } from "react";
import classes from "./Content.module.css";
import Section from "./Section";

const Content = (props) => {
  const { course } = props;
  const [sections, setSections] = useState(course.sections.slice(0, 10));
  const remainingSections = course.sections.length - sections.length;

  return (
    <div className={classes.content}>
      <h2>Course content</h2>
      <p className={classes.info}>
        {course.sections.length} sections &bull; {course.numOfVideos} lectures
        &bull;
        {course.totalLength} total length
      </p>
      <div>
        {sections.map((sec, index) => (
          <Section key={index} {...sec} />
        ))}
      </div>
      {remainingSections && (
        <button onClick={() => setSections(course.sections)}>
          {remainingSections} more{" "}
          {remainingSections === 1 ? "section" : "sections"}
        </button>
      )}
    </div>
  );
};

export default Content;
