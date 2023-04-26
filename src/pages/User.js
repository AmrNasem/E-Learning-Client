import classes from "./User.module.css";
import Container from "../components/UI/Container";
import CourseItem from "../components/courses/CourseItem";
import { useParams } from "react-router-dom";
import InstructorUser from "../components/InstructorUser";

const User = (props) => {
  const { userId } = useParams();
  const { dummyUsers, dummyInstructors, dummyCourses } = props;

  let user;
  for (const key in dummyUsers) {
    if (key === userId) {
      user = dummyUsers[key];
      break;
    }
  }

  if (!user) {
    return <h1>User Not Found</h1>;
  }

  const instructorContent = (
    <Container className={classes.container}>
      <InstructorUser
        user={user}
        instructor={dummyInstructors[user.instructor]}
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
                title={dummyCourses[id].title}
                instructor={dummyInstructors[dummyCourses[id].instructor].name}
                price={dummyCourses[id].price}
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};
export default User;
