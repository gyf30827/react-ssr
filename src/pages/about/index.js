import React from "react";
import { Link } from "react-router-dom";

export default class About extends React.Component {
  render() {
    return (
      <div className="ablut">
        about <Link to="/home"> home </Link>
      </div>
    );
  }
}
