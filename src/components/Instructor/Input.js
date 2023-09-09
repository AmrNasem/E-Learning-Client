import { useEffect, useRef } from "react";
import classes from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const { setValues, id, text, disabled, removable, max, children, className } =
    props;
  const inputRef = useRef();
  const inputParentRef = useRef();

  useEffect(() => {
    if (text && text.length) {
      inputParentRef.current.classList.add(classes.removable);
    } else {
      inputParentRef.current.classList.remove(classes.removable);
    }
  }, [text]);

  const changeValueHandler = () => {
    setValues((prevState) =>
      prevState.map((item) => {
        if (item.id === id) item.text = inputRef.current.value;
        return item;
      })
    );
  };

  return (
    <div
      ref={inputParentRef}
      className={`d-flex my-3 ${classes.input} ${className}`}
    >
      <div className="d-flex flex-grow-1 align-items-center gap-2">
        <input
          className="flex-grow-1 bg-transparent p-3 border-0"
          maxLength={max}
          type="text"
          value={text}
          onChange={changeValueHandler}
          ref={inputRef}
          placeholder={children}
        />
        {max && <span className="pe-3">{max - text.length}</span>}
      </div>
      {removable && (
        <button
          disabled={disabled}
          onClick={() =>
            setValues((prevState) => prevState.filter((text) => text.id !== id))
          }
          className={`p-3 bg-transparent ${classes.delete}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default Input;
