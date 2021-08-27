import "./Calculator.css";
import React, { useState, useEffect } from "react";
import Screen from "../Screen/Screen";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
  const [input, setInput] = useState([]);
  const [keypadValue, setKeypadValue] = useState("");
  const [sign, setSign] = useState("+");
  const [parentheses, setParentheses] = useState(0);
  const [error, setError] = useState("");

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

  const insert = (index, newItem) => {
    let newArr = [...input.slice(0, index), ...newItem, ...input.slice(index)];
    console.log([...input.slice(0, index)], [...input.slice(index)]);
    if (Array.isArray(newItem)) newArr.push(")");

    return newArr;
  };

  const handleClick = (value) => {
    setKeypadValue(value);
    // let isValid = validate(value);
    let newVal = [...input];

    switch (value) {
      case "clear":
        setInput("");
        setKeypadValue("");
        setParentheses(0);
        setError("");
        break;
      case "(":
        setParentheses(parentheses + 1);
        newVal.push(value);
        setInput(newVal);
        break;
      case ")":
        setParentheses(parentheses - 1);
        newVal.push(value);
        setInput(newVal);
        break;
      case "e^x":
      case "sqrt":
        //if findParentheses() return -1, then that means parentheses are used before one of operator
        //if return -1, use parenthese for current value of sqrt or e^x
        //if return an index, find the open bracket or use of other sqrt or e^x and enclose it with parentheses
        const isSqrtOrExp = keypadValue === "sqrt" || keypadValue === "e^x";
        const parenthesesIndex = findParentheses();

        if (parenthesesIndex !== -1) {
          setInput(
            insert(parenthesesIndex, isSqrtOrExp ? [value, "("] : value)
          );
        } else {
          setInput(
            insert(isSqrtOrExp ? findNested() : findNumberIndex(), [value, "("])
          );
        }

        break;
      case "+|-":
        break;
      case "=":
        calculate();
        break;
      default:
        newVal.push(value);
        setInput(newVal);
    }
  };

  return (
    <div className="calculator">
      <Screen input={input} error={error} />
      <Keypad handleClick={handleClick} setSign={setSign} sign={sign} />
    </div>
  );
};

export default Calculator;
