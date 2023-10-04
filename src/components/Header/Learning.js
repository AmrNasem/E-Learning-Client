import { memo, useEffect } from "react";
import LearningItem from "./LearningItem";
import { enrolledCoursesActions } from "../../store/enrolled-courses-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const Learning = (props) => {
  const { items: enrolledCourses, error } = useSelector(
    (state) => state.enrolledCourses
  );
  const dispatch = useDispatch();
  const {
    isLoading: gettingCourses,
    sendRequest: getEnrolledCourses,
    error: errorGettingCourses,
  } = useHttp();

  // Get enrolled courses
  useEffect(() => {
    if (!enrolledCourses && !gettingCourses && !errorGettingCourses) {
      getEnrolledCourses(
        { endPoint: "enrollments/enrolledCourses" },
        (payload) => {
          console.log(payload);
          dispatch(enrolledCoursesActions.setCourses(payload.enrolledCourses));
        }
      );
    }
  }, [
    getEnrolledCourses,
    dispatch,
    enrolledCourses,
    errorGettingCourses,
    gettingCourses,
  ]);

  // Change enrolled courses request state
  useEffect(() => {
    dispatch(
      enrolledCoursesActions.setStates({
        isLoading: gettingCourses,
        error: errorGettingCourses,
      })
    );
  }, [gettingCourses, errorGettingCourses, dispatch]);

  return (
    <div className={props.className}>
      {enrolledCourses ? (
        enrolledCourses.map((course, index) => (
          <LearningItem id={course.id} key={index} />
        ))
      ) : error ? (
        <p className="text-center my-2">{error}</p>
      ) : (
        <LoadingSpinner className="my-3" side={50} />
      )}
    </div>
  );
};
export default memo(Learning);
