import classes from "./Question.module.css";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUp as solVote,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const Question = (props) => {
  const [isVoted, setIsVoted] = useState(false);
  // Avatar
  const arr = props.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Date
  const diff = new Date().getTime() - new Date(props.date).getTime();
  const secs = Math.floor(diff / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const units = [
    { val: secs, unit: "Seconds" },
    { val: mins, unit: "Minutes" },
    { val: hours, unit: "Hours" },
    { val: days, unit: "Days" },
    { val: months, unit: "Months" },
    { val: years, unit: "Years" },
  ];
  let questionDate = units.pop();
  while (questionDate.val <= 0) {
    questionDate = units.pop();
  }

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
            <p className="m-0 d-none d-sm-block">{props.content}</p>
          </div>
          <div>
            <button
              className={`d-sm-block border-0 fs-5 fw-bold my-2 ms-2 bg-transparent ${classes.reaction}`}
              onClick={() => setIsVoted((prevState) => !prevState)}
            >
              <span>{isVoted ? props.likes + 1 : props.likes}</span>
              <FontAwesomeIcon
                className="ms-2"
                icon={isVoted ? solVote : regVote}
              />
            </button>
            <button
              className={`d-sm-block border-0 fs-5 fw-bold my-2 ms-2 bg-transparent ${classes.reaction}`}
            >
              <span>{props.replies.length}</span>
              <FontAwesomeIcon className="ms-2" icon={faCommentAlt} />
            </button>
          </div>
        </div>
        <div>
          <Link to="/">{props.name}</Link> .{" "}
          <span>
            {questionDate.val}{" "}
            {questionDate.val > 1
              ? questionDate.unit
              : questionDate.unit.slice(0, questionDate.unit.length - 1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Question;
