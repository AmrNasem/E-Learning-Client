import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./GainTip.module.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const GainTip = (props) => {
  return (
    <li>
      <div className={classes["gain-tip"]}>
        <FontAwesomeIcon icon={faCheck} />
        <p>{props.children}</p>
      </div>
    </li>
  );
};

export default GainTip;
