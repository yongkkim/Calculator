import "./Test.css";
import React, { useState, useEffect } from "react";

const Test = ({ calculate, result, openTest, setOpenTest }) => {
  const [testResults, setTestResults] = useState([]);

  const values = [
    "1+2*(3*(4*5+6))-7",
    "2*(3*(4*2^0.5+6*3^2))",
    "1+2*(3+4*(1+2)+1+(3+9/3))*(2+4/2)",
    "1+2*3/4-5+6*7/8+9-10",
    "2^2^3",
    "2^0.5^0.5",
  ];

  const answers = [
    150, 357.94112549695428117124052938103, 177, 1.75, 64,
    1.1892071150027210667174999705605,
  ];

  useEffect(() => {
    values.forEach((value) => {
      console.log(value);
      setTestResults([...testResults, calculate(value)]);
    });
  }, []);

  return (
    <div className="test">
      {testResults.map((answer, i) => (
        <div key={"result_" + i} className="result">
          Value: {values[i]}
          Answer: {answer}
          Match: {150 === answers[i]}
          <br />
        </div>
      ))}
      <span onClick={() => setOpenTest(!openTest)}>Close</span>
    </div>
  );
};

export default Test;
