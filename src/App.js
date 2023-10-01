import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import HeaderContext from "./store/header-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Instructor from "./pages/Instructor/Instructor";
import Student from "./pages/Student/Student";
import { authActions } from "./store/auth-slice";
import { categoriesActions } from "./store/categories-slice";
import useHttp from "./hooks/use-http";

export const backend = "https://e-learning-5rhj.onrender.com/api/v1";

function App() {
  const blurCategoriesHandler = () => {
    headerCtx.setVisibleCategories(false);
  };
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { sendRequest: logout } = useHttp();
  const { isLoading, sendRequest: getCategories, error } = useHttp();

  useEffect(() => {
    getCategories({ endPoint: "categories/getAllCategories" }, (payload) => {
      console.log(payload);
      dispatch(
        categoriesActions.setCategories(
          payload.categories.map((cat) => {
            return {
              id: cat.id,
              createdAt: cat.createdAt,
              updatedAt: cat.updatedAt,
              text: cat.categoryName,
            };
          })
        )
      );
    });
  }, [getCategories, dispatch]);

  useEffect(() => {
    dispatch(categoriesActions.setStates({ isLoading, error }));
  }, [dispatch, isLoading, error]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!authedUser && user) {
      if (new Date().getTime() - user.loginDate <= 36000000)
        dispatch(authActions.setUser(user.user));
      else {
        logout({ endPoint: "users/logout" }, (payload) => console.log(payload));
        localStorage.removeItem("user");
      }
    }
  }, [dispatch, logout, authedUser]);

  const headerCtx = useContext(HeaderContext);

  return (
    <div className="App d-flex flex-column" onClick={blurCategoriesHandler}>
      <Routes>
        {authedUser && authedUser.role === "instructor" && (
          <Route path="/instructor/*" element={<Instructor />} />
        )}
        <Route path="/*" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
