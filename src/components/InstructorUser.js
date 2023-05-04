import classes from "./InstructorUser.module.css";
import CourseItem from "./courses/CourseItem";
import photo from "../assets/desktop.jfif";
import TwitterIcon from "../components/Icons/TwitterIcon";
import FacebookIcon from "../components/Icons/FacebookIcon";
import YoutubeIcon from "../components/Icons/YoutubeIcon";
import LinkIcon from "../components/Icons/LinkIcon";
import { Fragment } from "react";

const SocialMedia = (props) => {
  const { socialMedia } = props;

  return (
    <div className={classes["social-media"]}>
      {Object.keys(socialMedia).map((contact, index) => {
        let icon;
        if (contact === "website") icon = <LinkIcon width={18} height={18} />;
        else if (contact === "twitter")
          icon = <TwitterIcon width={18} height={18} />;
        else if (contact === "facebook")
          icon = <FacebookIcon width={18} height={18} />;
        else if (contact === "youtube")
          icon = <YoutubeIcon width={18} height={18} />;
        return (
          <a
            key={index}
            rel="noreferrer"
            target="_blank"
            href={socialMedia[contact]}
          >
            {icon}
            <span>{contact}</span>
          </a>
        );
      })}
    </div>
  );
};

const InstructorUser = (props) => {
  const { user, dummyInstructors, dummyCourses } = props;
  const instructor = dummyInstructors[user.instructor];

  const socialMedia = instructor["social-media"];
  const coursesIds = instructor.courses;

  return (
    <Fragment>
      <div className={classes.introduction}>
        <div className={classes.brief}>
          <h4>INSTRUCTOR</h4>
          <h1>{user.name}</h1>
          <p>{instructor.job}</p>
          <div className={classes.achievements}>
            <div className={classes.students}>
              <h4>Total students</h4>
              <h3>{instructor.students}</h3>
            </div>
            <div className={classes.reviews}>
              <h4>Reviews</h4>
              <h3>{instructor.reviews}</h3>
            </div>
          </div>
          <p className={classes["about-me"]}>{instructor.about}</p>
        </div>
        <div className={classes.aside}>
          <div className={classes.photo}>
            <img src={user.photo || photo} alt={user.name} />
          </div>
          <SocialMedia socialMedia={socialMedia} />
        </div>
      </div>
      <div className={classes.courses}>
        <h3>My courses ({coursesIds.length})</h3>
        <div className={classes["course-list"]}>
          {coursesIds.map((id) => (
            <CourseItem
              key={id}
              id={id}
              course={dummyCourses[id]}
              instructor={dummyInstructors[dummyCourses[id].instructor].name}
            />
          ))}
        </div>
        <SocialMedia socialMedia={socialMedia} />
      </div>
    </Fragment>
  );
};

export default InstructorUser;
