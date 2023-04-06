import { useParams } from "react-router";
import classes from "./CourseGain.module.css";
import GainTip from "./GainTip";
import Container from "../UI/Container";

const CourseGain = (props) => {
  const { courseId } = useParams();
  const course = props.dummyData.find((course) => course.id === courseId);

  return (
    <Container>
      <div className={classes["course-gain"]}>
        <h2>What you'll learn</h2>
        <ul>
          {course.gain.map((tip, index) => (
            <GainTip key={index}>{tip}</GainTip>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default CourseGain;
