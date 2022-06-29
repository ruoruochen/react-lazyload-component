const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: path.resolve(__dirname, "dist"),
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "ts-loader"],
      },
    ],
  },
};
