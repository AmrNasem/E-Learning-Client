import React, { useCallback, useEffect } from "react";
import classes from "./QAndA.module.css";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../store/questions-slice";
import NewQuestion from "./NewQuestion";

const questionsPerPage = 5;

const QAndA = (props) => {
  const dispatch = useDispatch();
  const {
    pageNum,
    items: questions,
    isNewQuest,
  } = useSelector((state) => state.questions);

  useEffect(() => {
    // GET request here
    if (!questions.length) {
      dispatch(
        questionsActions.getQuestions(
          props.questions.slice(0, questionsPerPage)
        )
      );
    }
  }, [dispatch, props, questions]);

  const moreQuestionsHandler = useCallback(() => {
    // GET request here
    dispatch(
      questionsActions.getQuestions(
        props.questions.slice(
          pageNum * questionsPerPage,
          (pageNum + 1) * questionsPerPage
        )
      )
    );
  }, [dispatch, props.questions, pageNum]);

  if (isNewQuest) {
    return <NewQuestion />;
  }

  return (
    <div className={classes.questions}>
      <h5>
        All questions in this lecture <span>({props.questions.length})</span>
      </h5>
      <div className="py-4">
        {questions.map((q, index) => (
          <Question key={index} {...q} />
        ))}
      </div>
      {questions < props.questions && (
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
