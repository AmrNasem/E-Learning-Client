import Button from "../components/UI/Button";
import FormInput from "../components/UI/FormInput";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  return (
    <main>
      <form>
        <FormInput placeholder="Full Name" />
        <FormInput type="email" placeholder="E-Mail" />
        <FormInput type="password" placeholder="Password" />
        <Button type="submit">Sign Up</Button>
      </form>
      <div className={classes.note}>
        <p>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
