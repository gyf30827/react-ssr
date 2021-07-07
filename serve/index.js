const express = require("express");
import { render } from "./render";
import * as Controller from "./api";
const app = express();

app.use(express.static("dist"));

// 拦截api请求
app.use(async (req, res, next) => {
  const path = req.path;
  if (/^\/api\//.test(path)) {
    const control = path.replace("/api/", "");
    if (control && Controller[control]) {
      Controller[control](req)
        .then((data) => {
          res.json({
            code: 200,
            data,
            success: true,
            msg: "",
          });
        })
        .catch((err) => {
          res.status(404).json({
            code: 500,
            success: false,
            msg: "服务端出错",
          });
        });
    } else {
      res.status(404).json({
        code: 404,
        success: false,
        msg: "服务端出错",
      });
    }
  } else {
    next();
  }
});

app.use(render);

const port = 5005;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
