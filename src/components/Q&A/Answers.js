import { useNavigate, useParams } from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Answers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { repliesActions } from "../../store/replies-slice";
import { questionsActions } from "../../store/questions-slice";

const questionsPerPage = 3;

const Answers = (props) => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const responseRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const {
    question,
    items: replies,
    pageNum,
  } = useSelector((state) => state.replies);
  const navigate = useNavigate();

  useEffect(() => {
    // GET request here
    if (!question.replies) {
      dispatch(
        repliesActions.resetReplies(
          props.questions.find((q) => q.id === questionId)
        )
      );
    }
  }, [dispatch, question, questionId, props]);

  const moreRepliesHandler = useCallback(() => {
    // GET request here
    dispatch(
      repliesActions.getReplies(
        question.replies.slice(
          pageNum * questionsPerPage,
          (pageNum + 1) * questionsPerPage
        )
      )
    );
  }, [dispatch, question, pageNum]);

  if (!question.replies) return <h2>Loading...</h2>;

  const validationHandler = () => {
    if (responseRef.current.value.trim().length > 0) setIsValid(true);
    else setIsValid(false);
  };

  const addReplyHandler = (e) => {
    e.preventDefault();
    // POST request here
    const reply = {
      photo: null,
      name: "Amr",
      date: new Date().getTime(),
      isVoted: false,
      likes: 0,
      content: responseRef.current.value,
    };
    responseRef.current.value = "";
    setIsValid(false);
    dispatch(questionsActions.addReply({ id: question.id, reply: reply })); // This line will be omitted when the backend exists
    dispatch(repliesActions.addReply(reply));
  };

  return (
    <div>
      <button
        className={`btn rounded-0 py-3 px-3 ${classes["back-to-questions"]}`}
        onClick={() => navigate(-1)}
      >
        Back to all questions
      </button>
      <Question
        specify
        question={question}
        className={`px-2 ${classes.question}`}
      />
      <h5>
        {question.replies.length}{" "}
        {question.replies.length > 1 ? "replies" : "reply"}
      </h5>
      <div>
        {replies.map((reply, index) => (
          <Answer key={index} {...reply} />
        ))}
      </div>
      {replies.length < question.replies.length && (
        <button
          onClick={moreRepliesHandler}
          className={`btn p-3 w-100 rounded-0 ${classes["see-more"]}`}
        >
          See more
        </button>
      )}
      <form className={`text-end ${classes.reply}`}>
        <textarea
          onChange={validationHandler}
          ref={responseRef}
          type="text"
          className="form-control shadow-none rounded-0 mt-4 text-wrap py-2"
          placeholder="Write your response.."
        ></textarea>
        <button
          type="submit"
          className="text-white rounded-0 px-3 py-2 my-2 fs-5 my-3"
          onClick={addReplyHandler}
          disabled={!isValid}
        >
          Reply
        </button>
      </form>
    </div>
  );
};

export default React.memo(Answers);
