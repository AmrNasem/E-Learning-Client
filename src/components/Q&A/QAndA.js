import { useState } from "react";
import classes from "./QAndA.module.css";
import Question from "./Question";

const questionsPerPage = 5;

const QAndA = (props) => {
  const [questions, setQuestions] = useState({
    page: 1,
    items: props.questions.slice(0, questionsPerPage),
  });

  const moreQuestionsHandler = () => {
    setQuestions((prevState) => {
      return {
        page: prevState.page + 1,
        items: [
          ...prevState.items,
          ...props.questions.slice(
            prevState.page * questionsPerPage,
            (prevState.page + 1) * questionsPerPage
          ),
        ],
      };
    });
  };

  return (
    <div className={classes.questions}>
      <h5>
        All questions in this lecture <span>({props.questions.length})</span>
      </h5>
      <div className="py-4">
        {questions.items.map((q, index) => (
          <Question key={index} {...q} />
        ))}
      </div>
      {questions.items < props.questions && (
        <button
          onClick={moreQuestionsHandler}
          className={`btn p-3 w-100 rounded-0 ${classes["see-more"]}`}
        >
          See more
        </button>
      )}
    </div>
  );
};

export default QAndA;
