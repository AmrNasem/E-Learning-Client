import CourseItem from "./CourseItem";
import ForwardIcon from "../Icons/ForwardIcon";
import BackwardIcon from "../Icons/BackwardIcon";
import classes from "./CourseList.module.css";
import { useRef } from "react";

const CourseList = (props) => {
  const coursesRef = useRef();
  const { class: listClass, dummyCourses } = props;
  const courseItemRef = useRef();

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
      <BackwardIcon
        onClick={() => swipeHandler(false)}
        className={classes.backward}
      />
      <h3>{listClass}</h3>
      <div ref={coursesRef} className={classes["course-list"]}>
        {dummyCourses.map(
          (course) =>
            course.status === "published" && (
              <CourseItem key={course.id} {...course} ref={courseItemRef} />
            )
        )}
      </div>
      <ForwardIcon onClick={swipeHandler} className={classes.forward} />
    </section>
  );
};

export default CourseList;
