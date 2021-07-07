import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <div>
      页面1
      <Link to="/page2">页面2</Link>
    </div>
  );
};
