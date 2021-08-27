import React from "react";
import "./Button.css";

const Button = ({ label, value, handleClick }) => {
  return (
    <div className="button" onClick={() => handleClick(value)}>
      {label}
    </div>
  );
};

export default Button;
