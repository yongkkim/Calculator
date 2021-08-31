import "./Keypad.css";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import TestButton from "../Button/TestButton";

const Keypad = ({ handleInputValue, openTest, setOpenTest }) => {
  return (
    <div className="keypad">
      <Button handleInputValue={handleInputValue} label="AC" value="clear" />
      <Button handleInputValue={handleInputValue} label="sqrt" value="sqrt" />
      <Button handleInputValue={handleInputValue} label="x^y" value="x^y" />
      <Button handleInputValue={handleInputValue} label="/" value="/" />

      <Button handleInputValue={handleInputValue} label="7" value="7" />
      <Button handleInputValue={handleInputValue} label="8" value="8" />
      <Button handleInputValue={handleInputValue} label="9" value="9" />
      <Button handleInputValue={handleInputValue} label="X" value="*" />

      <Button handleInputValue={handleInputValue} label="4" value="4" />
      <Button handleInputValue={handleInputValue} label="5" value="5" />
      <Button handleInputValue={handleInputValue} label="6" value="6" />
      <Button handleInputValue={handleInputValue} label="-" value="-" />

      <Button handleInputValue={handleInputValue} label="1" value="1" />
      <Button handleInputValue={handleInputValue} label="2" value="2" />
      <Button handleInputValue={handleInputValue} label="3" value="3" />
      <Button handleInputValue={handleInputValue} label="+" value="+" />

      <Button handleInputValue={handleInputValue} label="(" value="(" />
      <Button handleInputValue={handleInputValue} label="0" value="0" />
      <Button handleInputValue={handleInputValue} label=")" value=")" />
      <Button handleInputValue={handleInputValue} label="+|-" value="+|-" />

      <Button handleInputValue={handleInputValue} label="=" value="=" />
      <Button handleInputValue={handleInputValue} label="WTI" value="wti" />
      <TestButton
        handleInputValue={handleInputValue}
        openTest={openTest}
        setOpenTest={setOpenTest}
        label="Test"
        value="test"
      />
    </div>
  );
};

export default Keypad;
