import { Link } from "react-router-dom";
import classes from "./Instructor.module.css";
import instructorImage from "../../assets/landing-page.jfif";
import PlayIcon from "../Icons/PlayIcon";
import StarIcon from "../Icons/StarIcon";
import MedalIcon from "../Icons/MedalIcon";
import GroupIcon from "../Icons/GroupIcon";

const Instructor = (props) => {
  const { instructor, userId } = props;

  return (
    <div id="instructor" className={classes.instructor}>
      <h2>Instructor</h2>
      <div className={classes.profile}>
        <Link to={`/user/${userId}`}>{instructor.name}</Link>
        <p>{instructor.job}</p>
        <div>
          <div className={classes.image}>
            <Link to={`/user/${userId}`}>
              <img src={instructorImage} alt={instructor.name} />
            </Link>
          </div>
          <div>
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
              <span>{instructor.courses.length} Courses</span>
            </div>
          </div>
          <div className={classes.about}>{instructor.about}</div>
          <button>See more</button>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
