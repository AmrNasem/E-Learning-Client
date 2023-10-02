import { Navigate, Route, Routes } from "react-router";
import MainHeader from "../../components/Header/MainHeader";
import MobileHeader from "../../components/Header/MobileHeader";
import LandingPage from "./LandingPage";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./SignUp"));
const Course = lazy(() => import("./Course"));
const CourseView = lazy(() => import("./CourseView"));
const User = lazy(() => import("./User"));

const Student = (props) => {
  const authedUser = useSelector((state) => state.auth.user);

  return (
    <>
      <MainHeader />
      <MobileHeader />
      <Suspense fallback={<LoadingSpinner side={70} />}>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route
            path="login"
            element={authedUser ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="signup"
            element={authedUser ? <Navigate to="/" replace /> : <SignUp />}
          />
          <Route path="course/:courseId/*" element={<Course />} />
          <Route
            path="course/:courseId/preview/:lectureId/*"
            element={<CourseView />}
          />
          <Route path="user/:userId/*" element={<User />} />
          <Route
            path="*"
            element={
              <main>
                <h1 className="text-center my-4">Page Not Found</h1>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default Student;
