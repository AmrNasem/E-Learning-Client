import { useRef } from "react";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
// import { backend } from "../../App";

const SignUp = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const signupHanlder = (e) => {
    e.preventDefault();
    // POST request here
    // const fetchData = async () => {
    //   console.log(emailRef.current.value);
    //   console.log(passwordRef.current.value);
    //   console.log(nameRef.current.value);
    //   const res = await fetch(`${backend}/users/createNewUser`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value,
    //       fullname: nameRef.current.value,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    // };
    // fetchData();
  };

  return (
    <main>
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
    </main>
  );
};

export default SignUp;
