import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OutLayer } from "../UI/Modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <OutLayer
      className="d-flex align-items-center justify-content-center"
      onClick={() => props.setIsModalOpen(false)}
      isOpen
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white mx-2 p-4 ${classes.box}`}
      >
        <div className="d-flex justify-content-between mx-2 mb-3 align-items-center">
          <h4>Please confirm</h4>
          <button
            onClick={() => props.setIsModalOpen(false)}
            className={`bg-transparent border-0 fs-5 ${classes["close-button"]}`}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <p className={`my-4 ${classes.body}`}>
          You are about to remove a {props.type}. Are you sure you want to
          continue?
        </p>
        <div className="text-end mt-5">
          <button
            onClick={() => props.setIsModalOpen(false)}
            className={`bg-transparent fw-bold border-0 me-3 px-4 py-3 ${classes.cancel}`}
          >
            Cancel
          </button>
          <button
            onClick={props.onDeleteItemHandler}
            className={`border-0 text-white fw-bold px-4 py-3 ${classes.ok}`}
          >
            OK
          </button>
        </div>
      </div>
    </OutLayer>
  );
};

export default Modal;
