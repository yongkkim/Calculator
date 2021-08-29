import "./Screen.css";
import React, { useState, useEffect } from "react";
import InputData from "../InputData/InputData";
import Result from "../Result/Result";

const Screen = ({ input, result, setInput, handleInputValue, error }) => {
  return (
    <div className="screen">
      <InputData
        input={input}
        setInput={setInput}
        handleInputValue={handleInputValue}
      />
      <Result result={result} error={error} />
    </div>
  );
};

export default Screen;
