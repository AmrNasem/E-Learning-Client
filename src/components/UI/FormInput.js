import React from "react";

const FormInput = React.forwardRef((props, ref) => {


  return (
    <>
      <input
        ref={ref && ref}
        type={props.type || "text"}
        id={props.id}
        className={props.className}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus || false}
        value={props.name}
        onChange={props.onChange}
      />
    </>
  );
});

export default FormInput;
