import classes from "./Course.module.css";
import CourseHeader from "../components/SingleCourse/CourseHeader";
import CourseGain from "../components/SingleCourse/CourseGain";
import Content from "../components/SingleCourse/Content/Content";
import Overview from "../components/SingleCourse/Overview";
import Container from "../components/UI/Container";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Requirements from "../components/SingleCourse/Requirements";
import Description from "../components/SingleCourse/Description";
import Instructor from "../components/SingleCourse/Instructor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
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

  const course = useMemo(
    () => dummyCourses.find((course) => course.id === courseId),
    [courseId, dummyCourses]
  );

  const instructor = useMemo(() => {
    if (!course) return;
    return dummyInstructors.find((i) => i.id === course.instructor);
  }, [dummyInstructors, course]);

  const courseGain = useMemo(() => {
    if (!course) return;
    return course.gain;
  }, [course]);
  const requirements = useMemo(() => {
    if (!course) return;
    return course.requirements;
  }, [course]);

  const initialReviews = useMemo(() => {
    if (!course) return;
    return course.reviews.filter((review) => review.comment).slice(0, 4);
  }, [course]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.addEventListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  const closeModalHandler = useCallback(() => {
    dispatch(reviewsActions.toggleIsPaginated());
  }, [dispatch]);

  if (!course) return <h1>Page Not Found</h1>;

  return (
    <main className={classes.course}>
      <div className={classes.background}>
        <Container>
          {scrollY < 400 && (
            <Overview
              course={course}
              className={classes["header-overview"]}
              Preview={
                <Preview
                  lecId={
                    course.sections
                      .find((sec) => sec.lectures.find((lec) => lec.available))
                      .lectures.find((lec) => lec.available).id
                  }
                />
              }
            />
          )}
          <CourseHeader course={course} instructor={instructor} />
        </Container>
      </div>
      <Container className="d-flex flex-row-reverse align-items-start gap-5 my-3">
        <Overview
          course={course}
          className={`${classes.overview} ${
            scrollY >= 400 ? classes.float : classes.hide
          }`}
        />
        <div>
          <CourseGain courseGain={courseGain} />
          <Content course={course} />
          <Requirements requirements={requirements} />
          <Description description={course.description} />
          <Instructor
            instructor={instructor}
            userId={dummyUsers.find((u) => u.instructor === instructor.id).id}
          />
          <Reviews course={course} reviews={initialReviews} />
        </div>
        {isPaginated && (
          <ReviewsModal onClick={closeModalHandler}>
            <Reviews course={course} modal reviews={reviews} wrap />
          </ReviewsModal>
        )}
      </Container>
    </main>
  );
};

export default React.memo(Course);
