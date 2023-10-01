import classes from "./InstructorUser.module.css";
import CourseItem from "../courses/CourseItem";
import photo from "../../assets/desktop.jfif";
import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const InstructorUser = (props) => {
  const { user } = props;

  const courses = user.courseTeachers;

  return (
    <Fragment>
      <div className={classes.allPage}>
        <div
          className={`d-flex justify-content-between flex-column-reverse flex-md-row gap-4 gap-md-5 ${classes.introduction}`}
        >
          <div className={classes.brief}>
            <div>
              <h4>INSTRUCTOR</h4>
              <h1>{user.fullname}</h1>
              <p>{user.job || "Web developer"}</p>
            </div>
            <div className={classes.achievements}>
              <div className={classes.students}>
                <h4>Total students</h4>
                <h3>{user.totalStudentsEnrolled}</h3>
              </div>
              <div className={classes.reviews}>
                <h4>Reviews</h4>
                <h3>{user.totalReviews}</h3>
              </div>
            </div>
            <h3>About me</h3>
            <p className={classes["about-me"]}>
              {user.bio || "What do you know about me"}
            </p>
          </div>
          <div className="d-flex align-items-md-center gap-3 flex-column">
            <div className={classes.photo}>
              <img src={user.avatarUrl || photo} alt={user.fullname} />
            </div>
            {/* <SocialMedia
              socialMedia={socialMedia}
              className="d-none d-md-block"
            /> */}
          </div>
        </div>
        <div className={classes.courses}>
          {/* <SocialMedia socialMedia={socialMedia} className="d-md-none" /> */}
          <h3>My courses ({courses.length})</h3>
          <Row className="my-3">
            {courses.map((c, index) => (
              <Col sm={6} lg={4} key={index} className="mb-4">
                <CourseItem
                  teacherNames={user.fullname}
                  id={c.id}
                  {...c.course}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default InstructorUser;
