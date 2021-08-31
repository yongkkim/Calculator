import React from "react";
import ReactDom from "react-dom";
import Button from "./Button";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Button />, div);
});

it("renders Button component", () => {
  const handleClick = () => {
    console.log("testing");
  };

  const wrapper = shallow(
    <Button label="button 1" value="1" handleClick={handleClick} />
  );
  expect(
    wrapper.containsMatchingElement(
      <div className="button" onClick={handleClick("1")}>
        button 1
      </div>
    )
  ).toEqual(true);
});
