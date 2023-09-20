import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faPencil,
  faPlus,
  faTrash,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Section.module.css";
import Lecture from "./Lecture";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Modal from "./Modal";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { courseActions } from "../../store/course-slice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const Section = (props) => {
  const { order, section } = props;
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading: isDeletingLoading, sendRequest: deleteSection } =
    useHttp();
  const {
    isLoading: isEditingLoading,
    sendRequest: updateSection,
    error,
  } = useHttp();
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditingLoading) setIsEditing(false);
  }, [isEditingLoading]);

  const deleteSectionHandler = useCallback(() => {
    setIsModalOpen(false);
    deleteSection(
      {
        endPoint: `sections/deleteSection/${section.id}`,
        body: { courseId },
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      (payload) => {
        console.log(payload);
        dispatch(courseActions.deleteSection(section.id));
      }
    );
  }, [section, dispatch, deleteSection, courseId]);

  const addLectureHandler = useCallback(
    (data) => {
      dispatch(courseActions.addLecture({ secId: section.id, lec: data }));
      setIsAddingLecture(false);
    },
    [dispatch, section]
  );

  const editSectionHandler = useCallback(
    (data) => {
      updateSection(
        {
          endPoint: `sections/updateSection/${section.id}`,
          body: { sectionTitle: data.title, courseId },
          headers: { "Content-Type": "application/json" },
          method: "PUT",
        },
        (payload) => {
          dispatch(courseActions.editSection(payload.rowUpdated));
        }
      );
    },
    [section, courseId, dispatch, updateSection]
  );

  if (error) console.log(error);

  const dragHandler = (e) => {
    e.dataTransfer.setData("section-data", order);
  };

  const dropHandler = (e) => {
    const draggedOrder = e.dataTransfer.getData("section-data");
    e.currentTarget.style.backgroundColor = "var(--hover-color)";
    if (draggedOrder) {
      dispatch(
        courseActions.changeSectionOrder({ from: draggedOrder, to: order })
      );
    }
  };

  const sectionHeader = (
    <div
      draggable
      onDragStart={dragHandler}
      className={`${classes.header} d-flex gap-4 pt-3 px-1 justify-content-between  cursor-move`}
    >
      <div className="d-flex align-items-center gap-2 flex-wrap flex-sm-nowrap text-nowrap">
        <span>
          <strong>
            {section.videos.length
              ? `Section ${order + 1}`
              : "Unpublished Section"}
            :
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
            className={`bg-transparent me-2 px-2 border-0 ${classes.icon}`}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`bg-transparent px-2 border-0 ${classes.icon}`}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <FontAwesomeIcon className="fs-5" icon={faBars} />
    </div>
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "var(--secondary-color)";
      }}
      onDragLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--hover-color)";
      }}
      onDrop={dropHandler}
      className={`pb-3 px-2 my-3 ${classes.section}`}
    >
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
          emptySection={!section.videos.length}
          onEditHandler={editSectionHandler}
          setIsEditing={setIsEditing}
          isLoading={isEditingLoading}
          edit={isEditing}
        />
      ) : (
        sectionHeader
      )}
      {isDeletingLoading && <LoadingSpinner className="mt-3" side={40} />}
      <div className="mt-4 ms-md-5">
        {section.videos.map((lec, index) => (
          <Lecture
            lecture={lec}
            key={lec.id}
            secId={section.id}
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
