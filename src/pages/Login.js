import Button from "../components/UI/Button";
import FormInput from "../components/UI/FormInput";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <main>
      <form className={classes.form}>
        <FormInput type="email" placeholder="E-Mail" className={classes.email}/>
        <FormInput type="password" placeholder="Password" className={classes.password}/>
        <Button className={classes.login} type="submit">Login</Button>
      
      <div className={classes.note}>
        <p>
          Don't have an account?<Link to="/signup" className={classes.link}><span> Sign Up</span></Link>
        </p>
      </div>
      </form>
    </main>
  );
};

export default Login;
