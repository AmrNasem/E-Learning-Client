import { memo } from "react";
import classes from "./PageBox.module.css";

const PageBox = (props) => {
  return (
    <div className={`${props.className} flex-grow-1 ${classes.box}`}>
      <h3>{props.title}</h3>
      <div className="p-4 p-md-5">{props.children}</div>
    </div>
  );
};

export default memo(PageBox);
