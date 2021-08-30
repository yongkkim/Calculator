import "./Calculator.css";
import React, { useState, useEffect } from "react";
import Screen from "../Screen/Screen";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
  //   const [input, setInput] = useState("1+2*(3*(4*5+6))-7");
  //   const [input, setInput] = useState("1+2*(3*(4*(2)^(1/2)+6*(3)^(-2)))-7");
  //   const [input, setInput] = useState("1+2*(3+4*(1+2)+1+(3+9/3))*(2+4/2)");
  //   const [input, setInput] = useState("1+2*3/4-5+6*7/8+9-10");
  const [input, setInput] = useState("");
  const [keypadValue, setKeypadValue] = useState("");
  const [sign, setSign] = useState("-");
  const [parentheses, setParentheses] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState(0);
  const [openParenthCount, setOpenParenthCount] = useState(0);
  const [WTIPrice, setWTIPrice] = useState(0);

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
    //searches backward, from ) to matching (
    //if there is close parenthese at the end of array, then find first open parenthese

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

  const getWTI = () => {
    let url = "https://api.oilpriceapi.com/v1/prices/latest?by_code=WTI_USD";
    const headers = {
      Authorization: "Token 13b7c808e0996823081295a9f7144cba",
      "Content-Type": "application/json",
    };

    fetch(url, { headers })
      .then((response) => response.json())
      .then((wti) => {
        const price = wti.data.price;
        setResult(price);
        setWTIPrice(price);
      });
  };

  const getTotal = (opSet, currentNum) => {
    console.log(opSet, currentNum);
    let total = 1;
    let lastOp = opSet[opSet.length - 1].operation;

    if (opSet.length > 1) {
      for (let i = 0; i < opSet.length - 1; i++) {
        console.log(opSet[i].number, opSet[i + 1].number);
        if (opSet[i].operation === "*")
          opSet[i + 1].number = opSet[i].number * opSet[i + 1].number;
        if (opSet[i].operation === "/")
          opSet[i + 1].number = opSet[i].number / opSet[i + 1].number;
        if (opSet[i].operation === "^")
          opSet[i + 1].number = Math.pow(opSet[i].number, opSet[i + 1].number);
      }

      total = opSet[opSet.length - 1].number;
      console.log(total);
    } else {
      total = lastOp === "^" ? 0 : opSet[0].number;
    }

    if (lastOp === "*") total *= currentNum;
    if (lastOp === "/") total /= currentNum;
    if (lastOp === "^")
      total += Math.pow(opSet[opSet.length - 1].number, currentNum);

    return total;
  };

  const handleOpenParenth = (inputString) => {
    for (let input of inputString) {
      if (input === "(") {
        return true;
      }
    }

    return false;
  };

  const findParenthPair = (index, inputString) => {
    let count = 0;

    for (let i = index; i < inputString.length; i++) {
      if (inputString[i] === "(") count++;
      if (inputString[i] === ")") count--;
      if (count === 0) return inputString.substring(index + 1, i + 1);
    }
  };

  const calculate = (inputString) => {
    let firstPriority = [];
    let firstSubResult = 0;
    let secondPriority = [];
    let secondSubResult = 0;
    let result = 0;
    let number = 0;
    let sign = 1;

    for (let i = 0; i < inputString.length; i++) {
      let char = inputString.charAt(i);

      while (i < inputString.length && !isNaN(Number(char))) {
        number = 10 * number + Number(char);
        i++;
        char = inputString.charAt(i);
      }

      if (["+", "-", ")"].find((element) => element === char)) {
        if (firstPriority.length !== 0) {
          number = getTotal(firstPriority, number);
          firstPriority = [];
          firstSubResult = 0;
        }

        if (secondPriority.length !== 0) {
          number = getTotal(secondPriority, number);
          secondPriority = [];
          secondSubResult = 0;
        }
      }

      if (char === "+") {
        result += sign * number;
        console.log("+ result and number = ", result, number);
        number = 0;
        sign = 1;
      } else if (char === "-") {
        console.log("- result and number = ", result, number);
        result += sign * number;
        number = 0;
        sign = -1;
      } else if (char === "*" || char === "/") {
        if (inputString[i - 1] === ")") {
          // After calculation is done in parentheses, if * or / comes,
          // we don't want to save it to result but do * or / first and save it.
          number = secondSubResult;
          result -= secondSubResult;
        }

        secondPriority.push({ number: number, operation: char });
        console.log("* or / or ^ added", number, char);
        number = 0;
      } else if (char === "^") {
        //
        if (inputString[i - 1] === ")") {
          number = firstSubResult;
          result -= firstSubResult;
        }

        firstPriority.push({ number: number, operation: "^" });
        console.log("* or / or ^ added", number, char);
        number = 0;
      } else if (char === "(") {
        console.log("recursion start");
        let part = findParenthPair(i, inputString);
        number = calculate(part);

        if (secondPriority.length !== 0) {
          number = getTotal(secondPriority, number);
          secondPriority = [];
          secondSubResult = 0;
        }

        if (!handleOpenParenth(part)) i = i + part.indexOf(")") + 1;
        else i = i + part.lastIndexOf(")") + 1;

        console.log("( ) number = ", number, " result = ", result);
        secondSubResult = number;
        result += sign * number;
        number = 0;
      } else if (char === ")") {
        console.log("recursion end");

        console.log(") result = ", result);

        result += sign * number;
        return result;
      }
    }
    console.log("after for loop, = ", number, secondPriority, result);
    if (number != 0 && secondPriority.length !== 0) {
      number = getTotal(secondPriority, number);
      result += sign * number;
    } else if (number != 0) result += sign * number;

    return result === 0 ? "0" : result;
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

  const findZero = () => {};

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
        // if(!isNaN(Number(value))){

        // }
        setError("");
        break;
    }

    return valid;
  };

  const handleInputValue = (value) => {
    // console.log(value);
    setKeypadValue(value);
    // let isValid = validate(value);
    let newVal = input;

    // if (isValid) {
    switch (value) {
      case "wti":
        getWTI();
        break;
      case "-":
      case "*":
      case "/":
      case "+":
        console.log("hello");
        if (keypadValue === "wti") newVal = WTIPrice + value;
        else if (keypadValue === "") newVal = "0" + value;
        else newVal = input + value;
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
        setOpenParenthCount(openParenthCount + 1);
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
      case "^":
      case "x^y":
        if (keypadValue === "wti") {
          newVal = "(" + WTIPrice + ")^";
          setWTIPrice(0);
        } else if (
          keypadValue === "" ||
          isNaN(Number(newVal[newVal.length - 1]))
        ) {
          newVal += "(0)^";
        } else {
          let digitsStartIndex = findNumberIndex();
          let digits = newVal.substring(digitsStartIndex, newVal.length);
          let exp = "(" + digits + ")^";
          newVal = newVal.substring(0, digitsStartIndex) + exp;
        }

        setInput(newVal);

        break;
      case "sqrt":
        if (keypadValue === "wti") {
          newVal = "(" + WTIPrice + "^(1/2))";
          setWTIPrice(0);
        } else if (
          newVal.substring(newVal.length - 6, newVal.length - 1) === "(1/2)"
        ) {
          newVal += "^(1/2)";
        } else if (
          keypadValue === "" ||
          isNaN(Number(newVal[newVal.length - 1]))
        ) {
          newVal += "(0^(1/2))";
        } else {
          let digitsStartIndex = findNumberIndex();
          let digits = newVal.substring(digitsStartIndex, newVal.length);
          let sqrt = "(" + digits + "^(1/2))";
          newVal = newVal.substring(0, digitsStartIndex - 1) + sqrt;
        }

        setInput(newVal);

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
