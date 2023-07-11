const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './source/js/main.js',
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/main.bundle.js',
  },

  plugins: [new MiniCssExtractPlugin({
    filename: 'css/leaflet.css',
  })],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/,
        // use: [
        //   'file-loader'
        // ]

        loader: 'file-loader',
        options: {
          name: 'img/leaflet/[name].png',
        },
      },
    ]
  },
};