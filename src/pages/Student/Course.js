import classes from "./Course.module.css";
import CourseHeader from "../../components/SingleCourse/CourseHeader";
import CourseGain from "../../components/SingleCourse/CourseGain";
import Content from "../../components/SingleCourse/Content/Content";
import Overview from "../../components/SingleCourse/Overview";
import Container from "../../components/UI/Container";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Requirements from "../../components/SingleCourse/Requirements";
import Description from "../../components/SingleCourse/Description";
import Instructor from "../../components/SingleCourse/Instructor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Reviews from "../../components/SingleCourse/Reviews";
import Preview from "../../components/SingleCourse/Preview";
import { reviewsActions } from "../../store/reviews-slice";
import ReviewsModal from "../../components/UI/ReviewsModal";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Course = (props) => {
  const [scrollY, setScrollY] = useState(0);
  const { items: reviews, isPaginated } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { isLoading, sendRequest: getCourse } = useHttp();

  useEffect(() => {
    getCourse({ endPoint: `courses/getCourseById/${courseId}` }, (data) => {
      console.log(data);
      setCourse(data.payload.course);
    });
  }, [getCourse, courseId]);

  // const initialReviews = useMemo(() => {
  //   if (!course) return;
  //   return course.reviews.filter((review) => review.comment).slice(0, 4);
  // }, [course]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.addEventListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  const closeModalHandler = useCallback(() => {
    dispatch(reviewsActions.toggleIsPaginated());
  }, [dispatch]);

  if (isLoading || (!isLoading && !course)) return <LoadingSpinner side={80} />;

  if (!course)
    return (
      <main>
        <h1 className="text-center my-4">Page Not Found</h1>
      </main>
    );

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
                  thumbnail={course.thumbnailUrl}
                  // lecId={
                  //   course.sections
                  //     .find((sec) => sec.lectures.find((lec) => lec.available))
                  //     .lectures.find((lec) => lec.available).id
                  // }
                />
              }
            />
          )}
          <CourseHeader course={course} />
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
          <CourseGain courseGain={course.outline} />
          <Content course={course} />
          <Requirements requirements={course.prerequisites} />
          <Description
            description={
              course.desc || "What you know about rolling down in the deep"
            }
          />
          {course.teachers.map((teacher, index) => (
            <Instructor key={index} instructor={teacher} />
          ))}
          {/* <Reviews course={course} reviews={course.reviews} /> */}
        </div>
        {/* {isPaginated && (
          <ReviewsModal onClick={closeModalHandler}>
            <Reviews course={course} modal reviews={reviews} wrap />
          </ReviewsModal>
        )} */}
      </Container>
    </main>
  );
};

export default React.memo(Course);
