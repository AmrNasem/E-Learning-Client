import classes from "./Description.module.css";

const Description = (props) => {
  const { course } = props;

  return (
    <div className={classes.description}>
      <h2>Description</h2>
      <p>{course.description}</p>
      <button>See more</button>
    </div>
  );
};

export default Description;
