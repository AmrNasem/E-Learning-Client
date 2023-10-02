import classes from "./Lecture.module.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";

const Lecture = (props) => {
  const { type, available, id, title, length } = props.lecture;
  const { courseId, lectureId } = useParams();

  let icon = <FontAwesomeIcon icon={faPlay} />;
  if (type === "article") {
    icon = <FontAwesomeIcon icon={faFileAlt} />;
  }

  if (available) {
    return (
      <Link
        className={`d-flex align-items-center gap-1 p-1 rounded-1 mt-2 ${
          lectureId === id && classes.active
        }`}
        to={`/course/${courseId}/preview/${id}`}
      >
        {icon}
        <p className="m-0 flex-grow-1">{title}</p>
        <span>{length}</span>
      </Link>
    );
  }

  return (
    <div className="d-flex align-items-center gap-1 p-1 rounded-1 mt-2">
      {icon}
      <p className="m-0 flex-grow-1">{title}</p>
      <span>{length}</span>
    </div>
  );
};

export default React.memo(Lecture);
