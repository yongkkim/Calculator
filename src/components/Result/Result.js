import "./Result.css";
import React, { useState, useEffect } from "react";

const Screen = ({ result, error }) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    switch (error) {
      case "parenth1":
        setErrorMsg("( must be used after operators");
        break;
      case "calculate1":
        setErrorMsg("No close parenthesis");
        break;
      case "divideByZero":
        setErrorMsg("cannot be divided by zero");
        break;
      case "sqrtExp1":
        setErrorMsg("Cannot be used without values");
        break;
      case "sqrtExp2":
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

  return <div className="result">{result ? result : errorMsg}</div>;
};

export default Screen;
