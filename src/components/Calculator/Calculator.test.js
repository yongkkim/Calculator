import React from "react";
import ReactDom from "react-dom";
import Calculator from "./Calculator";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

it("1+1", () => {
  const wrapper = shallow(<Calculator />);
  expect(wrapper.instance().calculate("1+1")).toEqual(2);
});
