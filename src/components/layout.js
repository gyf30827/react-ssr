import React from "react";
import { renderRoutes } from "react-router-config";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>我是头部，哈哈哈</div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}
