const express = require("express");
const app = express();
const port = 5001;
app.get("*", async (req, res) => {
  res.send(`<html>
  <head>
      <title>SSR</title>
  </head>
  <body>
      <p>hello world</p>
  </body>
</html>`);
});
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
