import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import HeaderContext from "./store/header-context";
import jsonFile from "./assets/dummy.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Instructor from "./pages/Instructor/Instructor";
import Student from "./pages/Student/Student";
import NewCourse from "./pages/Instructor/NewCourse";

const dummyCourses = jsonFile.courses;
const dummyInstructors = jsonFile.instructors;
const dummyUsers = jsonFile.users;

export const backend = "https://e-learning-5rhj.onrender.com/api/v1";

function App() {
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  const authedUser = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // try
  //     const response = await fetch(`${backend}/api/v1/courses/getCourseById/6`);
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   fetchData();
  // }, []);
  const headerCtx = useContext(HeaderContext);

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
          <>
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
            <Route path="course/Create" element={<NewCourse />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
