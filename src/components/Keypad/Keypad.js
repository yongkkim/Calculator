import "./Keypad.css";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

const Keypad = ({ handleClick }) => {
  return (
    <div className="keypad">
      <Button handleClick={handleClick} label="AC" value="clear" />
      <Button handleClick={handleClick} label="sqrt" value="sqrt" />
      <Button handleClick={handleClick} label="e^x" value="e^x" />
      <Button handleClick={handleClick} label="/" value="/" />

      <Button handleClick={handleClick} label="7" value="7" />
      <Button handleClick={handleClick} label="8" value="8" />
      <Button handleClick={handleClick} label="9" value="9" />
      <Button handleClick={handleClick} label="X" value="*" />

      <Button handleClick={handleClick} label="4" value="4" />
      <Button handleClick={handleClick} label="5" value="5" />
      <Button handleClick={handleClick} label="6" value="6" />
      <Button handleClick={handleClick} label="-" value="-" />

      <Button handleClick={handleClick} label="1" value="1" />
      <Button handleClick={handleClick} label="2" value="2" />
      <Button handleClick={handleClick} label="3" value="3" />
      <Button handleClick={handleClick} label="+" value="+" />

      <Button handleClick={handleClick} label="(" value="(" />
      <Button handleClick={handleClick} label="0" value="0" />
      <Button handleClick={handleClick} label=")" value=")" />
      <Button handleClick={handleClick} label="+|-" value="+|-" />

      <Button handleClick={handleClick} label="=" value="=" />
      <Button handleClick={handleClick} label="." value="." />
    </div>
  );
};

export default Keypad;
