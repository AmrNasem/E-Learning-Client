import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Instructor from "./pages/Instructor/Instructor";
import Student from "./pages/Student/Student";
import { authActions } from "./store/auth-slice";
import useHttp from "./hooks/use-http";
import { cartActions } from "./store/cart-slice";

export const backend = "https://e-learning-5rhj.onrender.com/api/v1";

function App() {
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { sendRequest: logout } = useHttp();
  const { sendRequest: getCart, error: cartError } = useHttp();

  useEffect(() => {
    dispatch(cartActions.toggleError(cartError));
  }, [cartError, dispatch]);

  useEffect(() => {
    if (authedUser) {
      getCart({ endPoint: "carts/allCartCourses" }, (payload) => {
        console.log(payload);
        dispatch(cartActions.setCart(payload.courses.map((c) => c.course)));
      });
    }
  }, [authedUser, getCart, dispatch]);

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

  return (
    <div className="App d-flex flex-column">
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
