import Button from "../components/UI/Button";
import FormInput from "../components/UI/FormInput";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <main>
      <form>
        <FormInput type="email" placeholder="E-Mail" />
        <FormInput type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
      <div className={classes.note}>
        <p>
          Don't have an account?<Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
