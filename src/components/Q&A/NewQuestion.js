import classes from "./NewQuestion.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { qnaActions } from "../../store/qna-slice";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState(false);
  const titleRef = useRef();
  const commentRef = useRef();
  const authedUser = useSelector((state) => state.auth.user);
  const isEditing = useSelector((state) => state.qna.isEditing);

  useEffect(() => {
    if (isEditing) {
      setCanSubmit(true);
      titleRef.current.value = isEditing.title;
      commentRef.current.value = isEditing.details;
    }
  }, [isEditing]);

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
    dispatch(qnaActions.addQuestion(newQuestion));
  };

  const editQuestionHandler = (e) => {
    e.preventDefault();
    // POST request here
    dispatch(
      qnaActions.editQuestion({
        id: isEditing.id,
        title: titleRef.current.value,
        details: commentRef.current.value,
      })
    );
  };

  return (
    <div className={classes.new}>
      <button
        onClick={() => {
          dispatch(qnaActions.toggleNewQuest(false));
          dispatch(qnaActions.toggleIsEditing(null));
        }}
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
          onClick={isEditing ? editQuestionHandler : addQuestionHandler}
          className={`border rounded-0 py-2 my-4 w-100 text-white ${classes.submit}`}
          disabled={!canSubmit}
          type="submit"
        >
          {isEditing ? "Edit" : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
