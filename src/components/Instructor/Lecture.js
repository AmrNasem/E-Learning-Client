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
import { useReducer, useState, useEffect, useCallback, memo } from "react";
import Modal from "./Modal";
import Form from "./Form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { courseActions } from "../../store/course-slice";
import { useDispatch } from "react-redux";

const uploadReducer = (state, action) => {
  if (action.type === "toggleInfo") return { ...state, isOpen: !state.isOpen };

  if (action.type === "setFileDetails")
    return { ...state, fileDetails: action.fileDetails };

  if (action.type === "setFile") {
    const date = new Date();
    const file = action.file;
    console.log(file);
    return {
      ...state,
      file,
      fileDetails: {
        name: file.name,
        size: file.size,
        date,
        type: file.type.split("/")[0],
      },
    };
  }

  return {
    type: "",
    isOpen: false,
    fileDetails: null,
    file: null,
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
  const { order, secId, lecture } = props;
  const { courseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploaded, setIsUploaded] = useState(lecture.videoUrl);
  const { sendRequest: uploadVideo, isLoading, error } = useHttp();
  const { sendRequest: updateVideo, isLoading: isUpdatingVideo } = useHttp();
  const { sendRequest: deleteVideo, isLoading: isDeletingVideo } = useHttp();
  const dispatch = useDispatch();
  const [upload, dispatchUpload] = useReducer(uploadReducer, {
    type: "",
    isOpen: false,
    file: lecture.video,
    fileDetails: null,
  });

  useEffect(() => {
    if (isUploaded) {
      const url = isUploaded.split("/");
      dispatchUpload({
        type: "setFileDetails",
        fileDetails: {
          name: url[url.length - 1],
          type: "Video",
          size: 2000000,
          date: new Date(lecture.createdAt),
        },
      });
    }
  }, [isUploaded, lecture]);

  const deleteLectureHandler = useCallback(() => {
    if (isUploaded) {
      deleteVideo(
        {
          endPoint: `videos/deleteVideo/${lecture.id}`,
          method: "DELETE",
          body: { courseId },
          headers: { "Content-Type": "application/json" },
        },
        () => {
          dispatch(courseActions.deleteLecture({ secId, lecId: lecture.id }));
        }
      );
    } else {
      dispatch(courseActions.deleteLecture({ secId, lecId: lecture.id }));
    }
  }, [dispatch, deleteVideo, courseId, lecture, secId, isUploaded]);

  const editLectureHandler = useCallback(
    (data) => {
      if (isUploaded) {
        console.log(data);
        updateVideo(
          {
            endPoint: `videos/updateVideo/${lecture.id}`,
            body: { title: data.title, public: false, courseId },
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          },
          (payload) => {
            console.log(payload);
            dispatch(courseActions.editLecture({ secId, lec: data }));
            setIsEditing(false);
          }
        );
      } else {
        dispatch(courseActions.editLecture({ secId, lec: data }));
        setIsEditing(false);
      }
    },
    [updateVideo, dispatch, courseId, isUploaded, lecture, secId]
  );

  const uploadVideoHandler = () => {
    const formData = new FormData();
    formData.append("courseVideo", upload.file, upload.file.name);
    formData.append("sectionId", secId);
    formData.append("title", lecture.title);

    uploadVideo(
      {
        endPoint: `videos/uploadVideo/${courseId}`,
        method: "POST",
        body: formData,
        stringify: false,
      },
      (payload) => {
        console.log(payload);
        setIsUploaded(true);
      }
    );
  };

  if (error) console.log(error);

  const selectVideoHandler = (e) => {
    dispatchUpload({ type: "setFile", file: e.target.files[0] });
    dispatchUpload({ type: "toggleInfo" });
  };

  const getUploadDate = (date) => {
    return `${months[date.getMonth()]} / ${
      date.getDate().toString().length === 1
        ? `0${date.getDate()}`
        : date.getDate()
    } / ${date.getFullYear()}`;
  };

  if (isEditing)
    return (
      <Form
        type="Lecture"
        order={order}
        onEditHandler={editLectureHandler}
        setIsEditing={setIsEditing}
        isLoading={isUpdatingVideo}
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
        <div className="d-flex gap-3">
          {isDeletingVideo && <LoadingSpinner side={30} />}
          {!upload.fileDetails && (
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
          {upload.fileDetails && (
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
      </div>
      {upload.isOpen && (
        <div>
          <div
            className={`d-flex my-3 p-2 gap-4 flex-wrap justify-content-between ${classes.info}`}
          >
            <div>
              <h6 className="mb-1">Name:</h6>
              <span>{upload.fileDetails.name}</span>
            </div>
            <div>
              <h6 className="mb-1">Type:</h6>
              <span className="text-capitalize">{upload.fileDetails.type}</span>
            </div>
            <div>
              <h6 className="mb-1">Size:</h6>
              <span>
                {(upload.fileDetails.size / Math.pow(2, 20)).toFixed(2)} MB
              </span>
            </div>
            <div>
              <h6 className="mb-1">Date:</h6>
              <span>{getUploadDate(upload.fileDetails.date)}</span>
            </div>
          </div>
          {isLoading ? (
            <LoadingSpinner side={50} className="mt-3 mb-1" />
          ) : isUploaded ? (
            <h5 className="text-center">Uploaded</h5>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Lecture);
