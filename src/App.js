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
// import { authActions } from "./store/auth-slice";

const dummyCourses = jsonFile.courses;
const dummyInstructors = jsonFile.instructors;
const dummyUsers = jsonFile.users;

export const backend = "https://e-learning-5rhj.onrender.com/api/v1";

function App() {
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  const authedUser = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();

  // Temporary
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!authedUser && user) {
  //     if (new Date().getTime() - user.loginDate <= 3600000)
  //       dispatch(authActions.setUser(user.user));
  //     else localStorage.removeItem("user");
  //   }
  // }, [dispatch, authedUser]);

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
