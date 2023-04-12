import classes from "./Section.module.css";
import Lecture from "./Lecture";
import ArrowIcon from "../../Icons/ArrowIcon";
import { courseActions } from "../../../store/course-slice";
import { useDispatch, useSelector } from "react-redux";

const Section = (props) => {
  const { lectures, id } = props;
  const isListed = useSelector((state) => state.course.isListed);
  const dispatch = useDispatch();

  return (
    <div className={classes.section}>
      <div
        onClick={() => dispatch(courseActions.expandSection(id))}
        className={classes["section-header"]}
      >
        <ArrowIcon />
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
