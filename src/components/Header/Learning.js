import { useEffect } from "react";
import LearningItem from "./LearningItem";
import { enrolledCoursesActions } from "../../store/enrolled-courses-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const Learning = (props = { isOpen: false }) => {
  const enrolledCourses = useSelector((state) => state.enrolledCourses.items);
  const dispatch = useDispatch();
  const {
    isLoading: gettingEnrolledCourses,
    sendRequest: getEnrolledCourses,
    error,
  } = useHttp();

  // Get enrolled courses
  useEffect(() => {
    if (props.isOpen && !enrolledCourses && !gettingEnrolledCourses) {
      getEnrolledCourses(
        { endPoint: "enrollments/enrolledCourses" },
        (payload) => {
          console.log(payload);
          dispatch(enrolledCoursesActions.setCourses(payload.enrolledCourses));
        }
      );
    }
  }, [
    props.isOpen,
    getEnrolledCourses,
    gettingEnrolledCourses,
    enrolledCourses,
    dispatch,
  ]);

  return (
    <div className={props.className}>
      {!enrolledCourses && !error ? (
        <LoadingSpinner className="my-3" side={50} />
      ) : (
        enrolledCourses.map((course, index) => (
          <LearningItem id={course.id} key={index} />
        ))
      )}
    </div>
  );
};
export default Learning;
