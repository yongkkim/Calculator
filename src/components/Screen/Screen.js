import "./Screen.css";
import React, { useState, useEffect } from "react";
import InputData from "../InputData/InputData";
import Result from "../Result/Result";

const Screen = ({ input, error }) => {
  return (
    <div className="screen">
      <InputData input={input} />
      <Result error={error} />
    </div>
  );
};

export default Screen;
