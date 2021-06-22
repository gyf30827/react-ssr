import React from "react";
import Router from "../router";
import { BrowserRouter } from "react-router-dom";
import createStore from "../store";
import Layout from "../components/layout";
const store = createStore();
export default class App extends React.Component {
  render() {
    return (
      <Layout store={store}>
        <BrowserRouter>{Router}</BrowserRouter>
      </Layout>
    );
  }
}
