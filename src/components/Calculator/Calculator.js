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
  const [openParenthCount, setOpenParenthCount] = useState(0);
  const [WTIPrice, setWTIPrice] = useState(0);

  //it catches if input goes more than 2 lines.
  useEffect(() => {
    const inputScreen = document.getElementsByClassName("input-data")[0];
    if (inputScreen.clientHeight + 1 < inputScreen.scrollHeight) {
      setInput(input.substring(0, input.length - 1));
      setError("inputLengthLimit");
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
    let total = 1;
    let lastOp = opSet[opSet.length - 1].operation;
    if (opSet.length > 1) {
      for (let i = 0; i < opSet.length - 1; i++) {
        if (opSet[i].operation === "*")
          opSet[i + 1].number = opSet[i].number * opSet[i + 1].number;
        if (opSet[i].operation === "/") {
          if (opSet[i + 1].number === 0) {
            setError("divideByZero");
            return;
          }
          opSet[i + 1].number = opSet[i].number / opSet[i + 1].number;
        }
        if (opSet[i].operation === "^")
          opSet[i + 1].number = Math.pow(opSet[i].number, opSet[i + 1].number);
      }

      total = opSet[opSet.length - 1].number;
    } else {
      total = lastOp === "^" ? 0 : opSet[0].number;
    }

    if (lastOp === "*") total *= currentNum;
    if (lastOp === "/") {
      if (currentNum === 0) {
        setError("divideByZero");
        return;
      }
      total /= currentNum;
    }
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

  const findCloseParenthIndex = (index, inputString) => {
    let count = 0;

    for (let i = index; i < inputString.length; i++) {
      if (inputString[i] === "(") count++;
      if (inputString[i] === ")") count--;
      if (count === 0) return i;
    }
  };

  const findPowerLastIndex = (index, inputString) => {
    for (let i = index; i < inputString.length - 1; i++) {
      if (isNaN(Number(inputString[i])) && inputString[i] !== "^") {
        return i;
      }
    }

    return inputString.length - 1;
  };

  const findPower = (index, inputString) => {
    let power = index;
    let nestedPower = 1;
    for (let i = index; i < inputString.length - 1; i++) {
      if (inputString[i] === "^") {
        nestedPower *= findPower(i + 1, inputString);
        break;
      }
      if (inputString[i] === "0" && inputString.substring(i, i + 3) === "0.5") {
        nestedPower *= 0.5;
        i = i + 2;
      } else if (isNaN(Number(inputString[i]) && inputString[i] !== "^")) {
        return Number(inputString.substring(index, i)) * nestedPower;
      } else {
        power++;
      }
    }

    return (
      Number(
        inputString.substring(index, power === index ? power + 1 : power)
      ) * nestedPower
    );
  };

  const calculate = (inputString) => {
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
        if (secondPriority.length !== 0) {
          number = getTotal(secondPriority, number);
          secondPriority = [];
          secondSubResult = 0;
        }
      }

      if (char === "+") {
        result += sign * number;
        number = 0;
        sign = 1;
      } else if (char === "-") {
        result += sign * number;
        number = 0;
        sign = -1;
      } else if (char === "*" || char === "/") {
        // After calculation is done in parentheses, if * or / comes,
        // we don't want to save it to result but do * or / first and save it.
        if (inputString[i - 1] === ")") {
          number = secondSubResult;
          result -= secondSubResult;
        }

        secondPriority.push({ number: number, operation: char });
        number = 0;
      } else if (char === "^") {
        if (inputString[i + 1] === "(") {
          let part = findParenthPair(i + 1, inputString);
          number = calculate(part);
          i = findCloseParenthIndex(i + 1, inputString) + 1;
        }
        if (!isNaN(Number(inputString[i + 1]))) {
          number = Math.pow(number, findPower(i + 1, inputString));
          i = findPowerLastIndex(i + 1, inputString) + 1;
        } else {
          setError("exp1");
        }
      } else if (char === "(") {
        let part = findParenthPair(i, inputString);
        number = calculate(part);

        if (secondPriority.length !== 0) {
          number = getTotal(secondPriority, number);
          secondPriority = [];
          secondSubResult = 0;
        }

        if (!handleOpenParenth(part)) i = i + part.indexOf(")") + 1;
        else i = i + part.lastIndexOf(")") + 1;

        secondSubResult = number;
        result += sign * number;
        number = 0;
      } else if (char === ")") {
        result += sign * number;
        return result;
      }
    }
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

    switch (value) {
      case "0":
        if (keypadValue === "/") {
          setError("divideByZero");
        }
        break;
      case "x^y":
      case "sqrt":
        if (parentheses > 0 && findParentheses() === -1) {
          setError("sqrtExp1");
        }
        break;
      //
      case "=":
        if (parentheses !== 0) {
          setError("calculate1");
        }
        break;
      //
      default:
        setError("");
        break;
    }

    return valid;
  };

  const handleInputValue = (value) => {
    setKeypadValue(value);
    validate(value);
    let newVal = input;

    switch (value) {
      case "wti":
        getWTI();
        break;
      case "-":
      case "*":
      case "/":
      case "+":
        if (keypadValue === "wti") {
          newVal = WTIPrice + value;
          setWTIPrice(0);
        } else if (keypadValue === "") newVal = "0" + value;
        else newVal = input + value;
        setInput(newVal);
        break;
      case "clear":
        setInput("");
        setKeypadValue("");
        setParentheses(0);
        setError("");
        setWTIPrice(0);
        break;
      case "(":
        setParentheses(parentheses + 1);
        let findOperation = ["+", "-", "/", "*", "x^y"].find(
          (element) => element === keypadValue
        );
        if (!findOperation) {
          newVal = newVal.substring(0, input.length - 1) + value;
        } else {
          newVal += value;
        }
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
          newVal = WTIPrice + "^";
          setWTIPrice(0);
        } else if (newVal[newVal.length - 1] === ")") {
          newVal += "^";
        } else if (
          keypadValue === "" ||
          isNaN(Number(newVal[newVal.length - 1]))
        ) {
          newVal += "0^";
        } else {
          let digitsStartIndex = findNumberIndex();
          let digits = newVal.substring(digitsStartIndex, newVal.length);
          let exp = digits + "^";
          newVal = newVal.substring(0, digitsStartIndex) + exp;
        }

        setInput(newVal);

        break;
      case "sqrt":
        if (keypadValue === "wti") {
          newVal = WTIPrice + "^0.5";
          setWTIPrice(0);
        } else if (newVal[newVal.length - 1] === ")") {
          newVal += "^0.5";
        } else if (
          keypadValue === "" ||
          isNaN(Number(newVal[newVal.length - 1]))
        ) {
          newVal += "0^0.5";
        } else {
          let digitsStartIndex = findNumberIndex();
          let digits = newVal.substring(digitsStartIndex, newVal.length);
          let sqrt = digits + "^0.5";
          newVal = newVal.substring(0, digitsStartIndex - 1) + sqrt;
        }

        setInput(newVal);

        break;
      case "+|-":
        let latestNumber = findNumberIndex();
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
