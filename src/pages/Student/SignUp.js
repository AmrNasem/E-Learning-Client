import { useRef } from "react";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import { backend } from "../../App";

const SignUp = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isLoading, sendRequest: signup } = useHttp();

  const signupHanlder = (e) => {
    e.preventDefault();
    // POST request
    signup(
      {
        endPoint: "users/createNewUser",
        body: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          fullname: nameRef.current.value,
        },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      (payload) => {
        console.log(payload);
      }
    );
  };

  return (
    <main>
      {isLoading ? (
        <LoadingSpinner className="my-5" side={80} />
      ) : (
        <form className={classes.form}>
          <FormInput
            ref={nameRef}
            placeholder="Full Name"
            className={classes.name}
          />
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
            type="submit"
            onClick={signupHanlder}
            className={classes.signup}
          >
            Sign Up
          </Button>
          <div className={classes.note}>
            <p>
              Already have an account?
              <Link to="/login" className={classes.link}>
                <span> Login</span>
              </Link>
            </p>
          </div>
        </form>
      )}
    </main>
  );
};

export default SignUp;
