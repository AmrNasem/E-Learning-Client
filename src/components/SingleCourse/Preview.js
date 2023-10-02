import classes from "./Preview.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Preview = ({ thumbnail, className }) => {
  return (
    <Link to={`preview/1`} className={`${classes.preview} ${className}`}>
      <div className={classes.overlay}>
        <FontAwesomeIcon icon={faPlayCircle} />
        <h5>Preview this course</h5>
      </div>
      <img src={thumbnail} alt="Thumbnail" />
    </Link>
  );
};

export default React.memo(Preview);
