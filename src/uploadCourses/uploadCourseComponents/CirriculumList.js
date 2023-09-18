import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import './CirriculumList.css'
import LectureComponent from "./LectureComponent";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function CurriculumList(props) {
  const [repetitions, setRepetitions] = useState(0);
  const [lecTitleStatus, setLecTitleStatus] = useState(false);

  const handleRepeatClick = () => {
    setLecTitleStatus(true);
    setRepetitions(repetitions + 1);
  };

  const renderRepeatedComponents = () => {
    const components = [];
    for (let i = 0; i < repetitions; i++) {
      components.push(<LectureComponent key={i} />);
    }
    return components;
  };

  return (
    <>
      <div className="upload-container mb-4">
        <div className="sec-title">
          <b>Section Title:</b><FontAwesomeIcon icon={faFile} className="ms-3 me-1" />{props.section}
        </div>
        <LectureComponent />
      </div >
      {lecTitleStatus && <div className="re-Lec d-flex mt-3">
        <button className="re-Lec-Btn " onClick={handleRepeatClick}><FontAwesomeIcon icon={faPlus} className=" me-1" />New Lecture</button>
      </div>}
      {renderRepeatedComponents()}
    </>
  )
}

export default CurriculumList;