import classes from "./CourseView.module.css";
import lecture from "../assets/awesome-video.mp4";
import Section from "../components/SingleCourse/Content/Section";
import { courseActions } from "../store/course-slice";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "../components/UI/Container";

const CourseView = (props) => {
  const { dummyCourses } = props;
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = dummyCourses[courseId];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secId = queryParams.get("sec") || "0";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(courseActions.resetState(course));
  }, [dispatch, course]);

  return (
    <main>
      <div className={classes["playing-lecture"]}>
        <video src={lecture} controls autoPlay />
      </div>
      <Container>
        <ul className="list-unstyled d-flex gap-3 fs-5 border-bottom">
          <li>
            <a
              className=" py-3 px-2 d-inline-block text-decoration-none"
              href="#content"
            >
              Course Content
            </a>
          </li>
          <li>
            <a
              className=" py-3 px-2 d-inline-block text-decoration-none"
              href="#questions"
            >
              Q&A
            </a>
          </li>
          <li>
            <a
              className=" py-3 px-2 d-inline-block text-decoration-none"
              href="#reviews"
            >
              Reviews
            </a>
          </li>
        </ul>
        <div className={`my-5 .${classes.content}`}>
          <div className={classes["course-content"]}>
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
        </div>
      </Container>
    </main>
  );
};

export default CourseView;
