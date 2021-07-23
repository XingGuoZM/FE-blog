
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}