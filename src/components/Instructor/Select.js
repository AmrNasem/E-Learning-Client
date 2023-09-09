import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  const { defaultValue, options, className, onChange, reverse } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    window.addEventListener("click", () => setIsOpen(false));
  }, []);

  return (
    <div className={`${className} position-relative`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prevState) => !prevState);
        }}
        className={`d-flex align-items-center gap-2 w-100 p-3 justify-content-between h-100 btn rounded-0 ${classes.button}`}
      >
        <h5 className="mb-0  text-nowrap">{selected.text}</h5>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      {isOpen && (
        <div
          className={`${classes.options} ${
            reverse ? classes["bottom-to-top"] : classes["top-to-bottom"]
          } position-absolute w-100 p-2 bg-white`}
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
