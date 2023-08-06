import classes from "./Course.module.css";
import CourseHeader from "../components/SingleCourse/CourseHeader";
import CourseGain from "../components/SingleCourse/CourseGain";
import Content from "../components/SingleCourse/Content/Content";
import Overview from "../components/SingleCourse/Overview";
import Container from "../components/UI/Container";
import React, { useEffect, useState } from "react";
import Requirements from "../components/SingleCourse/Requirements";
import Description from "../components/SingleCourse/Description";
import Instructor from "../components/SingleCourse/Instructor";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../store/course-slice";
import { useParams } from "react-router";
import { instructorActions } from "../store/instructor-slice";
import { userActions } from "../store/user-slice";
import Reviews from "../components/SingleCourse/Reviews";
import Preview from "../components/SingleCourse/Preview";
import { reviewsActions } from "../store/reviews-slice";
import ReviewsModal from "../components/UI/ReviewsModal";

const Course = (props) => {
  const { dummyCourses, dummyInstructors, dummyUsers } = props;
  const [scrollY, setScrollY] = useState(0);
  const { items: reviews, isPaginated } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const course = dummyCourses[courseId];
  const instructor = dummyInstructors[dummyCourses[courseId].instructor];
  const user = Object.values(dummyUsers).find(
    (u) => u.instructor === instructor.id
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(courseActions.resetState(course));
    dispatch(instructorActions.resetState(instructor));
    dispatch(userActions.resetState(user));
  }, [dispatch, courseId, course, user, instructor]);

  if (!course) {
    return <h1>Course Not Found</h1>;
  }

  window.addEventListener("scroll", () => setScrollY(window.scrollY));

  return (
    <main className={classes.course}>
      <div className={classes.background}>
        <Container>
          {scrollY < 400 && (
            <Overview
              className={classes["header-overview"]}
              Preview={<Preview />}
            />
          )}
          <CourseHeader />
        </Container>
      </div>
      <Container className="d-flex flex-row-reverse align-items-start gap-5 my-3">
        <Overview
          className={`${classes.overview} ${
            scrollY >= 400 ? classes.float : classes.hide
          }`}
        />
        <div>
          <CourseGain />
          <Content />
          <Requirements />
          <Description />
          <Instructor />
          <Reviews
            reviews={course.reviews
              .filter((review) => review.comment)
              .slice(0, 4)}
          />
        </div>
        {isPaginated && (
          <ReviewsModal
            onClick={() => {
              dispatch(reviewsActions.toggleIsPaginated());
            }}
          >
            <Reviews modal reviews={reviews} wrap />
          </ReviewsModal>
        )}
      </Container>
    </main>
  );
};

export default React.memo(Course);
