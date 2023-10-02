import { Link } from "react-router-dom";
import classes from "./Instructor.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faPlayCircle,
  faStar,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const Instructor = (props) => {
  const { instructor } = props;

  return (
    <div id="instructor" className={classes.instructor}>
      <h2>Instructor</h2>
      <div className={classes.profile}>
        <Link to={`/user/${instructor.id}`} className={classes.instructorName}>
          {instructor.fullname.split(" ")[0]}
        </Link>
        <p>{instructor.job || "Web developer"}</p>
        <div className={classes.groub}>
          <div className={classes.image}>
            <Link to={`/user/${instructor.id}`}>
              <img
                src={instructor.avatarUrl}
                alt={instructor.fullname.split(" ")[0]}
              />
            </Link>
          </div>
          <div className={classes.groubDetails}>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <span>4.7 Instructor Rating</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faMedal} />
              <span>{instructor.totalReviews} Reviews</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUserGroup} />
              <span>{instructor.totalStudentsEnrolled} Students</span>
            </div>
            <div className={classes.courses}>
              <FontAwesomeIcon icon={faPlayCircle} />
              <span>{instructor.numOfCourses || 23} Courses</span>
            </div>
          </div>
        </div>
        <div className={classes.about}>
          {instructor.bio ||
            "What you know about rolling down in the deep when your brain goes numb you can call that mental freeze"}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Instructor);
