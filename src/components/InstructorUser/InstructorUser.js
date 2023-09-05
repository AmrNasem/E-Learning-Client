import classes from "./InstructorUser.module.css";
import CourseItem from "../courses/CourseItem";
import photo from "../../assets/desktop.jfif";
import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SocialMedia from "./SocialMedia";

const InstructorUser = (props) => {
  const { user, dummyInstructors, dummyCourses } = props;
  const instructor = dummyInstructors.find(
    (instructor) => instructor.id === user.instructor
  );

  const socialMedia = instructor["social-media"];
  const coursesIds = instructor.courses;
  const courses = dummyCourses.filter((c) =>
    coursesIds.some((id) => id === c.id && c.status === "published")
  );

  return (
    <Fragment>
      <div className={classes.allPage}>
        <div
          className={`d-flex justify-content-between flex-column-reverse flex-md-row gap-4 gap-md-5 ${classes.introduction}`}
        >
          <div className={classes.brief}>
            <div>
              <h4>INSTRUCTOR</h4>
              <h1>{user.name}</h1>
              <p>{instructor.job}</p>
            </div>
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
            <h3>About me</h3>
            <p className={classes["about-me"]}>{instructor.about}</p>
          </div>
          <div className="d-flex align-items-md-center gap-3 flex-column">
            <div className={classes.photo}>
              <img src={user.photo || photo} alt={user.name} />
            </div>
            <SocialMedia
              socialMedia={socialMedia}
              className="d-none d-md-block"
            />
          </div>
        </div>
        <div className={classes.courses}>
          <SocialMedia socialMedia={socialMedia} className="d-md-none" />
          <h3>My courses ({courses.length})</h3>
          <Row className="my-3">
            {courses.map((c) => (
              <Col sm={6} lg={4} key={c.id} className="mb-4">
                <CourseItem id={c.id} {...c} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default InstructorUser;
