

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const testWebpackPlugin = require('./plugin/test')
module.exports = {
  entry: './src/index',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(),
    new testWebpackPlugin(),
  ]
}