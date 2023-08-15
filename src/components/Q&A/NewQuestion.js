import classes from "./NewQuestion.module.css";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../store/questions-slice";
import { useRef, useState } from "react";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState(false);
  const titleRef = useRef();
  const commentRef = useRef();
  const authedUser = useSelector((state) => state.auth.user);

  const validationHandler = () => {
    if (titleRef.current.value.trim() !== "") {
      setCanSubmit(true);
      return;
    }
    setCanSubmit(false);
  };

  const addQuestionHandler = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: Math.random().toString(),
      photo: authedUser.avatar,
      authorId: authedUser.id,
      title: titleRef.current.value,
      content: commentRef.current.value,
      date: new Date().getTime(),
      likes: 0,
      replies: [],
    };
    // POST request here
    dispatch(questionsActions.addQuestion(newQuestion));
  };

  return (
    <div className={classes.new}>
      <button
        onClick={() => dispatch(questionsActions.toggleWannaAsk())}
        className={`btn rounded-0 my-3 px-3 py-2 ${classes["back-to-questions"]}`}
      >
        Back to questions
      </button>
      <div className={`p-3 ${classes.tips}`}>
        <h5>Tips on getting your questions answered faster</h5>
        <ul>
          <li>Search to see if your question has been asked before</li>
          <li>
            Be detailed: provide screenshots, error messages, code, or other
            clues whenever possible
          </li>
          <li>Check grammar and spelling</li>
        </ul>
      </div>
      <form>
        <label htmlFor="title" className="mt-4">
          Title or summary
        </label>
        <input
          id="title"
          autoFocus
          onChange={validationHandler}
          ref={titleRef}
          className="form-control shadow-none rounded-0 my-2"
          type="text"
          placeholder="e.g. Why do we use fit_transform() for training_set?"
        />
        <label htmlFor="comment" className="mt-3">
          Details (Optional)
        </label>
        <textarea
          id="comment"
          ref={commentRef}
          className="form-control shadow-none rounded-0 my-2"
          type="text"
          placeholder="e.g. I didn't understand this part. Here is a screenshot of what I tried"
        ></textarea>
        <button
          onClick={addQuestionHandler}
          className={`border rounded-0 py-2 my-4 w-100 text-white ${classes.submit}`}
          disabled={!canSubmit}
          type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
