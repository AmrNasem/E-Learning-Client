import classes from "./CourseView.module.css";
import lecture from "../assets/awesome-video.mp4";
import Section from "../components/SingleCourse/Content/Section";
import Reviews from "../components/SingleCourse/Reviews";
import { courseActions } from "../store/course-slice";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";

const CourseView = (props) => {
  const { dummyCourses } = props;
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = dummyCourses[courseId];
  const reviews = useSelector((state) => state.reviews.items);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secId = queryParams.get("sec") || "0";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(courseActions.resetState(course));
  }, [dispatch, course]);
  const activeClassHandler = ({ isActive }) => {
    if (isActive)
      return `py-3 px-2 d-inline-block text-decoration-none ${classes.active}`;
    else return "py-3 px-2 d-inline-block text-decoration-none";
  };

  return (
    <main>
      <div className={classes["playing-lecture"]}>
        <video src={lecture} controls autoPlay />
      </div>
      <Container>
        <ul className={`list-unstyled d-flex gap-3 fs-5 ${classes.navbar}`}>
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
        <div className={`my-5 ${classes.content}`}>
          <Routes>
            <Route
              path=""
              element={
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
              }
            />
            <Route
              path="reviews"
              element={<Reviews reviews={reviews} wrap title />}
            />
            <Route path="*" element={<Navigate to="" replace={true} />} />
          </Routes>
        </div>
      </Container>
    </main>
  );
};

export default CourseView;
