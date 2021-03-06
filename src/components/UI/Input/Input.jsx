import React from "react";
import classes from "./Input.module.scss";

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && touched && shouldValidate;
};

const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || "Enter the correct value"}</span>
      ) : null}
    </div>
  );
};

export default Input;
