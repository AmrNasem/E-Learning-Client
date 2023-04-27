import React from "react";
import classes from "./CourseGain.module.css";
import GainTip from "./GainTip";
import { useSelector } from "react-redux";

const CourseGain = (props) => {
  const course = useSelector((state) => state.course.course);

  return (
    <div className={classes["course-gain"]}>
      <h2>What you'll learn</h2>
      <ul>
        {course.gain &&
          course.gain.map((tip, index) => <GainTip key={index}>{tip}</GainTip>)}
      </ul>
    </div>
  );
};

export default React.memo(CourseGain);
