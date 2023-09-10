import { useRef } from "react";
// import { backend } from "../../App";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const {
    isLoading,
    sendRequest: login,
    error,
  } = useHttp((data) => {
    if (data.error || error) {
      console.log(data);
      // Handle rejection
    } else {
      console.log(data.payload);
      // Handle satisfaction
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: data.payload.user,
          loginDate: new Date().getTime(),
        })
      );
      dispatch(authActions.setUser(data.payload.user));
    }
  });
  const loginHandler = (e) => {
    e.preventDefault();
    login({
      endPoint: "users/login",
      body: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      method: "POST",
    });
    // const fetchData = async () => {
    //   const res = await fetch(`${backend}/users/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // };
    // fetchData();
  };
  return (
    <main>
      {isLoading ? (
        <LoadingSpinner className="my-5" side={80} />
      ) : (
        <form className={classes.form}>
          <FormInput
            ref={emailRef}
            type="email"
            placeholder="E-Mail"
            className={classes.email}
          />
          <FormInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className={classes.password}
          />
          <Button
            onClick={loginHandler}
            className={classes.login}
            type="submit"
          >
            Login
          </Button>

          <div className={classes.note}>
            <p>
              Don't have an account?
              <Link to="/signup" className={classes.link}>
                <span> Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      )}
    </main>
  );
};

export default Login;
