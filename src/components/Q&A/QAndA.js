import React, { useCallback } from "react";
import classes from "./QAndA.module.css";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../store/questions-slice";
import NewQuestion from "./NewQuestion";

const questionsPerPage = 5;

const QAndA = (props) => {
  const dispatch = useDispatch();
  const { questions } = props;
  const { pageNum, isNewQuest, lecture } = useSelector(
    (state) => state.questions
  );

  const moreQuestionsHandler = useCallback(() => {
    // GET request here
    dispatch(
      questionsActions.getQuestions(
        lecture.questions.slice(
          pageNum * questionsPerPage,
          (pageNum + 1) * questionsPerPage
        )
      )
    );
  }, [dispatch, lecture, pageNum]);

  if (isNewQuest) {
    return <NewQuestion />;
  }

  return (
    <div className={classes.questions}>
      <h5>
        All questions in this lecture <span>({lecture.questions.length})</span>
      </h5>
      <div className="py-4">
        {questions.map((q, index) => (
          <Question key={index} className="px-sm-3" question={q} />
        ))}
      </div>
      {questions.length < lecture.questions.length && (
        <button
          onClick={moreQuestionsHandler}
          className={`btn p-3 w-100 rounded-0 ${classes["see-more"]}`}
        >
          See more
        </button>
      )}
      <button
        onClick={() => dispatch(questionsActions.toggleWannaAsk())}
        className={`btn rounded-0 my-3 ${classes["new-question"]}`}
      >
        Ask a new question
      </button>
    </div>
  );
};

export default QAndA;
