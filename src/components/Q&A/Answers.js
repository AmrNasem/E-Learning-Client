import { useNavigate, useParams } from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";
import React, { useEffect, useRef, useState } from "react";
import classes from "./Answers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { repliesActions } from "../../store/replies-slice";
import { questionsActions } from "../../store/questions-slice";

const answersPerPage = 3;

const Answers = (props) => {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const responseRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const {
    question,
    items: replies,
    pageNum,
  } = useSelector((state) => state.replies);
  const mainQuestion = props.questions.find((q) => q.id === questionId);
  const authedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!question || question.id !== questionId) {
      // GET request here
      dispatch(repliesActions.setQuestion(mainQuestion));
      dispatch(
        repliesActions.getReplies(mainQuestion.replies.slice(0, answersPerPage))
      );
    }
  }, [dispatch, question, questionId, mainQuestion]);

  if (!question) return <h2>Loading...</h2>;

  // Handlers
  const moreRepliesHandler = () => {
    // GET request here
    dispatch(
      repliesActions.getReplies(
        question.replies.slice(
          pageNum * answersPerPage,
          (pageNum + 1) * answersPerPage
        )
      )
    );
  };

  const addReplyHandler = (e) => {
    // POST request here
    e.preventDefault();
    const reply = {
      id: Math.random().toString(),
      photo: authedUser.avatar,
      authorId: authedUser.id,
      date: new Date().getTime(),
      isVoted: false,
      likes: 0,
      content: responseRef.current.value,
    };
    responseRef.current.value = "";
    setIsValid(false);
    dispatch(questionsActions.addReply({ id: question.id, reply: reply }));
    dispatch(repliesActions.addReply(reply));
  };

  const validationHandler = () => {
    if (responseRef.current.value.trim().length > 0) setIsValid(true);
    else setIsValid(false);
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
        {question.replies.length === 0
          ? "Be the first one to reply"
          : `${question.replies.length} ${
              question.replies.length === 1 ? "reply" : "replies"
            }`}
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
