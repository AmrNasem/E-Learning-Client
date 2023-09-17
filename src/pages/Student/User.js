import classes from "./User.module.css";
import Container from "../../components/UI/Container";
import CourseItem from "../../components/courses/CourseItem";
import InstructorUser from "../../components/InstructorUser/InstructorUser";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const User = (props) => {
  const { dummyInstructors, dummyCourses } = props;
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { sendRequest: getProfile, error } = useHttp();

  useEffect(() => {
    getProfile({ endPoint: `users/getProfile/${userId}` }, (payload) => {
      console.log(payload.user);
      setUser(payload.user);
    });
  }, [getProfile, userId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const instructorContent = (
    <Container className={classes.container}>
      <InstructorUser
        user={user}
        dummyCourses={dummyCourses}
        dummyInstructors={dummyInstructors}
      />
    </Container>
  );

  if (error)
    return (
      <main>
        <h3 className="text-center my-4">{error}</h3>
      </main>
    );

  return (
    <main className={classes.user}>
      {user && user.instructor && instructorContent}
      {user ? (
        <Container className={classes.container}>
          <div className={`my-4 ${classes["enrolled-courses"]}`}>
            <h3>Courses {user.fullname.split(" ")[0]}'s enrolled in</h3>
            <Row className="my-3">
              {user.enrollments.map((enrollment, index) => (
                <Col sm={6} lg={4} key={index} className="mb-4">
                  <CourseItem
                    {...enrollment.course}
                    instructors={dummyInstructors}
                    available={true}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      ) : (
        <LoadingSpinner className="my-5" side={80} />
      )}
    </main>
  );
};
export default User;
