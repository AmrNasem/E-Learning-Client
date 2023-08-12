import classes from "./Question.module.css";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUp as solVote,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Question = (props) => {
  const [isVoted, setIsVoted] = useState(false);
  const navigate = useNavigate();

  // Avatar
  const arr = props.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Date
  const units = useMemo(
    () => [
      { val: 60, unit: "Seconds" },
      { val: 60, unit: "Minutes" },
      { val: 24, unit: "Hours" },
      { val: 30, unit: "Days" },
      { val: 12, unit: "Months" },
    ],
    []
  );

  const [date, setDate] = useState({
    val: (new Date().getTime() - new Date(props.date).getTime()) / 31104000000,
    unit: "Years",
  });

  useEffect(() => {
    if (Math.floor(date.val) === 0) {
      const unit = units.pop();
      if (unit)
        setDate((prevState) => {
          return { val: prevState.val * unit.val, unit: unit.unit };
        });
      else setDate({ val: 1, unit: "Seconds" });
    }
  }, [date, units]);

  // Handlers
  const voteQuestionHandler = () => {
    // Post request here
    setIsVoted((prevState) => !prevState);
  };

  return (
    <div className={`my-4 d-flex gap-4 py-3 px-sm-4 px-2 ${classes.question}`}>
      <div>
        {props.photo ? (
          <img src={props.photo} alt="" />
        ) : (
          <span
            className={`text-white rounded-circle d-flex align-items-center justify-content-center ${classes.avatar}`}
          >
            {avatar}
          </span>
        )}
      </div>
      <div className="flex-grow-1">
        <div className="d-flex flex-column flex-sm-row gap-sm-3">
          <div className="flex-grow-1">
            <h5>{props.title}</h5>
            {props.content && (
              <p className="m-0 d-none d-sm-block">{props.content}</p>
            )}
          </div>
          <div>
            <button
              className={`d-sm-block border-0 fs-5 fw-bold my-2 ms-2 bg-transparent ${classes.reaction}`}
              onClick={voteQuestionHandler}
            >
              <span>{isVoted ? props.likes + 1 : props.likes}</span>
              <FontAwesomeIcon
                className="ms-2"
                icon={isVoted ? solVote : regVote}
              />
            </button>
            <button
              className={`d-sm-block border-0 fs-5 fw-bold my-2 ms-2 bg-transparent ${classes.reaction}`}
              onClick={() => navigate(props.id)}
            >
              <span>{props.replies.length}</span>
              <FontAwesomeIcon className="ms-2" icon={faComments} />
            </button>
          </div>
        </div>
        <div>
          <Link to="/">{props.name}</Link> .{" "}
          <span>
            {Math.floor(date.val)}{" "}
            {Math.floor(date.val) > 1
              ? date.unit
              : date.unit.slice(0, date.unit.length - 1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Question;
