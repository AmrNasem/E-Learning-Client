import { Navigate, Route, Routes } from "react-router";
import MainHeader from "../../components/Header/MainHeader";
import MobileHeader from "../../components/Header/MobileHeader";
import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Course from "./Course";
import CourseView from "./CourseView";
import User from "./User";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

const Student = (props) => {
  const { dummyInstructors, dummyCourses, dummyUsers } = props;
  const authedUser = useSelector((state) => state.auth.user);

  return (
    <>
      <MainHeader />
      <MobileHeader />
      <Routes>
        <Route
          path=""
          element={
            <LandingPage
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
              dummyUsers={dummyUsers}
            />
          }
        />
        <Route
          path="login"
          element={authedUser ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="signup"
          element={authedUser ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="course/:courseId/*"
          element={
            <Course
              dummyUsers={dummyUsers}
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
            />
          }
        />
        <Route
          path="course/:courseId/preview/:lectureId/*"
          element={<CourseView dummyCourses={dummyCourses} />}
        />
        <Route
          path="user/:userId/*"
          element={
            <User
              dummyUsers={dummyUsers}
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
            />
          }
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
};

export default Student;
