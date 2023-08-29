import SideBar from "./Sidebar";
import './Cirriculm.css'
import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurriculumList from "./uploadCourseComponents/CirriculumList";
import LecDetails from "./uploadCourseComponents/LecDetails";
import { useState } from "react";


function Cirriculm() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };
  const [repetitions, setRepetitions] = useState(0);

  const handleRepeatClick = () => {
    setRepetitions(repetitions + 1);
  };

  const renderRepeatedComponents = () => {
    const components = [];
    for (let i = 0; i < repetitions; i++) {
      components.push(<LecDetails key={i} />);
    }
    return components;
  };

  return (
    <>
      <div className="form">
        <SideBar />
        <div className="body">
          <div className="top-section">
            <h2 className="heading">Cirriculum</h2>
          </div>
          <hr />
          <div className="mid-section">
            <p>
              Start putting together your course by creating sections, lectures and practice (quizzes, coding exercises and assignments).

              Start putting together your course by creating sections, lectures and practice activities (<Link>quizzes, coding exercises and assignments</Link>). Use your<Link> course outline</Link> to structure your content and label your sections and lectures clearly. If you’re intending to offer your course for free, the total length of video content must be less than 2 hours.
            </p>
            <div className="insert-props"><LecDetails /> </div>
            {showComponent && <LecDetails />}
            {renderRepeatedComponents()}<button className="section-btn" onClick={(handleClick, handleRepeatClick)} ><FontAwesomeIcon icon={faPlus} className="me-1" /> Section</button>
          </div>
          <div className='List d-none'>
            <CurriculumList />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cirriculm;