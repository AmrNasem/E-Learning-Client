import classes from "./Section.module.css";
import Lecture from "./Lecture";
import ArrowIcon from "../../Icons/ArrowIcon";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Section = (props) => {
  const { lectures, title, active, duration, id } = props;
  const [isListed, setIsListed] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lecId = queryParams.get("lec") || "0";

  useEffect(() => {
    if (active) {
      setIsListed(true);
    }
  }, [active]);

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
            <Lecture
              active={lecId === index.toString() && active}
              key={index}
              id={index}
              parentId={id}
              {...lecture}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
