import classes from "./Section.module.css";
import Lecture from "./Lecture";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Section = (props) => {
  const { videos: lectures, numOfVideos, title, totalLength } = props;
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
        <FontAwesomeIcon
          icon={faAngleDown}
          className={isListed ? classes.rotate : ""}
        />
        <h5 className="m-0">{title}</h5>
        <span className={classes.lecture}>
          {numOfVideos} lectures &bull; {totalLength}
        </span>
      </div>
      {isListed && (
        <div className={classes.details}>
          {lectures.map((lecture, index) => (
            <Lecture key={index} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Section);
