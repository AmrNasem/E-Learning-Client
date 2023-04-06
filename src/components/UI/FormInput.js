const FormInput = (props) => {
  return (
    <input
      type={props.type || "text"}
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus || false}
    />
  );
};

export default FormInput;
