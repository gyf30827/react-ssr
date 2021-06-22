const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    index: "./serve/index.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".css", ".less", ".jsx", ".tsx"],
  },
  target: "node",
  mode: "development",
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist/serve"),
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../serve/index.ejs"),
          to: path.resolve(__dirname, "../dist/serve/index.html"),
        },
        {
          from: path.resolve(__dirname, "../favicon.ico"),
          to: path.resolve(__dirname, "../dist/client/favicon.ico"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
