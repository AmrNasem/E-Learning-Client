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

const dummyCourses = jsonFile.courses;
const dummyInstructors = jsonFile.instructors;

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
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
