import { useNavigate } from "react-router-dom";
import classes from "./Course.module.css";

const Course = (props) => {
  const navigate = useNavigate();
  const matches = props.title.match(new RegExp(props.query, "ig"));
  const rest = props.title.split(new RegExp(props.query, "ig"));

  return (
    <div
      className={`d-flex my-3 ${classes.course}`}
      onClick={() => navigate(`course/${props.id}`)}
    >
      <img src={require("../../assets/placeholder.jpg")} alt="" />
      <div className="d-flex align-items-center justify-content-between p-3 position-relative gap-3 flex-grow-1">
        <div className="d-flex align-self-stretch flex-column justify-content-between">
          <h5>
            {matches.map((m, index) => [
              rest[index],
              <span key={index} className={classes.mark}>
                {m}
              </span>,
            ])}
            {props.query && rest[rest.length - 1]}
          </h5>
          <p className="mb-0">
            {props.status === "draft" && <strong>DRAFT</strong>} Public
          </p>
        </div>
        <div
          className={`d-md-flex d-none align-items-center gap-3 ${classes.progress}`}
        >
          <h5 className="text-nowrap">
            {props.status === "draft" ? "Finish your course" : "Published"}
          </h5>
          <div className="w-100 rounded-pill">
            <span
              style={{ width: props.status === "draft" ? "30%" : "100%" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
