import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ side = 80, className }) => {
  return (
    <div
      style={{ width: `${side}px`, height: `${side}px` }}
      className={`${classes.loading} ${className}`}
    ></div>
  );
};

export default LoadingSpinner;
