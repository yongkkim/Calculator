import "./Result.css";
import React, { useState, useEffect } from "react";

const Screen = ({ result, error }) => {
  const [errorMsg, setErrorMsg] = useState("");

  //   const errorType = () => {

  //   };

  return <div className="result">{result ? result : errorMsg}</div>;
};

export default Screen;
