import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "./InstructorHeader.module.css";

const InstructorHeader = (props) => {
  const authedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <header>
      <Link to="/instructor" className={`d-block ${classes.logo}`}>
        E-Learning
      </Link>
      <div className="d-flex gap-2">
        <button
          className={`btn border-0 ${classes.student}`}
          onClick={() => navigate("/")}
        >
          Student
        </button>
        <button
          className={`cursor-pointer border-0 text-white fw-bold rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
        >
          {authedUser.name.split(" ")[0][0]}
        </button>
      </div>
    </header>
  );
};

export default InstructorHeader;
