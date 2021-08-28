import "./Result.css";
import React, { useState, useEffect } from "react";

const Screen = ({ result, error }) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    switch (error) {
      case "parenth1":
        setErrorMsg("No open parenthesis");
        break;
      case "parenth2":
        setErrorMsg("No value in a pair of parenthesis");
        break;
      case "parenth3":
        setErrorMsg("( must be used after operators");
        break;
      case "parenth4":
        setErrorMsg(") used after operators");
        break;
      case "calculate1":
        setErrorMsg("No close parenthesis");
        break;
      case "operator1":
        setErrorMsg("No value to calculate");
        break;
      case "operator2":
        setErrorMsg("operators used without value");
        break;
      case "sqrtExp1":
        setErrorMsg("Can't be used without values");
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
