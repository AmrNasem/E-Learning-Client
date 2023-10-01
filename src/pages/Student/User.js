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
import { useSelector } from "react-redux";

const User = (props) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { sendRequest: getProfile, error } = useHttp();
  const authedUser = useSelector((state) => state.auth.user);

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
      <InstructorUser user={user} />
    </Container>
  );

  if (error) {
    console.log(error);
    return (
      <main>
        <h3 className="text-center my-3">Something went wrong</h3>
      </main>
    );
  }

  return (
    <main className={classes.user}>
      {user && user.role === "instructor" && instructorContent}
      {user ? (
        user.enrollments &&
        user.enrollments.length && (
          <Container className={classes.container}>
            <div className={`my-4 ${classes["enrolled-courses"]}`}>
              <h3>
                Courses{" "}
                {authedUser && user.id === authedUser.id
                  ? "you're"
                  : `${user.fullname.split(" ")[0]}'s`}{" "}
                enrolled in
              </h3>
              <Row className="my-3">
                {user.enrollments.map((enrollment, index) => (
                  <Col sm={6} lg={4} key={index} className="mb-4">
                    <CourseItem
                      {...enrollment.course}
                      available={
                        authedUser && user.id === authedUser.id ? true : false
                      }
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        )
      ) : (
        <LoadingSpinner className="my-5" side={80} />
      )}
    </main>
  );
};
export default User;
