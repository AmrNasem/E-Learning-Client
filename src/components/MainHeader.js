import { Link, useNavigate } from "react-router-dom";
import classes from "./MainHeader.module.css";
import Button from "./UI/Button";

const MainHeader = (props) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className={classes.logo}>
        <Link to="/">E-Learning</Link>
      </div>
      <button className={classes.categories}>Categories</button>
      <div className={classes.search}>
        <i></i>
        <form>
          <input type="search" placeholder="Search for anything" />
        </form>
      </div>
      <div className={classes.cart}>
        <i></i>
        <span>Your Cart</span>
        <span>0</span>
      </div>
      <div className={classes.actions}>
        <Button onClick={() => navigate("/login")} className={classes.login}>
          Log in
        </Button>
        <Button onClick={() => navigate("/signup")} className={classes.signup}>
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
