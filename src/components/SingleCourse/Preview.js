import classes from "./Preview.module.css";
import PlayIcon from "../Icons/PlayIcon";
import { Link } from "react-router-dom";
import React from "react";

const Preview = ({ thumbnail, className }) => {
  return (
    <Link to={`preview/1`} className={`${classes.preview} ${className}`}>
      <div className={classes.overlay}>
        <span>
          <PlayIcon />
        </span>
        <h5>Preview this course</h5>
      </div>
      <img src={thumbnail} alt="Thumbnail" />
    </Link>
  );
};

export default React.memo(Preview);
