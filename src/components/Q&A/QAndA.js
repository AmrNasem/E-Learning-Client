import React, { useCallback } from "react";
import classes from "./QAndA.module.css";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import NewQuestion from "./NewQuestion";
import { qnaActions } from "../../store/qna-slice";
import { useNavigate } from "react-router";

const questionsPerPage = 5;

const QAndA = () => {
  const dispatch = useDispatch();
  const { lecture, isNewQuest, questions, isEditing } = useSelector(
    (state) => state.qna
  );
  const authedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const moreQuestionsHandler = useCallback(() => {
    // GET request here
    dispatch(qnaActions.getQuestions(questionsPerPage));
  }, [dispatch]);

  if (lecture) console.log(lecture.videoQuestions);

  if (isNewQuest || (isNewQuest && isEditing)) {
    return <NewQuestion />;
  }

  return (
    <div className={classes.questions}>
      <h5>
        All questions in this lecture{" "}
        <span>({lecture.videoQuestions.length})</span>
      </h5>
      <div className="py-4">
        {questions.map((q, index) => (
          <Question key={index} className="px-sm-3" question={q} />
        ))}
      </div>
      {questions.length < lecture.videoQuestions.length && (
        <button
          onClick={moreQuestionsHandler}
          className={`btn p-3 w-100 rounded-0 ${classes["see-more"]}`}
        >
          See more
        </button>
      )}
      <button
        onClick={() =>
          authedUser
            ? dispatch(qnaActions.toggleNewQuest(true))
            : navigate("/login")
        }
        className={`btn rounded-0 my-3 ${classes["new-question"]}`}
      >
        Ask a new question
      </button>
    </div>
  );
};

export default QAndA;
