import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Section.module.css";
import Lecture from "./Lecture";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Modal from "./Modal";

const Section = (props) => {
  const { order, setSections, section } = props;
  const [lectures, setLectures] = useState(
    order === 0
      ? [{ title: "Introduction", id: Math.random().toString(), video: null }]
      : []
  );
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (section && section.lectures && section.lectures.length)
      setLectures(section.lectures);
  }, [section]);

  const deleteSectionHandler = () => {
    setSections((prevState) =>
      prevState.filter((item) => item.id !== section.id)
    );
  };

  const addLectureHandler = (data) => {
    setLectures((prevState) => [...prevState, data]);
  };

  const editSectionHandler = (data) => {
    setSections((prevState) =>
      prevState.map((item) => {
        if (item.id === data.id) item = { ...item, ...data };
        return item;
      })
    );
  };

  const sectionHeader = (
    <div className="d-flex align-items-center gap-2 flex-wrap flex-sm-nowrap text-nowrap">
      <span>
        <strong>
          {lectures.length ? `Section ${order + 1}` : "Unpublished Section"}:
        </strong>
      </span>
      <div
        title={section.title}
        className="me-1 order-3 order-sm-2 overflow-hidden d-flex align-items-center gap-2"
      >
        <FontAwesomeIcon icon={faFile} />
        <span className="text-truncate">{section.title}</span>
      </div>
      <div className=" order-2 order-sm-3">
        <button
          onClick={() =>
            setIsEditing({ title: section.title, id: section.id, order })
          }
          className={`bg-transparent me-3 border-0 ${classes.icon}`}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`bg-transparent border-0 ${classes.icon}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`py-3 px-2 my-3 ${classes.section}`}>
      {isModalOpen && (
        <Modal
          type="section"
          setIsModalOpen={setIsModalOpen}
          onDeleteItemHandler={deleteSectionHandler}
        />
      )}
      {isEditing ? (
        <Form
          type="Section"
          order={order}
          emptySection={!lectures.length}
          onEditHandler={editSectionHandler}
          setIsEditing={setIsEditing}
          edit={isEditing}
        />
      ) : (
        sectionHeader
      )}
      <div className="mt-5 ms-md-5">
        {lectures.map((lec, index) => (
          <Lecture
            lecture={lec}
            key={lec.id}
            secId={section.id}
            setLectures={setLectures}
            order={index}
          />
        ))}
        {isAddingLecture ? (
          <Form
            type="Lecture"
            setIsAdding={setIsAddingLecture}
            onAddHandler={addLectureHandler}
          />
        ) : (
          <button
            onClick={() => setIsAddingLecture(true)}
            className={`px-3 py-1 ${classes.add}`}
          >
            <FontAwesomeIcon icon={faPlus} /> Video item
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Section);
