import classes from "./Question.module.css";
import { faCircleUp as regVote } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleUp as solVote,
  faComments,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { repliesActions } from "../../store/replies-slice";
import { questionsActions } from "../../store/questions-slice";
import useDate from "../../hooks/use-date";
import jsonFile from "../../assets/dummy.json";

const Question = (props) => {
  const { question, specify, className } = props;
  const [toggleEdit, setToggleEdit] = useState(false);
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { date, unit } = useDate(question.date);
  const storedQuestion = useSelector((state) => state.replies.question);
  const lecture = useSelector((state) => state.questions.lecture);
  const authedUser = useSelector((state) => state.auth.user);
  const author = jsonFile.users.find((u) => u.id === question.authorId);

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
    dispatch(questionsActions.voteQuestion(question.id));
    if (storedQuestion) dispatch(repliesActions.voteQuestion());
  };

  const deleteQuestionHandler = () => {
    // POST request here
    if (specify) navigate(`/course/${courseId}/preview/${lectureId}/questions`);
    dispatch(questionsActions.removeQuestion(question.id));
    dispatch(repliesActions.setQuestion(null));
  };

  const editQuestionHandler = () => {
    if (specify) navigate(`/course/${courseId}/preview/${lectureId}/questions`);
    dispatch(questionsActions.toggleWannaAsk());
    dispatch(
      questionsActions.togglewannaEdit({
        id: question.id,
        title: question.title,
        details: question.content,
      })
    );
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
        <div className="d-flex align-items-start gap-3 position-relative">
          <div className="d-flex flex-column flex-sm-row gap-sm-3 flex-grow-1">
            <div className="flex-grow-1">
              <h5>{question.title}</h5>
              {question.content && !specify && (
                <p className="m-0 d-none d-sm-block">{question.content}</p>
              )}
              {specify && (
                <div className="mb-2">
                  <Link target="_blank" to={`/user/${author.id}`}>
                    {author.name.split(" ")[0]}
                    {lecture.authorId === author.id && " - Instructor"}
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
          {authedUser.id === question.authorId && (
            <button
              className={`border-0 fs-5 fw-bold bg-transparent px-1 ${
                classes.reaction
              } ${!specify && "mt-3"}`}
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
        {question.content && specify && (
          <p className="mb-0 mt-2 mt-sm-3">{question.content}</p>
        )}
        {!specify && (
          <div className="mt-2">
            <Link target="_blank" to={`/user/${author.id}`}>
              {author.name.split(" ")[0]}
              {lecture.authorId === author.id && " - Instructor"}
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
