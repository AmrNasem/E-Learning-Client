import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import { useContext } from "react";
import HeaderContext from "./store/header-context";
import jsonFile from "./assets/dummy.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Instructor from "./pages/Instructor/Instructor";
import Student from "./pages/Student/Student";

const dummyCourses = jsonFile.courses;
const dummyInstructors = jsonFile.instructors;
const dummyUsers = jsonFile.users;

function App() {
  const headerCtx = useContext(HeaderContext);
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  const authedUser = useSelector((state) => state.auth.user);

  return (
    <div className="App d-flex flex-column" onClick={blurCategoriesHandler}>
      <Routes>
        <Route
          path="/*"
          element={
            <Student
              dummyInstructors={dummyInstructors}
              dummyCourses={dummyCourses}
              dummyUsers={dummyUsers}
            />
          }
        />
        {authedUser && authedUser.instructor && (
          <Route
            path="/instructor/*"
            element={
              <Instructor
                dummyInstructors={dummyInstructors}
                dummyCourses={dummyCourses}
                dummyUsers={dummyUsers}
              />
            }
          />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
