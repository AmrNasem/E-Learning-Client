import classes from "./CourseView.module.css";
import lecture from "../assets/awesome-video.mp4";
import Section from "../components/SingleCourse/Content/Section";
import Reviews from "../components/SingleCourse/Reviews";
import { courseActions } from "../store/course-slice";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container";
import { NavLink, Routes, Route } from "react-router-dom";
import QAndA from "../components/Q&A/QAndA";

const CourseView = (props) => {
  const { dummyCourses } = props;
  const { courseId, lectureId } = useParams();
  const dispatch = useDispatch();
  const course = dummyCourses.find((course) => course.id === courseId);
  let reviews = useSelector((state) => state.reviews.items);

  let questions = [];
  for (const sec of course.sections) {
    for (const lec of sec.lectures) {
      if (lec.id === lectureId) questions = lec.questions;
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(courseActions.resetState(course));
  }, [dispatch, course]);

  const activeClassHandler = ({ isActive }) => {
    const bootstrapClasses = "py-3 px-2 d-inline-block text-decoration-none";
    if (isActive) return `${bootstrapClasses} ${classes.active}`;
    else return bootstrapClasses;
  };

  return (
    <main>
      <div className={classes["playing-lecture"]}>
        <video src={lecture} controls autoPlay />
      </div>
      <Container>
        <ul
          className={`list-unstyled d-flex flex-wrap gap-2 ${classes.navbar}`}
        >
          <li>
            <NavLink className={activeClassHandler} to="" end>
              Course Content
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClassHandler} to="questions">
              Q&A
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClassHandler} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
        <div className={`my-5 px-3 ${classes.content}`}>
          <Routes>
            <Route
              path=""
              element={
                <div className={classes["course-content"]}>
                  <h3>Content</h3>
                  <div>
                    {course.sections.map((section, index) => (
                      <Section
                        key={index}
                        {...section}
                        className={classes.Section}
                      />
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="questions" element={<QAndA questions={questions} />} />
            <Route path="questions/:questionId" element={<h3>Question</h3>} />
            <Route
              path="reviews"
              element={<Reviews reviews={reviews} wrap title />}
            />
          </Routes>
        </div>
      </Container>
    </main>
  );
};

export default CourseView;
