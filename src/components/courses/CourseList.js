import CourseItem from "./CourseItem";
import classes from "./CourseList.module.css";

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
];

const CourseList = (props) => {
  return (
    <section className={classes["courses-section"]}>
      <h3>{props.class}</h3>
      <div className={classes["course-list"]}>
        {DUMMY_DATA.map((course) => (
          <CourseItem
            key={course.id}
            id={course.id}
            title={course.title}
            instructor={course.instructor}
            price={course.price}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
