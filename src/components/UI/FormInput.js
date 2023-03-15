const FormInput = (props) => {
  return (
    <input
      type={props.type || "text"}
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
    />
  );
};

export default FormInput;
