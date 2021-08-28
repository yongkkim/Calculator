import React from "react";
import "./Button.css";

const Button = ({ label, value, handleInputValue }) => {
  return (
    <div className="button" onClick={() => handleInputValue(value)}>
      {label}
    </div>
  );
};

export default Button;
