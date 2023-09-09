import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Lecture.module.css";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import {
  faPencil,
  faPlus,
  faTrash,
  faCheckCircle,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useReducer, useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";

const uploadReducer = (state, action) => {
  if (action.type === "toggleInfo") return { ...state, isOpen: !state.isOpen };

  if (action.type === "setFile")
    return { ...state, file: action.file, date: new Date() };

  return {
    type: "",
    isOpen: false,
    file: null,
    date: null,
  };
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Lecture = (props) => {
  const { order, secId, lecture, setLectures } = props;
  const { courseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { sendRequest: uploadVideo, isLoading } = useHttp((retrievedData) =>
    console.log(retrievedData)
  );
  const [upload, dispatchUpload] = useReducer(uploadReducer, {
    type: "",
    isOpen: false,
    file: lecture.video,
    date: null,
  });

  const deleteLectureHandler = () => {
    setLectures((prevState) =>
      prevState.filter((item) => item.id !== lecture.id)
    );
  };

  const editLectureHandler = (data) => {
    setLectures((prevState) =>
      prevState.map((item) => {
        if (item.id === data.id) item = { ...item, ...data };
        return item;
      })
    );
  };

  const uploadVideoHandler = () => {
    const formData = new FormData();
    formData.append("courseVideo", upload.file, upload.file.name);
    formData.append("sectionId", secId);
    formData.append("title", lecture.title);

    uploadVideo({
      endPoint: `videos/uploadVideo/${courseId}`,
      method: "POST",
      body: formData,
    });
  };

  const selectVideoHandler = (e) => {
    dispatchUpload({ type: "setFile", file: e.target.files[0] });
    dispatchUpload({ type: "toggleInfo" });
  };

  const getDate = (date) => {
    return `${months[date.getMonth()]} / ${
      date.getDate().toString().length === 1 && "0"
    }${date.getDate()} / ${date.getFullYear()}`;
  };

  if (isEditing)
    return (
      <Form
        type="Lecture"
        order={order}
        onEditHandler={editLectureHandler}
        setIsEditing={setIsEditing}
        edit={isEditing}
      />
    );

  return (
    <div className={`px-2 pb-2 my-3 ${classes.lecture}`}>
      {isModalOpen && (
        <Modal
          type="video item"
          setIsModalOpen={setIsModalOpen}
          onDeleteItemHandler={deleteLectureHandler}
        />
      )}
      <div
        className={`${classes.header} d-flex pt-2 flex-wrap justify-content-end gap-3`}
      >
        <div className="d-flex flex-grow-1 flex-wrap flex-sm-nowrap text-nowrap overflow-hidden align-items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} />
          <span>
            <strong>Lecture {order + 1}:</strong>{" "}
          </span>
          <div
            title={lecture.title}
            className="d-flex me-1 order-sm-2 order-3 overflow-hidden align-items-center"
          >
            <FontAwesomeIcon className="ms-1 me-2" icon={faFile} />
            <span className="text-truncate">{lecture.title}</span>
          </div>
          <div className="order-2 order-sm-3">
            <button
              onClick={() =>
                setIsEditing({ title: lecture.title, id: lecture.id, order })
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
        {!upload.file && (
          <form>
            <input
              className="d-none"
              accept=".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv"
              onChange={selectVideoHandler}
              type="file"
              id={`file${lecture.id}`}
            />
            <label
              htmlFor={`file${lecture.id}`}
              className={`px-3 text-nowrap py-1 ${classes.add}`}
            >
              <FontAwesomeIcon icon={faPlus} /> Content
            </label>
          </form>
        )}
        {upload.file && (
          <button
            onClick={() => dispatchUpload({ type: "toggleInfo" })}
            className={`bg-transparent border-0 px-2 ${classes.video}`}
          >
            {upload.isOpen ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        )}
      </div>
      {upload.isOpen &&
        (isLoading ? (
          <LoadingSpinner side={60} className="mt-3 mb-1" />
        ) : (
          <div>
            <div
              className={`d-flex my-3 p-2 gap-4 flex-wrap justify-content-between ${classes.info}`}
            >
              <div>
                <h6 className="mb-1">Name:</h6>
                <span>{upload.file.name}</span>
              </div>
              <div>
                <h6 className="mb-1">Type:</h6>
                <span className="text-capitalize">
                  {upload.file.type.split("/")[0]}
                </span>
              </div>
              <div>
                <h6 className="mb-1">Size:</h6>
                <span>
                  {(upload.file.size / Math.pow(2, 20)).toFixed(2)} MB
                </span>
              </div>
              <div>
                <h6 className="mb-1">Date:</h6>
                <span>{getDate(upload.date)}</span>
              </div>
            </div>
            <div className="text-end mt-3">
              <button
                onClick={() => dispatchUpload({})}
                className={`bg-transparent px-3 py-2 border-0 me-3 ${classes.cancel}`}
              >
                Cancel
              </button>
              <button
                onClick={uploadVideoHandler}
                className={`border-0 px-3 py-2 text-white ${classes.upload}`}
              >
                Upload
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default React.memo(Lecture);
