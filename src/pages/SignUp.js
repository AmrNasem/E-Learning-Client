import Button from "../components/UI/Button";
import FormInput from "../components/UI/FormInput";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  return (
    <main>
      <form className={classes.form}>
        <FormInput placeholder="Full Name" className={classes.name}/>
        <FormInput type="email" placeholder="E-Mail" className={classes.email}/>
        <FormInput type="password" placeholder="Password" className={classes.password}/>
        <Button type="submit" className={classes.signup}>Sign Up</Button>
        <div className={classes.note}>
          <p>
            Already have an account?<Link to="/login" className={classes.link}><span> Login</span></Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
