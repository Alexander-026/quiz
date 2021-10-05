import React from "react";
import classes from "./Button.module.scss";
const Button = ({ children, ...props }) => {
  const cls = [classes.btn, classes[props.type]];
  return (
    <button {...props} className={cls.join(" ")}>
      {children}
    </button>
  );
};

export default Button;
