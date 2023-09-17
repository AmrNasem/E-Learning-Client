import { Link } from "react-router-dom";
import classes from "./Instructor.module.css";
import PlayIcon from "../Icons/PlayIcon";
import StarIcon from "../Icons/StarIcon";
import MedalIcon from "../Icons/MedalIcon";
import GroupIcon from "../Icons/GroupIcon";
import React from "react";

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
              <StarIcon width={16} height={16} />
              <span>4.7 Instructor Rating</span>
            </div>
            <div>
              <MedalIcon width={16} height={16} />
              <span>{instructor.reviews} Reviews</span>
            </div>
            <div>
              <GroupIcon />
              <span>{instructor.students} Students</span>
            </div>
            <div className={classes.courses}>
              <span className={classes["play-icon"]}>
                <PlayIcon width={6} height={6} color="white" />
              </span>
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
