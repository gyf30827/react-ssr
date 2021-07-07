const express = require("express");
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";
import Router from "../src/simpleApp/router";
import SimpleApp from "../src/simpleApp";

const app = express();
const port = 5002;
app.use(express.static("dist"));
app.get("*", async (req, res) => {
  // const content = renderToString(<SimpleApp />);
  let context = {};
  const content = renderToString(
    <StaticRouter location={req.path} context={context}>
      {Router}
    </StaticRouter>
  );
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.send(`<html>
    <head>
        <title>SSR</title>
        <link rel="icon" href="/client/favicon.ico" />
    </head>
    <body>
    <div id="root">${content}</div>
    </body>
    <script src="/client/simpleReact.js"></script>
  </html>`);
  }
});
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
