import "./Calculator.css";
import React, { useState, useEffect } from "react";
import Screen from "../Screen/Screen";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [keypadValue, setKeypadValue] = useState("");
  const [sign, setSign] = useState("-");
  const [parentheses, setParentheses] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState(0);
  const [indexCount, setIndexCount] = useState(0);

  //   useEffect(() => {
  //     return () => {
  //       setIndexCount(indexCount + 1);
  //     };
  //   }, [indexCount]);

  useEffect(() => {
    const inputScreen = document.getElementsByClassName("input-data")[0];
    if (inputScreen.clientHeight + 1 < inputScreen.scrollHeight) {
      setInput(input.substring(0, input.length - 1));
      setError("inputLengthLimit");
    } else {
      setError("");
    }
  }, [input]);

  const findNested = (index) => {
    if (input[index] === "sqrt" || input[index] === "x^y") {
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

  const getTotal = (opSet, currentNum) => {
    console.log(opSet, currentNum);
    let total = 1;
    let lastOp = opSet[opSet.length - 1].operation;
    opSet.forEach((op) => {
      if (op.operation === "*") total *= op.number;
      if (op.operation === "/") total /= op.number;
    });

    if (lastOp === "*") total *= currentNum;
    if (lastOp === "/") total *= currentNum;

    return total;
  };

  const calculate = (inputString) => {
    let parenthValue = [];
    let priority = [];
    let result = 0;
    let number = 0;
    let sign = 1;

    for (let i = 0; i < inputString.length; i++) {
      let char = inputString.charAt(i);
      console.log("result = ", result, " and Index = ", i, "char = ", char);
      setIndexCount(i + 1);

      while (i < inputString.length && !isNaN(Number(char))) {
        number = 10 * number + Number(char);
        i++;
        char = inputString.charAt(i);
      }

      if (char === "+") {
        if (priority.length !== 0) {
          number = getTotal(priority, number);
          priority = [];
        }

        console.log("+ number = ", number);

        result += sign * number;
        number = 0;
        sign = 1;
      } else if (char === "-") {
        if (priority.length !== 0) {
          number = getTotal(priority, number);
          priority = [];
        }

        console.log("- number = ", number);

        result += sign * number;
        number = 0;
        sign = 1;
      } else if (char === "*" || char === "/") {
        priority.push({ number: number, operation: char });

        console.log("* or / number = ", number);
        number = 0;
      } else if (char === "^") {
      } else if (char === "(") {
        let part = inputString.substring(i + 1, inputString.length);
        number = calculate(part);

        if (priority.length !== 0) {
          number = getTotal(priority, number);
          priority = [];
        }

        i = i + part.indexOf(")") + 1;
        console.log(
          "( ) number = ",
          number,
          ") index = ",
          Number(part.charAt(")")),
          " current index = ",
          i,
          " part = ",
          part
        );
        result += sign * number;
        number = 0;
      } else if (char === ")") {
        if (priority.length !== 0) {
          number = getTotal(priority, number);
          priority = [];
        }

        console.log(" ) number = ", number);
        result += sign * number;
        return result;
      }
    }
    console.log("after for = ", number, priority);
    if (number != 0 && priority.length !== 0) {
      number = getTotal(priority, number);
      result += sign * number;
    } else if (number != 0) result += sign * number;

    return result;
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
    const isSqrtOrExp = keypadValue === "sqrt" || keypadValue === "x^y";
    const isSign = keypadValue === "+|-";

    switch (value) {
      case "0":
        if (keypadValue === "/") {
          setError("divideByZero");
        }
      //
      case "(":
        if (input.length !== 0 && !isSign && !isNaN(Number(keypadValue))) {
          setError("parenth1");
          valid = false;
        }
        break;
      //
      case "x^y":
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
    // console.log(value);
    setKeypadValue(value);
    let isValid = validate(value);
    let newVal = input;

    // if (isValid) {
    switch (value) {
      case "-":
      case "*":
      case "/":
      case "+":
        if (keypadValue === "") {
          newVal = "0" + value;
        } else {
          newVal = input + value;
        }
        setInput(newVal);
        break;
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

        if (["+", "-", "/", "*"].find((element) => element === keypadValue)) {
          newVal = input.substring(0, input.length - 1) + value;
        } else if (keypadValue === "(") {
          newVal = input.substring(0, input.length - 1);
        } else {
          newVal = input + value;
        }

        setInput(newVal);
        break;
      case "x^y":
      case "sqrt":
        let parenthAdded = value + "(";
        newVal += parenthAdded;
        setInput(newVal);

        //if findParentheses() return -1, then that means parentheses are used before one of operator
        //if return -1, use parenthese for current value of sqrt or e^x
        //if return an index, find the open bracket or use of other sqrt or e^x and enclose it with parentheses

        // const isSqrtOrExp = keypadValue === "sqrt" || keypadValue === "e^x";
        // const parenthesesIndex = findParentheses();

        // if (parenthesesIndex !== -1) {
        //   setInput(
        //     insert(parenthesesIndex, isSqrtOrExp ? [value, "("] : value)
        //   );
        // } else {
        //   setInput(
        //     insert(isSqrtOrExp ? findNested() : findNumberIndex(), [value, "("])
        //   );
        // }

        break;
      case "+|-":
        let latestNumber = findNumberIndex();
        console.log(newVal.substring(0, latestNumber), latestNumber);
        newVal =
          newVal.substring(0, latestNumber) +
          sign +
          newVal.substring(latestNumber, newVal.length);
        setSign(sign === "" ? "-" : "");
        setInput(newVal);
        break;
      case "=":
        setResult(calculate(input));
        break;
      default:
        newVal += value;
        setInput(newVal);
    }
    // }
  };

  return (
    <div className="calculator">
      <Screen
        input={input}
        result={result}
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
