import { faAngleLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ManageCourseHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import { courseActions } from "../../store/course-slice";

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
  const dispatch = useDispatch();

  const updateCourseHandler = () => {
    const formData = new FormData();
    if (title) formData.append("title", title);
    if (subtitle) formData.append("subtitle", subtitle);
    if (description) formData.append("desc", description);

    const sentGoals = goals
      .map((item) => item.text)
      .filter((item) => item.trim() !== "");
    if (sentGoals.length >= 4) {
      formData.append("outline[]", sentGoals);
    }

    const sentRequirements = requirements
      .map((item) => item.text)
      .filter((item) => item.trim() !== "");
    formData.append("prerequisites[]", sentRequirements);

    const sentBeneficiaries = beneficiaries
      .map((item) => item.text)
      .filter((item) => item.trim() !== "");
    formData.append("beneficiaries[]", sentBeneficiaries);

    formData.append("lang", lang);
    if (price) formData.append("price", price);
    if (level) formData.append("level", level);
    if (!isNaN(parseInt(category))) formData.append("categoryId", category);

    updateCourse(
      {
        endPoint: `courses/updateCourse/${courseId}`,
        method: "PUT",
        body: formData,
        stringify: false,
      },
      (payload) => {
        console.log(payload);
        dispatch(courseActions.updateCourse(payload.course));
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
