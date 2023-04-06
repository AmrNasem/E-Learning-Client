import CourseList from "../components/courses/CourseList";
import classes from "./LandingPage.module.css";
import landingImage from "../assets/landing-page.jfif";

const LandingPage = (props) => {
  return (
    <main className={classes["landing-page"]}>
      <div className={classes["landing-image"]}>
        <img src={landingImage} alt="Nice Desktop" />
      </div>
      <div className={classes["landing-courses"]}>
        <CourseList class="Best Seller" />
        <CourseList class="Recommends" />
      </div>
    </main>
  );
};

export default LandingPage;
