import classes from "./Requirements.module.css";

const Requirements = (props) => {
  const { course } = props;

  return (
    <div className={classes.requirements}>
      <h2>Requirements</h2>
      <ul>
        {course.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
