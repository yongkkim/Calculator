import "./InputData.css";
import React, { useState, useEffect } from "react";

const InputData = ({ input, setInput, handleInputValue }) => {
  const [isBackspace, setIsBackspace] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  const detectBackspace = (e) => {
    if (e.keyCode === 8) {
      setIsBackspace(true);
    } else if (e.keyCode === 13) {
      setIsEnter(true);
    }
  };

  const handleInput = (e) => {
    let newVal = e.target.value;

    if (isBackspace) {
      setInput(input.substring(0, input.length - 1));
      setIsBackspace(false);
    } else if (!isEnter) {
      handleInputValue(newVal.charAt(newVal.length - 1));
      setIsEnter(false);
    } else {
      setIsEnter(false);
    }
  };

  return (
    <textarea
      value={input}
      rows="2"
      onKeyDown={(e) => detectBackspace(e)}
      onChange={(e) => handleInput(e)}
      autoFocus
      className="input-data"
    />
  );
};

export default InputData;
