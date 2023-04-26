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
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
