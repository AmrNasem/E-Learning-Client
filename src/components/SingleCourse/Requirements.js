import React from "react";
import classes from "./Requirements.module.css";

const Requirements = (props) => {
  const { requirements } = props;

  return (
    <div className={classes.requirements}>
      <h2>Requirements</h2>
      <ul>
        {requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Requirements);
