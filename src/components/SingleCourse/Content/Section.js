import classes from "./Section.module.css";
import Lecture from "./Lecture";
import ArrowIcon from "../../Icons/ArrowIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Section = (props) => {
  const { lectures, title, duration } = props;
  const [isListed, setIsListed] = useState(false);
  const { lectureId } = useParams();

  useEffect(() => {
    if (lectures.find((lec) => lec.id === lectureId)) setIsListed(true);
  }, [lectureId, lectures]);

  return (
    <div className={`${classes.section} ${props.className}`}>
      <div
        onClick={() => setIsListed((prevState) => !prevState)}
        className={classes["section-header"]}
      >
        <ArrowIcon className={isListed ? classes.rotate : ""} />
        <h5 className="m-0">{title}</h5>
        <span className={classes.lecture}>
          {lectures.length} lectures &bull; {duration}
        </span>
      </div>
      {isListed && (
        <div className={classes.details}>
          {lectures.map((lecture, index) => (
            <Lecture key={index} {...lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
