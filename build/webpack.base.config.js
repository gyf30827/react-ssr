const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
  entry: {
    index: "./src/index.js",
    simpleReact: "./src/simpleReact.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".css", ".less", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "../"),
      src: path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)?$/, // jsx/js文件的正则
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    version: "7.0.0-beta.0",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: () => [
                  require("postcss-flexbugs-fixes"),
                  require("postcss-preset-env")({
                    autoprefixer: {
                      flexbox: "no-2009",
                    },
                    stage: 3,
                  }),
                  postcssNormalize(),
                ],
              },
              sourceMap: false,
            },
          },
          {
            loader: "less-loader",
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
