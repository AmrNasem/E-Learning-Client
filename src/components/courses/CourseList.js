import CourseItem from "./CourseItem";
import ForwardIcon from "../Icons/ForwardIcon";
import BackwardIcon from "../Icons/BackwardIcon";
import classes from "./CourseList.module.css";
import { useRef } from "react";

const CourseList = (props) => {
  const coursesRef = useRef();

  const moveForwardHandler = () => {
    coursesRef.current.scrollBy({
      top: 0,
      left: 170,
      behavior: "smooth",
    });
  };

  const moveBackwardHandler = () => {
    coursesRef.current.scrollBy({
      top: 0,
      left: -170,
      behavior: "smooth",
    });
  };

  return (
    <section className={classes["courses-section"]}>
      <BackwardIcon
        onClick={moveBackwardHandler}
        className={classes.backward}
      />
      <h3>{props.class}</h3>
      <div ref={coursesRef} className={classes["course-list"]}>
        {props.dummyData.map((course) => (
          <CourseItem
            key={course.id}
            id={course.id}
            title={course.title}
            instructor={course.instructor}
            price={course.price}
            className={classes.course}
          />
        ))}
      </div>
      <ForwardIcon onClick={moveForwardHandler} className={classes.forward} />
    </section>
  );
};

export default CourseList;
