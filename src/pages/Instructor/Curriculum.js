import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageBox from "../../components/UI/PageBox";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./Curriculum.module.css";
import Form from "../../components/Instructor/Form";
import React, { useEffect, useState } from "react";
import Section from "../../components/Instructor/Section";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useSelector } from "react-redux";

const Curriculum = (props) => {
  const course = useSelector((state) => state.course.course);
  const [sections, setSections] = useState([
    {
      title: "Introduction",
      id: Math.random().toString(),
    },
  ]);
  const [isAddingSection, setIsAddingSection] = useState(false);

  const addSectionHandler = (data) => {
    setSections((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    if (course && course.sections && course.sections.length)
      setSections(course.sections);
  }, [course]);

  return (
    <PageBox title="Curriculum" className="overflow-hidden">
      <p>
        Start putting together your course by creating sections, lectures and
        practice activities (quizzes, coding exercises and assignments). Use
        your course outline to structure your content and label your sections
        and lectures clearly. If you're intending to offer your course for free,
        the total length of video content must be less than 2 hours.
      </p>
      {course ? (
        sections.map((sec, index) => (
          <Section
            key={sec.id}
            setSections={setSections}
            order={index}
            section={sec}
          />
        ))
      ) : (
        <LoadingSpinner side={60} />
      )}
      {isAddingSection ? (
        <Form
          type="Section"
          onAddHandler={addSectionHandler}
          setIsAdding={setIsAddingSection}
        />
      ) : (
        <button
          onClick={() => setIsAddingSection(true)}
          className={`px-3 py-2 my-3 bg-transparent ${classes["new-section"]}`}
        >
          <FontAwesomeIcon icon={faPlus} /> Section
        </button>
      )}
    </PageBox>
  );
};

export default React.memo(Curriculum);
