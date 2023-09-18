import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react'; import FileUploadButton from "./FileUploadButton";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import './LeactureComponent.css'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function LectureComponent() {
  const [lecTitle, setLecTitle] = useState('');
  const [lecTitleStatus, setLecTitleStatus] = useState(false);
  const [addBTN, setAddBTN] = useState(true);
  const handleEndState = () => {
    setLecTitleStatus(true);
    setAddBTN(false);
  };

  return (
    <>
      <div className="item-bar">
        <div className="intro">
          <b>Lecture Title: </b>
          {lecTitleStatus && <div className="d-inline">
            <FontAwesomeIcon icon={faCircleCheck} className="ms-1" />
            {lecTitle}
          </div>}
          {addBTN && <input required placeholder='Enter a Title' className='input lec-title-input' value={lecTitle} onChange={(e) => (setLecTitle(e.target.value))} />}
        </div>
        <div className="buttonss mt-2">
          <b className="me-2">Upload Media:</b>
          {<FileUploadButton>Lecture Video</FileUploadButton>}
        </div>
        {addBTN && <button className='add-btn ms-3 mt-2' type='submit' onClick={(handleEndState)}>Submit</button>
        }
      </div>

    </>
  )
}

export default LectureComponent;