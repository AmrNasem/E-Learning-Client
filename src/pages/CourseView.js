import classes from "./CourseView.module.css";
import lecture from "../assets/awesome-video.mp4";
import Section from "../components/SingleCourse/Content/Section";
import { courseActions } from "../store/course-slice";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const CourseView = (props) => {
  const { dummyCourses } = props;
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = dummyCourses[courseId];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secId = queryParams.get("sec") || "0";

  useEffect(() => {
    dispatch(courseActions.resetState(course));
  }, [dispatch, course]);

  return (
    <main>
      <div className={classes["playing-lecture"]}>
        <video src={lecture} controls autoPlay />
      </div>
      <div className={classes.content}>
        <h3>Content</h3>
        <div>
          {course.sections.map((section, index) => (
            <Section
              active={secId === index.toString()}
              key={index}
              id={index}
              {...section}
              className={classes.Section}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CourseView;
