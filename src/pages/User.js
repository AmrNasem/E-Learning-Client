import classes from "./User.module.css";
import Container from "../components/UI/Container";
import CourseItem from "../components/courses/CourseItem";
import InstructorUser from "../components/InstructorUser/InstructorUser";
import { userActions } from "../store/user-slice";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const User = (props) => {
  const { dummyInstructors, dummyCourses, dummyUsers } = props;
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = dummyUsers.find((user) => user.id === userId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(userActions.resetState(user));
  }, [dispatch, user]);

  if (!user) {
    return <h1>User Not Found</h1>;
  }

  const instructorContent = (
    <Container className={classes.container}>
      <InstructorUser
        user={user}
        dummyCourses={dummyCourses}
        dummyInstructors={dummyInstructors}
      />
    </Container>
  );

  return (
    <main className={classes.user}>
      {user.instructor && instructorContent}
      <Container className={classes.container}>
        <div className={classes["enrolled-courses"]}>
          <h3>Courses {user.name.split(" ")[0]}'s enrolled in</h3>
          <Row className="my-3">
            {user["enrolled-courses"].map((id) => (
              <Col sm={6} lg={4} key={id} className="mb-4">
                <CourseItem
                  key={id}
                  {...dummyCourses.find((course) => course.id === id)}
                  instructors={dummyInstructors}
                  available={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </main>
  );
};
export default User;
