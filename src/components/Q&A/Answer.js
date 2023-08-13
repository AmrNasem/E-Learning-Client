import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import { faCircleUp as solVote } from "@fortawesome/free-solid-svg-icons";
import classes from "./Answer.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDate from "../../hooks/use-date";

const Answer = (props) => {
  const [isVoted, setIsVoted] = useState(false);
  const { date, unit } = useDate(props.date);

  // Avatar
  const arr = props.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Handlers
  const voteQuestionHandler = () => {
    // Post request here
    setIsVoted((prevState) => !prevState);
  };
  return (
    <div className="d-flex gap-3 py-3 px-sm-4 my-2">
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
        <div className="d-flex align-items-start flex-wrap gap-2">
          <div className="flex-grow-1">
            <Link target="_blank" to="/" className="fs-5 lh-1">
              {props.name}
            </Link>
            <span className={`d-block mt-1 ${classes.date}`}>
              {date} {date > 1 ? unit : unit.slice(0, unit.length - 1)}
            </span>
          </div>
          <button
            className={`border-0 fs-5 fw-bold bg-transparent ${classes.reaction}`}
            onClick={voteQuestionHandler}
          >
            <span>{isVoted ? props.likes + 1 : props.likes}</span>
            <FontAwesomeIcon
              className="ms-2"
              icon={isVoted ? solVote : regVote}
            />
          </button>
        </div>
        <p className={`mb-0 mt-3 ${classes.content}`}>{props.content}</p>
      </div>
    </div>
  );
};

export default React.memo(Answer);
