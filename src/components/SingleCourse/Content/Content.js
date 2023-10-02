import React, { useState } from "react";
import classes from "./Content.module.css";
import Section from "./Section";
import { useEffect } from "react";

const Content = (props) => {
  const { course } = props;
  const [sections, setSections] = useState([]);
  const remainingSections = course.sections.length - sections.length;

  useEffect(() => {
    setSections(course.sections.slice(0, 10));
  }, [course.sections]);

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
      {remainingSections > 0 && (
        <button onClick={() => setSections(course.sections)}>
          {remainingSections} more{" "}
          {remainingSections === 1 ? "section" : "sections"}
        </button>
      )}
    </div>
  );
};

export default Content;
