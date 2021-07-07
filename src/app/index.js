import React from "react";
import Router from "../router";
import { BrowserRouter } from "react-router-dom";
import createStore from "../store";
import { Provider } from "react-redux";
const store = createStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>{Router}</BrowserRouter>
      </Provider>
    );
  }
}
