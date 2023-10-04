import CourseItem from "./CourseItem";
import ForwardIcon from "../Icons/ForwardIcon";
import BackwardIcon from "../Icons/BackwardIcon";
import classes from "./CourseList.module.css";
import { memo, useRef } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const CourseList = (props) => {
  const coursesRef = useRef();
  const { class: listClass, courses, error } = props;
  const courseItemRef = useRef();

  console.log(courses);

  const swipeHandler = (direction = true) => {
    coursesRef.current.scrollBy({
      top: 0,
      left: direction
        ? courseItemRef.current.offsetWidth + 20
        : -courseItemRef.current.offsetWidth - 20,
      behavior: "smooth",
    });
  };

  return (
    <section className={classes["courses-section"]}>
      <h3>{listClass}</h3>
      {courses ? (
        <>
          <BackwardIcon
            onClick={() => swipeHandler(false)}
            className={classes.backward}
          />
          <div ref={coursesRef} className={classes["course-list"]}>
            {courses.map((course, index) => (
              <CourseItem
                key={index}
                className={classes.course}
                {...course}
                ref={courseItemRef}
              />
            ))}
          </div>
          <ForwardIcon onClick={swipeHandler} className={classes.forward} />
        </>
      ) : error ? (
        <h4 className="text-center my-3">{error}</h4>
      ) : (
        <LoadingSpinner side={60} />
      )}
    </section>
  );
};

export default memo(CourseList);
