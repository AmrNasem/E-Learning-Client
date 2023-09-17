import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  const { defaultValue, options, className, onChange, reverse } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const listRef = useRef();

  // console.log(selected);

  const closeSelect = useCallback(() => {
    if (listRef.current) {
      listRef.current.classList.add(classes["show-down"]);
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [listRef]);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    window.addEventListener("click", closeSelect);
  }, [closeSelect]);

  return (
    <div className={`${className} position-relative`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) {
            closeSelect();
          } else setIsOpen(true);
        }}
        className={`d-flex align-items-center gap-2 w-100 p-3 justify-content-between h-100 btn rounded-0 ${classes.button}`}
      >
        <h5 className="mb-0  text-nowrap">{selected.text}</h5>
        {reverse ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </button>
      {isOpen && (
        <div
          ref={listRef}
          className={`${classes.options} ${
            reverse ? classes["bottom-to-top"] : classes["top-to-bottom"]
          } position-absolute w-100 p-1 bg-white`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelected(option)}
              className="d-block w-100 text-start border-0 p-2 btn"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Select);
