import React from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
export default () => {
  return <BrowserRouter>{Router}</BrowserRouter>;
};
// export default () => {
//   return (
//     <div
//       onClick={() => {
//         console.log(1111);
//       }}
//     >
//       <span>测试，组件</span>
//     </div>
//   );
// };
