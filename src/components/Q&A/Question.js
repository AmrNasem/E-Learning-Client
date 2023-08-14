import classes from "./Question.module.css";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUp as solVote,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { repliesActions } from "../../store/replies-slice";
import { questionsActions } from "../../store/questions-slice";
import useDate from "../../hooks/use-date";

const Question = (props) => {
  const { question, specify, className } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { date, unit } = useDate(question.date);
  const storedQuestion = useSelector((state) => state.replies.question);

  // Avatar
  const arr = question.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Handlers
  const voteQuestionHandler = () => {
    // Post request here
    dispatch(questionsActions.voteQuestion(question.id));
    if (storedQuestion) dispatch(repliesActions.voteQuestion());
  };

  return (
    <div className={`my-3 d-flex gap-4 py-3 ${classes.question} ${className}`}>
      <div>
        {question.photo ? (
          <img src={question.photo} alt="" />
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
            <h5>{question.title}</h5>
            {question.content && !specify && (
              <p className="m-0 d-none d-sm-block">{question.content}</p>
            )}
            {specify && (
              <div className="mb-2">
                <Link target="_blank" to="/">
                  {question.name}
                </Link>{" "}
                <strong>.</strong>{" "}
                <span className={classes.date}>
                  {date} {date > 1 ? unit : unit.slice(0, unit.length - 1)}
                </span>
              </div>
            )}
          </div>
          <div className="d-flex flex-sm-column align-items-center gap-2">
            <button
              className={`d-flex align-items-center gap-2 border-0 fs-5 fw-bold bg-transparent ${classes.reaction}`}
              onClick={voteQuestionHandler}
            >
              <span>{question.likes}</span>
              <FontAwesomeIcon icon={question.isVoted ? solVote : regVote} />
            </button>
            {!specify && (
              <button
                className={`d-flex align-items-center gap-2 border-0 fs-5 fw-bold bg-transparent ${classes.reaction}`}
                onClick={() => navigate(question.id)}
              >
                <span>{question.replies.length}</span>
                <FontAwesomeIcon icon={faComments} />
              </button>
            )}
          </div>
        </div>
        {question.content && specify && (
          <p className="mb-0 mt-2 mt-sm-3">{question.content}</p>
        )}
        {!specify && (
          <div className="mt-2">
            <Link target="_blank" to="/">
              {question.name}
            </Link>{" "}
            <strong>.</strong>{" "}
            <span className={classes.date}>
              {date} {date > 1 ? unit : unit.slice(0, unit.length - 1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Question);
