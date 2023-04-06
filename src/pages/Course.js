import classes from "./Course.module.css";
import CourseHeader from "../components/SingleCourse/CourseHeader";
import CourseGain from "../components/SingleCourse/CourseGain";
import Content from "../components/SingleCourse/Content/Content";

const Course = (props) => {
  return (
    <main className={classes.course}>
      <div className={classes.background}>
        <CourseHeader dummyData={props.dummyData} />
      </div>
      <CourseGain dummyData={props.dummyData} />
      <Content dummyData={props.dummyData} />
    </main>
  );
};

export default Course;
