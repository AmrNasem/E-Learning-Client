import classes from "./Course.module.css";
import CourseHeader from "../components/SingleCourse/CourseHeader";
import CourseGain from "../components/SingleCourse/CourseGain";
import Content from "../components/SingleCourse/Content/Content";
import Overview from "../components/SingleCourse/Overview";
import { useParams } from "react-router-dom";
import Container from "../components/UI/Container";
import { useState } from "react";
import Requirements from "../components/SingleCourse/Requirements";
import Description from "../components/SingleCourse/Description";
import Instructor from "../components/SingleCourse/Instructor";

const Course = (props) => {
  const { courseId } = useParams();
  const { dummyCourses, dummyInstructors } = props;

  let course;
  for (const key in dummyCourses) {
    if (key === courseId) {
      course = dummyCourses[key];
      break;
    }
  }

  let instructor;
  for (const key in dummyInstructors) {
    if (key === course.instructor) {
      instructor = dummyInstructors[key];
      break;
    }
  }

  const [scrollY, setScrollY] = useState(0);
  window.onscroll = () => setScrollY(window.scrollY);

  return (
    <main className={classes.course}>
      <div className={classes.background}>
        <Container>
          {scrollY < 400 && <Overview course={course} />}
          <CourseHeader instructor={instructor} course={course} />
        </Container>
      </div>
      <Container>
        {scrollY >= 400 && <Overview course={course} hide={true} />}
        <CourseGain course={course} />
        <Content course={course} />
        <Requirements course={course} />
        <Description course={course} />
        <Instructor instructor={instructor} />
      </Container>
    </main>
  );
};

export default Course;
