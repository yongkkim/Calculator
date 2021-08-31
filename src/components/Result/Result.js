import "./Result.css";
import React, { useState, useEffect } from "react";

const Result = ({ result, error }) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    switch (error) {
      case "divideByZero":
        setErrorMsg("cannot be divided by zero");
        break;
      case "exp1":
        setErrorMsg("No value for power");
        break;
      case "sqrtExp1":
        setErrorMsg("Value is not enclosed by (, ) properly");
        break;
      case "inputLengthLimit":
        setErrorMsg("Input is too long");
        break;
      default:
        setErrorMsg("");
        break;
    }
  }, [error]);

  //   const errorType = () => {

  //   };

  return <div className="result">{errorMsg ? errorMsg : result}</div>;
};

export default Result;
