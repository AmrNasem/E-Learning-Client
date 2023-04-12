import classes from "./Section.module.css";
import Lecture from "./Lecture";
import ArrowIcon from "../../Icons/ArrowIcon";

const Section = (props) => {
  const lectures = props.lectures;
  return (
    <div className={classes.section}>
      <div className={classes["section-header"]}>
        <ArrowIcon />
        <h4>{props.title}</h4>
        <span className={classes.lecture}>
          {lectures.length} lectures &bull; {props.duration}
        </span>
      </div>
      <div className={classes.details}>
        {lectures.map((lecture, index) => (
          <Lecture key={index} {...lecture} />
        ))}
      </div>
    </div>
  );
};

export default Section;
