import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const GainTip = (props) => {
  return (
    <li className="my-3">
      <div className="d-flex gap-2 align-items-center">
        <FontAwesomeIcon icon={faCheck} />
        <p className="mb-0">{props.children}</p>
      </div>
    </li>
  );
};

export default GainTip;
