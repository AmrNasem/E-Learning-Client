import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisVertical,
  faCircleUp as solVote,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Answer.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDate from "../../hooks/use-date";
import jsonFile from "../../assets/dummy.json";
import { useDispatch, useSelector } from "react-redux";
import { repliesActions } from "../../store/replies-slice";
import { questionsActions } from "../../store/questions-slice";

const Answer = (props) => {
  const [isVoted, setIsVoted] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { date, unit } = useDate(props.date);
  const author = jsonFile.users.find((u) => u.id === props.authorId);
  const lecture = useSelector((state) => state.questions.lecture);
  const authedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("click", () => setToggleEdit(false));
  }, []);

  // Avatar
  const arr = author.name.split(" ");
  const avatar = `${arr[0][0]}${
    arr.length > 1 ? arr[arr.length - 1][0] : ""
  }`.toUpperCase();

  // Handlers
  const voteQuestionHandler = () => {
    // Post request here
    setIsVoted((prevState) => !prevState);
  };

  const editQuestionHandler = () => {
    dispatch(
      repliesActions.toggleWannaEdit({ id: props.id, text: props.content })
    );
  };

  const deleteQuestionHandler = () => {
    // POST request here
    dispatch(questionsActions.removeReply(props.id));
    dispatch(repliesActions.removeReply(props.id));
  };
  return (
    <div className="d-flex gap-3 py-3 px-sm-4 my-2 position-relative">
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
            <Link
              target="_blank"
              to={`/user/${author.id}`}
              className="fs-5 lh-1"
            >
              {lecture.authorId === author.id
                ? `${author.name.split(" ")[0]} - Instructor`
                : author.name}
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
      {authedUser.id === props.authorId && (
        <button
          className={`border-0 fs-5 fw-bold bg-transparent px-1 align-self-start ${classes.reaction}`}
          onClick={(e) => {
            e.stopPropagation();
            setToggleEdit((prevState) => !prevState);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="fs-5" />
        </button>
      )}
      {toggleEdit && (
        <div
          className={`d-flex flex-column gap-1 position-absolute bg-white p-1 rounded-2 ${classes.settings}`}
        >
          <button onClick={editQuestionHandler} className="btn border-0">
            Edit
          </button>
          <button onClick={deleteQuestionHandler} className="btn border-0">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Answer);
