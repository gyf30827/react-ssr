import React from "react";
import { render } from "react-dom";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

export default class App extends React.Component {
  click = () => {
    console.log(11111);
    alert("33333");
  };
  render() {
    return (
      <div
        onClick={() => {
          console.log(1111);
        }}
      >
        div
        <button onClick={this.click}>哈哈哈</button>
        <BrowserRouter>{Router}</BrowserRouter>;
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
