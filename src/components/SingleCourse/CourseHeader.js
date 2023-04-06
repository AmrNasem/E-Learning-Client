import { useParams } from "react-router";
import classes from "./CourseHeader.module.css";
import Container from "../UI/Container";

const CourseHeader = (props) => {
  const { courseId } = useParams();
  const course = props.dummyData.find((course) => course.id === courseId);

  return (
    <Container>
      <div className={classes["course-header"]}>
        <h5>
          <a href={`/category/${course.categoryId}`}>{course.category}</a>
        </h5>
        <h1>{course.title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          fugit sapiente explicabo dicta, eaque laudantium et minus vitae
          aliquam facere minima consectetur corrupti voluptatum veniam error,
          amet porro ea ipsum.
        </p>
        <div className={classes.info}>
          <span className={classes.badge}>Bestseller</span>
          <span className={classes.rates}>
            <a href="/">(275,583 ratings)</a>
          </span>
          <span className={classes.students}>933,032 students</span>
        </div>
        <p>
          Created by <a href="/">{course.instructor}</a>
        </p>
      </div>
    </Container>
  );
};

export default CourseHeader;
