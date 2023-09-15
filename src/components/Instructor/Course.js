import { useNavigate } from "react-router-dom";
import classes from "./Course.module.css";

const Course = (props) => {
  const navigate = useNavigate();
  const { course, query } = props;
  const matches = course.course.title.match(new RegExp(query, "ig"));
  const rest = course.course.title.split(new RegExp(query, "ig"));

  return (
    <div
      className={`d-flex my-3 ${classes.course}`}
      onClick={() => navigate(`course/${course.course.id}`)}
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
            {query && rest[rest.length - 1]}
          </h5>
          <p className="mb-0">
            <strong className="text-uppercase">
              {course.course.status === "draft"
                ? "Draft"
                : course.course.status === "published" && "Published"}
            </strong>{" "}
            Public
          </p>
        </div>
        <div
          className={`d-md-flex d-none align-items-center gap-3 ${classes.progress}`}
        >
          <h5 className="text-nowrap">
            {course.course.status === "draft"
              ? "Finish your course"
              : "Complete"}
          </h5>
          <div className="w-100 rounded-pill">
            <span
              style={{
                width: course.course.status === "draft" ? "30%" : "100%",
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
