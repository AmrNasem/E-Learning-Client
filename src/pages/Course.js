import classes from "./Course.module.css";
import CourseHeader from "../components/SingleCourse/CourseHeader";
import CourseGain from "../components/SingleCourse/CourseGain";
import Content from "../components/SingleCourse/Content/Content";
import Overview from "../components/SingleCourse/Overview";
import { useParams } from "react-router-dom";
import Container from "../components/UI/Container";
import { useState } from "react";

const Course = (props) => {
  const { courseId } = useParams();
  const course = props.dummyData.find((course) => course.id === courseId);

  const [scrollY, setScrollY] = useState(0);
  window.onscroll = () => setScrollY(window.scrollY);

  return (
    <main className={classes.course}>
      <div className={classes.background}>
        <Container>
          {scrollY < 400 && <Overview course={course} />}
          <CourseHeader course={course} />
        </Container>
      </div>
      <Container>
        {scrollY >= 400 && <Overview course={course} hide={true} />}
        <CourseGain course={course} />
        <Content course={course} />
      </Container>
    </main>
  );
};

export default Course;
