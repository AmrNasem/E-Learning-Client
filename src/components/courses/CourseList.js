import CourseItem from "./CourseItem";
import ForwardIcon from "../Icons/ForwardIcon";
import BackwardIcon from "../Icons/BackwardIcon";
import classes from "./CourseList.module.css";
import { useRef } from "react";

const DUMMY_DATA = [
  {
    id: "c1",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c2",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c3",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c4",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c5",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c6",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c7",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c8",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c9",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c10",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c11",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c12",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c13",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c14",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c15",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
  {
    id: "c16",
    title: "The complete guide to react",
    category: "development",
    instructor: "Maximilian",
    price: 1400,
  },
];

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
        {DUMMY_DATA.map((course) => (
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
