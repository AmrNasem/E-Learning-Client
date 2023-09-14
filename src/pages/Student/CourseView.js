import classes from "./CourseView.module.css";
import Section from "../../components/SingleCourse/Content/Section";
import Reviews from "../../components/SingleCourse/Reviews";
import QAndA from "../../components/Q&A/QAndA";
import Answers from "../../components/Q&A/Answers";
import { useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/UI/Container";
import { NavLink, Routes, Route } from "react-router-dom";
import { qnaActions } from "../../store/qna-slice";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { reviewsActions } from "../../store/reviews-slice";

const CourseView = (props) => {
  const { courseId, lectureId } = useParams();
  const dispatch = useDispatch();
  const { isLoading: isCourseLoading, sendRequest: studyCourse } = useHttp();
  const [course, setCourse] = useState(null);
  const { lecture, questions } = useSelector((state) => state.qna);

  console.log("CourseView");

  // Not sure about this
  useEffect(() => {
    if (lecture && lecture.videoQuestions && !questions.length) {
      dispatch(qnaActions.getQuestions(5));
    }
  }, [lecture, dispatch, questions]);

  const applyData = useCallback(
    (data) => {
      console.log(data);
      if (!data.error) {
        setCourse(data.payload.course);
        dispatch(reviewsActions.getReviews(data.payload.course.reviews));
        dispatch(
          qnaActions.setLecture(
            data.payload.course.sections
              .find((sec) =>
                sec.videos.find((vid) => vid.id.toString() === lectureId)
              )
              .videos.find((vid) => vid.id.toString() === lectureId)
          )
        );
      }
    },
    [dispatch, lectureId]
  );

  useEffect(() => {
    studyCourse({ endPoint: `courses/studyCourse/${courseId}` }, applyData);
  }, [studyCourse, applyData, courseId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const activeClassHandler = ({ isActive }) => {
    const bootstrapClasses = "py-3 px-2 d-inline-block text-decoration-none";
    if (isActive) return `${bootstrapClasses} ${classes.active}`;
    else return bootstrapClasses;
  };

  if (isCourseLoading || (!isCourseLoading && !course))
    return <LoadingSpinner side={80} />;

  return (
    <main>
      <div className={classes["playing-lecture"]}>
        {/* <video src={lecture.videoUrl} controls autoPlay /> */}
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
                    {course.sections.map(
                      (section, index) =>
                        section.numOfVideos > 0 && (
                          <Section
                            key={index}
                            {...section}
                            className={classes.Section}
                          />
                        )
                    )}
                  </div>
                </div>
              }
            />
            <Route path="questions" element={<QAndA />} />
            <Route
              path="questions/:questionId/*"
              element={<Answers questions={lecture.questions} />}
            />
            <Route
              path="reviews"
              element={<Reviews course={course} wrap title />}
            />
            <Route path="*" element={<h3>No such a page</h3>} />
          </Routes>
        </div>
      </Container>
    </main>
  );
};

export default CourseView;
