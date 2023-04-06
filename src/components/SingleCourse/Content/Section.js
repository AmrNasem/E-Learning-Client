import classes from "./Section.module.css";
import Lecture from "./Lecture";

const Section = (props) => {
  const lectures = props.lectures;
  return (
    <div className={classes.section}>
      <div className={classes["section-header"]}>
        <i></i>
        <h4>{props.title}</h4>
        <span>
          {lectures.length} lectures &bull; {props.duration}
        </span>
      </div>
      <div>
        {lectures.map((lecture, index) => (
          <Lecture key={index} {...lecture} />
        ))}
      </div>
    </div>
  );
};

export default Section;
