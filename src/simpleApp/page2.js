import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      页面2 <Link to="/page1">页面1</Link>
    </div>
  );
};
