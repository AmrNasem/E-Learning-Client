import { useEffect, useRef, useState } from "react";
import classes from "./Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Form = (props) => {
  const inputRef = useRef();
  const {
    edit,
    type,
    emptySection,
    order,
    setIsEditing,
    setIsAdding,
    onEditHandler,
    onAddHandler,
  } = props;
  const [inputLength, setInputLength] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (edit) {
      inputRef.current.value = edit.title;
      setInputLength(edit.title.length);
    }
  }, [edit]);

  useEffect(() => {
    inputRef.current.focus();
    setIsValid(inputRef.current.value.trim().length < 3);
  }, []);

  const changeValueHandler = () => {
    setIsValid(inputRef.current.value.trim().length < 3);
    setInputLength(inputRef.current.value.length);
  };

  const editHandler = (e) => {
    e.preventDefault();
    onEditHandler({
      title: inputRef.current.value,
      id: edit.id,
    });
    setIsEditing(false);
  };

  const addHandler = (e) => {
    e.preventDefault();
    onAddHandler({
      title: inputRef.current.value,
      id: Math.random().toString(),
    });
    setIsAdding(false);
  };

  return (
    <form className={`p-2 my-3 ${classes.form}`}>
      <div className="d-flex gap-2 flex-column align-items-md-center flex-md-row">
        <label className="d-flex gap-2 fw-bold align-items-center">
          {edit && type === "Lecture" && (
            <FontAwesomeIcon icon={faCheckCircle} />
          )}
          {edit
            ? `${type}${!emptySection ? ` ${order + 1}` : ""}`
            : `New ${type}`}
          :
        </label>
        <div
          className={`d-flex flex-grow-1 align-items-center ${classes.input}`}
        >
          <input
            ref={inputRef}
            maxLength={80}
            onChange={changeValueHandler}
            className="flex-grow-1 p-2 border-0 bg-transparent"
            placeholder="Enter a title"
            type="text"
          />
          <span className="p-2">{80 - inputLength}</span>
        </div>
      </div>
      <div className="text-end mt-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (edit) setIsEditing(false);
            else setIsAdding(false);
          }}
          type="button"
          className="px-2 py-1 bg-transparent me-3 border-0"
        >
          Cancel
        </button>
        <button
          onClick={edit ? editHandler : addHandler}
          disabled={isValid}
          className={`px-2 py-1 text-white ${classes.add}`}
        >
          {edit ? "Save" : "Add"} {type}
        </button>
      </div>
    </form>
  );
};

export default Form;
