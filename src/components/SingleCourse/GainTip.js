import CheckIcon from "../Icons/CheckIcon";
import classes from "./GainTip.module.css";

const GainTip = (props) => {
  return (
    <li>
      <div className={classes["gain-tip"]}>
        <CheckIcon />
        <p>{props.children}</p>
      </div>
    </li>
  );
};

export default GainTip;
