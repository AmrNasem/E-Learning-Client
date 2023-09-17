import { faAngleLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ManageCourseHeader.module.css";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const ManageCourseHeader = (props) => {
  const navigate = useNavigate();
  const {
    goals,
    requirements,
    beneficiaries,
    title,
    subtitle,
    description,
    lang,
    level,
    category,
    price,
  } = useSelector((state) => state.course);
  const { isLoading, sendRequest: updateCourse, error } = useHttp();
  const { courseId } = useParams();

  const updateCourseHandler = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("desc", description);
    formData.append(
      "outline",
      goals.map((item) => item.text).filter((item) => item.trim() !== "")
    );
    formData.append(
      "prerequisites",
      requirements.map((item) => item.text).filter((item) => item.trim() !== "")
    );
    formData.append(
      "beneficiaries",
      beneficiaries
        .map((item) => item.text)
        .filter((item) => item.trim() !== "")
    );
    formData.append("price", price);
    formData.append("lang", lang);
    formData.append("level", level);
    formData.append("categoryId", category);

    updateCourse(
      {
        endPoint: `courses/updateCourse/${courseId}`,
        method: "PUT",
        body: formData,
        headers: {},
        stringify: true,
      },
      (payload) => {
        console.log(payload);
      }
    );
  };

  if (error) console.log(error);

  return (
    <div
      className={`py-2 px-3 px-md-4 px-lg-5 start-0 top-0 d-flex gap-3 flex-wrap align-items-center justify-content-end ${classes.header} position-sticky`}
    >
      <div className="d-flex gap-3 flex-grow-1 align-items-center">
        <button
          onClick={() => navigate("/instructor", { replace: true })}
          className={`${classes.back} bg-transparent text-white border-0 d-flex gap-2 align-items-center`}
        >
          <FontAwesomeIcon icon={faAngleLeft} />{" "}
          <span className="d-md-block d-none">Back to courses</span>
        </button>
        <h6 className="fw-bold text-white mb-0">{props.title}</h6>
        <span className={`${classes.status} px-1 text-uppercase`}>
          {props.status}
        </span>
      </div>
      <div className="d-flex gap-3 align-items-center">
        {isLoading ? (
          <LoadingSpinner side={40} />
        ) : (
          <button
            onClick={updateCourseHandler}
            className={`${classes.save} px-4 py-2 fw-bold text-white border-0`}
          >
            Save
          </button>
        )}

        <button
          onClick={() => navigate("settings")}
          className={`${classes.settings} fs-5 text-white p-2 bg-transparent border-0`}
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
    </div>
  );
};

export default ManageCourseHeader;
