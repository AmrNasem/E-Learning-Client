import { useNavigate, useParams } from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";
import React, { useEffect, useRef, useState } from "react";
import classes from "./Answers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { qnaActions } from "../../store/qna-slice";
import NewQuestion from "./NewQuestion";
import LoadingSpinner from "../UI/LoadingSpinner";

const answersPerPage = 3;

const Answers = (props) => {
  const dispatch = useDispatch();
  const { courseId, lectureId, questionId } = useParams();
  const responseRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const { isNewQuest, isEditing, activeQuestion, replies } = useSelector(
    (state) => state.qna
  );
  const mainQuestion = props.questions.find((q) => q.id === questionId);
  const authedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && !isNewQuest) {
      setIsValid(true);
      responseRef.current.value = isEditing.text;
      responseRef.current.focus();
    } else {
      if (responseRef.current) {
        responseRef.current.value = "";
        responseRef.current.blur();
      }
      setIsValid(false);
    }
  }, [isEditing, isNewQuest]);

  useEffect(() => {
    if (!activeQuestion || activeQuestion.id !== questionId) {
      // GET request here
      if (!mainQuestion) return;
      dispatch(qnaActions.setActiveQuestion(questionId));
      dispatch(qnaActions.getReplies(answersPerPage));
    }
  }, [dispatch, activeQuestion, questionId, mainQuestion]);

  if (!mainQuestion) return <h2>Question Not Found</h2>;
  if (!activeQuestion) return <LoadingSpinner />;

  // Handlers
  const moreRepliesHandler = () => {
    // GET request here
    dispatch(qnaActions.getReplies(answersPerPage));
  };

  const addReplyHandler = (e) => {
    e.preventDefault();
    if (!authedUser) {
      navigate("/login");
      return;
    }
    // POST request here
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
    dispatch(qnaActions.addReply({ id: activeQuestion.id, reply: reply }));
  };

  const editReplyHandler = (e) => {
    e.preventDefault();
    if (!authedUser) {
      navigate("/login");
      return;
    }
    // POST request here
    dispatch(
      qnaActions.editReply({
        questionId: activeQuestion.id,
        id: isEditing.id,
        text: responseRef.current.value,
      })
    );
    responseRef.current.value = "";
    setIsValid(false);
  };

  const validationHandler = () => {
    if (responseRef.current.value.trim().length > 0) setIsValid(true);
    else setIsValid(false);
  };

  if (isEditing && isNewQuest) return <NewQuestion />;

  return (
    <div>
      <button
        className={`btn rounded-0 py-3 px-3 ${classes["back-to-questions"]}`}
        onClick={() =>
          navigate(`/course/${courseId}/preview/${lectureId}/questions`)
        }
      >
        Back to all questions
      </button>
      <Question
        specify
        question={activeQuestion}
        className={`px-2 ${classes.question}`}
      />
      <h5>
        {activeQuestion.replies.length === 0
          ? "Be the first one to reply"
          : `${activeQuestion.replies.length} ${
              activeQuestion.replies.length === 1 ? "reply" : "replies"
            }`}
      </h5>
      <div>
        {replies.map((reply, index) => (
          <Answer key={index} {...reply} />
        ))}
      </div>
      {replies.length < activeQuestion.replies.length && (
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
          onClick={isEditing ? editReplyHandler : addReplyHandler}
          disabled={!isValid}
        >
          {isEditing ? "Edit reply" : "Reply"}
        </button>
      </form>
    </div>
  );
};

export default React.memo(Answers);
