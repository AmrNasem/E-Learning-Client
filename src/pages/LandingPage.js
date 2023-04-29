import CourseList from "../components/courses/CourseList";
import classes from "./LandingPage.module.css";
import landingImage from "../assets/landing-page.jfif";
import { useEffect } from "react";

const LandingPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={classes["landing-page"]}>
      <div className={classes["landing-image"]}>
        <img src={landingImage} alt="Nice Desktop" />
      </div>
      <div className={classes["landing-courses"]}>
        <CourseList
          class="Best Seller"
          dummyInstructors={props.dummyInstructors}
          dummyCourses={props.dummyCourses}
        />
        <CourseList
          class="Recommends"
          dummyInstructors={props.dummyInstructors}
          dummyCourses={props.dummyCourses}
        />
      </div>
    </main>
  );
};

export default LandingPage;
