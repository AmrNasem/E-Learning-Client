import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './CirriculumList.css'
import FileUploadButton from "./FileUploadButton";
import { useState } from "react";

function CurriculumList(props) {
  const [lecTitle, setLecTitle] = useState('');
  const [lecTitleStatus, setLecTitleStatus] = useState(false);
  const [addBTN, setAddBTN] = useState(true);
  const handleEndState = () => {
    setLecTitleStatus(true);
    setAddBTN(false);
    setShowComponent(true);

  };

  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setLecTitleStatus(false);
    setAddBTN(true);
    setShowComponent(false);
  };
  const [repetitions, setRepetitions] = useState(0);

  const handleRepeatClick = () => {
    setRepetitions(repetitions + 1);
  };

  const renderRepeatedComponents = () => {
    const components = [];
    for (let i = 0; i < repetitions; i++) {
      components.push(<div key={i} className="item-bar">
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
          {<FileUploadButton>Lecture</FileUploadButton>}
        </div>
        {addBTN && <button className='add-btn ms-3 mt-2' type='submit' onClick={(handleEndState)}>Submit</button>
        }
      </div>);
    }
    return components;
  };

  return (
    <>
      <div className="upload-container mb-4">
        <div className="sec-title">
          <b>Section Title:</b><FontAwesomeIcon icon={faFile} className="ms-3 me-1" />{props.section}
        </div>
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
            {<FileUploadButton>Lecture</FileUploadButton>}
          </div>
          {addBTN && <button className='add-btn ms-3 mt-2' type='submit' onClick={(handleEndState)}>Submit</button>
          }
        </div>
        {renderRepeatedComponents()}{showComponent && <button className="new-lec-btn" onClick={(handleClick, handleRepeatClick)} ><FontAwesomeIcon icon={faPlus} className="me-1" /> New Lecture</button>}
      </div >
    </>
  )
}

export default CurriculumList;