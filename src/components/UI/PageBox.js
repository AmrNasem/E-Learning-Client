import classes from "./PageBox.module.css";

const PageBox = (props) => {
  return (
    <div className={`${props.className} flex-grow-1 ${classes.box}`}>
      <h3>{props.title}</h3>
      <div className={`p-5 ${classes.content}`}>{props.children}</div>
    </div>
  );
};

export default PageBox;
