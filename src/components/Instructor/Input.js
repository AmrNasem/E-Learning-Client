import { useEffect, useRef } from "react";
import classes from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const {
    onChange,
    onDelete,
    id,
    content,
    type,
    disabled,
    removable,
    max,
    children,
    className,
  } = props;
  const inputParentRef = useRef();

  useEffect(() => {
    if (content && content.toString().length) {
      inputParentRef.current.classList.add(classes.removable);
    } else {
      inputParentRef.current.classList.remove(classes.removable);
    }
  }, [content]);

  return (
    <div
      ref={inputParentRef}
      className={`d-flex my-3 ${classes.input} ${className}`}
    >
      <div className="d-flex flex-grow-1 align-items-center gap-2">
        <input
          className="flex-grow-1 w-100 bg-transparent p-3 border-0"
          maxLength={max}
          type={type || "text"}
          value={content}
          onChange={(e) =>
            id
              ? onChange({ id, text: e.target.value })
              : onChange(e.target.value)
          }
          placeholder={children}
        />
        {max && <span className="pe-3">{max - content.toString().length}</span>}
      </div>
      {removable && (
        <button
          disabled={disabled}
          onClick={() => onDelete(id)}
          className={`p-3 bg-transparent ${classes.delete}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default Input;
