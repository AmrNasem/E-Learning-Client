import React from "react";
import classes from "./Description.module.css";

const Description = (props) => {
  const { description } = props;
  return (
    <div className={classes.description}>
      <h2>Description</h2>
      <p>{description}</p>
    </div>
  );
};

export default React.memo(Description);
