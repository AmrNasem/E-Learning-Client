import React from "react";
import classes from "./CourseGain.module.css";
import GainTip from "./GainTip";

const CourseGain = (props) => {
  const { courseGain } = props;

  return (
    <div className={classes["course-gain"]}>
      <h2>What you'll learn</h2>
      <ul>
        {courseGain &&
          courseGain.map((tip, index) => <GainTip key={index}>{tip}</GainTip>)}
      </ul>
    </div>
  );
};

export default React.memo(CourseGain);
