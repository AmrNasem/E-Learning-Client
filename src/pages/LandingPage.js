import Categories from "../components/categories/Categories";
import CourseList from "../components/courses/CourseList";
import classes from "./LandingPage.module.css";

const LandingPage = (props) => {
  return (
    <main className={classes["landing-page"]}>
      <Categories />
      <CourseList class="Best Seller" />
      <CourseList class="Recommends" />
    </main>
  );
};

export default LandingPage;
