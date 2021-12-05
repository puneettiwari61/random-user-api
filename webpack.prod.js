const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
var BrotliPlugin = require("brotli-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

var webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const paths = require("./paths");
const common = require("./webpack.common");

class MetaInfoPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, (stats) => {
      var replaceInFile = function (filePath, toReplace, replacement) {
        var str = fs.readFileSync(filePath, "utf8");

        var regex = /(?<=bundle.).+/;

        var r = str.match(regex);

        var out = str.replace(r[0], replacement + "';");

        fs.writeFileSync(filePath, out);
      };
      replaceInFile(path.join(__dirname, "routes/index.js"), "md5Hash", stats.hash);
    });
  }
}

module.exports = merge(common, {
  mode: "production",
  devtool: false,

  output: {
    filename: "bundle.[hash].js",
    path: __dirname + "/dist/bundle/",
    publicPath: "/static/",
    chunkFilename: "[id].[chunkhash].js",
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   {
        //     loader: "css-loader",
        //     options: {
        //       importLoaders: 2,
        //       sourceMap: false,
        //       modules: false,
        //     },
        //   },
        //   "postcss-loader",
        //   "sass-loader",
        // ],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "bundle.[hash].css",
      chunkFilename: "[id].[chunkhash].css",
    }),
    new webpack.optimize.AggressiveMergingPlugin(),

    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new MetaInfoPlugin(),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
