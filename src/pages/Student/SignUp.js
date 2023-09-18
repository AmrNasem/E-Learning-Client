import { useRef, useState } from "react";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import axios from "axios";
// import { backend } from "../../App";

const SignUp = (props) => {
  // Code Heggy from here--------------------------------------
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isLoading, sendRequest: signup } = useHttp();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [accept, setAccept] = useState(false)
  const [match, setMatch] = useState(false)
  const [emailcheck, setEmailcheck] = useState(false)
  const [reqNam, setReqName] = useState(false)
  const [emailError, setEmailError] = useState("")
  // الربط والفانكشن اللي بتغير قيمة الاستيت بعد فحص الشرط
  // async function submit(e) {
  //   let flag = true;
  //   e.preventDefault();
  //   setAccept(true)
  //   setMatch(true)
  //   setReqName(true)
  //   setEmailcheck(true)
  //   if (props.name === "" || password.length < 8 || password !== rePassword) {
  //     flag = false;
  //   } else flag = true;
  //   try {
  //     if (flag) {
  //       const res = await axios.post("http://127.0.0.1:8000/api/register", {
  //         name: name,
  //         email: email,
  //         password: password,
  //         password_confirmation: rePassword
  //       }).then((t) => console.log(t))
  //     }
  //   } catch (err) {
  //     setEmailError(err.response.status)
  //   }
  // }
  // --------------------------------------------------
  // الكود ده مش بتاعي بس عملتله كومنت علشان ميطلعش ايرور وانا شغال
  // const signupHanlder = (e) => {
  //   e.preventDefault();
  //   // POST request
  //   signup(
  //     {
  //       endPoint: "users/createNewUser",
  //       body: {
  //         email: emailRef.current.value,
  //         password: passwordRef.current.value,
  //         fullname: nameRef.current.value,
  //       },
  //       credentials: "include",
  //       method: "POST",
  //     },
  //     (payload) => {
  //       console.log(payload);
  //     }
  //   );
  // };
  return (
    <main>
      {isLoading ? (
        <LoadingSpinner className="my-5" side={80} />
      ) : (
        <form className={classes.form} onSubmit={submit}>
          <FormInput
            name={name}
            ref={nameRef}
            placeholder="Full Name"
            className={classes.name}
            onChange={(e) => setName(e.target.value)}
          />
          {name === "" && reqNam && <p className="err">Username Is Required</p>}
          <FormInput
            ref={emailRef}
            type="email"
            placeholder="E-Mail"
            className={classes.email}
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          {emailcheck && emailError === 422 && <p className={classes.err}>Email Is Already Used</p>}
          <FormInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className={classes.password}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {password.length < 8 && accept && <p className={classes.err}>Password must be more than 8 charactar</p>}
          <FormInput
            ref={passwordRef}
            type="password"
            placeholder="Repeat Password"
            className={classes.password}
            value={rePassword} onChange={(e) => setRePassword(e.target.value)}
          />
          {password !== rePassword && match && <p className={classes.err}>Password doesn't matched</p>}
          <Button
            type="submit"
            // onClick={signupHanlder}
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
