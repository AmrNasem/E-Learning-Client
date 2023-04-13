import classes from "./ArrowIcon.module.css";

const ArrowIcon = (props) => {
  return (
    <span className={`${classes["arrow-icon"]} ${props.className}`}></span>
  );
};

export default ArrowIcon;
