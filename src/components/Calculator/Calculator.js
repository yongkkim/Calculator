import "./Calculator.css";
import React, { useState, useEffect } from "react";
import Screen from "../Screen/Screen";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [keypadValue, setKeypadValue] = useState("");
  const [sign, setSign] = useState("+");
  const [parentheses, setParentheses] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const inputScreen = document.getElementsByClassName("input-data")[0];
    if (inputScreen.clientHeight + 1 < inputScreen.scrollHeight) {
      setInput(input.substring(0, input.length - 1));
      setError("inputLengthLimit");
    }
  }, [input]);

  const findNested = (index) => {
    if (input[index] === "sqrt" || input[index] === "e^x") {
      return findNested(index - 1);
    }

    return index + 1;
  };

  const findParentheses = () => {
    //if there is close bracket at the end of array, then find first open bracket
    //if there is no close bracket at the end, return -1;

    if (keypadValue) return -1;

    let closeParentheseCount = 1;
    let openParenthese;
    for (let i = input.length - 2; i >= 0 && closeParentheseCount > 0; i--) {
      if (input[i] === "(") {
        closeParentheseCount--;
        if (closeParentheseCount === 0) {
          openParenthese = findNested(i - 1);
        }
      } else if (input[i] === ")") closeParentheseCount++;
    }
    return openParenthese;
  };

  const add = (v1, v2) => {};

  const substract = (v1, v2) => {};

  const multiplication = (v1, v2) => {};

  const division = (v1, v2) => {};

  const exponent = (v1) => {};

  const sqrt = (v1) => {};

  const calculate = (input) => {
    const inputArr = input.split(" ");

    // switch (value) {
    //   case "clear":
    //     setInput("");
    //     break;
    //   case "(":
    //     setParenthesesOpen(!bracketOpen);
    //     setInput(newVal);
    //     break;
    //   case ")":
    //     setParenthesesOpen(!bracketOpen);
    //     setInput(newVal);
    //     break;
    //   case "=":
    //     calculate();
    //     break;
    //   default:
    //     setInput(newVal);
    // }
  };

  const findNumberIndex = () => {
    let end = input.length - 1;
    for (let i = end; i >= 0; i--) {
      if (isNaN(Number(input[i]))) {
        return i + 1;
      }
    }

    return 0;
  };

  const validate = (value) => {
    let valid = true;
    const isSqrtOrExp = keypadValue === "sqrt" || keypadValue === "e^x";
    const isSign = keypadValue === "+|-";

    switch (value) {
      //
      case "-":
      case "*":
      case "/":
      case "+":
        if (keypadValue === "") {
          setError("operator1");
          valid = false;
        } else if (!isSqrtOrExp && keypadValue !== ")") {
          if (isNaN(Number(keypadValue))) {
            setError("operator2");
            valid = false;
          }
        }

        break;
      //
      case ")":
        if (parentheses === 0) {
          setError("parenth1");
          valid = false;
        } else if (input[input.lengt - 1] === "(") {
          setError("parenth2");
          valid = false;
        } else if (
          ["+", "-", "/", "*"].find((element) => element === keypadValue)
        ) {
          setError("parenth4");
        }
        break;
      //
      case "(":
        if (input.length !== 0 && !isSign && !isNaN(Number(keypadValue))) {
          setError("parenth3");
          valid = false;
        }
        break;
      //
      case "e^x":
      case "sqrt":
        if (keypadValue === "") {
          setError("sqrtExp1");
          valid = false;
        }
        if (parentheses > 0 && findParentheses() === -1) {
          setError("sqrtExp2");
          valid = false;
        }
        break;
      //
      case "=":
        if (parentheses !== 0) {
          setError("calculate1");
          valid = false;
        }
        break;
      //
      default:
        setError("");
        break;
    }

    return valid;
  };

  //   const insert = (index, newItem) => {
  //     let newVal =

  //     return newVal;
  //   };

  const handleInputValue = (value) => {
    setKeypadValue(value);
    let isValid = validate(value);
    let newVal = input;

    if (isValid) {
      switch (value) {
        case "clear":
          setInput("");
          setKeypadValue("");
          setParentheses(0);
          setError("");
          break;
        case "(":
          setParentheses(parentheses + 1);
          newVal += value;
          setInput(newVal);
          break;
        case ")":
          setParentheses(parentheses - 1);
          newVal += value;
          setInput(newVal);
          break;
        case "e^x":
        case "sqrt":
          //if findParentheses() return -1, then that means parentheses are used before one of operator
          //if return -1, use parenthese for current value of sqrt or e^x
          //if return an index, find the open bracket or use of other sqrt or e^x and enclose it with parentheses
          // const isSqrtOrExp = keypadValue === "sqrt" || keypadValue === "e^x";
          let parenthAdded = value + "(";
          newVal += parenthAdded;
          setInput(newVal);
          break;
        case "+|-":
          break;
        case "=":
          calculate();
          break;
        default:
          newVal += value;
          setInput(newVal);
      }
    } else {
      newVal += value;
      setInput(newVal);
    }
  };
  return (
    <div className="calculator">
      <Screen
        input={input}
        setInput={setInput}
        handleInputValue={handleInputValue}
        validate={validate}
        error={error}
      />
      <Keypad
        handleInputValue={handleInputValue}
        setSign={setSign}
        sign={sign}
      />
    </div>
  );
};

export default Calculator;
