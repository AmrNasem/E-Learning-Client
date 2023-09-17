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
  const { isLoading, sendRequest: login } = useHttp();

  const applyData = (payload) => {
    console.log(payload);
    localStorage.setItem(
      "user",
      JSON.stringify({
        user: payload.user,
        loginDate: new Date().getTime(),
      })
    );
    dispatch(authActions.setUser(payload.user));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    login(
      {
        endPoint: "users/login",
        body: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        method: "POST",
      },
      applyData
    );
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
