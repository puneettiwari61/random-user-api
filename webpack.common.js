const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const paths = require("./paths");

module.exports = {
  entry: [paths.src + "/index.js"],

  output: {
    path: __dirname + "/dist/bundle/",
    filename: "bundle.js",
    publicPath: "/static/",
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "/static/",
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    new Dotenv(),
  ],

  module: {
    rules: [
      { test: /\.js$/, use: ["babel-loader"] },

      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
      assets: "/static/",
    },
  },
};
