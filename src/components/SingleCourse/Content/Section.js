import classes from "./Section.module.css";
import Lecture from "./Lecture";
import ArrowIcon from "../../Icons/ArrowIcon";
import { useState } from "react";

const Section = (props) => {
  const { lectures } = props;
  const [isListed, setIsListed] = useState(false);

  return (
    <div className={classes.section}>
      <div
        onClick={() => setIsListed((prevState) => !prevState)}
        className={classes["section-header"]}
      >
        <ArrowIcon className={isListed ? classes.rotate : ""} />
        <h4>{props.title}</h4>
        <span>
          {lectures.length} lectures &bull; {props.duration}
        </span>
      </div>
      {isListed && (
        <div>
          {lectures.map((lecture, index) => (
            <Lecture key={index} {...lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
