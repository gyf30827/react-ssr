const { merge } = require("webpack-merge");
const path = require("path");

const baseConfig = require("./webpack.base.config.js");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist/client"),
  },
});
