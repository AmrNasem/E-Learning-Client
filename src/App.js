import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainHeader from "./components/Header/MainHeader";
import MobileHeader from "./components/Header/MobileHeader";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import HeaderContext from "./store/header-context";
import Course from "./pages/Course";
import jsonFile from "./assets/dummy.json";
import User from "./pages/User";
import CourseView from "./pages/CourseView";
import "bootstrap/dist/css/bootstrap.min.css";
import Cirriculm from "./uploadCourses/Cirriculum";
import DashBoard from "./uploadCourses/DashBoard";
import LectureDetails from "./uploadCourses/LectureDetails";
import CourseLandingPage from "./uploadCourses/CourseLandingPage";
import Pricing from "./uploadCourses/Pricing";

const dummyCourses = jsonFile.courses;
const dummyInstructors = jsonFile.instructors;
const dummyUsers = jsonFile.users;

function App() {
  const headerCtx = useContext(HeaderContext);
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  return (
    <div className="App" onClick={blurCategoriesHandler}>
      <MainHeader />
      <MobileHeader />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
              dummyUsers={dummyUsers}
            />
          }
        />
        <Route path="/instractor/cirriculm" element={<Cirriculm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/instractor" element={<DashBoard />} />
        <Route path="/lecdetails" element={<LectureDetails />} />
        <Route path="/instractor/courselandingpage" element={<CourseLandingPage />} />
        <Route path="/instractor/pricing" element={<Pricing />} />
        <Route
          path="/course/:courseId/*"
          element={
            <Course
              dummyUsers={dummyUsers}
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
            />
          }
        />
        <Route
          path="/course/:courseId/preview/*"
          element={<CourseView dummyCourses={dummyCourses} />}
        />
        <Route
          path="/user/:userId/*"
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
    </div>
  );
}

export default App;
