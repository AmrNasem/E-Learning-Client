import classes from "./BackwardIcon.module.css";

const BackwardIcon = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.backward} ${props.className}`}
    >
      <span></span>
    </div>
  );
};

export default BackwardIcon;
