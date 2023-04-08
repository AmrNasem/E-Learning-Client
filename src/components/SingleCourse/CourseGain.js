import classes from "./CourseGain.module.css";
import GainTip from "./GainTip";

const CourseGain = (props) => {
  const { course } = props;
  return (
    <div className={classes["course-gain"]}>
      <h2>What you'll learn</h2>
      <ul>
        {course.gain.map((tip, index) => (
          <GainTip key={index}>{tip}</GainTip>
        ))}
      </ul>
    </div>
  );
};

export default CourseGain;
