import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageBox from "../../components/UI/PageBox";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./Curriculum.module.css";
import Form from "../../components/Instructor/Form";
import React, { useCallback, useState } from "react";
import Section from "../../components/Instructor/Section";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";

const Curriculum = (props) => {
  const sections = useSelector((state) => state.course.sections);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const { courseId } = useParams();
  const { isLoading, sendRequest: addSection, error } = useHttp();

  const dispatch = useDispatch();

  const addSectionHandler = useCallback(
    (data) => {
      addSection(
        {
          endPoint: "sections/addSection",
          body: { courseId, sectionTitle: data.title },
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
        (payload) => {
          console.log(payload);
          dispatch(
            courseActions.addSection({ ...payload.section, videos: [] })
          );
          setIsAddingSection(false);
        }
      );
    },
    [dispatch, courseId, addSection]
  );

  if (error) console.log(error);

  return (
    <PageBox title="Curriculum" className="overflow-hidden">
      <p>
        Start putting together your course by creating sections, lectures and
        practice activities (quizzes, coding exercises and assignments). Use
        your course outline to structure your content and label your sections
        and lectures clearly. If you're intending to offer your course for free,
        the total length of video content must be less than 2 hours.
      </p>
      {sections ? (
        sections.map((sec, index) => (
          <Section key={sec.id} order={index} section={sec} />
        ))
      ) : (
        <LoadingSpinner side={60} />
      )}
      {isAddingSection ? (
        <Form
          type="Section"
          onAddHandler={addSectionHandler}
          setIsAdding={setIsAddingSection}
          isLoading={isLoading}
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
