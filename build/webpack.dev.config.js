const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.config.js");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    clientLogLevel: "none",
    port: 3000,
    open: true,
  },
});
