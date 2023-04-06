import classes from "./ForwardIcon.module.css";

const ForwardIcon = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.forward} ${props.className}`}
    >
      <span></span>
    </div>
  );
};

export default ForwardIcon;
