import React from "react";
import { Provider } from "react-redux";
export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ textAlign: "center" }}>我是头部</div>
        {this.props.children}
      </Provider>
    );
  }
}
