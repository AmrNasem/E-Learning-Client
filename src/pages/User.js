import classes from "./User.module.css";
import Container from "../components/UI/Container";
import CourseItem from "../components/courses/CourseItem";
import InstructorUser from "../components/InstructorUser";
import { userActions } from "../store/user-slice";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const User = (props) => {
  const { dummyInstructors, dummyCourses, dummyUsers } = props;
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = dummyUsers[userId];

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <h3>Courses you're enrolled in</h3>
          <div className={classes["course-list"]}>
            {user["enrolled-courses"].map((id) => (
              <CourseItem
                key={id}
                id={id}
                course={dummyCourses[id]}
                instructor={dummyInstructors[dummyCourses[id].instructor].name}
                available={true}
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};
export default User;
